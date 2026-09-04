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

let skylineImg = null;
let skylineReady = false;
let skyCache = null;

function loadSkyline() {
  const src = (window.FALK_MEDIA && window.FALK_MEDIA.skyline) || "assets/frankfurt-skyline.png";
  skylineImg = new Image();
  skylineImg.onload = () => {
    skylineReady = true;
    rebuildSkyCache();
  };
  skylineImg.src = src;
}

function rebuildSkyCache() {
  const canvas = document.getElementById("skyline-canvas");
  if (!canvas) return;
  const w = canvas.width = innerWidth;
  const h = canvas.height = innerHeight;
  skyCache = document.createElement("canvas");
  skyCache.width = w;
  skyCache.height = h;
  const ctx = skyCache.getContext("2d");
  ctx.fillStyle = "#0b0b0b";
  ctx.fillRect(0, 0, w, h);
  if (skylineReady && skylineImg) {
    const iw = skylineImg.naturalWidth;
    const ih = skylineImg.naturalHeight;
    const scale = Math.max(w / iw, h / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (w - dw) / 2;
    const dy = h - dh;
    ctx.globalAlpha = 0.4;
    ctx.drawImage(skylineImg, dx, dy, dw, dh);
    ctx.globalAlpha = 1;
    const veil = ctx.createLinearGradient(0, 0, 0, h);
    veil.addColorStop(0, "rgba(11,11,11,.94)");
    veil.addColorStop(0.35, "rgba(11,11,11,.88)");
    veil.addColorStop(0.7, "rgba(11,11,11,.82)");
    veil.addColorStop(1, "rgba(11,11,11,.9)");
    ctx.fillStyle = veil;
    ctx.fillRect(0, 0, w, h);
  }
}

function animate() {
  const canvas = document.getElementById("skyline-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!skyCache || skyCache.width !== canvas.width) rebuildSkyCache();
  if (skyCache) ctx.drawImage(skyCache, 0, 0);
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
    hole.style.transform = `translate(-50%,-50%) scale(${0.86 + Math.min(p, 0.75) * 0.28})`;
    outbound.forEach((el, i) => {
      const q = Math.max(0, (p - 0.58) / 0.42);
      const fall = q * q;
      const n = outbound.length;
      const spread = (i - (n - 1) / 2) * Math.min(innerWidth * 0.22, 180);
      el.style.opacity = String(Math.min(1, q * 2.2));
      el.style.transform = `translate(-50%,-50%) translate(${spread * Math.min(1, q * 1.6)}px, ${28 + fall * 210}px)`;
    });
  };
  addEventListener("scroll", tick, { passive: true }); tick();
}

document.addEventListener("DOMContentLoaded", () => {
  applyMedia();
  loadSkyline();
  addEventListener("resize", rebuildSkyCache);
  requestAnimationFrame(animate);
  nav(); formLogic(); fintScene();
});
