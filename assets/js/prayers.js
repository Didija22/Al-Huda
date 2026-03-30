/* ============================================================
   AL-HUDA — Page Prières
   ============================================================ */

/* Noms des prières */
const PRAYER_KEYS   = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
const PRAYER_FR     = ['Fajr','Chourouk','Dhuhr','Asr','Maghrib','Isha'];
const PRAYER_AR     = ['الفجر','الشروق','الظهر','العصر','المغرب','العشاء'];
const PRAYER_ICONS  = ['🌙','🌅','☀️','🌤️','🌇','🌃'];
const PRAYER_IDS    = ['fajr','sunrise','dhuhr','asr','maghrib','isha'];
const PRAYER_ROW_IDS= ['row-fajr','row-sunrise','row-dhuhr','row-asr','row-maghrib','row-isha'];

/* Méthodes de calcul Aladhan */
const CALC_METHODS = {
  2:  'ISNA (Amérique du Nord)',
  3:  'MWL (Muslim World League)',
  4:  'Makkah (Oumm al-Qura)',
  5:  'Egypte (EGAS)',
  11: 'France (15°/18°)',
  12: 'Turquie (Diyanet)',
  99: 'Personnalisé'
};

let currentTimings = null;
let currentLat = null;
let currentLon = null;
let currentMethod = 2;
let countdownInterval = null;

/* ============================================================
   INITIALISATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  startClock();
  setTodayDate();
  setupMethodSelect();
  setupCitySearch();
  setupDetectBtn();
  loadLocation();
  setupQiblaBtn();
});

/* ---------- Horloge temps réel ---------- */
function startClock() {
  function tick() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    const ss = String(now.getSeconds()).padStart(2,'0');
    const el = document.getElementById('hero-clock');
    if (el) el.textContent = `${hh}:${mm}:${ss}`;
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- Date du jour ---------- */
function setTodayDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('fr-FR', options);

  const elHero = document.getElementById('hero-date');
  if (elHero) elHero.textContent = dateStr;

  const elCard = document.getElementById('today-date');
  if (elCard) elCard.textContent = dateStr;
}

/* ---------- Sélecteur de méthode ---------- */
function setupMethodSelect() {
  const sel = document.getElementById('method-select');
  if (!sel) return;

  Object.entries(CALC_METHODS).forEach(([val, name]) => {
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = name;
    sel.appendChild(opt);
  });
  sel.value = currentMethod;

  sel.addEventListener('change', () => {
    currentMethod = parseInt(sel.value);
    if (currentLat !== null && currentLon !== null) {
      fetchAndRender(currentLat, currentLon);
    }
  });
}

/* ---------- Bouton détecter position ---------- */
function setupDetectBtn() {
  const btn = document.getElementById('btn-detect');
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.textContent = '⏳ Détection…';
    btn.disabled = true;
    loadLocation(true, () => {
      btn.textContent = '📍 Détecter';
      btn.disabled = false;
    });
  });
}

/* ============================================================
   GÉOLOCALISATION (3 niveaux)
   ============================================================ */
function loadLocation(force = false, cb = null) {
  setHeroCity('📍 Détection en cours…');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        reverseGeocode(pos.coords.latitude, pos.coords.longitude);
        fetchAndRender(pos.coords.latitude, pos.coords.longitude);
        if (cb) cb();
      },
      () => {
        fallbackIP(cb);
      },
      { timeout: 8000, maximumAge: 600000 }
    );
  } else {
    fallbackIP(cb);
  }
}

async function fallbackIP(cb = null) {
  try {
    const res  = await fetch('https://ip-api.com/json/?fields=lat,lon,city,country');
    const data = await res.json();
    if (data.lat && data.lon) {
      setHeroCity(`📍 ${data.city}, ${data.country}`);
      await fetchAndRender(data.lat, data.lon);
    } else {
      throw new Error('no data');
    }
  } catch {
    setHeroCity('📍 Dakar, Sénégal (par défaut)');
    await fetchAndRender(14.6928, -17.4467);
  }
  if (cb) cb();
}

async function reverseGeocode(lat, lon) {
  try {
    const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await res.json();
    const city    = data.address?.city || data.address?.town || data.address?.village || '';
    const country = data.address?.country || '';
    if (city) setHeroCity(`📍 ${city}, ${country}`);
  } catch { /* silencieux */ }
}

/* ============================================================
   RECHERCHE DE VILLE
   ============================================================ */
function setupCitySearch() {
  const form  = document.getElementById('city-search-form-page');
  const input = document.getElementById('city-input');
  if (!form || !input) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    await searchCity(query);
  });
}

async function searchCity(query) {
  setHeroCity('⏳ Recherche…');
  try {
    const res  = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
    );
    const data = await res.json();
    if (!data.length) { setHeroCity('⚠️ Ville introuvable'); showToast('Ville non trouvée'); return; }
    const { lat, lon, display_name } = data[0];
    const label = display_name.split(',').slice(0, 2).join(',').trim();
    setHeroCity('📍 ' + label);
    await fetchAndRender(parseFloat(lat), parseFloat(lon));
  } catch {
    setHeroCity('⚠️ Erreur réseau');
    showToast('Erreur réseau — vérifiez votre connexion');
  }
}

/* ============================================================
   APPEL API ALADHAN
   ============================================================ */
async function fetchAndRender(lat, lon) {
  currentLat = lat;
  currentLon = lon;

  showLoadingState();

  try {
    const ts  = Math.floor(Date.now() / 1000);
    const url = `https://api.aladhan.com/v1/timings/${ts}?latitude=${lat}&longitude=${lon}&method=${currentMethod}`;
    const res  = await fetch(url);
    const data = await res.json();

    if (data.code !== 200 || !data.data?.timings) throw new Error('invalid response');

    currentTimings = data.data.timings;
    const hijri = data.data?.date?.hijri;

    renderPrayers(currentTimings);
    updateHijriDate(hijri);
    startCountdown(currentTimings);
    updateNextPrayerCard(currentTimings);

    // Charge aussi la semaine
    fetchWeek(lat, lon);
  } catch {
    showErrorState();
  }
}

/* ============================================================
   AFFICHAGE PRIÈRES DU JOUR
   ============================================================ */
function renderPrayers(timings) {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  // Trouver la prière courante (dernière passée)
  let currentIdx = 0;
  PRAYER_KEYS.forEach((key, i) => {
    const t = timings[key];
    if (!t) return;
    const [h, m] = t.split(':').map(Number);
    if (nowMin >= h * 60 + m) currentIdx = i;
  });

  PRAYER_KEYS.forEach((key, i) => {
    const t = timings[key];
    if (!t) return;

    const row = document.getElementById(PRAYER_ROW_IDS[i]);
    if (!row) return;

    // Heure
    const timeEl = row.querySelector('.prayer-time-val');
    if (timeEl) timeEl.textContent = t.substring(0, 5);

    // État
    row.classList.remove('current', 'passed');
    const badge = row.querySelector('.current-badge');
    if (badge) badge.remove();

    const [h, m] = t.split(':').map(Number);
    const pMin = h * 60 + m;

    if (i === currentIdx) {
      row.classList.add('current');
      const b = document.createElement('span');
      b.className = 'current-badge';
      b.textContent = 'EN COURS';
      row.appendChild(b);
    } else if (pMin < nowMin) {
      row.classList.add('passed');
    }
  });

  hideLoadingState();
}

/* ---------- Prochaine prière ---------- */
function updateNextPrayerCard(timings) {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  let nextIdx = null;
  let nextMin = null;

  for (let i = 0; i < PRAYER_KEYS.length; i++) {
    const t = timings[PRAYER_KEYS[i]];
    if (!t) continue;
    const [h, m] = t.split(':').map(Number);
    const pMin = h * 60 + m;
    if (pMin > nowMin) { nextIdx = i; nextMin = pMin; break; }
  }

  // Si toutes les prières sont passées → Fajr de demain
  if (nextIdx === null) {
    nextIdx = 0;
    const t = timings['Fajr'];
    const [h, m] = t.split(':').map(Number);
    nextMin = h * 60 + m + 24 * 60;
  }

  const nameEl = document.getElementById('next-prayer-name');
  const nameArEl = document.getElementById('next-prayer-name-ar');
  if (nameEl)   nameEl.textContent = PRAYER_FR[nextIdx];
  if (nameArEl) nameArEl.textContent = PRAYER_AR[nextIdx];
}

/* ---------- Countdown ---------- */
function startCountdown(timings) {
  if (countdownInterval) clearInterval(countdownInterval);

  function tick() {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

    let nextIdx = null;
    let nextMin = null;

    for (let i = 0; i < PRAYER_KEYS.length; i++) {
      const t = timings[PRAYER_KEYS[i]];
      if (!t) continue;
      const [h, m] = t.split(':').map(Number);
      const pMin = h * 60 + m;
      if (pMin > nowMin) { nextIdx = i; nextMin = pMin; break; }
    }

    if (nextIdx === null) {
      nextIdx = 0;
      const t = timings['Fajr'];
      const [h, m] = t.split(':').map(Number);
      nextMin = h * 60 + m + 24 * 60;
    }

    const diffSec = Math.max(0, Math.round((nextMin - nowMin) * 60));
    const hh = Math.floor(diffSec / 3600);
    const mm = Math.floor((diffSec % 3600) / 60);
    const ss = diffSec % 60;

    const cdEl = document.getElementById('countdown-display');
    if (cdEl) cdEl.textContent =
      `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;

    // Met aussi à jour le nom si on vient de passer à la suivante
    updateNextPrayerCard(timings);

    // Navbar
    const navEl = document.getElementById('next-prayer-nav');
    if (navEl) navEl.textContent =
      `${PRAYER_FR[nextIdx]} • ${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`;
  }

  tick();
  countdownInterval = setInterval(tick, 1000);
}

/* ---------- Date hijri ---------- */
function updateHijriDate(hijri) {
  if (!hijri) return;
  const el = document.getElementById('hijri-date');
  if (!el) return;
  const months = [
    'Mouharram','Safar','Rabi al-Awwal','Rabi ath-Thani',
    'Joumada al-Oula','Joumada al-Akhira','Rajab','Shaabane',
    'Ramadan','Chawwal','Dhou al-Qidah','Dhou al-Hijjah'
  ];
  const monthIdx = parseInt(hijri.month?.number || 1) - 1;
  el.textContent = `${hijri.day} ${months[monthIdx] || ''} ${hijri.year} H`;
}

/* ============================================================
   CALENDRIER HEBDOMADAIRE
   ============================================================ */
async function fetchWeek(lat, lon) {
  const tbody = document.getElementById('weekly-tbody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--text-light)">⏳ Chargement…</td></tr>';

  try {
    const today = new Date();
    const days  = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d);
    }

    const dayNames = ['Aujourd\'hui','Demain','Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
    const daysFR   = ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'];

    // Fetch en parallèle
    const fetches = days.map(d => {
      const ts = Math.floor(d.getTime() / 1000);
      return fetch(`https://api.aladhan.com/v1/timings/${ts}?latitude=${lat}&longitude=${lon}&method=${currentMethod}`)
        .then(r => r.json());
    });

    const results = await Promise.all(fetches);
    tbody.innerHTML = '';

    results.forEach((data, i) => {
      const t = data.data?.timings;
      if (!t) return;

      const d = days[i];
      const isToday = i === 0;
      const isTomorrow = i === 1;

      let dayLabel;
      if (isToday) dayLabel = "Aujourd'hui";
      else if (isTomorrow) dayLabel = 'Demain';
      else dayLabel = daysFR[d.getDay()].charAt(0).toUpperCase() + daysFR[d.getDay()].slice(1)
                    + ' ' + String(d.getDate()).padStart(2,'0') + '/' + String(d.getMonth()+1).padStart(2,'0');

      const tr = document.createElement('tr');
      if (isToday) tr.classList.add('today-row');

      tr.innerHTML = `
        <td>${dayLabel}</td>
        <td>${(t.Fajr || '--:--').substring(0,5)}</td>
        <td>${(t.Sunrise || '--:--').substring(0,5)}</td>
        <td>${(t.Dhuhr || '--:--').substring(0,5)}</td>
        <td>${(t.Asr || '--:--').substring(0,5)}</td>
        <td>${(t.Maghrib || '--:--').substring(0,5)}</td>
        <td>${(t.Isha || '--:--').substring(0,5)}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch {
    if (tbody) tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--text-light)">⚠️ Impossible de charger le calendrier</td></tr>';
  }
}

/* ============================================================
   QIBLA
   ============================================================ */
function setupQiblaBtn() {
  const btn = document.getElementById('btn-qibla');
  if (!btn) return;
  btn.addEventListener('click', computeQibla);
}

function computeQibla() {
  if (!navigator.geolocation) {
    showQiblaError("La géolocalisation n'est pas disponible");
    return;
  }
  const btn = document.getElementById('btn-qibla');
  if (btn) { btn.textContent = '⏳ Calcul…'; btn.disabled = true; }

  navigator.geolocation.getCurrentPosition(
    pos => {
      const qibla = calcQiblaAngle(pos.coords.latitude, pos.coords.longitude);
      showQiblaResult(qibla);
      if (btn) { btn.textContent = '🕋 Recalculer'; btn.disabled = false; }
    },
    () => {
      if (currentLat !== null) {
        const qibla = calcQiblaAngle(currentLat, currentLon);
        showQiblaResult(qibla);
      } else {
        showQiblaError('Localisation refusée');
      }
      if (btn) { btn.textContent = '🕋 Calculer'; btn.disabled = false; }
    },
    { timeout: 8000 }
  );
}

function calcQiblaAngle(lat, lon) {
  // Coordonnées de la Kaaba
  const kaabaLat = 21.4225;
  const kaabaLon = 39.8262;

  const φ1 = toRad(lat);
  const φ2 = toRad(kaabaLat);
  const Δλ = toRad(kaabaLon - lon);

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  let angle = toDeg(Math.atan2(y, x));
  if (angle < 0) angle += 360;
  return Math.round(angle);
}

function toRad(deg) { return deg * Math.PI / 180; }
function toDeg(rad) { return rad * 180 / Math.PI; }

function showQiblaResult(angle) {
  const degEl = document.getElementById('qibla-degree');
  const descEl = document.getElementById('qibla-desc');
  const needle = document.getElementById('qibla-needle');

  if (degEl) degEl.textContent = `${angle}°`;
  if (descEl) descEl.textContent = `Tournez-vous à ${angle}° depuis le Nord pour faire face à la Kaaba (La Mecque)`;
  if (needle) {
    needle.style.transform = `translateX(-50%) translateY(-100%) rotate(${angle}deg)`;
  }

  const errorEl = document.getElementById('qibla-error');
  if (errorEl) errorEl.style.display = 'none';

  const resultEl = document.getElementById('qibla-result');
  if (resultEl) resultEl.style.display = 'block';
}

function showQiblaError(msg) {
  const errorEl = document.getElementById('qibla-error');
  if (errorEl) { errorEl.textContent = '⚠️ ' + msg; errorEl.style.display = 'block'; }
  const resultEl = document.getElementById('qibla-result');
  if (resultEl) resultEl.style.display = 'none';
}

/* ============================================================
   UTILITAIRES UI
   ============================================================ */
function setHeroCity(txt) {
  const el = document.getElementById('hero-city');
  if (el) el.textContent = txt;
}

function showLoadingState() {
  const el = document.getElementById('prayers-loading');
  if (el) el.style.display = 'flex';
  PRAYER_ROW_IDS.forEach(id => {
    const row = document.getElementById(id);
    if (!row) return;
    const timeEl = row.querySelector('.prayer-time-val');
    if (timeEl) timeEl.textContent = '--:--';
    row.classList.remove('current','passed');
  });
}

function hideLoadingState() {
  const el = document.getElementById('prayers-loading');
  if (el) el.style.display = 'none';
}

function showErrorState() {
  hideLoadingState();
  showToast('⚠️ Erreur lors du chargement des horaires');
}

function showToast(msg, duration = 3500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}
