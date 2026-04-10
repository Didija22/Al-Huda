/* ============================================================
   AL-HUDA — Script Azkars
   ============================================================ */

const AZKARS_URL = '../../data/azkars.json';

async function initAzkars() {
  let data;
  try {
    if (window.AZKARS_DATA) {
      data = window.AZKARS_DATA;
    } else {
      const res = await fetch(AZKARS_URL);
      data = await res.json();
    }
  } catch {
    console.error('Impossible de charger les azkars');
    return;
  }

  renderCategories(data.categories);
  renderSection('azkars-matin',      data.azkars.matin);
  renderSection('azkars-soir',       data.azkars.soir);
  renderSection('azkars-salat',      data.azkars.salat);
  renderSection('azkars-coucher',    data.azkars.coucher);
  renderSection('azkars-protection', data.azkars.protection);
  renderSection('azkars-adhan',      data.azkars.adhan);

  setMomentBanner();
  initGlobalTasbih();
}

/* ---------- Catégories ---------- */
function renderCategories(cats) {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  grid.innerHTML = cats.map(c => `
    <a href="#${c.id}" class="cat-card reveal">
      <div class="cat-emoji-lg">${c.emoji}</div>
      <div class="cat-ar">${c.nameAr}</div>
      <h4>${c.name}</h4>
      <p>${c.description}</p>
    </a>
  `).join('');

  // Observer les nouvelles cartes
  grid.querySelectorAll('.reveal').forEach(el => {
    window.revealObserver && window.revealObserver.observe(el);
  });
}

/* ---------- Sections ---------- */
function renderSection(containerId, azkars) {
  const container = document.getElementById(containerId);
  if (!container || !azkars) return;

  container.innerHTML = azkars.map((a, idx) => `
    <div class="azkar-card reveal" id="azkar-${a.id}">
      <div class="azkar-card-header">
        <div class="azkar-num">${idx + 1}</div>
        <div class="azkar-source">${a.source}</div>
      </div>
      <div class="azkar-card-body">
        <div class="azkar-arabic-text">${a.arabic}</div>
        <div class="azkar-transliteration" id="trans-${a.id}">${a.transliteration}</div>
        <div class="azkar-translation">${a.translation}</div>
        ${a.benefit ? `<div class="azkar-benefit">${a.benefit}</div>` : ''}
        <div class="azkar-progress">
          <div class="azkar-progress-bar" id="bar-${a.id}" style="width:0%"></div>
        </div>
      </div>
      <div class="azkar-card-footer">
        <div class="rep-badge">
          🔁 <span class="rep-num">${a.repetitions}×</span>
        </div>
        <div class="inline-counter">
          <button class="ic-reset" onclick="resetCounter('${a.id}', ${a.repetitions})" title="Réinitialiser">↺</button>
          <span class="ic-count" id="count-${a.id}">0</span>
          <button class="ic-btn" id="btn-${a.id}" onclick="countAzkar('${a.id}', ${a.repetitions})" title="Compter">+</button>
        </div>
        <div class="azkar-card-actions">
          <button class="azkar-action" onclick="toggleTranslit('${a.id}')" title="Translittération">Aa</button>
          <button class="azkar-action" onclick="copyAzkar('${a.id}')" title="Copier">📋</button>
          <button class="azkar-action" onclick="shareAzkar('${a.id}')" title="Partager">↗</button>
        </div>
      </div>
    </div>
  `).join('');

  // Observer pour animation
  container.querySelectorAll('.reveal').forEach(el => window.revealObserver && window.revealObserver.observe(el));
}

/* ---------- Compteur par azkar ---------- */
const counters = {};

function countAzkar(id, max) {
  if (!counters[id]) counters[id] = 0;
  counters[id]++;

  const countEl = document.getElementById(`count-${id}`);
  const btnEl   = document.getElementById(`btn-${id}`);
  const barEl   = document.getElementById(`bar-${id}`);

  if (countEl) countEl.textContent = counters[id];

  // Barre de progression
  if (barEl) {
    const pct = Math.min((counters[id] / max) * 100, 100);
    barEl.style.width = pct + '%';
  }

  // Vibration légère
  if (navigator.vibrate) navigator.vibrate(25);

  // Terminé
  if (counters[id] >= max) {
    if (btnEl) { btnEl.classList.add('done'); btnEl.textContent = '✓'; }
    showToast(`✅ ${max} fois accompli ! بارك الله فيك`);
  }
}

function resetCounter(id, max) {
  counters[id] = 0;
  const countEl = document.getElementById(`count-${id}`);
  const btnEl   = document.getElementById(`btn-${id}`);
  const barEl   = document.getElementById(`bar-${id}`);
  if (countEl) countEl.textContent = '0';
  if (btnEl)   { btnEl.classList.remove('done'); btnEl.textContent = '+'; }
  if (barEl)   barEl.style.width = '0%';
}

/* ---------- Actions ---------- */
function toggleTranslit(id) {
  const el = document.getElementById(`trans-${id}`);
  if (el) el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

function copyAzkar(id) {
  const card = document.getElementById(`azkar-${id}`);
  const ar = card?.querySelector('.azkar-arabic-text')?.textContent?.trim() || '';
  const fr = card?.querySelector('.azkar-translation')?.textContent?.trim() || '';
  navigator.clipboard?.writeText(`${ar}\n\n${fr}`).then(() => showToast('✓ Azkar copié !'));
}

function shareAzkar(id) {
  const url = `${location.origin}${location.pathname}#azkar-${id}`;
  if (navigator.share) navigator.share({ title: 'Al-Huda — Azkar', url });
  else navigator.clipboard?.writeText(url).then(() => showToast('✓ Lien copié !'));
}

/* ---------- Bannière moment ---------- */
function setMomentBanner() {
  const h = new Date().getHours();
  let label, text, href;

  if (h >= 4 && h < 7) {
    label = '🌅 Azkars du matin';
    text  = 'C\'est l\'heure des azkars du matin — renforcez votre journée avec le dhikr.';
    href  = '#matin';
  } else if (h >= 15 && h < 18) {
    label = '🌆 Azkars du soir';
    text  = 'C\'est l\'heure des azkars du soir — protégez votre soirée.';
    href  = '#soir';
  } else if (h >= 21 || h < 4) {
    label = '🛌 Azkars du coucher';
    text  = 'Avant de dormir, n\'oubliez pas les azkars du coucher.';
    href  = '#coucher';
  } else {
    label = '📿 Dhikr permanent';
    text  = 'SubhanAllah, Alhamdulillah, Allahu Akbar — à tout moment de la journée.';
    href  = '#tasbih';
  }

  const lEl = document.getElementById('moment-label');
  const tEl = document.getElementById('moment-text');
  const aEl = document.getElementById('moment-link');
  if (lEl) lEl.textContent = label;
  if (tEl) tEl.textContent = text;
  if (aEl) aEl.href = href;
}

/* ---------- Tasbih global ---------- */
let tsbCount = 0;
let tsbMax   = 33;
let tsbSessionTotal = 0;

function initGlobalTasbih() {
  document.querySelectorAll('.tsb-select').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tsb-select').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tsbCount = 0;
      tsbMax   = parseInt(btn.dataset.max) || 33;
      const arabic = document.getElementById('tsb-arabic');
      if (arabic) arabic.textContent = btn.dataset.text;
      // Mise à jour référence
      const refSource  = document.getElementById('tsb-ref-source');
      const refBenefit = document.getElementById('tsb-ref-benefit');
      if (refSource)  refSource.textContent  = btn.dataset.source  || '';
      if (refBenefit) refBenefit.textContent = btn.dataset.benefit || '';
      updateTsbDisplay();
    });
  });

  document.getElementById('tsb-reset')?.addEventListener('click', () => {
    tsbCount = 0;
    updateTsbDisplay();
  });
}

function globalTasbih() {
  tsbCount++;
  tsbSessionTotal++;

  const countEl = document.getElementById('tsb-count');
  if (countEl) {
    countEl.textContent = tsbCount;
    countEl.classList.add('bump');
    setTimeout(() => countEl.classList.remove('bump'), 100);
  }

  if (navigator.vibrate) navigator.vibrate(20);
  updateTsbDisplay();

  if (tsbCount >= tsbMax) {
    showToast(`✅ ${tsbMax}× accompli ! الله يبارك`);
    tsbCount = 0;
    setTimeout(updateTsbDisplay, 1500);
  }

  const totalEl = document.getElementById('tsb-total');
  if (totalEl) totalEl.textContent = tsbSessionTotal;
}

function updateTsbDisplay() {
  const pct = Math.min((tsbCount / tsbMax) * 100, 100);
  const barEl = document.getElementById('tsb-bar');
  const maxEl = document.getElementById('tsb-max');
  const countEl = document.getElementById('tsb-count');
  if (barEl)   barEl.style.width = pct + '%';
  if (maxEl)   maxEl.textContent = `/ ${tsbMax}`;
  if (countEl) countEl.textContent = tsbCount;
}

window.globalTasbih  = globalTasbih;
window.countAzkar    = countAzkar;
window.resetCounter  = resetCounter;
window.toggleTranslit = toggleTranslit;
window.copyAzkar     = copyAzkar;
window.shareAzkar    = shareAzkar;

/* ---------- Toast ---------- */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', initAzkars);
