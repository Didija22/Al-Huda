/* ============================================================
   AL-HUDA — Boussole de Qibla
   Calcul de la direction de la Mecque + gyroscope
   ============================================================ */

const MECCA = { lat: 21.4225, lng: 39.8262 };

let _qiblaAngle   = null; // degrés depuis le Nord
let _userLat      = null;
let _userLng      = null;
let _hasGyro      = false;
let _lastAlpha    = null;

/* ---- Démarrage ---- */
document.addEventListener('DOMContentLoaded', () => {
  initQibla();
});

async function initQibla() {
  setStatus('waiting', 'Localisation en cours…');
  try {
    const pos = await getPosition();
    _userLat = pos.coords.latitude;
    _userLng = pos.coords.longitude;

    _qiblaAngle = calcQibla(_userLat, _userLng);
    const dist  = calcDistance(_userLat, _userLng);

    // Afficher les données statiques
    setVal('qibla-bearing',  Math.round(_qiblaAngle) + '°');
    setVal('qibla-dist',     Math.round(dist).toLocaleString('fr-FR') + ' km');
    setVal('compass-degree', Math.round(_qiblaAngle) + '°');
    setVal('user-city', await getCityName(_userLat, _userLng));

    // Afficher la direction statique (sans gyro)
    rotateNeedle(_qiblaAngle);
    document.getElementById('no-gyro-hint')?.classList.add('show');

    // Demander le gyroscope
    await requestGyro();

  } catch (err) {
    setStatus('error', 'Localisation refusée');
    showGeoError(err);
  }
}

/* ---- Géolocalisation ---- */
function getPosition(opts = { timeout: 10000, enableHighAccuracy: true }) {
  return new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej, opts));
}

/* ---- Nom de la ville via Nominatim ---- */
async function getCityName(lat, lng) {
  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      { headers: { 'Accept-Language': 'fr' } }
    );
    const d = await r.json();
    return d.address?.city || d.address?.town || d.address?.village || d.address?.county || 'Votre position';
  } catch { return 'Votre position'; }
}

/* ---- Calcul Qibla (formule du grand cercle) ---- */
function calcQibla(lat, lng) {
  const φ1 = toRad(lat);
  const φ2 = toRad(MECCA.lat);
  const Δλ = toRad(MECCA.lng - lng);
  const x  = Math.sin(Δλ) * Math.cos(φ2);
  const y  = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (toDeg(Math.atan2(x, y)) + 360) % 360;
}

/* ---- Calcul distance à La Mecque (Haversine) ---- */
function calcDistance(lat, lng) {
  const R  = 6371;
  const φ1 = toRad(lat);
  const φ2 = toRad(MECCA.lat);
  const Δφ = toRad(MECCA.lat - lat);
  const Δλ = toRad(MECCA.lng - lng);
  const a  = Math.sin(Δφ/2)**2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

/* ---- Gyroscope ---- */
async function requestGyro() {
  if (typeof DeviceOrientationEvent === 'undefined') {
    useStaticMode();
    return;
  }

  // iOS 13+ : requiert permission explicite (doit être déclenché par geste)
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    const permBtn = document.getElementById('btn-permission');
    if (permBtn) {
      permBtn.style.display = 'inline-flex';
      permBtn.addEventListener('click', async () => {
        const res = await DeviceOrientationEvent.requestPermission();
        if (res === 'granted') {
          permBtn.style.display = 'none';
          listenOrientation();
        } else {
          useStaticMode();
        }
      });
    }
  } else {
    listenOrientation();
  }
}

function listenOrientation() {
  // Essayer l'événement absolu d'abord (Android)
  let gotAbsolute = false;

  window.addEventListener('deviceorientationabsolute', e => {
    if (e.alpha == null) return;
    gotAbsolute = true;
    handleOrientation(e, true);
  }, true);

  // Fallback deviceorientation (iOS / certains Android)
  window.addEventListener('deviceorientation', e => {
    if (gotAbsolute) return; // On a déjà l'absolu
    if (e.alpha == null) return;
    // Sur iOS webkitCompassHeading est déjà la direction magnétique absolue
    const heading = e.webkitCompassHeading != null ? e.webkitCompassHeading : e.alpha;
    handleOrientation({ alpha: heading }, e.webkitCompassHeading != null);
  }, true);

  // Timeout : si aucun événement après 3s → mode statique
  setTimeout(() => {
    if (!_hasGyro) useStaticMode();
  }, 3000);
}

function handleOrientation(e, isAbsolute = false) {
  if (_qiblaAngle == null) return;

  let heading = e.alpha; // degrees from north

  // Sur certains appareils alpha va dans le mauvais sens
  const needleAngle = (_qiblaAngle - heading + 360) % 360;

  if (!_hasGyro) {
    // Première fois : activer le mode gyro
    _hasGyro = true;
    setStatus('active', 'Gyroscope actif');
    document.getElementById('no-gyro-hint')?.classList.remove('show');
    document.getElementById('compass-needle-wrap')?.classList.remove('no-gyro-anim');
  }

  // Éviter les micro-mises à jour inutiles
  if (_lastAlpha !== null && Math.abs(heading - _lastAlpha) < 1) return;
  _lastAlpha = heading;

  rotateNeedle(needleAngle);
  setVal('compass-degree', Math.round(_qiblaAngle) + '°');
}

function useStaticMode() {
  if (_qiblaAngle == null) return;
  setStatus('error', 'Gyroscope indisponible — direction statique');
  document.getElementById('no-gyro-hint')?.classList.add('show');
  document.getElementById('compass-needle-wrap')?.classList.add('no-gyro-anim');
  rotateNeedle(_qiblaAngle);
}

/* ---- Rotation de l'aiguille ---- */
function rotateNeedle(deg) {
  const wrap = document.getElementById('compass-needle-wrap');
  if (wrap) wrap.style.transform = `rotate(${deg}deg)`;
}

/* ---- Affichage erreur géoloc ---- */
function showGeoError(err) {
  const compass = document.querySelector('.compass-outer-ring');
  const panel   = document.querySelector('.qibla-info-panel');
  const msg = err.code === 1
    ? 'Accès à la localisation refusé. Autorisez la localisation dans les paramètres de votre navigateur.'
    : 'Impossible de récupérer votre position. Vérifiez votre connexion.';

  if (compass) compass.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;padding:1rem;text-align:center;font-size:.85rem;color:rgba(255,255,255,.5);">📍 ${msg}</div>`;
  if (panel)   panel.innerHTML   = `<div class="qibla-error"><span class="emoji">📍</span><p>${msg}</p></div>`;
}

/* ---- Helpers ---- */
function toRad(d) { return d * Math.PI / 180; }
function toDeg(r) { return r * 180 / Math.PI; }

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function setStatus(type, msg) {
  const dot  = document.getElementById('status-dot');
  const text = document.getElementById('status-text');
  if (dot)  { dot.className = 'status-dot ' + type; }
  if (text) text.textContent = msg;
}
