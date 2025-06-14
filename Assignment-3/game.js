const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const highScoreText = document.getElementById("highScore");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const catchSound = document.getElementById("catchSound");
const missSound = document.getElementById("missSound");

let playerX = 160;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let lives = 3;
let balls = [];
let animationId = null;
let ballInterval = null;
let ballSpeed = 5;
let gameActive = false;



// ...existing code...
function resetGame() {
  playerX = 160;
  score = 0;
  lives = 3;
  ballSpeed = 5;
  balls.forEach(ball => ball.remove());
  balls = [];
  scoreText.innerText = "Score: 0";
  livesText.innerText = "Lives: 3";
  highScoreText.innerText = "High Score: " + highScore;
  player.style.left = playerX + "px";
}

function startGame() {
  resetGame();
  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  gameActive = true;
  ballInterval = setInterval(createBall, 1000);
  gameLoop();
}

function endGame() {
  gameActive = false;
  clearInterval(ballInterval);
  cancelAnimationFrame(animationId);
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
  finalScore.innerText = `Your Score: ${score}`;
  highScoreText.innerText = "High Score: " + highScore;
  gameOverScreen.style.display = "flex";
}

document.addEventListener("keydown", (e) => {
  if (!gameActive) return;
  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
  } else if (e.key === "ArrowRight" && playerX < 320) {
    playerX += 20;
  }
  player.style.left = playerX + "px";
});

function createBall() {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.left = Math.floor(Math.random() * 380) + "px";
  ball.style.top = "0px";
  gameArea.appendChild(ball);
  balls.push(ball);
}

// ...existing code...

// Mouse movement
gameArea.addEventListener("mousemove", (e) => {
  if (!gameActive) return;
  // Get mouse X relative to gameArea
  const rect = gameArea.getBoundingClientRect();
  let x = e.clientX - rect.left - player.offsetWidth / 2;
  // Clamp within bounds
  x = Math.max(0, Math.min(x, gameArea.offsetWidth - player.offsetWidth));
  playerX = x;
  player.style.left = playerX + "px";
});

// Touch movement
gameArea.addEventListener("touchmove", (e) => {
  if (!gameActive) return;
  const rect = gameArea.getBoundingClientRect();
  let x = e.touches[0].clientX - rect.left - player.offsetWidth / 2;
  x = Math.max(0, Math.min(x, gameArea.offsetWidth - player.offsetWidth));
  playerX = x;
  player.style.left = playerX + "px";
}, { passive: false });

// ...existing code...
function updateBalls() {
  for (let i = balls.length - 1; i >= 0; i--) {
    const ball = balls[i];
    let top = parseInt(ball.style.top);
    top += ballSpeed;
    ball.style.top = top + "px";

    if (top > 580) {
      gameArea.removeChild(ball);
      balls.splice(i, 1);
      lives--;
      missSound.currentTime = 0;
      missSound.play();
      livesText.innerText = "Lives: " + lives;
      if (lives <= 0) {
        endGame();
        return;
      }
    } else if (top > 560 && isCaught(ball)) {
      gameArea.removeChild(ball);
      balls.splice(i, 1);
      score++;
      scoreText.innerText = "Score: " + score;
      catchSound.currentTime = 0;
      catchSound.play();
      if (score % 5 === 0 && ballSpeed < 15) {
        ballSpeed += 1; // Increase difficulty
      }
    }
  }
}

function isCaught(ball) {
  const ballX = parseInt(ball.style.left);
  return ballX + 20 > playerX && ballX < playerX + 80;
}

function gameLoop() {
  if (!gameActive) return;
  updateBalls();
  animationId = requestAnimationFrame(gameLoop);
}

startBtn.onclick = startGame;
restartBtn.onclick = startGame;

// Initialize high score display
highScoreText.innerText = "High Score: " + highScore;