# 🤖 Coding Academy Bot Game

An interactive programming puzzle game that teaches coding concepts through visual problem-solving. Guide a robot through various levels by writing simple programs using drag-and-drop commands.

🎮 **[Play the Game](https://vyaron.github.io/CodingAcademy-BotGame/)** 🎮

![Game Preview](img/bg.png)

## 🎮 About

This educational game introduces fundamental programming concepts including:
- **Sequential instructions** - Execute commands in order
- **Functions** - Create reusable procedures
- **Loops** - Repeat instructions efficiently
- **Problem solving** - Break complex tasks into simple steps

## ✨ Features

- 🎯 Progressive difficulty levels
- 🏆 Achievement system to track progress
- 🎵 Background music and sound effects
- 📱 Responsive design for mobile and desktop
- 🎨 Intuitive drag-and-drop interface
- 💾 Progress saved in browser

## 🚀 Getting Started

### Playing the Game

Simply open `index.html` in a modern web browser to start playing!

### Local Development

1. Clone or download this repository
2. Open `index.html` in your browser
3. No build process or dependencies required - it's pure HTML/CSS/JavaScript!

## 🎯 How to Play

1. **Start Game** - Click to begin playing
2. **Drag Instructions** - Move programming commands from the instruction panel to your program
3. **Build Your Program** - Arrange commands to solve the puzzle
4. **Run** - Execute your program and watch the robot follow your instructions
5. **Light All Tiles** - The goal is to light up all blue tiles to complete each level

### Available Commands

- **Walk** - Move forward one space
- **Turn Left** - Rotate 90° left
- **Turn Right** - Rotate 90° right
- **Jump** - Jump up one level
- **Light** - Light up the current tile
- **Repeat** - Loop instructions

## 🛠️ Technology Stack

- **HTML5 Canvas** - Game rendering
- **jQuery** - DOM manipulation and UI
- **jQuery UI** - Drag-and-drop interface
- **jPlayer** - Audio playback
- **History.js** - Navigation and state management

## 📁 Project Structure

```
├── index.html          # Main game page
├── css/
│   ├── main.css       # Game styles
│   ├── lightbot.css   # Additional styling
│   └── smoothness/    # jQuery UI theme
├── js/
│   ├── lightbot.model.*.js      # Game logic
│   ├── lightbot.view.*.js       # Rendering and UI
│   └── jquery libraries
├── img/               # Game graphics
├── media/
│   ├── audio/        # Background music
│   └── video/        # Tutorial videos
└── resources/         # Development assets
```

## 🎨 Customization

### Adding New Levels

Edit `lightbot.model.game.js` to add new level configurations with custom maps and objectives.

### Styling

Modify `css/main.css` to change colors, layouts, and visual appearance.

### Audio

Replace files in `media/audio/` to customize background music and sound effects.

## 🐛 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Modern mobile browsers

Note: Requires JavaScript enabled and HTML5 Canvas support.

## 📝 Recent Updates

- ✨ Added responsive design for mobile devices
- 🔧 Fixed browser permissions policy violations
- 🎵 Improved audio autoplay handling
- 📱 Added viewport meta tag for better mobile experience

## 🤝 Contributing

This is an educational project. Feel free to:
- Report bugs
- Suggest new features
- Create custom levels
- Improve documentation

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

Inspired by the original LightBot game - a fantastic tool for teaching programming concepts to learners of all ages.

---

**Have fun coding!** 🎉