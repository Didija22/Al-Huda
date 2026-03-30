/* ============================================================
   AL-HUDA — Script Hadiths
   ============================================================ */

const HADITHS_URL = '../../data/hadiths.json';

let allData    = null;
let allHadiths = [];
let activeTheme = 'all';
let activeCol   = 'all';
let searchQuery = '';

async function initHadiths() {
  try {
    if (window.HADITHS_DATA) {
      allData = window.HADITHS_DATA;
    } else {
      const res = await fetch(HADITHS_URL);
      allData = await res.json();
    }
    allHadiths = allData.hadiths;
  } catch {
    document.getElementById('hadiths-grid').innerHTML =
      '<div class="no-hadiths"><span class="emoji">⚠️</span><p>Impossible de charger les hadiths. Vérifiez votre connexion.</p></div>';
    return;
  }

  buildCollectionsBanner(allData.collections);
  buildThemeFilters(allData.themes);
  buildCollectionFilters(allData.collections);
  renderHadiths(allHadiths);
  setHadithDuJour(allHadiths);

  document.getElementById('total-hadiths').textContent = allHadiths.length;

  initSearch();
}

/* ---------- Bannière collections ---------- */
function buildCollectionsBanner(cols) {
  const grid = document.getElementById('collections-grid');
  if (!grid) return;
  grid.innerHTML = cols.map(c => `
    <div class="col-badge" onclick="setActiveCollection('${c.id}')" id="colbadge-${c.id}">
      <div class="col-dot" style="background:${c.color}"></div>
      <span class="col-name">${c.name}</span>
      <span class="col-ar">${c.nameAr}</span>
    </div>
  `).join('');
}

/* ---------- Filtres thèmes ---------- */
function buildThemeFilters(themes) {
  const row = document.getElementById('theme-filters');
  if (!row) return;
  themes.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'hfilter';
    btn.dataset.theme = t.id;
    btn.textContent = `${t.emoji} ${t.name}`;
    btn.addEventListener('click', () => setActiveTheme(t.id));
    row.appendChild(btn);
  });
}

/* ---------- Filtres collections (barre) ---------- */
function buildCollectionFilters(cols) {
  const row = document.getElementById('collection-filters');
  if (!row) return;
  cols.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'cfilter';
    btn.dataset.col = c.id;
    btn.textContent = c.name;
    btn.addEventListener('click', () => setActiveCollection(c.id));
    row.appendChild(btn);
  });
}

/* ---------- Filtrage ---------- */
function setActiveTheme(id) {
  activeTheme = id;
  document.querySelectorAll('.hfilter').forEach(b => b.classList.toggle('active', b.dataset.theme === id));
  applyFilters();
}

function setActiveCollection(id) {
  activeCol = id;
  document.querySelectorAll('.cfilter').forEach(b => b.classList.toggle('active', b.dataset.col === id));
  document.querySelectorAll('.col-badge').forEach(b => b.classList.toggle('active', b.id === `colbadge-${id}`));
  applyFilters();
}

function applyFilters() {
  const q = searchQuery.toLowerCase().trim();
  const filtered = allHadiths.filter(h => {
    const matchTheme = activeTheme === 'all' || h.theme === activeTheme;
    const matchCol   = activeCol   === 'all' || h.collection === activeCol;
    const matchSearch = !q ||
      h.french.toLowerCase().includes(q) ||
      h.arabic.includes(q) ||
      h.narrator.toLowerCase().includes(q) ||
      h.ref.toLowerCase().includes(q);
    return matchTheme && matchCol && matchSearch;
  });
  document.getElementById('count-num').textContent = filtered.length;
  renderHadiths(filtered);
}

/* ---------- Recherche ---------- */
function initSearch() {
  const input = document.getElementById('hadith-search');
  const clear = document.getElementById('hadith-search-clear');
  input?.addEventListener('input', () => {
    searchQuery = input.value;
    clear.style.display = input.value ? 'block' : 'none';
    applyFilters();
  });
  clear?.addEventListener('click', () => {
    input.value = '';
    searchQuery = '';
    clear.style.display = 'none';
    applyFilters();
  });
}

/* ---------- Rendu ---------- */
function renderHadiths(hadiths) {
  const grid = document.getElementById('hadiths-grid');
  if (!grid) return;

  if (!hadiths.length) {
    grid.innerHTML = '<div class="no-hadiths"><span class="emoji">🔍</span><p>Aucun hadith trouvé.</p></div>';
    return;
  }

  const colMap = {};
  allData.collections.forEach(c => colMap[c.id] = c);
  const themeMap = {};
  allData.themes.forEach(t => themeMap[t.id] = t);

  grid.innerHTML = hadiths.map((h, idx) => {
    const col = colMap[h.collection] || { name: h.collection, color: '#1B6B3A' };
    const theme = themeMap[h.theme] || { emoji: '📜', name: h.theme };
    return `
      <div class="hadith-card reveal" id="hadith-${h.id}">
        <div class="hadith-card-header">
          <div class="hadith-num">${idx + 1}</div>
          <div class="hadith-theme-tag">${theme.emoji} ${theme.name}</div>
          <div class="hadith-header-right">
            <span class="hadith-collection-badge" style="background:${col.color}">${col.name}</span>
            <span class="hadith-grade">${h.grade}</span>
          </div>
        </div>
        <div class="hadith-card-body">
          <div class="hadith-arabic-text">${h.arabic}</div>
          <div class="hadith-french-text">${escapeHtml(h.french)}</div>
        </div>
        <div class="hadith-card-footer">
          <div>
            <div class="hadith-narrator">Narré par <strong>${h.narrator}</strong></div>
            <div class="hadith-narrator-ar">${h.narratorAr}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.35rem;">
            <span class="hadith-ref">${h.ref}</span>
            <div class="hadith-actions">
              <button class="haction-btn" title="Copier" onclick="copyHadith(${h.id})">📋</button>
              <button class="haction-btn" title="Partager" onclick="shareHadith(${h.id})">↗</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Observer reveal
  grid.querySelectorAll('.reveal').forEach(el => window.revealObserver && window.revealObserver.observe(el));
}

/* ---------- Hadith du jour ---------- */
function setHadithDuJour(hadiths) {
  const idx = new Date().getDate() % hadiths.length;
  const h = hadiths[idx];
  if (!h) return;
  const el = id => document.getElementById(id);
  if (el('hdj-arabic'))   el('hdj-arabic').textContent   = h.arabic;
  if (el('hdj-french'))   el('hdj-french').textContent   = h.french;
  if (el('hdj-narrator')) el('hdj-narrator').textContent = `Narré par ${h.narrator} (${h.narratorAr})`;
  if (el('hdj-ref'))      el('hdj-ref').textContent      = h.ref;
}

/* ---------- Actions ---------- */
function copyHadith(id) {
  const h = allHadiths.find(x => x.id === id);
  if (!h) return;
  const text = `${h.arabic}\n\n${h.french}\n\n— ${h.narrator} | ${h.ref}`;
  navigator.clipboard?.writeText(text).then(() => showToast('✓ Hadith copié !'));
}

function shareHadith(id) {
  const url = `${location.origin}${location.pathname}#hadith-${id}`;
  if (navigator.share) navigator.share({ title: 'Al-Huda — Hadith', url });
  else navigator.clipboard?.writeText(url).then(() => showToast('✓ Lien copié !'));
}

window.copyHadith       = copyHadith;
window.shareHadith      = shareHadith;
window.setActiveCollection = setActiveCollection;
window.filterCollection = setActiveCollection;

/* ---------- Toast ---------- */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function escapeHtml(str) {
  return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', initHadiths);
