const dotCanvas = document.getElementById("dot-grid");
const dctx = dotCanvas.getContext("2d");

function resizeDotCanvas() {
  dotCanvas.width = window.innerWidth;
  dotCanvas.height = window.innerHeight * 0.5;
}
resizeDotCanvas();
window.addEventListener("resize", resizeDotCanvas);

const spacing = 24;
const baseRadius = 1;
let dots = [];

function buildDots() {
  dots = [];
  const cols = Math.ceil(dotCanvas.width / spacing) + 1;
  const rows = Math.ceil(dotCanvas.height / spacing) + 1;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if ((row + col) % 2 !== 0) continue;

      dots.push({
        x: col * spacing,
        y: row * spacing,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5
      });
    }
  }
}
buildDots();
window.addEventListener("resize", buildDots);

let t = 0;

function animateDots() {
  dctx.clearRect(0, 0, dotCanvas.width, dotCanvas.height);

  t += 0.02;

  for (const dot of dots) {
    const waveY = Math.sin(dot.x * 0.05 + t * dot.speed + dot.phase) * 1.5;
    const drawY = dot.y + waveY;

    const verticalFade = dot.y / dotCanvas.height;

    const pulse = Math.sin(t * dot.speed + dot.phase) * 0.5 + 0.5;
    const radius = baseRadius + pulse * 0.6;
    const opacity = 0.5 * verticalFade;

    dctx.beginPath();
    dctx.arc(dot.x, drawY, radius, 0, Math.PI * 2);
    dctx.fillStyle = `rgba(255,255,255,${opacity})`;
    dctx.fill();
  }

  requestAnimationFrame(animateDots);
}

animateDots();

const glow = document.getElementById("mouse-glow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;

  glow.style.setProperty("--x", `${glowX}px`);
  glow.style.setProperty("--y", `${glowY}px`);

  requestAnimationFrame(animateGlow);
}

animateGlow();

function copyDiscord(button) {
  const username = "pogperson23";
  navigator.clipboard.writeText(username).then(() => {
    const label = button.querySelector(".copy-label");
    const originalText = label.textContent;

    button.classList.add("copied");
    label.textContent = "✓ Copied!";

    setTimeout(() => {
      button.classList.remove("copied");
      label.textContent = originalText;
    }, 1500);
  });
}