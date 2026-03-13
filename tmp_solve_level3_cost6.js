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
const sizeY=level.map.length,sizeX=level.map[0].length;
const h=Array.from({length:sizeX},()=>Array(sizeY).fill(0));
let light;
for(let i=0;i<sizeY;i++)for(let j=0;j<sizeX;j++){const y=sizeY-i-1;h[j][y]=level.map[i][j].h;if(level.map[i][j].t==='l')light={x:j,y};}
function step(s,op){let{x,y,d,lit}=s;const f=[[0,-1],[1,0],[0,1],[-1,0]];if(op==='TL')d=(d+1)%4;else if(op==='TR')d=(d+3)%4;else if(op==='L'){if(x===light.x&&y===light.y)lit=!lit;}else{const[dx,dy]=f[d],nx=x+dx,ny=y+dy;if(nx>=0&&nx<sizeX&&ny>=0&&ny<sizeY){const h0=h[x][y],h1=h[nx][ny];if(op==='W'){if(h0===h1){x=nx;y=ny;}}else if(op==='J'){if((h1-h0===1)||(h0>h1)){x=nx;y=ny;}}}}return{x,y,d,lit};}
function execNode(s,n){if(n.t==='A')return step(s,n.op);let cur=s;for(let c=0;c<n.k;c++){for(const b of n.body){cur=execNode(cur,b);if(cur.lit)return cur;}}return cur;}
function execProg(p){let s={x:level.position.x,y:level.position.y,d:level.direction,lit:false};for(const n of p){s=execNode(s,n);if(s.lit)return s;}return s;}
function costNode(n){return n.t==='A'?1:1+n.body.reduce((a,b)=>a+costNode(b),0);}function costSeq(s){return s.reduce((a,b)=>a+costNode(b),0);}
const A=['W','J','L','TL','TR'];
function* genSeq(max,depth){yield[];if(max<=0)return;for(const op of A){for(const t of genSeq(max-1,depth))yield[{t:'A',op},...t];}if(depth>0&&max>=2){for(let bc=1;bc<=max-1;bc++){const seen=new Set();for(const body of genSeq(bc,depth-1)){if(body.length===0||costSeq(body)!==bc)continue;const kb=JSON.stringify(body);if(seen.has(kb))continue;seen.add(kb);for(let k=2;k<=12;k++){const r={t:'R',k,body};const rem=max-costNode(r);if(rem<0)continue;for(const t of genSeq(rem,depth))yield[r,...t];}}}}
}
function fmt(n){return n.t==='A'?n.op:`R${n.k}(${n.body.map(fmt).join(' ')})`;}
let shown=0;
for(const p of genSeq(6,2)){if(costSeq(p)!==6)continue;const out=execProg(p);if(out.lit){console.log(p.map(fmt).join(' '));shown++;if(shown>=10)break;}}
console.log('shown',shown);
