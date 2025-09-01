const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player logo
const playerImg = new Image();
playerImg.src = "club-logo.png";  

// Bigger 20×20 maze (1 = wall, 0 = path)
const maze = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,1,0,1,1,0,1,0,1,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,1],
  [1,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1],
  [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
  [1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,0,1,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1]
];

// Maze size
const rows = maze.length;
const cols = maze[0].length;
const tileSize = canvas.width / cols;

// Player start
let player = { x: 0, y: 1 };

// Prize
let prize = { x: cols - 2, y: rows - 1 };

// Draw Maze as neon line-walls
function drawMaze() {
  ctx.lineWidth = 2;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "aqua";
  ctx.strokeStyle = "cyan";

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (maze[y][x] === 1) {
        ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }
  ctx.shadowBlur = 0;
}

// Player
function drawPlayer() {
  ctx.drawImage(playerImg, player.x * tileSize + 5, player.y * tileSize + 5, tileSize - 10, tileSize - 10);
}

// Tech Prize (glowing chip)
function drawPrize() {
  let px = prize.x * tileSize + tileSize/2;
  let py = prize.y * tileSize + tileSize/2;

  ctx.beginPath();
  ctx.arc(px, py, tileSize/3, 0, Math.PI*2);
  ctx.fillStyle = "rgba(0, 255, 200, 0.4)";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#00ffff";
  ctx.fill();

  ctx.fillStyle = "#00ffff";
  ctx.shadowBlur = 8;
  ctx.fillRect(px - 12, py - 12, 24, 24);
  ctx.shadowBlur = 0;
}

// Main loop
function gameLoop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawMaze();
  drawPlayer();
  drawPrize();

  if (player.x === prize.x && player.y === prize.y) {
    setTimeout(() => {
      alert("🚀 You solved the Tech Maze!");
      player = { x: 1, y: 1 };
    }, 100);
  }

  requestAnimationFrame(gameLoop);
}

// Controls
document.addEventListener("keydown",(e)=>{
  let newX = player.x;
  let newY = player.y;
  if(e.key === "ArrowUp") newY--;
  if(e.key === "ArrowDown") newY++;
  if(e.key === "ArrowLeft") newX--;
  if(e.key === "ArrowRight") newX++;

  if(maze[newY][newX] === 0){
    player.x = newX;
    player.y = newY;
  }
});

gameLoop();