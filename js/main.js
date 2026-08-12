// Frankfurt Skyline Animation
const canvas = document.getElementById("skyline-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawSkyline() {
  ctx.fillStyle = "#0a1628";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw buildings (Frankfurt skyline)
  const buildings = [
    { x: 100, w: 80, h: 200 },
    { x: 250, w: 120, h: 300 },
    { x: 450, w: 100, h: 250 },
    { x: 650, w: 150, h: 350 },
    { x: 850, w: 90, h: 280 },
  ];

  buildings.forEach((b) => {
    ctx.fillStyle = "#0f2847";
    ctx.fillRect(b.x, canvas.height - b.h, b.w, b.h);

    // Windows
    for (let y = canvas.height - b.h + 20; y < canvas.height - 20; y += 30) {
      for (let x = b.x + 10; x < b.x + b.w - 10; x += 25) {
        if (Math.random() > 0.3) {
          ctx.fillStyle = "#4a90e2";
          ctx.fillRect(x, y, 8, 12);
        }
      }
    }
  });

  // Draw colorful ray (rotating)
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const time = Date.now() * 0.0005;
  const angle = time;

  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    canvas.width,
  );
  gradient.addColorStop(0, "transparent");
  gradient.addColorStop(
    0.5,
    `hsla(${(angle * 180) / Math.PI}, 100%, 50%, 0.3)`,
  );
  gradient.addColorStop(1, "transparent");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Stars
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.3;
    const size = Math.random() * 2;
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.8 + 0.2})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

window.addEventListener("resize", () => {
  resizeCanvas();
  drawSkyline();
});

resizeCanvas();
function animate() {
  drawSkyline();
  requestAnimationFrame(animate);
}
animate();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
