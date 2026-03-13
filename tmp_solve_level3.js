const level = {
  direction: 0,
  position: {x:4,y:6},
  map: [
    [{h:4,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:4,t:'b'}],
    [{h:3,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:3,t:'b'}],
    [{h:2,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:2,t:'b'}],
    [{h:2,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:2,t:'b'}],
    [{h:2,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:4,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:2,t:'b'}],
    [{h:2,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:2,t:'b'}],
    [{h:3,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'l'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:3,t:'b'}],
    [{h:4,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:1,t:'b'},{h:4,t:'b'}]
  ]
};

const sizeY = level.map.length;
const sizeX = level.map[0].length;
const heights = Array.from({length:sizeX},()=>Array(sizeY).fill(0));
let lightPos = null;
for (let i=0;i<sizeY;i++) {
  for (let j=0;j<sizeX;j++) {
    const y = sizeY - i - 1;
    heights[j][y] = level.map[i][j].h;
    if (level.map[i][j].t === 'l') lightPos = {x:j,y};
  }
}

const ATOMS = ['W','J','L','TL','TR'];

function step(state, op) {
  let {x,y,d,lit} = state;
  const forward = [ [0,-1], [1,0], [0,1], [-1,0] ]; // se,ne,nw,sw
  if (op === 'TL') d = (d+1)%4;
  else if (op === 'TR') d = (d+3)%4;
  else if (op === 'L') {
    if (x===lightPos.x && y===lightPos.y) lit = !lit;
  } else if (op === 'W' || op === 'J') {
    const [dx,dy] = forward[d];
    const nx = x+dx, ny = y+dy;
    if (nx>=0 && nx<sizeX && ny>=0 && ny<sizeY) {
      const h0 = heights[x][y], h1 = heights[nx][ny];
      if (op==='W') {
        if (h0===h1) { x=nx; y=ny; }
      } else {
        if ((h1-h0===1) || (h0>h1)) { x=nx; y=ny; }
      }
    }
  }
  return {x,y,d,lit};
}

function execNode(state,node) {
  if (node.t==='A') return step(state,node.op);
  let s = state;
  for (let c=0;c<node.k;c++) {
    for (const child of node.body) {
      s = execNode(s,child);
      if (s.lit) return s; // game completes immediately once all lights on (single-light level)
    }
  }
  return s;
}

function execProgram(program) {
  let s = {x:level.position.x,y:level.position.y,d:level.direction,lit:false};
  for (const n of program) {
    s = execNode(s,n);
    if (s.lit) return s;
  }
  return s;
}

function costNode(n){ return n.t==='A' ? 1 : 1 + n.body.reduce((a,b)=>a+costNode(b),0); }
function costSeq(seq){ return seq.reduce((a,b)=>a+costNode(b),0); }

function* genSeq(maxCost, depth) {
  yield [];
  if (maxCost<=0) return;
  for (const atom of ATOMS) {
    if (maxCost>=1) {
      for (const tail of genSeq(maxCost-1, depth)) {
        yield [{t:'A',op:atom}, ...tail];
      }
    }
  }
  if (depth>0 && maxCost>=2) {
    for (let bodyCost=1; bodyCost<=maxCost-1; bodyCost++) {
      const seenBody = new Set();
      for (const body of genSeq(bodyCost, depth-1)) {
        if (costSeq(body)!==bodyCost || body.length===0) continue;
        const keyBody = JSON.stringify(body);
        if (seenBody.has(keyBody)) continue;
        seenBody.add(keyBody);
        for (let k=2; k<=12; k++) {
          const rep = {t:'R',k,body};
          for (const tail of genSeq(maxCost-costNode(rep), depth)) {
            yield [rep, ...tail];
          }
        }
      }
    }
  }
}

function fmtNode(n){
  if (n.t==='A') return n.op;
  return `R${n.k}(${n.body.map(fmtNode).join(' ')})`;
}
function fmtSeq(seq){ return seq.map(fmtNode).join(' '); }

let found = null;
for (let c=1;c<=6;c++) {
  const seen = new Set();
  for (const p of genSeq(c, 2)) {
    if (costSeq(p)!==c) continue;
    const key = JSON.stringify(p);
    if (seen.has(key)) continue;
    seen.add(key);
    const out = execProgram(p);
    if (out.lit) { found = {c,p}; break; }
  }
  if (found) break;
}

if (!found) {
  console.log('No solution found with cost <= 6');
} else {
  console.log('Found min cost:', found.c);
  console.log('Program:', fmtSeq(found.p));
}
