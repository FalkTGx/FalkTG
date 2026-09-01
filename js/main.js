function applyMedia() {
  const m = window.FALK_MEDIA || {};
  if (m.hero) document.documentElement.style.setProperty("--hero-image", `url("${m.hero}")`);
  document.querySelectorAll("[data-media]").forEach((el) => {
    const key = el.getAttribute("data-media");
    if (m[key]) el.src = m[key];
  });
}
function drawSkyline() {
  const canvas = document.getElementById("skyline-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width = innerWidth;
  const h = canvas.height = innerHeight;
  const bank = h * 0.62;
  const water = h * 0.72;
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#07101f"); sky.addColorStop(0.55, "#101c36"); sky.addColorStop(1, "#0a1422");
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
  const towers = [
    { x: 0.05, w: 0.05, h: 0.22, cap: "block" }, { x: 0.12, w: 0.055, h: 0.34, cap: "wedge" },
    { x: 0.19, w: 0.045, h: 0.26, cap: "block" }, { x: 0.26, w: 0.06, h: 0.40, cap: "pyramid" },
    { x: 0.34, w: 0.05, h: 0.28, cap: "block" }, { x: 0.41, w: 0.07, h: 0.46, cap: "antenna" },
    { x: 0.50, w: 0.05, h: 0.30, cap: "block" }, { x: 0.57, w: 0.09, h: 0.38, cap: "ecb" },
    { x: 0.68, w: 0.045, h: 0.24, cap: "block" }, { x: 0.74, w: 0.05, h: 0.32, cap: "twin" },
    { x: 0.80, w: 0.05, h: 0.30, cap: "twin" }, { x: 0.88, w: 0.07, h: 0.22, cap: "block" }
  ];
  towers.forEach((t, i) => {
    const x = t.x * w, bw = t.w * w, bh = t.h * h, y = bank - bh;
    ctx.fillStyle = i % 2 ? "#1c2b4d" : "#24365c";
    ctx.fillRect(x, y, bw, bh);
    ctx.fillStyle = "#2c416c";
    if (t.cap === "wedge" || t.cap === "pyramid") {
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + bw / 2, y - bh * 0.16); ctx.lineTo(x + bw, y); ctx.fill();
    }
    if (t.cap === "antenna") { ctx.fillRect(x + bw * 0.46, y - 26, 3, 26); ctx.fillStyle = "#d4af37"; ctx.fillRect(x + bw * 0.46, y - 28, 3, 4); }
    const ww = Math.max(2, bw * 0.09);
    for (let yy = y + 8; yy < bank - 8; yy += 10) {
      for (let xx = x + 5; xx < x + bw - 5; xx += ww + 4) {
        if ((xx + yy + i) % 7 !== 0) {
          ctx.fillStyle = ((xx + yy) % 11 === 0) ? "rgba(212,175,55,.45)" : "rgba(210,220,255,.22)";
          ctx.fillRect(xx, yy, ww, 4);
        }
      }
    }
  });
  const river = ctx.createLinearGradient(0, water - 20, 0, h);
  river.addColorStop(0, "#13233d"); river.addColorStop(0.35, "#1a3358"); river.addColorStop(1, "#0b1528");
  ctx.fillStyle = river; ctx.fillRect(0, water - 16, w, h - water + 16);
  ctx.fillStyle = "#0e1a30"; ctx.fillRect(0, water - 22, w, 8);
  ctx.globalAlpha = 0.25;
  towers.forEach((t, i) => { ctx.fillStyle = i % 2 ? "#6a82b8" : "#d4af37"; ctx.fillRect(t.x * w, water + 8, t.w * w, t.h * h * 0.35); });
  ctx.globalAlpha = 1;
  ctx.strokeStyle = "rgba(212,175,55,.28)"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(w * 0.08, water - 6); ctx.lineTo(w * 0.28, water - 18); ctx.lineTo(w * 0.48, water - 6); ctx.stroke();
}
let falconT = 0;
function flyFalcon() {
  const canvas = document.getElementById("skyline-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  falconT += 0.0045;
  const w = canvas.width, h = canvas.height;
  const x = ((falconT * 180) % (w + 160)) - 80;
  const y = h * 0.28 + Math.sin(falconT * 3.2) * 36;
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(falconT * 6) * 0.15);
  ctx.fillStyle = "#d4af37";
  ctx.beginPath(); ctx.moveTo(16, 0); ctx.quadraticCurveTo(-4, -16 - Math.sin(falconT * 10) * 6, -22, 2); ctx.quadraticCurveTo(-4, 14 + Math.sin(falconT * 10) * 6, 16, 0); ctx.fill();
  ctx.fillStyle = "#f0d78c"; ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(26, -3); ctx.lineTo(18, 3); ctx.fill();
  ctx.restore(); requestAnimationFrame(flyFalcon);
}
function wind() {
  const layer = document.querySelector(".wind-layer");
  if (!layer) return;
  for (let i = 0; i < 9; i++) {
    const s = document.createElement("div");
    s.className = "wind-streak";
    s.style.cssText = `position:absolute;height:1px;top:${10 + Math.random() * 75}%;width:${16 + Math.random() * 30}vw;opacity:.4;background:linear-gradient(90deg,transparent,rgba(212,175,55,.5),rgba(196,30,58,.35),transparent);animation:drift ${7 + Math.random() * 6}s linear infinite;animation-delay:${Math.random() * 6}s;`;
    layer.appendChild(s);
  }
  if (!document.getElementById("wind-kf")) {
    const st = document.createElement("style"); st.id = "wind-kf";
    st.textContent = "@keyframes drift{from{transform:translateX(-25vw)}to{transform:translateX(110vw)}}";
    document.head.appendChild(st);
  }
}
function nav() {
  const t = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (t && links) t.addEventListener("click", () => links.classList.toggle("open"));
}
function setChoice(name, value) {
  const hidden = document.querySelector(`[name="${name}"]`);
  if (hidden) hidden.value = value;
  document.querySelectorAll(`[data-choice="${name}"]`).forEach((el) => {
    el.classList.toggle("selected", el.getAttribute("data-value") === value);
  });
  const fin = document.getElementById("fin-row");
  const pub = document.getElementById("pub-row");
  if (fin && pub && name === "type") {
    fin.classList.toggle("hidden", value !== "financial");
    pub.classList.toggle("hidden", value !== "public");
  }
}
function formLogic() {
  document.querySelectorAll("[data-choice]").forEach((el) => {
    el.addEventListener("click", () => setChoice(el.getAttribute("data-choice"), el.getAttribute("data-value")));
  });
  const params = new URLSearchParams(location.search);
  const desk = params.get("desk"); const kind = params.get("kind");
  if (desk === "fint") setChoice("type", "financial");
  if (desk === "pint") setChoice("type", "public");
  if (kind === "bank" || kind === "ifpf" || kind === "fintech") { setChoice("type", "financial"); setChoice("fin_kind", kind); }
  if (kind === "admin" || kind === "politician") { setChoice("type", "public"); setChoice("pub_kind", kind); }
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form); const lines = [];
    data.forEach((v, k) => { if (v) lines.push(k + ": " + v); });
    location.href = "mailto:consulting@falk-gebhardt.de?subject=" + encodeURIComponent("FalkTG inquiry") + "&body=" + encodeURIComponent(lines.join("\n"));
  });
}
function fintScene() {
  const track = document.querySelector(".fint-track"); const hole = document.querySelector(".hole");
  if (!track || !hole) return;
  const inbound = [...document.querySelectorAll(".chip.in")];
  const outbound = [...document.querySelectorAll(".chip.out")];
  const place = (el, ang, dist, extra = "") => { el.style.transform = `translate(-50%, -50%) translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px) ${extra}`; };
  const tick = () => {
    const r = track.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (0 - r.top) / (r.height - innerHeight)));
    const swirl = p * 6.2;
    inbound.forEach((el, i) => {
      const a = (i / inbound.length) * Math.PI * 2 + swirl;
      const dist = p < 0.52 ? (260 - p * 480) : 0;
      el.style.opacity = String(p < 0.58 ? 1 : Math.max(0, 1 - (p - 0.58) * 10));
      place(el, a, Math.max(0, dist), `rotate(${swirl * 24}deg)`);
    });
    hole.style.transform = `translate(-50%, -50%) scale(${0.78 + Math.min(p, 0.75) * 0.45 + Math.sin(p * 18) * 0.03})`;
    outbound.forEach((el, i) => {
      const q = Math.max(0, (p - 0.6) / 0.4);
      const burst = 1 - Math.pow(1 - q, 2);
      el.style.opacity = String(burst);
      place(el, (i / outbound.length) * Math.PI * 2 - 0.35, 40 + burst * 230, `scale(${0.7 + burst * 0.4})`);
    });
  };
  addEventListener("scroll", tick, { passive: true }); tick();
}
document.addEventListener("DOMContentLoaded", () => {
  applyMedia(); drawSkyline(); addEventListener("resize", drawSkyline);
  requestAnimationFrame(flyFalcon); wind(); nav(); formLogic(); fintScene();
});
