function applyMedia() {
  const m = window.FALK_MEDIA || {};
  if (m.hero) document.documentElement.style.setProperty("--hero-image", `url("${m.hero}")`);
  document.querySelectorAll("[data-media]").forEach((el) => {
    const key = el.getAttribute("data-media");
    if (!m[key]) return;
    el.src = m[key];
    el.classList.add("loaded");
    const fb = el.parentElement && el.parentElement.querySelector(".portrait-fallback, .hero-scene-fallback");
    if (fb) fb.style.display = "none";
  });
}

function drawSkyline() {
  const canvas = document.getElementById("skyline-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width = innerWidth;
  const h = canvas.height = innerHeight;
  const bank = h * 0.58;
  const water = h * 0.70;

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#030814");
  sky.addColorStop(0.3, "#08122a");
  sky.addColorStop(0.6, "#0c1830");
  sky.addColorStop(1, "#081220");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "rgba(255,255,255,.25)";
  for (let i = 0; i < 50; i++) {
    ctx.fillRect((i * 137.5 + 23) % w, (i * 89.3 + 7) % (h * 0.3), 1, 1);
  }

  const towers = [
    { x: 0.02, w: 0.028, h: 0.12, cap: "block" },
    { x: 0.06, w: 0.032, h: 0.18, cap: "block" },
    { x: 0.10, w: 0.026, h: 0.14, cap: "block" },
    { x: 0.14, w: 0.048, h: 0.33, cap: "wedge", label: "Messeturm" },
    { x: 0.20, w: 0.030, h: 0.16, cap: "block" },
    { x: 0.24, w: 0.036, h: 0.22, cap: "block" },
    { x: 0.29, w: 0.030, h: 0.18, cap: "block" },
    { x: 0.33, w: 0.028, h: 0.15, cap: "block" },
    { x: 0.37, w: 0.046, h: 0.44, cap: "antenna", label: "MainTower" },
    { x: 0.43, w: 0.044, h: 0.42, cap: "pyramid", label: "Commerzbank" },
    { x: 0.49, w: 0.030, h: 0.26, cap: "block" },
    { x: 0.53, w: 0.042, h: 0.34, cap: "twin" },
    { x: 0.58, w: 0.042, h: 0.34, cap: "twin" },
    { x: 0.64, w: 0.026, h: 0.20, cap: "block" },
    { x: 0.68, w: 0.032, h: 0.17, cap: "spire", label: "Dom" },
    { x: 0.73, w: 0.028, h: 0.14, cap: "block" },
    { x: 0.77, w: 0.060, h: 0.26, cap: "ecb", label: "EZB" },
    { x: 0.84, w: 0.030, h: 0.18, cap: "block" },
    { x: 0.88, w: 0.036, h: 0.14, cap: "block" },
    { x: 0.93, w: 0.028, h: 0.12, cap: "block" },
    { x: 0.97, w: 0.026, h: 0.10, cap: "block" }
  ];

  towers.forEach((t, i) => {
    const x = t.x * w, bw = t.w * w, bh = t.h * h, y = bank - bh;
    const g = ctx.createLinearGradient(x, y, x + bw, y + bh);
    g.addColorStop(0, i % 2 ? "#162040" : "#1e2e54");
    g.addColorStop(1, i % 2 ? "#0e1628" : "#141e38");
    ctx.fillStyle = g;
    ctx.fillRect(x, y, bw, bh);

    if (t.cap === "wedge" || t.cap === "pyramid") {
      ctx.fillStyle = "#1e3058";
      const tip = bh * (t.cap === "pyramid" ? 0.22 : 0.15);
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + bw / 2, y - tip); ctx.lineTo(x + bw, y); ctx.fill();
    }
    if (t.cap === "antenna") {
      ctx.fillStyle = "#1e3058";
      ctx.fillRect(x + bw * 0.46, y - 28, 2.5, 28);
      const blink = 0.4 + Math.sin(Date.now() / 700) * 0.6;
      ctx.fillStyle = `rgba(196,30,58,${blink})`;
      ctx.beginPath(); ctx.arc(x + bw * 0.47, y - 30, 2.5, 0, Math.PI * 2); ctx.fill();
    }
    if (t.cap === "twin") {
      ctx.fillStyle = "#1e3058";
      ctx.fillRect(x + bw * 0.1, y - 14, bw * 0.8, 14);
    }
    if (t.cap === "spire") {
      ctx.fillStyle = "#5a3018";
      ctx.beginPath(); ctx.moveTo(x + bw * 0.3, y); ctx.lineTo(x + bw * 0.5, y - bh * 0.4); ctx.lineTo(x + bw * 0.7, y); ctx.fill();
      ctx.fillStyle = "#d4af37";
      ctx.beginPath(); ctx.arc(x + bw * 0.5, y - bh * 0.43, 1.5, 0, Math.PI * 2); ctx.fill();
    }
    if (t.cap === "ecb") {
      ctx.fillStyle = "#1e3058";
      ctx.beginPath(); ctx.moveTo(x, y + bh * 0.1); ctx.lineTo(x + bw * 0.5, y - bh * 0.05); ctx.lineTo(x + bw, y + bh * 0.1); ctx.lineTo(x + bw, y + bh); ctx.lineTo(x, y + bh); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#d4af37";
      ctx.fillRect(x + bw * 0.46, y - bh * 0.08, bw * 0.08, bh * 0.06);
    }
    if (t.label === "Commerzbank") {
      ctx.strokeStyle = "rgba(212,175,55,.18)"; ctx.lineWidth = 1;
      ctx.strokeRect(x + 1, y + 1, bw - 2, bh - 2);
    }

    const ww = Math.max(1.5, bw * 0.08);
    for (let yy = y + 6; yy < bank - 6; yy += 9) {
      for (let xx = x + 3; xx < x + bw - 3; xx += ww + 3) {
        if ((xx + yy + i) % 6 !== 0) {
          ctx.fillStyle = ((xx + yy) % 9 === 0) ? "rgba(212,175,55,.3)" : "rgba(200,215,255,.12)";
          ctx.fillRect(xx, yy, ww, 3);
        }
      }
    }
  });

  ctx.fillStyle = "#0a1424";
  ctx.fillRect(0, bank, w, water - bank);
  ctx.fillStyle = "#152240";
  ctx.fillRect(0, bank, w, 3);

  ctx.strokeStyle = "rgba(212,175,55,.12)"; ctx.lineWidth = 1.5;
  for (let b = 0; b < 4; b++) {
    const bx = w * (0.18 + b * 0.2);
    ctx.beginPath();
    ctx.moveTo(bx - w * 0.05, water - 3);
    ctx.quadraticCurveTo(bx, water - 18, bx + w * 0.05, water - 3);
    ctx.stroke();
  }

  const river = ctx.createLinearGradient(0, water, 0, h);
  river.addColorStop(0, "#0e1e38"); river.addColorStop(0.3, "#152848"); river.addColorStop(1, "#081428");
  ctx.fillStyle = river;
  ctx.fillRect(0, water, w, h - water);

  ctx.globalAlpha = 0.12;
  towers.forEach((t, i) => {
    ctx.fillStyle = i % 3 === 0 ? "#d4af37" : "#4a6a9a";
    ctx.fillRect(t.x * w, water + 4, t.w * w, t.h * h * 0.22);
  });
  ctx.globalAlpha = 1;
}

let falconT = 0;
function drawFalcon(ctx, w, h) {
  falconT += 0.003;
  const x = ((falconT * 140) % (w + 200)) - 100;
  const y = h * 0.16 + Math.sin(falconT * 2.5) * 25;
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(falconT * 4.5) * 0.1);
  ctx.fillStyle = "#d4af37";
  ctx.beginPath(); ctx.moveTo(16, 0);
  ctx.quadraticCurveTo(-3, -16 - Math.sin(falconT * 8) * 6, -20, 2);
  ctx.quadraticCurveTo(-3, 14 + Math.sin(falconT * 8) * 6, 16, 0);
  ctx.fill();
  ctx.fillStyle = "#f0d78c";
  ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(26, -2.5); ctx.lineTo(18, 2.5); ctx.fill();
  ctx.fillStyle = "#1a1408";
  ctx.beginPath(); ctx.arc(14, -1.5, 1.2, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function animate() {
  drawSkyline();
  const canvas = document.getElementById("skyline-canvas");
  if (!canvas) return;
  drawFalcon(canvas.getContext("2d"), canvas.width, canvas.height);
  requestAnimationFrame(animate);
}

function nav() {
  const btn = document.querySelector(".nav-toggle");
  const bar = document.querySelector(".nav-bar");
  if (btn && bar) btn.addEventListener("click", () => bar.classList.toggle("open"));
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
  const desk = params.get("desk"), kind = params.get("kind");
  if (desk === "fint") setChoice("type", "financial");
  if (desk === "pint") setChoice("type", "public");
  if (kind === "bank" || kind === "ifpf" || kind === "fintech") { setChoice("type", "financial"); setChoice("fin_kind", kind); }
  if (kind === "admin" || kind === "politician") { setChoice("type", "public"); setChoice("pub_kind", kind); }
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form), lines = [];
    data.forEach((v, k) => { if (v) lines.push(k + ": " + v); });
    location.href = "mailto:consulting@falk-gebhardt.de?subject=" + encodeURIComponent("FalkTG inquiry") + "&body=" + encodeURIComponent(lines.join("\n"));
  });
}

function fintScene() {
  const track = document.querySelector(".fint-track"), hole = document.querySelector(".hole");
  if (!track || !hole) return;
  const inbound = [...document.querySelectorAll(".chip.in")];
  const outbound = [...document.querySelectorAll(".chip.out")];
  const place = (el, ang, dist, extra = "") => { el.style.transform = `translate(-50%,-50%) translate(${Math.cos(ang) * dist}px,${Math.sin(ang) * dist}px) ${extra}`; };
  const tick = () => {
    const r = track.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    const swirl = p * 6.2;
    inbound.forEach((el, i) => {
      const a = (i / inbound.length) * Math.PI * 2 + swirl;
      const dist = p < 0.52 ? (260 - p * 480) : 0;
      el.style.opacity = String(p < 0.58 ? 1 : Math.max(0, 1 - (p - 0.58) * 10));
      place(el, a, Math.max(0, dist), `rotate(${swirl * 24}deg)`);
    });
    hole.style.transform = `translate(-50%,-50%) scale(${0.78 + Math.min(p, 0.75) * 0.45 + Math.sin(p * 18) * 0.03})`;
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
  applyMedia();
  addEventListener("resize", drawSkyline);
  requestAnimationFrame(animate);
  nav(); formLogic(); fintScene();
});
