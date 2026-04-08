/* ============================================================
   AL-HUDA — Script principal
   ============================================================ */

/* ---------- Navbar scroll ---------- */
/* La navbar est injectée par components.js — on attend qu'elle existe */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

/* ---------- Scroll Reveal ---------- */
window.revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      window.revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => window.revealObserver.observe(el));

/* ---------- Tasbih Counter ---------- */
let tasbihCount = 0;
const MAX_REPETITIONS = 100;

function incrementTasbih() {
  if (tasbihCount < MAX_REPETITIONS) {
    tasbihCount++;
    updateTasbihDisplay();
    // Vibration légère sur mobile
    if (navigator.vibrate) navigator.vibrate(30);
  }
  if (tasbihCount === MAX_REPETITIONS) {
    const btn = document.getElementById('tasbih-btn');
    if (btn) {
      btn.style.background = 'var(--green-light)';
      btn.textContent = '✓';
      setTimeout(() => {
        btn.style.background = '';
        btn.textContent = '+';
      }, 2000);
    }
  }
}

function resetTasbih() {
  tasbihCount = 0;
  updateTasbihDisplay();
  const btn = document.getElementById('tasbih-btn');
  if (btn) { btn.style.background = ''; btn.textContent = '+'; }
}

function updateTasbihDisplay() {
  const el = document.getElementById('tasbih-count');
  if (el) el.textContent = tasbihCount;
}

// Exposer au HTML inline onclick
window.incrementTasbih = incrementTasbih;
window.resetTasbih    = resetTasbih;

/* ---------- Horaires de Prières ---------- */
async function loadPrayerTimes() {
  injectCitySearch();
  setCityLabel('📍 Détection en cours…');

  // 1. Géolocalisation du navigateur (la plus précise)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      ()  => fallbackToIP(),   // refus ou erreur → fallback IP
      { timeout: 7000, maximumAge: 600000 }
    );
  } else {
    fallbackToIP();
  }
}

/* Fallback : géolocalisation par adresse IP (pas de permission requise) */
async function fallbackToIP() {
  try {
    // ip-api.com gratuit, pas de clé requise
    const res  = await fetch('https://ip-api.com/json/?fields=lat,lon,city,country');
    const data = await res.json();
    if (data.lat && data.lon) {
      setCityLabel(`📍 ${data.city}, ${data.country}`);
      await fetchTimingsByCoords(data.lat, data.lon);
    } else {
      throw new Error('no data');
    }
  } catch {
    // Dernier recours : Dakar par défaut
    setCityLabel('📍 Dakar, Sénégal (par défaut)');
    await fetchTimingsByCoords(14.6928, -17.4467);
  }
}

function setCityLabel(txt) {
  const el = document.getElementById('city-name');
  if (el) el.textContent = txt;
}

/* Barre de recherche de ville */
function injectCitySearch() {
  const header = document.querySelector('.prayers-widget-header');
  if (!header || document.getElementById('city-search-form')) return;

  const form = document.createElement('form');
  form.id = 'city-search-form';
  form.style.cssText = 'display:flex;gap:0.4rem;margin-top:0.7rem;width:100%;';
  form.innerHTML = `
    <input id="city-search-input" type="text" placeholder="🔍 Chercher une ville (Paris, Dubai, Cairo…)"
      style="flex:1;padding:0.4rem 0.8rem;border:1.5px solid var(--border);border-radius:8px;
             background:var(--card-bg);color:var(--text);font-size:0.83rem;outline:none;" />
    <button type="submit"
      style="padding:0.4rem 0.9rem;background:var(--green);color:#fff;border:none;
             border-radius:8px;cursor:pointer;font-size:0.83rem;font-weight:600;white-space:nowrap;">OK</button>
  `;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const val = (document.getElementById('city-search-input').value || '').trim();
    if (val) fetchByCity(val);
  });
  header.appendChild(form);
}

async function fetchByCoords(lat, lon) {
  try {
    // Reverse geocoding silencieux
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
      .then(r => r.json())
      .then(d => {
        const city    = d.address?.city || d.address?.town || d.address?.village || '';
        const country = d.address?.country || '';
        if (city) setCityLabel(`📍 ${city}, ${country}`);
      })
      .catch(() => {});
    await fetchTimingsByCoords(lat, lon);
  } catch {
    fallbackToIP();
  }
}

async function fetchByCity(query) {
  setCityLabel('⏳ Recherche…');
  try {
    const res  = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
    );
    const data = await res.json();
    if (!data.length) { setCityLabel('⚠️ Ville non trouvée'); return; }
    const { lat, lon, display_name } = data[0];
    setCityLabel('📍 ' + display_name.split(',').slice(0, 2).join(',').trim());
    await fetchTimingsByCoords(parseFloat(lat), parseFloat(lon));
  } catch {
    setCityLabel('⚠️ Erreur réseau');
  }
}

async function fetchTimingsByCoords(lat, lon) {
  const today = new Date();
  const ts    = Math.floor(today.getTime() / 1000); // timestamp Unix

  const url = `https://api.aladhan.com/v1/timings/${ts}?latitude=${lat}&longitude=${lon}&method=2`;
  const res  = await fetch(url);
  const data = await res.json();
  const timings = data.data?.timings;
  if (!timings) return;

  applyTimings(timings);
  highlightCurrentPrayer(timings);
  startCountdown(timings);
}

function applyTimings(timings) {
  const map = {
    'fajr-time': timings.Fajr, 'chourouk-time': timings.Sunrise,
    'dhuhr-time': timings.Dhuhr, 'asr-time': timings.Asr,
    'maghrib-time': timings.Maghrib, 'isha-time': timings.Isha,
  };
  Object.entries(map).forEach(([id, t]) => {
    const el = document.getElementById(id);
    if (el && t) el.textContent = t.substring(0, 5);
  });
}

window.fetchByCity = fetchByCity;

function highlightCurrentPrayer(timings) {
  const prayers = [
    { id: 'fajr-item',     key: 'Fajr' },
    { id: 'chourouk-item', key: 'Sunrise' },
    { id: 'dhuhr-item',    key: 'Dhuhr' },
    { id: 'asr-item',      key: 'Asr' },
    { id: 'maghrib-item',  key: 'Maghrib' },
    { id: 'isha-item',     key: 'Isha' },
  ];
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  let currentIdx = 0;
  prayers.forEach((p, i) => {
    const t = timings[p.key];
    if (!t) return;
    const [h, m] = t.split(':').map(Number);
    if (nowMin >= h * 60 + m) currentIdx = i;
  });

  prayers.forEach((p, i) => {
    const el = document.getElementById(p.id);
    if (el) el.classList.toggle('current', i === currentIdx);
  });
}

function startCountdown(timings) {
  const names = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
  const namesFr = ['Fajr','Chourouk','Dhuhr','Asr','Maghrib','Isha'];

  function tick() {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

    let nextName = 'Fajr';
    let nextFr   = 'Fajr';
    let nextMin  = null;

    for (let i = 0; i < names.length; i++) {
      const t = timings[names[i]];
      if (!t) continue;
      const [h, m] = t.split(':').map(Number);
      const pMin = h * 60 + m;
      if (pMin > nowMin) { nextMin = pMin; nextFr = namesFr[i]; break; }
    }
    // Si aucune prière devant nous aujourd'hui → Fajr de demain
    if (nextMin === null) {
      const t = timings['Fajr'];
      const [h, m] = t.split(':').map(Number);
      nextMin = h * 60 + m + 24 * 60;
      nextFr  = 'Fajr (demain)';
    }

    const diffSec = Math.round((nextMin - nowMin) * 60);
    const hh = Math.floor(diffSec / 3600);
    const mm = Math.floor((diffSec % 3600) / 60);
    const ss = diffSec % 60;

    const countdownEl = document.getElementById('countdown');
    const nextEl = countdownEl?.closest('.next-prayer')?.querySelector('strong');
    if (countdownEl) countdownEl.textContent =
      `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
    if (nextEl) nextEl.textContent = nextFr;

    // Nav bar
    const navEl = document.getElementById('next-prayer-nav');
    if (navEl) navEl.textContent = `${nextFr} • ${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`;
  }

  tick();
  setInterval(tick, 1000);
}

function startDefaultCountdown() {
  // Countdown vers Maghrib par défaut 19:18 Dakar
  const target = { h: 19, m: 18 };
  function tick() {
    const now = new Date();
    let diffSec = (target.h * 3600 + target.m * 60) - (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
    if (diffSec < 0) diffSec += 86400;
    const hh = Math.floor(diffSec / 3600);
    const mm = Math.floor((diffSec % 3600) / 60);
    const ss = diffSec % 60;
    const el = document.getElementById('countdown');
    if (el) el.textContent = `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- Mode Sombre / Clair ---------- */
function initTheme() {
  const saved = localStorage.getItem('al-huda-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  injectThemeBtn(saved);
}

function injectThemeBtn(current) {
  // Injecte le bouton dans .nav-cta s'il n'existe pas déjà
  const navCta = document.querySelector('.nav-cta');
  if (!navCta || document.getElementById('theme-toggle')) return;

  const btn = document.createElement('button');
  btn.id = 'theme-toggle';
  btn.className = 'theme-toggle';
  btn.title = 'Changer le thème';
  btn.textContent = current === 'dark' ? '☀️' : '🌙';
  btn.setAttribute('aria-label', 'Basculer mode sombre/clair');

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next   = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('al-huda-theme', next);
    btn.textContent = next === 'dark' ? '☀️' : '🌙';
  });

  navCta.prepend(btn);
}

/* ---------- Active nav link ---------- */
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === path.split('/').pop() ||
      (path.endsWith('/') && link.getAttribute('href') === 'index.html'));
  });
}

/* ---------- Service Worker (PWA) ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Cherche sw.js depuis la racine du site
    const swPath = (() => {
      const depth = (window.location.pathname.match(/\//g) || []).length - 1;
      return '../'.repeat(depth) + 'sw.js';
    })();
    navigator.serviceWorker.register(swPath)
      .catch(() => { /* silencieux si hors-ligne ou file:// */ });
  });
}

/* ---------- Init ---------- */
/* Le thème et le hamburger sont gérés par components.js */
document.addEventListener('DOMContentLoaded', () => {
  loadPrayerTimes();
});
