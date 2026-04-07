/* ============================================================
   AL-HUDA — Script Coran
   API : https://api.alquran.cloud/v1
   ============================================================ */

const BASE_API = 'https://api.alquran.cloud/v1';
const META_URL = '../../data/surahs-meta.json';

const TRANSLATIONS = {
  fr: { edition: 'fr.hamidullah', label: 'Hamidullah (FR)' },
  en: { edition: 'en.sahih',      label: 'Saheeh Intl (EN)' }
};
let currentLang = 'fr';
let currentSurahNum = 1;
let currentAllMeta  = [];

/* Utilise les données statiques si disponibles (file://), sinon fetch */
async function getSurahsMeta() {
  if (window.SURAHS_META) return window.SURAHS_META;
  const res = await fetch(META_URL);
  return await res.json();
}

/* ============================================================
   PAGE LISTE DES SOURATES (quran/index.html)
   ============================================================ */
if (document.getElementById('surahs-grid')) {
  initSurahsList();
}

async function initSurahsList() {
  const grid = document.getElementById('surahs-grid');
  let allSurahs = [];

  try {
    allSurahs = await getSurahsMeta();
    renderSurahs(allSurahs, grid);
  } catch {
    grid.innerHTML = '<div class="no-results"><span class="emoji">⚠️</span><p>Erreur de chargement. Vérifiez votre connexion.</p></div>';
    return;
  }

  /* --- Recherche --- */
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  const countNum    = document.getElementById('count-num');

  function applyFilters() {
    const q      = (searchInput?.value || '').toLowerCase().trim();
    const active = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';

    const filtered = allSurahs.filter(s => {
      const matchSearch = !q ||
        s.name.toLowerCase().includes(q) ||
        s.arabic.includes(q) ||
        s.meaning.toLowerCase().includes(q) ||
        String(s.number) === q;

      const matchFilter =
        active === 'all' ||
        (active === 'juz30' && s.juz === 30) ||
        s.type === active;

      return matchSearch && matchFilter;
    });

    if (countNum) countNum.textContent = filtered.length;
    renderSurahs(filtered, grid);
  }

  searchInput?.addEventListener('input', () => {
    searchClear.style.display = searchInput.value ? 'block' : 'none';
    applyFilters();
  });
  searchClear?.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.style.display = 'none';
    applyFilters();
  });

  /* --- Filtres --- */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  /* --- Vue grille / liste --- */
  const gridEl = document.getElementById('surahs-grid');
  document.getElementById('view-grid')?.addEventListener('click', () => {
    gridEl.classList.remove('list-view');
    document.getElementById('view-grid').classList.add('active');
    document.getElementById('view-list').classList.remove('active');
  });
  document.getElementById('view-list')?.addEventListener('click', () => {
    gridEl.classList.add('list-view');
    document.getElementById('view-list').classList.add('active');
    document.getElementById('view-grid').classList.remove('active');
  });
}

function renderSurahs(surahs, container) {
  if (!surahs.length) {
    container.innerHTML = '<div class="no-results"><span class="emoji">🔍</span><p>Aucune sourate trouvée.</p></div>';
    return;
  }

  container.innerHTML = surahs.map(s => `
    <a href="surah.html?s=${s.number}" class="surah-card">
      <div class="card-num">
        <span style="position:relative;z-index:1">${s.number}</span>
      </div>
      <div class="card-body">
        <div class="card-name">${s.name}</div>
        <div class="card-meaning">${s.meaning}</div>
        <div class="card-pills">
          <span class="pill ${s.type === 'mecquoise' ? 'mec' : 'med'}">${s.type}</span>
          <span class="pill">${s.verses} v.</span>
          <span class="pill">Juz ${s.juz}</span>
        </div>
      </div>
      <div class="card-arabic">${s.arabic}</div>
    </a>
  `).join('');
}

/* ============================================================
   PAGE LECTURE SOURATE (quran/surah.html)
   ============================================================ */
if (document.getElementById('verses-container')) {
  initSurahReader();
}

async function initSurahReader() {
  const params   = new URLSearchParams(window.location.search);
  currentSurahNum = parseInt(params.get('s')) || 1;
  if (currentSurahNum < 1)   currentSurahNum = 1;
  if (currentSurahNum > 114) currentSurahNum = 114;

  try {
    currentAllMeta = await getSurahsMeta();
  } catch { /* silent */ }

  await loadSurah(currentSurahNum, currentAllMeta);
  buildSidebar(currentAllMeta, currentSurahNum);
  initReaderControls(currentSurahNum, currentAllMeta);
  initSidebarSearch(currentAllMeta);
}

async function loadSurah(num, allMeta) {
  const container = document.getElementById('verses-container');
  container.innerHTML = '<div class="loading-verses"><div class="spinner"></div><p>Chargement...</p></div>';

  const meta = allMeta.find(s => s.number === num) || { name:'Sourate', arabic:'', meaning:'', verses:0, type:'', juz:1 };
  updateHeader(num, meta);

  try {
    const edition = TRANSLATIONS[currentLang].edition;
    const [arRes, trRes] = await Promise.all([
      fetch(`${BASE_API}/surah/${num}`),
      fetch(`${BASE_API}/surah/${num}/${edition}`)
    ]);
    const arData = await arRes.json();
    const trData = await trRes.json();

    if (arData.code !== 200 || trData.code !== 200) throw new Error('API error');

    const arVerses = arData.data.ayahs;
    const frVerses = trData.data.ayahs;

    renderVerses(num, arVerses, frVerses, container, meta);

  } catch (e) {
    container.innerHTML = `
      <div class="no-results">
        <span class="emoji">⚠️</span>
        <p>Impossible de charger la sourate. Vérifiez votre connexion internet.</p>
        <button onclick="location.reload()" class="btn btn-primary" style="margin-top:1rem;">🔄 Réessayer</button>
      </div>`;
  }
}

async function switchLang(lang, surahNum) {
  if (lang === currentLang) return;
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.id === `lang-${lang}`));
  showToast(lang === 'en' ? '🇬🇧 Traduction anglaise' : '🇫🇷 Traduction française');
  await loadSurah(surahNum, currentAllMeta);
}

function updateHeader(num, meta) {
  document.title = `${meta.name} — Al-Huda`;
  setText('breadcrumb-name', meta.name);
  setText('surah-number-badge', num);
  setText('surah-name-fr', meta.name);
  setText('surah-meaning', meta.meaning);
  setText('surah-name-ar', meta.arabic);
  setText('surah-type', capitalize(meta.type));
  setText('surah-verses', `${meta.verses} versets`);
  setText('surah-juz', `Juz ${meta.juz}`);

  // Nav prev/next
  const prevNum = num > 1   ? num - 1 : null;
  const nextNum = num < 114 ? num + 1 : null;

  ['prev-surah','prev-bottom'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.href = prevNum ? `surah.html?s=${prevNum}` : '#'; el.style.opacity = prevNum ? '1' : '0.4'; el.style.pointerEvents = prevNum ? '' : 'none'; }
  });
  ['next-surah','next-bottom'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.href = nextNum ? `surah.html?s=${nextNum}` : '#'; el.style.opacity = nextNum ? '1' : '0.4'; el.style.pointerEvents = nextNum ? '' : 'none'; }
  });
}

function renderVerses(surahNum, arVerses, frVerses, container, meta) {
  let html = '';
  const surahNameFr = meta?.name || '';

  // Bismillah sauf At-Tawba (9) et Al-Fatiha (1 qui l'intègre comme v.1)
  if (surahNum !== 9) {
    html += `<div class="bismillah-verse">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
  }

  arVerses.forEach((av, i) => {
    const fv = frVerses[i] || {};
    const frText = (fv.text || '').replace(/^\d+\.\s*/, '');
    html += `
      <div class="verse-block" id="v${av.numberInSurah}" data-verse="${av.numberInSurah}">
        <div class="verse-header">
          <div class="verse-badge">${av.numberInSurah}</div>
          <div class="verse-actions">
            <button class="verse-action-btn" title="Copier le verset" onclick="copyVerse(${av.numberInSurah}, this)">📋</button>
            <button class="verse-action-btn vab-bookmark" title="Marquer ce verset" onclick="bookmarkVerse(${surahNum}, ${av.numberInSurah}, '${surahNameFr.replace(/'/g,"\\'")}', this)">🔖</button>
            <button class="verse-action-btn vab-note" title="Ajouter une note" onclick="openNoteModal(${surahNum}, ${av.numberInSurah})">📝</button>
            <button class="verse-action-btn" title="Partager" onclick="shareVerse(${surahNum}, ${av.numberInSurah})">↗</button>
          </div>
        </div>
        <div class="verse-arabic-text">${av.text} ﴿${toArabicNum(av.numberInSurah)}﴾</div>
        <div class="verse-french-text">${escapeHtml(frText)}</div>
      </div>
    `;
  });

  container.innerHTML = html;
  restoreVerseStates(surahNum);
  updateFavCount();
}

/* ---- Actions versets ---- */
function copyVerse(verseNum, btn) {
  const block = document.getElementById(`v${verseNum}`);
  const ar = block?.querySelector('.verse-arabic-text')?.textContent?.trim() || '';
  const fr = block?.querySelector('.verse-french-text')?.textContent?.trim() || '';
  navigator.clipboard?.writeText(`${ar}\n\n${fr}`).then(() => showToast('✓ Verset copié !'));
  btn.textContent = '✓';
  setTimeout(() => btn.textContent = '📋', 2000);
}

function bookmarkVerse(surahNum, verseNum, surahNameFr, btn) {
  const key = `alhuda_bm_${surahNum}_${verseNum}`;
  const existing = localStorage.getItem(key);
  if (existing) {
    localStorage.removeItem(key);
    btn.classList.remove('active');
    showToast('Signet retiré');
  } else {
    const block = document.getElementById(`v${verseNum}`);
    const arabic  = block?.querySelector('.verse-arabic-text')?.textContent?.trim() || '';
    const french  = block?.querySelector('.verse-french-text')?.textContent?.trim() || '';
    localStorage.setItem(key, JSON.stringify({
      surahNum, verseNum, surahNameFr,
      arabic:  arabic.substring(0, 120),
      french:  french.substring(0, 120),
      ts: Date.now()
    }));
    btn.classList.add('active');
    showToast('✓ Verset sauvegardé !');
  }
  updateFavCount();
}

/* ---- Notes ---- */
let _noteCtx = null;

function openNoteModal(surahNum, verseNum) {
  _noteCtx = { surahNum, verseNum };
  const block   = document.getElementById(`v${verseNum}`);
  const arabic  = block?.querySelector('.verse-arabic-text')?.textContent?.trim() || '';
  const preview = document.getElementById('note-verse-preview');
  const textarea = document.getElementById('note-textarea');
  const overlay  = document.getElementById('note-overlay');
  if (preview)  preview.textContent = arabic.substring(0, 80) + (arabic.length > 80 ? ' …' : '');
  const saved = localStorage.getItem(`alhuda_note_${surahNum}_${verseNum}`);
  if (textarea) textarea.value = saved ? (JSON.parse(saved).text || '') : '';
  if (overlay)  overlay.classList.add('open');
}

function closeNoteModal() {
  document.getElementById('note-overlay')?.classList.remove('open');
  _noteCtx = null;
}

function saveNote() {
  if (!_noteCtx) return;
  const { surahNum, verseNum } = _noteCtx;
  const text = document.getElementById('note-textarea')?.value.trim() || '';
  const key  = `alhuda_note_${surahNum}_${verseNum}`;
  if (text) {
    localStorage.setItem(key, JSON.stringify({ text, ts: Date.now() }));
    showToast('✓ Note enregistrée !');
  } else {
    localStorage.removeItem(key);
    showToast('Note supprimée');
  }
  closeNoteModal();
  restoreVerseStates(surahNum);
  updateFavCount();
}

function deleteNote() {
  if (!_noteCtx) return;
  const { surahNum, verseNum } = _noteCtx;
  localStorage.removeItem(`alhuda_note_${surahNum}_${verseNum}`);
  showToast('Note supprimée');
  closeNoteModal();
  restoreVerseStates(surahNum);
  updateFavCount();
}

/* ---- Restaurer états visuels ---- */
function restoreVerseStates(surahNum) {
  document.querySelectorAll('[data-verse]').forEach(block => {
    const vn  = block.dataset.verse;
    const bmBtn = block.querySelector('.vab-bookmark');
    const ntBtn = block.querySelector('.vab-note');
    if (bmBtn) bmBtn.classList.toggle('active', !!localStorage.getItem(`alhuda_bm_${surahNum}_${vn}`));
    if (ntBtn) ntBtn.classList.toggle('has-note', !!localStorage.getItem(`alhuda_note_${surahNum}_${vn}`));
  });
}

/* ---- Compteur dans toolbar ---- */
function updateFavCount() {
  const bms   = Object.keys(localStorage).filter(k => k.startsWith('alhuda_bm_')).length;
  const notes = Object.keys(localStorage).filter(k => k.startsWith('alhuda_note_')).length;
  const total = bms + notes;
  const el = document.getElementById('fav-count');
  if (!el) return;
  if (total > 0) { el.textContent = total; el.style.display = 'inline-flex'; }
  else           { el.style.display = 'none'; }
}

/* ---- Panneau Favoris ---- */
function openFavoritesPanel() {
  renderFavorites('bookmarks');
  document.getElementById('fav-panel')?.classList.add('open');
  document.getElementById('fav-overlay')?.classList.add('open');
}

function closeFavoritesPanel() {
  document.getElementById('fav-panel')?.classList.remove('open');
  document.getElementById('fav-overlay')?.classList.remove('open');
}

function renderFavorites(tab) {
  const content = document.getElementById('fav-content');
  if (!content) return;

  // Tabs actifs
  document.querySelectorAll('.fav-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });

  if (tab === 'bookmarks') {
    const bms = Object.keys(localStorage)
      .filter(k => k.startsWith('alhuda_bm_'))
      .map(k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } })
      .filter(Boolean)
      .sort((a, b) => b.ts - a.ts);

    if (!bms.length) {
      content.innerHTML = `<div class="fav-empty">Aucun marque-page pour l'instant.<br>Appuyez sur 🔖 sur un verset pour le sauvegarder.</div>`;
      return;
    }

    content.innerHTML = bms.map(b => `
      <div class="fav-item" onclick="goToVerse(${b.surahNum}, ${b.verseNum})">
        <div class="fav-item-meta">
          <span class="fav-surah">${b.surahNameFr} — v.${b.verseNum}</span>
          <span class="fav-date">${new Date(b.ts).toLocaleDateString('fr-FR')}</span>
        </div>
        <div class="fav-arabic">${b.arabic}</div>
        <div class="fav-french">${b.french}</div>
        <button class="fav-delete" onclick="event.stopPropagation(); removeBm(${b.surahNum},${b.verseNum})">🗑</button>
      </div>
    `).join('');

  } else {
    const notes = Object.keys(localStorage)
      .filter(k => k.startsWith('alhuda_note_'))
      .map(k => {
        try {
          const [,, sn, vn] = k.split('_');
          const d = JSON.parse(localStorage.getItem(k));
          return { surahNum: parseInt(sn), verseNum: parseInt(vn), ...d };
        } catch { return null; }
      })
      .filter(Boolean)
      .sort((a, b) => b.ts - a.ts);

    if (!notes.length) {
      content.innerHTML = `<div class="fav-empty">Aucune note pour l'instant.<br>Appuyez sur 📝 sur un verset pour ajouter une note.</div>`;
      return;
    }

    content.innerHTML = notes.map(n => `
      <div class="fav-item" onclick="goToVerse(${n.surahNum}, ${n.verseNum})">
        <div class="fav-item-meta">
          <span class="fav-surah">Sourate ${n.surahNum} — v.${n.verseNum}</span>
          <span class="fav-date">${new Date(n.ts).toLocaleDateString('fr-FR')}</span>
        </div>
        <div class="fav-note-text">${escapeHtml(n.text)}</div>
        <button class="fav-delete" onclick="event.stopPropagation(); removeNote(${n.surahNum},${n.verseNum})">🗑</button>
      </div>
    `).join('');
  }
}

function goToVerse(surahNum, verseNum) {
  const params = new URLSearchParams(location.search);
  const currentSurah = parseInt(params.get('s') || '1');
  if (currentSurah === surahNum) {
    closeFavoritesPanel();
    setTimeout(() => {
      const el = document.getElementById(`v${verseNum}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.classList.add('highlighted');
      setTimeout(() => el?.classList.remove('highlighted'), 2000);
    }, 300);
  } else {
    location.href = `surah.html?s=${surahNum}#v${verseNum}`;
  }
}

function removeBm(surahNum, verseNum) {
  localStorage.removeItem(`alhuda_bm_${surahNum}_${verseNum}`);
  renderFavorites('bookmarks');
  restoreVerseStates(surahNum);
  updateFavCount();
  showToast('Signet retiré');
}

function removeNote(surahNum, verseNum) {
  localStorage.removeItem(`alhuda_note_${surahNum}_${verseNum}`);
  renderFavorites('notes');
  restoreVerseStates(surahNum);
  updateFavCount();
  showToast('Note supprimée');
}

function shareVerse(surahNum, verseNum) {
  const url = `${location.origin}${location.pathname}?s=${surahNum}#v${verseNum}`;
  if (navigator.share) {
    navigator.share({ title: 'Al-Huda — Verset', url });
  } else {
    navigator.clipboard?.writeText(url);
    showToast('✓ Lien copié !');
  }
}


/* ---- Contrôles de lecture ---- */
function initReaderControls(surahNum, allMeta) {
  // Mode affichage
  const modes = { 'opt-both': '', 'opt-arabic': 'arabic-only', 'opt-french': 'french-only' };
  Object.entries(modes).forEach(([id, cls]) => {
    document.getElementById(id)?.addEventListener('click', () => {
      document.body.classList.remove('arabic-only', 'french-only');
      if (cls) document.body.classList.add(cls);
      document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
      document.getElementById(id)?.classList.add('active');
    });
  });

  // Taille police arabe
  let arabicSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--arabic-size') || '1.6');

  document.getElementById('fs-up')?.addEventListener('click', () => {
    arabicSize = Math.min(arabicSize + 0.2, 3.0);
    document.querySelectorAll('.verse-arabic-text').forEach(el => el.style.fontSize = arabicSize + 'rem');
    document.getElementById('fs-label').textContent = Math.round(arabicSize * 10) + 'pt';
  });
  document.getElementById('fs-down')?.addEventListener('click', () => {
    arabicSize = Math.max(arabicSize - 0.2, 1.0);
    document.querySelectorAll('.verse-arabic-text').forEach(el => el.style.fontSize = arabicSize + 'rem');
    document.getElementById('fs-label').textContent = Math.round(arabicSize * 10) + 'pt';
  });

  // Audio
  document.getElementById('btn-audio')?.addEventListener('click', () => {
    const player = document.getElementById('audio-player');
    player.style.display = player.style.display === 'none' ? 'block' : 'none';
    if (player.style.display === 'block') loadAudio(surahNum);
  });

  document.getElementById('reciter-select')?.addEventListener('change', () => loadAudio(surahNum));

  // Sidebar
  const sidebar = document.getElementById('surah-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  document.getElementById('open-sidebar')?.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('open');
  });
  document.getElementById('sidebar-close')?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }

  // Boucle audio
  const loopBtn = document.getElementById('btn-loop');
  loopBtn?.addEventListener('click', () => {
    const audio = document.getElementById('audio-element');
    if (!audio) return;
    audio.loop = !audio.loop;
    loopBtn.classList.toggle('active', audio.loop);
    showToast(audio.loop ? '🔁 Répétition activée' : 'Répétition désactivée');
  });

  // Toggle langue traduction
  document.getElementById('lang-fr')?.addEventListener('click', () => switchLang('fr', surahNum));
  document.getElementById('lang-en')?.addEventListener('click', () => switchLang('en', surahNum));

  // Panneau favoris
  document.getElementById('btn-favorites')?.addEventListener('click', openFavoritesPanel);
  document.getElementById('fav-panel-close')?.addEventListener('click', closeFavoritesPanel);
  document.getElementById('fav-overlay')?.addEventListener('click', closeFavoritesPanel);
  document.querySelectorAll('.fav-tab').forEach(tab => {
    tab.addEventListener('click', () => renderFavorites(tab.dataset.tab));
  });

  // Modale note
  document.getElementById('note-modal-close')?.addEventListener('click', closeNoteModal);
  document.getElementById('note-btn-save')?.addEventListener('click', saveNote);
  document.getElementById('note-btn-delete')?.addEventListener('click', deleteNote);
  document.getElementById('note-overlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeNoteModal();
  });

  updateFavCount();

  // Copier tout
  document.getElementById('btn-copy')?.addEventListener('click', () => {
    const verses = [...document.querySelectorAll('.verse-block')].map(b => {
      const ar = b.querySelector('.verse-arabic-text')?.textContent?.trim() || '';
      const fr = b.querySelector('.verse-french-text')?.textContent?.trim() || '';
      return `${ar}\n${fr}`;
    }).join('\n\n');
    navigator.clipboard?.writeText(verses).then(() => showToast('✓ Sourate copiée !'));
  });

  // Scroll vers le verset ancré dans l'URL
  const hash = window.location.hash;
  if (hash && hash.startsWith('#v')) {
    setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.querySelector(hash)?.classList.add('highlighted');
    }, 1000);
  }
}

function loadAudio(surahNum) {
  const select  = document.getElementById('reciter-select');
  const reciter = select?.value || 'alafasy';
  const audio   = document.getElementById('audio-element');

  // Nom du récitateur affiché
  const nameEl = document.getElementById('reciter-name');
  if (nameEl && select) nameEl.textContent = select.options[select.selectedIndex]?.text || '';

  if (!audio) return;

  // Indicateur de chargement
  audio.removeAttribute('src');
  showToast('⏳ Chargement de la récitation...');

  // Deux sources selon le récitateur :
  // - "mp3q:xxx" → server.mp3quran.net (ex: Matrood)
  // - "ar.xxx"   → cdn.islamic.network (identifiants officiels alquran.cloud)
  if (reciter.startsWith('mp3q:')) {
    const path  = reciter.replace('mp3q:', '');
    const padded = String(surahNum).padStart(3, '0');
    audio.src = `https://${path}/${padded}.mp3`;
  } else {
    audio.src = `https://cdn.islamic.network/quran/audio-surah/128/${reciter}/${surahNum}.mp3`;
  }

  audio.oncanplay = () => showToast('▶ Prêt — appuyez sur lecture');
  audio.onerror   = () => showToast('⚠️ Audio indisponible pour ce récitateur');
  audio.load();
}

/* ---- Sidebar sourates ---- */
function buildSidebar(allMeta, currentNum) {
  const list = document.getElementById('sidebar-list');
  if (!list) return;
  list.innerHTML = allMeta.map(s => `
    <a href="surah.html?s=${s.number}" class="sidebar-item ${s.number === currentNum ? 'active' : ''}">
      <div class="sn">${s.number}</div>
      <div>
        <div style="font-weight:${s.number === currentNum ? '600' : '400'}">${s.name}</div>
        <div style="font-size:0.72rem;color:var(--text-light)">${s.verses} v.</div>
      </div>
      <div class="sa">${s.arabic}</div>
    </a>
  `).join('');
}

function initSidebarSearch(allMeta) {
  document.getElementById('sidebar-search')?.addEventListener('input', function () {
    const q = this.value.toLowerCase();
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

/* ============================================================
   UTILITAIRES
   ============================================================ */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function escapeHtml(str) {
  return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

const ARABIC_NUMS = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
function toArabicNum(n) {
  return String(n).split('').map(d => ARABIC_NUMS[d] || d).join('');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

window.copyVerse     = copyVerse;
window.bookmarkVerse = bookmarkVerse;
window.shareVerse    = shareVerse;
