const buildings = [
  { x: 0.04, w: 0.05, h: 0.28, type: "block" },
  { x: 0.10, w: 0.045, h: 0.42, type: "block" },
  { x: 0.16, w: 0.07, h: 0.62, type: "commerzbank" },
  { x: 0.25, w: 0.05, h: 0.36, type: "block" },
  { x: 0.32, w: 0.055, h: 0.58, type: "messeturm" },
  { x: 0.40, w: 0.06, h: 0.48, type: "block" },
  { x: 0.48, w: 0.07, h: 0.70, type: "maintower" },
  { x: 0.57, w: 0.08, h: 0.52, type: "ecb" },
  { x: 0.67, w: 0.04, h: 0.40, type: "block" },
  { x: 0.73, w: 0.05, h: 0.46, type: "twin" },
  { x: 0.79, w: 0.05, h: 0.44, type: "twin" },
  { x: 0.87, w: 0.07, h: 0.34, type: "block" }
];
function drawSkyline() {
  const canvas = document.getElementById("skyline-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width = innerWidth;
  const h = canvas.height = innerHeight;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#05060a"); g.addColorStop(0.55, "#0a1224"); g.addColorStop(1, "#140814");
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  buildings.forEach((b, i) => {
    const x = b.x * w, bw = b.w * w, bh = b.h * h * 0.55, y = h - bh;
    ctx.fillStyle = i % 2 ? "#10182c" : "#162038";
    ctx.fillRect(x, y, bw, bh);
    if (b.type === "commerzbank") { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + bw / 2, y - bh * 0.18); ctx.lineTo(x + bw, y); ctx.fill(); }
    if (b.type === "messeturm") { ctx.beginPath(); ctx.moveTo(x + bw * 0.15, y); ctx.lineTo(x + bw / 2, y - bh * 0.16); ctx.lineTo(x + bw * 0.85, y); ctx.fill(); }
    if (b.type === "maintower") ctx.fillRect(x + bw * 0.45, y - 28, 3, 28);
    const ww = Math.max(2, bw * 0.08);
    for (let yy = y + 10; yy < h - 16; yy += 11) {
      for (let xx = x + 6; xx < x + bw - 6; xx += ww + 5) {
        if (Math.random() > 0.35) {
          ctx.fillStyle = Math.random() > 0.8 ? "rgba(212,175,55,.35)" : "rgba(180,200,255,.16)";
          ctx.fillRect(xx, yy, ww, 5);
        }
      }
    }
  });
}
function wind() {
  const layer = document.querySelector(".wind-layer");
  if (!layer) return;
  for (let i = 0; i < 10; i++) {
    const s = document.createElement("div");
    s.className = "wind-streak";
    s.style.top = 8 + Math.random() * 80 + "%";
    s.style.width = 18 + Math.random() * 28 + "vw";
    s.style.setProperty("--r", (Math.random() * 16 - 10) + "deg");
    s.style.animationDelay = (Math.random() * 8) + "s";
    layer.appendChild(s);
  }
}
function nav() {
  const t = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (t && links) t.addEventListener("click", () => links.classList.toggle("open"));
}
function formLogic() {
  const type = document.getElementById("inquiry-type");
  const fin = document.getElementById("fin-sub");
  const pub = document.getElementById("pub-sub");
  if (!type) return;
  const sync = () => {
    fin.classList.toggle("hidden", type.value !== "financial");
    pub.classList.toggle("hidden", type.value !== "public");
  };
  type.addEventListener("change", sync); sync();
  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const lines = []; data.forEach((v, k) => lines.push(k + ": " + v));
    location.href = "mailto:consulting@falk-gebhardt.de?subject=" + encodeURIComponent("FalkTG inquiry") + "&body=" + encodeURIComponent(lines.join("\n"));
  });
}
function fintScene() {
  const track = document.querySelector(".fint-track");
  const hole = document.querySelector(".hole");
  if (!track || !hole) return;
  const inbound = [...document.querySelectorAll(".chip.in")];
  const outbound = [...document.querySelectorAll(".chip.out")];
  const place = (el, ang, dist) => { el.style.transform = `translate(-50%, -50%) translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px)`; };
  const tick = () => {
    const r = track.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (0 - r.top) / (r.height - innerHeight)));
    inbound.forEach((el, i) => {
      const a = (i / inbound.length) * Math.PI * 2 + p * 1.2;
      const dist = p < 0.55 ? 210 * (1 - p / 0.55) : 0;
      el.style.opacity = p < 0.62 ? "1" : "0"; place(el, a, dist);
    });
    hole.style.transform = `translate(-50%, -50%) scale(${0.72 + Math.min(p, 0.7) * 0.35})`;
    outbound.forEach((el, i) => {
      const q = Math.max(0, (p - 0.62) / 0.38);
      el.style.opacity = q; place(el, (i / outbound.length) * Math.PI * 2 - 0.4, 70 + q * 200);
    });
  };
  addEventListener("scroll", tick, { passive: true }); tick();
}
document.addEventListener("DOMContentLoaded", () => {
  drawSkyline(); addEventListener("resize", drawSkyline); wind(); nav(); formLogic(); fintScene();
});
