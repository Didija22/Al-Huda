/* ============================================================
   AL-HUDA — Script Coran
   API : https://api.alquran.cloud/v1
   ============================================================ */

const BASE_API = 'https://api.alquran.cloud/v1';
const META_URL = '../../data/surahs-meta.json';

/* ---- État global Mode Immersif ---- */
let _immVerses  = [];   // { num, arabic, french }
let _immIdx     = 0;
let _immSound   = null;
let _immAuto    = null;
let _immAutoOn  = false;
let _immRafId   = null; // requestAnimationFrame canvas
let _immFsLevel = 2;    // niveau taille police 0-4

const IMM_FS_SIZES  = ['1.3rem', '1.7rem', '2.3rem', '3rem', '3.9rem'];
const IMM_FS_LABELS = ['XS', 'S', 'M', 'L', 'XL'];

const TRANSLATIONS = {
  fr: { edition: 'fr.hamidullah', label: 'Hamidullah (FR)' },
  en: { edition: 'en.sahih',      label: 'Saheeh Intl (EN)' }
};
let currentLang = 'fr';
let currentSurahNum = 1;
let currentAllMeta  = [];
let _translitOn     = false;  // état translittération

/* ================================================================
   RÉCITATEURS — Sources 100 % vérifiées (MP3 retournés par fetch)
   ─────────────────────────────────────────────────────────────
   qdc:  → https://download.quranicaudio.com/qdc/{path}/{n}.mp3
           si padded:true → n = surah padé sur 3 chiffres (001…)
   mp3q: → https://{server.mp3quran.net}/{path}/{nnn}.mp3
           toujours padé sur 3 chiffres
   ================================================================ */
const RECITERS = [
  /* ── Murattal ─────────────────────────────────────────────── */
  { id:'qdc:mishari_al_afasy/murattal',          name:'Mishary Rashid Al-Afasy',    short:'Mishary Rashid',   country:'🇰🇼', style:'Murattal' },
  { id:'qdc:abdurrahmaan_as_sudais/murattal',    name:'Abdul Rahman Al-Sudais',     short:'Al-Sudais',        country:'🇸🇦', style:'Murattal' },
  { id:'mp3q:server12.mp3quran.net/maher',       name:'Maher Al-Muaiqly',           short:'Maher Muaiqly',    country:'🇸🇦', style:'Murattal' },
  { id:'qdc:abu_bakr_shatri/murattal',           name:'Abu Bakr Al-Shatri',         short:'Abu Bakr Shatri',  country:'🇸🇦', style:'Murattal' },
  { id:'qdc:saud_ash-shuraym/murattal',          name:'Saud Al-Shuraim',            short:'Al-Shuraim',       country:'🇸🇦', style:'Murattal', padded:true },
  { id:'qdc:hani_ar_rifai/murattal',             name:'Hani Ar-Rifai',              short:'Hani Ar-Rifai',    country:'🇸🇦', style:'Murattal' },
  { id:'qdc:abdul_baset/murattal',               name:'Abdul Basit Abd us-Samad',   short:'Abdul Basit',      country:'🇪🇬', style:'Murattal' },
  { id:'qdc:khalil_al_husary/murattal',          name:'Mahmoud Khalil Al-Husary',   short:'Al-Husary',        country:'🇪🇬', style:'Murattal' },
  { id:'qdc:siddiq_minshawi/murattal',           name:'Mohamed Siddiq Al-Minshawi', short:'Al-Minshawi',      country:'🇪🇬', style:'Murattal' },
  { id:'mp3q:server8.mp3quran.net/jbrl',         name:'Muhammad Jibreel',           short:'M. Jibreel',       country:'🇸🇦', style:'Murattal' },
  { id:'mp3q:server8.mp3quran.net/ayyub',        name:'Muhammad Ayyoub',            short:'M. Ayyoub',        country:'🇸🇦', style:'Murattal' },
  { id:'mp3q:server10.mp3quran.net/qht',         name:'Khalid Al-Qahtani',          short:'K. Al-Qahtani',    country:'🇸🇦', style:'Murattal' },
  { id:'mp3q:server6.mp3quran.net/abkr',         name:'Idris Abkar',                short:'Idris Abkar',      country:'🇩🇿', style:'Murattal' },
  /* ── Mujawwad ─────────────────────────────────────────────── */
  { id:'qdc:abdul_baset/mujawwad',               name:'Abdul Basit (Mujawwad)',     short:'A. Basit Mujawwad',country:'🇪🇬', style:'Mujawwad' },
  { id:'qdc:siddiq_al-minshawi/mujawwad',        name:'Al-Minshawi (Mujawwad)',     short:'Minshawi Mujawwad',country:'🇪🇬', style:'Mujawwad', padded:true },
  { id:'mp3q:server12.mp3quran.net/maher/Almusshaf-Al-Mojawwad', name:'Maher Al-Muaiqly (Mujawwad)', short:'Maher Mujawwad', country:'🇸🇦', style:'Mujawwad' },
];
/* Récitateur actif — validé contre la liste, fallback sur le premier */
const _DEFAULT_RECITER = 'qdc:mishari_al_afasy/murattal';
let _currentReciterId  = _DEFAULT_RECITER; // sera mis à jour après init dans _buildReciterGrid

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

  /* --- Recherche dans les versets --- */
  initVerseSearch(allSurahs);
}

async function initVerseSearch(allMeta) {
  const input   = document.getElementById('verse-search-input');
  const btn     = document.getElementById('verse-search-btn');
  const results = document.getElementById('verse-results');
  if (!input || !btn || !results) return;

  async function doSearch() {
    const q = input.value.trim();
    if (!q) { results.innerHTML = ''; return; }

    results.innerHTML = '<div class="vs-loading"><div class="spinner" style="width:22px;height:22px;border-width:3px;margin:0"></div> Recherche en cours…</div>';
    btn.disabled = true;

    try {
      const res  = await fetch(`${BASE_API}/search/${encodeURIComponent(q)}/all/fr.hamidullah`);
      const data = await res.json();

      btn.disabled = false;

      if (data.code !== 200 || !data.data?.matches?.length) {
        results.innerHTML = '<div class="vs-empty">🔍 Aucun résultat. Essayez un autre terme.</div>';
        return;
      }

      const total   = data.data.count;
      const matches = data.data.matches.slice(0, 30);
      const regex   = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');

      results.innerHTML = `
        <div class="vs-count">${total} résultat${total > 1 ? 's' : ''} trouvé${total > 1 ? 's' : ''}${total > 30 ? ' — 30 affichés' : ''}</div>
        ${matches.map(m => {
          const meta   = (allMeta || []).find(s => s.number === m.surah.number) || {};
          const arabic = meta.arabic || '';
          const frText = escapeHtml(m.text).replace(regex, match => `<mark>${match}</mark>`);
          return `
            <a href="surah.html?s=${m.surah.number}#v${m.numberInSurah}" class="vs-result">
              <div class="vs-meta">
                <span class="vs-surah">${m.surah.englishName}${arabic ? ' • <span dir="rtl" style="font-family:Amiri,serif">' + arabic + '</span>' : ''}</span>
                <span class="vs-verse">V. ${m.numberInSurah}</span>
              </div>
              <div class="vs-text">${frText}</div>
            </a>
          `;
        }).join('')}
      `;
    } catch {
      btn.disabled = false;
      results.innerHTML = '<div class="vs-empty">⚠️ Erreur de connexion. Vérifiez votre internet.</div>';
    }
  }

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
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
    const [arRes, trRes, tlRes] = await Promise.all([
      fetch(`${BASE_API}/surah/${num}`),
      fetch(`${BASE_API}/surah/${num}/${edition}`),
      fetch(`${BASE_API}/surah/${num}/en.transliteration`)
    ]);
    const arData = await arRes.json();
    const trData = await trRes.json();
    const tlData = await tlRes.json();

    if (arData.code !== 200 || trData.code !== 200) throw new Error('API error');

    const arVerses = arData.data.ayahs;
    const frVerses = trData.data.ayahs;
    const tlVerses = tlData.code === 200 ? tlData.data.ayahs : [];

    renderVerses(num, arVerses, frVerses, tlVerses, container, meta);

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

function toggleTranslit() {
  _translitOn = !_translitOn;
  /* Afficher/masquer toutes les lignes de translittération */
  document.querySelectorAll('.verse-translit-text').forEach(el => {
    el.style.display = _translitOn ? 'block' : 'none';
  });
  /* Mettre en valeur le bouton */
  const btn = document.getElementById('btn-translit');
  if (btn) btn.classList.toggle('active', _translitOn);
  showToast(_translitOn ? '🔤 Translittération activée' : '🔤 Translittération masquée');
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

function renderVerses(surahNum, arVerses, frVerses, tlVerses, container, meta) {
  let html = '';
  const surahNameFr = meta?.name || '';

  // Bismillah sauf At-Tawba (9) et Al-Fatiha (1 qui l'intègre comme v.1)
  if (surahNum !== 9) {
    html += `<div class="bismillah-verse">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
  }

  arVerses.forEach((av, i) => {
    const fv = frVerses[i] || {};
    const tv = tlVerses[i]  || {};
    const frText = (fv.text || '').replace(/^\d+\.\s*/, '');
    const tlText = tv.text  || '';
    const tlDisplay = _translitOn ? '' : ' style="display:none"';
    html += `
      <div class="verse-block" id="v${av.numberInSurah}" data-verse="${av.numberInSurah}">
        <div class="verse-header">
          <div class="verse-badge">${av.numberInSurah}</div>
          <div class="verse-actions">
            <button class="verse-action-btn" title="Copier le verset" onclick="copyVerse(${av.numberInSurah}, this)">${window.AlHudaIcons?.get('copy',15)||'📋'}</button>
            <button class="verse-action-btn vab-bookmark" title="Marquer ce verset" onclick="bookmarkVerse(${surahNum}, ${av.numberInSurah}, '${surahNameFr.replace(/'/g,"\\'")}', this)">${window.AlHudaIcons?.get('bookmark',15)||'🔖'}</button>
            <button class="verse-action-btn vab-note" title="Ajouter une note" onclick="openNoteModal(${surahNum}, ${av.numberInSurah})">${window.AlHudaIcons?.get('note',15)||'📝'}</button>
            <button class="verse-action-btn vab-card" title="Créer une carte partageable" onclick="openShareCard(${surahNum}, ${av.numberInSurah}, '${surahNameFr.replace(/'/g,"\\'")}')">  ${window.AlHudaIcons?.get('palette',15)||'🎨'}</button>
            <button class="verse-action-btn" title="Partager" onclick="shareVerse(${surahNum}, ${av.numberInSurah})">${window.AlHudaIcons?.get('share',15)||'↗'}</button>
          </div>
        </div>
        <div class="verse-arabic-text">${av.text} ﴿${toArabicNum(av.numberInSurah)}﴾</div>
        ${tlText ? `<div class="verse-translit-text"${tlDisplay}>${escapeHtml(tlText)}</div>` : ''}
        <div class="verse-french-text">${escapeHtml(frText)}</div>
      </div>
    `;
  });

  container.innerHTML = html;
  restoreVerseStates(surahNum);
  updateFavCount();

  /* Tracker la lecture */
  window.AlHudaTracker?.trackSurah(surahNum);

  /* Stocker pour Mode Immersif */
  _immVerses = arVerses.map((av, i) => ({
    num:    av.numberInSurah,
    arabic: av.text + ' ﴿' + toArabicNum(av.numberInSurah) + '﴾',
    french: ((frVerses[i]?.text || '').replace(/^\d+\.\s*/, '')),
    translit: tlVerses[i]?.text || ''
  }));
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

  // Audio — construction du player
  _buildReciterGrid(surahNum);
  _initProgressBar(surahNum);

  document.getElementById('btn-audio')?.addEventListener('click', () => {
    const player = document.getElementById('audio-player');
    const isVisible = player.style.display !== 'none';
    player.style.display = isVisible ? 'none' : '';
    if (!isVisible) loadAudio(surahNum);
  });
  document.getElementById('btn-audio-close')?.addEventListener('click', () => {
    document.getElementById('audio-player').style.display = 'none';
  });
  document.getElementById('btn-play-pause')?.addEventListener('click', _togglePlayPause);
  document.getElementById('btn-mute')?.addEventListener('click', () => {
    const audio = document.getElementById('audio-element');
    if (!audio) return;
    audio.muted = !audio.muted;
    const muteBtn = document.getElementById('btn-mute');
    if (muteBtn) muteBtn.innerHTML = audio.muted
      ? (window.AlHudaIcons?.get('volume-off',18) || '🔇')
      : (window.AlHudaIcons?.get('volume',18) || '🔊');
  });
  document.getElementById('btn-speed')?.addEventListener('click', () => {
    const speeds = [0.75, 1, 1.25, 1.5];
    const audio  = document.getElementById('audio-element');
    const btn    = document.getElementById('btn-speed');
    if (!btn) return;
    const curRate = audio?.playbackRate || 1;
    const cur     = speeds.findIndex(s => Math.abs(s - curRate) < 0.01);
    const next    = speeds[(cur + 1) % speeds.length];
    if (audio) audio.playbackRate = next;
    btn.textContent = next + '×';
  });

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
  document.getElementById('btn-loop')?.addEventListener('click', () => {
    const audio = document.getElementById('audio-element');
    if (!audio) return;
    audio.loop = !audio.loop;
    document.getElementById('btn-loop').classList.toggle('active', audio.loop);
    showToast(audio.loop ? '🔁 Répétition activée' : 'Répétition désactivée');
  });

  // Toggle langue traduction
  document.getElementById('lang-fr')?.addEventListener('click', () => switchLang('fr', surahNum));
  document.getElementById('lang-en')?.addEventListener('click', () => switchLang('en', surahNum));

  // Toggle translittération
  document.getElementById('btn-translit')?.addEventListener('click', toggleTranslit);

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
  initImmersiveMode();

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
  const audio   = document.getElementById('audio-element');
  if (!audio) return;

  const reciter = RECITERS.find(r => r.id === _currentReciterId) || RECITERS[0];

  // Mettre à jour l'UI récitateur
  const nameEl  = document.getElementById('reciter-name');
  const flagEl  = document.getElementById('player-flag');
  const styleEl = document.getElementById('player-style');
  if (nameEl)  nameEl.textContent  = reciter.name;
  if (flagEl)  flagEl.textContent  = reciter.country;
  if (styleEl) styleEl.textContent = reciter.style === 'Mujawwad' ? 'Mujawwad' : 'Murattal · Hafs';

  // Réinitialiser la progression
  _resetPlayerUI();
  _setPlayerLoading(true);

  // Construire l'URL selon la source
  let url;
  if (reciter.id.startsWith('qdc:')) {
    /* download.quranicaudio.com — certains récitateurs nécessitent le numéro padé */
    const path  = reciter.id.replace('qdc:', '');
    const sNum  = reciter.padded ? String(surahNum).padStart(3, '0') : surahNum;
    url = `https://download.quranicaudio.com/qdc/${path}/${sNum}.mp3`;
  } else if (reciter.id.startsWith('mp3q:')) {
    /* mp3quran.net — toujours padé sur 3 chiffres */
    const path   = reciter.id.replace('mp3q:', '');
    const padded = String(surahNum).padStart(3, '0');
    url = `https://${path}/${padded}.mp3`;
  } else {
    url = `https://cdn.islamic.network/quran/audio-surah/128/${reciter.id}/${surahNum}.mp3`;
  }

  audio.src          = url;
  const speedTxt     = document.getElementById('btn-speed')?.textContent || '1×';
  audio.playbackRate = parseFloat(speedTxt.replace('×', '')) || 1;
  audio.preload      = 'auto';
  audio.load();

  audio.oncanplay = () => {
    _setPlayerLoading(false);
    const durEl = document.getElementById('player-duration');
    if (durEl) durEl.textContent = _fmtTime(audio.duration);
    const playBtn = document.getElementById('btn-play-pause');
    if (playBtn) playBtn.disabled = false;
  };
  audio.onerror = () => {
    _setPlayerLoading(false);
    showToast('⚠️ Audio indisponible pour ce récitateur');
  };
  audio.ontimeupdate = _updateProgress;
  audio.onended = () => {
    const playBtn = document.getElementById('btn-play-pause');
    if (playBtn) {
      playBtn.querySelector('.play-icon').style.display  = '';
      playBtn.querySelector('.pause-icon').style.display = 'none';
    }
  };
}

/* ---- Construction de la grille récitateurs ---- */
function _buildReciterGrid(surahNum) {
  const chips = document.getElementById('reciter-chips');
  if (!chips) return;

  /* Valider l'ID sauvegardé — fallback si inconnu (ancien format) */
  const saved = localStorage.getItem('al-huda-reciter');
  if (saved && RECITERS.some(r => r.id === saved)) {
    _currentReciterId = saved;
  } else {
    _currentReciterId = _DEFAULT_RECITER;
    localStorage.setItem('al-huda-reciter', _currentReciterId);
  }

  chips.innerHTML = RECITERS.map(r => `
    <button class="reciter-chip ${r.id === _currentReciterId ? 'active' : ''}"
            data-id="${r.id}" title="${r.name}">
      <span class="chip-flag">${r.country}</span>
      <span class="chip-name">${r.short}</span>
      ${r.style === 'Mujawwad' ? '<span class="chip-badge">Mujawwad</span>' : ''}
    </button>
  `).join('');

  chips.querySelectorAll('.reciter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.id === _currentReciterId) return;
      _currentReciterId = btn.dataset.id;
      localStorage.setItem('al-huda-reciter', _currentReciterId);
      chips.querySelectorAll('.reciter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Arrêter la lecture en cours
      const audio = document.getElementById('audio-element');
      if (audio) { audio.pause(); audio.src = ''; }
      const playBtn = document.getElementById('btn-play-pause');
      if (playBtn) {
        playBtn.querySelector('.play-icon').style.display  = '';
        playBtn.querySelector('.pause-icon').style.display = 'none';
        playBtn.disabled = true;
      }
      loadAudio(surahNum);
    });
  });
}

/* ---- Contrôle lecture/pause ---- */
function _togglePlayPause() {
  const audio   = document.getElementById('audio-element');
  const playBtn = document.getElementById('btn-play-pause');
  if (!audio || !audio.src || !playBtn) return;

  if (audio.paused) {
    audio.play();
    playBtn.querySelector('.play-icon').style.display  = 'none';
    playBtn.querySelector('.pause-icon').style.display = '';
  } else {
    audio.pause();
    playBtn.querySelector('.play-icon').style.display  = '';
    playBtn.querySelector('.pause-icon').style.display = 'none';
  }
}

/* ---- Mise à jour de la barre de progression ---- */
function _updateProgress() {
  const audio = document.getElementById('audio-element');
  if (!audio || isNaN(audio.duration) || audio.duration === 0) return;

  const pct = (audio.currentTime / audio.duration) * 100;
  const fill  = document.getElementById('player-fill');
  const thumb = document.getElementById('player-thumb');
  const cur   = document.getElementById('player-current');
  if (fill)  fill.style.width   = pct + '%';
  if (thumb) thumb.style.left   = pct + '%';
  if (cur)   cur.textContent    = _fmtTime(audio.currentTime);
}

/* ---- Clic sur la barre de progression ---- */
function _initProgressBar(surahNum) {
  const bar = document.getElementById('player-progress-bar');
  if (!bar) return;
  let dragging = false;

  function seek(e) {
    const audio = document.getElementById('audio-element');
    if (!audio || !audio.duration) return;
    const rect = bar.getBoundingClientRect();
    const x    = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const pct  = Math.max(0, Math.min(1, x / rect.width));
    audio.currentTime = pct * audio.duration;
    _updateProgress();
  }

  bar.addEventListener('mousedown',  e => { dragging = true; seek(e); });
  bar.addEventListener('touchstart', e => { dragging = true; seek(e); }, { passive: true });
  window.addEventListener('mousemove',  e => { if (dragging) seek(e); });
  window.addEventListener('touchmove',  e => { if (dragging) seek(e); }, { passive: true });
  window.addEventListener('mouseup',  () => { dragging = false; });
  window.addEventListener('touchend', () => { dragging = false; });
}

/* ---- Réinitialiser l'UI du player ---- */
function _resetPlayerUI() {
  const fill  = document.getElementById('player-fill');
  const thumb = document.getElementById('player-thumb');
  const cur   = document.getElementById('player-current');
  const dur   = document.getElementById('player-duration');
  if (fill)  fill.style.width  = '0%';
  if (thumb) thumb.style.left  = '0%';
  if (cur)   cur.textContent   = '0:00';
  if (dur)   dur.textContent   = '–:––';
  const playBtn = document.getElementById('btn-play-pause');
  if (playBtn) {
    playBtn.querySelector('.play-icon').style.display  = '';
    playBtn.querySelector('.pause-icon').style.display = 'none';
    playBtn.disabled = true;
  }
}

/* ---- Afficher/masquer le loading ---- */
function _setPlayerLoading(on) {
  const el = document.getElementById('player-loading');
  if (el) el.style.display = on ? 'flex' : 'none';
}

/* ---- Formater les secondes en m:ss ---- */
function _fmtTime(s) {
  if (!s || isNaN(s)) return '–:––';
  const m   = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + String(sec).padStart(2, '0');
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

/* ============================================================
   MODE IMMERSIF
   ============================================================ */
let _immInited = false;

function initImmersiveMode() {
  if (_immInited) return; // n'initialiser qu'une seule fois
  _immInited = true;

  const overlay  = document.getElementById('immersive-overlay');
  const openBtn  = document.getElementById('btn-immersive');
  if (!overlay || !openBtn) return;

  /* --- Ouverture depuis le bouton toolbar --- */
  openBtn.addEventListener('click', () => {
    if (!_immVerses.length) { showToast('⏳ Versets en cours de chargement…'); return; }
    const startIdx = _getFirstVisibleVerseIdx();
    _immOpen(startIdx);
  });

  /* --- Fermeture --- */
  document.getElementById('imm-exit-btn')?.addEventListener('click', _immClose);

  /* --- Navigation --- */
  document.getElementById('imm-prev')?.addEventListener('click', () => _immGo(-1));
  document.getElementById('imm-next')?.addEventListener('click', () => _immGo(1));

  /* --- Taille police --- */
  document.getElementById('imm-fs-down')?.addEventListener('click', () => {
    if (_immFsLevel > 0) { _immFsLevel--; _immApplyFs(); }
  });
  document.getElementById('imm-fs-up')?.addEventListener('click', () => {
    if (_immFsLevel < IMM_FS_SIZES.length - 1) { _immFsLevel++; _immApplyFs(); }
  });

  /* --- Son --- */
  document.getElementById('imm-sound-btn')?.addEventListener('click', _immToggleSound);

  /* --- Auto-avance --- */
  document.getElementById('imm-auto-btn')?.addEventListener('click', _immToggleAuto);

  /* --- Clavier --- */
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape')                            { _immClose(); }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { _immGo(1);  }
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { _immGo(-1); }
  });

  /* --- Swipe tactile --- */
  let _tx = 0;
  overlay.addEventListener('touchstart', e => { _tx = e.touches[0].clientX; }, { passive: true });
  overlay.addEventListener('touchend', e => {
    const dx = _tx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 55) _immGo(dx > 0 ? 1 : -1);
  });
}

/* Trouver l'index du premier verset visible à l'écran */
function _getFirstVisibleVerseIdx() {
  const blocks = document.querySelectorAll('[data-verse]');
  for (const b of blocks) {
    const r = b.getBoundingClientRect();
    if (r.top >= 0 && r.top < window.innerHeight * 0.75) {
      const vn = parseInt(b.dataset.verse);
      const idx = _immVerses.findIndex(v => v.num === vn);
      if (idx >= 0) return idx;
    }
  }
  return 0;
}

/* Ouvrir */
function _immOpen(idx = 0) {
  _immIdx = Math.max(0, Math.min(idx, _immVerses.length - 1));
  const overlay = document.getElementById('immersive-overlay');
  if (!overlay) return;

  // Infos sourate
  const name = document.getElementById('surah-name-fr')?.textContent || '';
  const num  = document.getElementById('surah-number-badge')?.textContent || '';
  setText('imm-surah-name', name);
  setText('imm-surah-sub',  `Sourate ${num}`);

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  _immApplyFs();
  _immStartCanvas();
  _immRender(false);
}

/* Fermer */
function _immClose() {
  document.getElementById('immersive-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
  _immStopCanvas();
  _immStopSound();
  _immStopAuto();
}

/* Afficher le verset courant */
function _immRender(animate = true) {
  const v       = _immVerses[_immIdx];
  const arEl    = document.getElementById('imm-arabic');
  const frEl    = document.getElementById('imm-french');
  const numEl   = document.getElementById('imm-verse-num');
  const fill    = document.getElementById('imm-progress-fill');
  const progTxt = document.getElementById('imm-progress-text');
  const btnPrev = document.getElementById('imm-prev');
  const btnNext = document.getElementById('imm-next');
  if (!v || !arEl) return;

  const doUpdate = () => {
    arEl.textContent  = v.arabic;
    frEl.textContent  = v.french;
    if (numEl) numEl.textContent = v.num;
    const pct = ((_immIdx + 1) / _immVerses.length) * 100;
    if (fill)    fill.style.width  = pct + '%';
    if (progTxt) progTxt.textContent = `${_immIdx + 1} / ${_immVerses.length}`;
    if (btnPrev) btnPrev.disabled = _immIdx === 0;
    if (btnNext) btnNext.disabled = _immIdx === _immVerses.length - 1;
    arEl.classList.remove('imm-fade');
    frEl.classList.remove('imm-fade');
  };

  if (animate) {
    arEl.classList.add('imm-fade');
    frEl.classList.add('imm-fade');
    setTimeout(doUpdate, 340);
  } else {
    doUpdate();
  }
}

/* Naviguer */
function _immGo(dir) {
  const next = _immIdx + dir;
  if (next < 0 || next >= _immVerses.length) return;
  _immIdx = next;
  _immRender(true);
  _immResetAuto();
}

/* ---- Taille de police arabe ---- */
function _immApplyFs() {
  const arEl  = document.getElementById('imm-arabic');
  const label = document.getElementById('imm-fs-label');
  const down  = document.getElementById('imm-fs-down');
  const up    = document.getElementById('imm-fs-up');
  if (arEl)  arEl.style.fontSize  = IMM_FS_SIZES[_immFsLevel];
  if (label) label.textContent    = IMM_FS_LABELS[_immFsLevel];
  if (down)  down.disabled        = _immFsLevel === 0;
  if (up)    up.disabled          = _immFsLevel === IMM_FS_SIZES.length - 1;
}

/* ---- Canvas étoilé ---- */
function _immStartCanvas() {
  const canvas = document.getElementById('imm-canvas');
  if (!canvas) return;

  // Dimensionner
  const resize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  const _ro = () => resize();
  window.addEventListener('resize', _ro);
  canvas._ro = _ro;

  const ctx = canvas.getContext('2d');
  const W   = () => canvas.width;
  const H   = () => canvas.height;

  // Générer les étoiles
  const stars = Array.from({ length: 160 }, () => ({
    x:    Math.random(),        // fraction de W
    y:    Math.random(),        // fraction de H
    r:    Math.random() * 1.4 + 0.25,
    a:    Math.random(),        // alpha actuel
    da:   (Math.random() * 0.006 + 0.001) * (Math.random() < .5 ? 1 : -1),
    dx:   (Math.random() - 0.5) * 0.00012,
    dy:   (Math.random() - 0.5) * 0.00012,
    gold: Math.random() < 0.18, // étoile dorée
  }));

  // Quelques étoiles filantes occasionnelles
  let shooting = null;

  function spawnShooting() {
    if (shooting) return;
    shooting = {
      x: Math.random() * 0.6,
      y: Math.random() * 0.4,
      len: Math.random() * 0.12 + 0.06,
      a: 1,
      angle: Math.PI / 4 + (Math.random() - .5) * 0.5,
      speed: 0.004 + Math.random() * 0.003,
    };
    setTimeout(() => { shooting = null; }, 1200);
  }
  setInterval(spawnShooting, 5000 + Math.random() * 8000);

  function draw() {
    const w = W(), h = H();

    // Fond dégradé
    const grad = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
    grad.addColorStop(0,   '#0f1f10');
    grad.addColorStop(0.4, '#090e09');
    grad.addColorStop(1,   '#040704');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Étoiles filantes
    if (shooting) {
      shooting.x += Math.cos(shooting.angle) * shooting.speed;
      shooting.y += Math.sin(shooting.angle) * shooting.speed;
      shooting.a -= 0.012;
      if (shooting.a > 0) {
        ctx.save();
        ctx.globalAlpha = shooting.a * 0.7;
        ctx.strokeStyle = '#C9A84C';
        ctx.lineWidth   = 1.2;
        ctx.beginPath();
        ctx.moveTo(shooting.x * w, shooting.y * h);
        ctx.lineTo(
          (shooting.x - Math.cos(shooting.angle) * shooting.len) * w,
          (shooting.y - Math.sin(shooting.angle) * shooting.len) * h
        );
        ctx.stroke();
        ctx.restore();
      } else {
        shooting = null;
      }
    }

    // Étoiles
    stars.forEach(s => {
      // Mouvement + scintillement
      s.a += s.da;
      if (s.a >= 1)   { s.a = 1;   s.da *= -1; }
      if (s.a <= 0.1) { s.a = 0.1; s.da *= -1; }
      s.x += s.dx; if (s.x < 0) s.x = 1; if (s.x > 1) s.x = 0;
      s.y += s.dy; if (s.y < 0) s.y = 1; if (s.y > 1) s.y = 0;

      const px = s.x * w, py = s.y * h;

      // Halo doux pour les grandes
      if (s.r > 1.1) {
        const glow = ctx.createRadialGradient(px, py, 0, px, py, s.r * 5);
        glow.addColorStop(0, s.gold ? `rgba(201,168,76,${s.a * 0.18})` : `rgba(255,255,255,${s.a * 0.12})`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(px, py, s.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      // Point central
      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.gold
        ? `rgba(201,168,76,${s.a * 0.85})`
        : `rgba(255,255,255,${s.a * 0.7})`;
      ctx.fill();
    });

    _immRafId = requestAnimationFrame(draw);
  }

  _immRafId = requestAnimationFrame(draw);
}

function _immStopCanvas() {
  if (_immRafId) { cancelAnimationFrame(_immRafId); _immRafId = null; }
  // Nettoyer le listener resize
  const canvas = document.getElementById('imm-canvas');
  if (canvas?._ro) { window.removeEventListener('resize', canvas._ro); canvas._ro = null; }
}

/* ---- Son ambiance (pluie douce) — Web Audio API ---- */
function _immToggleSound() {
  const btn = document.getElementById('imm-sound-btn');
  if (_immSound) {
    _immStopSound();
    if (btn) { btn.innerHTML = (window.AlHudaIcons?.get('volume-off',15)||'🔇') + ' Son'; btn.classList.remove('active'); }
  } else {
    _immStartSound();
    if (btn) { btn.innerHTML = (window.AlHudaIcons?.get('volume',15)||'🔊') + ' Son'; btn.classList.add('active'); }
  }
}

function _immStartSound() {
  try {
    const ctx        = new (window.AudioContext || window.webkitAudioContext)();
    const sampleRate = ctx.sampleRate;
    const bufLen     = sampleRate * 4;
    const buffer     = ctx.createBuffer(2, bufLen, sampleRate);

    // Pink noise (approximation de Pirkle)
    for (let ch = 0; ch < 2; ch++) {
      const d = buffer.getChannelData(ch);
      let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0;
      for (let i = 0; i < bufLen; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.99886*b0 + w*0.0555179;
        b1 = 0.99332*b1 + w*0.0750759;
        b2 = 0.96900*b2 + w*0.1538520;
        b3 = 0.86650*b3 + w*0.3104856;
        b4 = 0.55000*b4 + w*0.5329522;
        b5 = -0.7616*b5 - w*0.0168980;
        d[i] = (b0+b1+b2+b3+b4+b5 + w*0.5362) * 0.115;
      }
    }

    const src    = ctx.createBufferSource();
    src.buffer   = buffer;
    src.loop     = true;

    const filter = ctx.createBiquadFilter();
    filter.type  = 'lowpass';
    filter.frequency.value = 700;
    filter.Q.value = 0.5;

    const gain   = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.5);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();

    _immSound = { ctx, src, gain };
  } catch {
    showToast('⚠️ Audio non disponible sur ce navigateur');
  }
}

function _immStopSound() {
  if (!_immSound) return;
  try {
    const { ctx, src, gain } = _immSound;
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    setTimeout(() => { try { src.stop(); ctx.close(); } catch {} }, 900);
  } catch {}
  _immSound = null;
}

/* ---- Auto-avance (8 s par verset) ---- */
function _immToggleAuto() {
  const btn = document.getElementById('imm-auto-btn');
  if (_immAutoOn) {
    _immStopAuto();
    if (btn) { btn.textContent = '▶ Auto'; btn.classList.remove('active'); }
  } else {
    _immStartAuto();
    if (btn) { btn.textContent = '⏸ Auto'; btn.classList.add('active'); }
  }
}

function _immStartAuto() {
  _immAutoOn = true;
  _immAuto   = setInterval(() => {
    if (_immIdx < _immVerses.length - 1) {
      _immIdx++;
      _immRender(true);
    } else {
      _immStopAuto();
      const btn = document.getElementById('imm-auto-btn');
      if (btn) { btn.textContent = '▶ Auto'; btn.classList.remove('active'); }
      showToast('✓ Fin de la sourate');
    }
  }, 8000);
}

function _immStopAuto() {
  clearInterval(_immAuto);
  _immAuto   = null;
  _immAutoOn = false;
}

function _immResetAuto() {
  if (!_immAutoOn) return;
  clearInterval(_immAuto);
  _immStartAuto();
}
