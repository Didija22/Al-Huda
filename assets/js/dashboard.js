/* ============================================================
   AL-HUDA — Tableau de bord spirituel
   ============================================================ */

/* Noms des sourates (pour les tooltips) */
const SURAH_NAMES = ["Al-Fatiha","Al-Baqara","Al-Imran","An-Nisa","Al-Maida","Al-An'am","Al-A'raf","Al-Anfal","At-Tawba","Yunus","Hud","Yusuf","Ar-Ra'd","Ibrahim","Al-Hijr","An-Nahl","Al-Isra","Al-Kahf","Maryam","Ta-Ha","Al-Anbiya","Al-Hajj","Al-Mu'minun","An-Nur","Al-Furqan","Ash-Shu'ara","An-Naml","Al-Qasas","Al-'Ankabut","Ar-Rum","Luqman","As-Sajda","Al-Ahzab","Saba","Fatir","Ya-Sin","As-Saffat","Sad","Az-Zumar","Ghafir","Fussilat","Ash-Shura","Az-Zukhruf","Ad-Dukhan","Al-Jathiya","Al-Ahqaf","Muhammad","Al-Fath","Al-Hujurat","Qaf","Adh-Dhariyat","At-Tur","An-Najm","Al-Qamar","Ar-Rahman","Al-Waqi'a","Al-Hadid","Al-Mujadila","Al-Hashr","Al-Mumtahina","As-Saff","Al-Jumu'a","Al-Munafiqun","At-Taghabun","At-Talaq","At-Tahrim","Al-Mulk","Al-Qalam","Al-Haqqa","Al-Ma'arij","Nuh","Al-Jinn","Al-Muzzammil","Al-Muddaththir","Al-Qiyama","Al-Insan","Al-Mursalat","An-Naba","An-Nazi'at","'Abasa","At-Takwir","Al-Infitar","Al-Mutaffifin","Al-Inshiqaq","Al-Buruj","At-Tariq","Al-A'la","Al-Ghashiya","Al-Fajr","Al-Balad","Ash-Shams","Al-Layl","Ad-Duha","Ash-Sharh","At-Tin","Al-'Alaq","Al-Qadr","Al-Bayyina","Az-Zalzala","Al-'Adiyat","Al-Qari'a","At-Takathur","Al-'Asr","Al-Humaza","Al-Fil","Quraysh","Al-Ma'un","Al-Kawthar","Al-Kafirun","An-Nasr","Al-Masad","Al-Ikhlas","Al-Falaq","An-Nas"];

/* Achievements */
const ACHIEVEMENTS = [
  { id:'first_bm',   icon:'🔖', title:'Premier signet',      desc:'1 verset sauvegardé',       check: d => d.bookmarks  >= 1  },
  { id:'bm_10',      icon:'📚', title:'Lecteur assidu',      desc:'10 versets sauvegardés',     check: d => d.bookmarks  >= 10 },
  { id:'first_note', icon:'📝', title:'Première réflexion',  desc:'1 note personnelle',         check: d => d.notes      >= 1  },
  { id:'first_surah',icon:'📖', title:'Première sourate',    desc:'1 sourate lue',              check: d => d.surahsRead >= 1  },
  { id:'surah_10',   icon:'🌟', title:'Explorateur du Coran',desc:'10 sourates lues',           check: d => d.surahsRead >= 10 },
  { id:'surah_30',   icon:'🏆', title:'Hafidh en chemin',    desc:'30 sourates lues',           check: d => d.surahsRead >= 30 },
  { id:'streak_3',   icon:'🔥', title:'Régularité',          desc:'3 jours consécutifs',        check: d => d.streak     >= 3  },
  { id:'streak_7',   icon:'⚡', title:'Semaine complète',    desc:'7 jours consécutifs',        check: d => d.streak     >= 7  },
  { id:'streak_30',  icon:'💎', title:'Mois de dévotion',    desc:'30 jours consécutifs',       check: d => d.streak     >= 30 },
  { id:'quiz_done',  icon:'🧠', title:'Premier quiz',         desc:'1 quiz complété',            check: d => d.quizDone   >= 1  },
  { id:'quiz_5',     icon:'🎓', title:'Bachelier islamique',  desc:'5 quiz complétés',           check: d => d.quizDone   >= 5  },
  { id:'immersif',   icon:'🌙', title:'Mode contemplatif',    desc:'Mode immersif utilisé',      check: () => !!localStorage.getItem('alhuda_immersif_used') },
];

/* ============================================================
   INITIALISATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const stats = window.AlHudaTracker?.getStats() || _fallbackStats();

  _renderGreeting();
  _renderStreak(stats);
  _renderStats(stats);
  _renderQuranProgress(stats);
  _renderBadges(stats);
  _renderWeekChart(stats);
  _renderActivity();

  /* Bouton de reset */
  document.getElementById('db-reset-btn')?.addEventListener('click', () => {
    if (!confirm('Réinitialiser toutes vos données de suivi ? (marque-pages et notes conservés)')) return;
    ['alhuda_streak','alhuda_surahs','alhuda_daily','alhuda_quiz_stats','alhuda_immersif_used']
      .forEach(k => localStorage.removeItem(k));
    location.reload();
  });
});

/* ---- Fallback si tracker absent ---- */
function _fallbackStats() {
  const bm    = Object.keys(localStorage).filter(k => k.startsWith('alhuda_bm_')).length;
  const notes = Object.keys(localStorage).filter(k => k.startsWith('alhuda_note_')).length;
  return { streak:0, bestStreak:0, surahsRead:0, surahsMap:{}, bookmarks:bm, notes, quizDone:0, quizAvg:0,
           week: Array.from({length:7}, (_,i) => ({ date:'', surahs:0, quizzes:0 })) };
}

/* ---- Salutation selon l'heure ---- */
function _renderGreeting() {
  const h = new Date().getHours();
  const g = h < 5 ? 'بارك الله فيك' : h < 12 ? 'Bonjour' : h < 17 ? 'Bon après-midi' : h < 20 ? 'Bonsoir' : 'Bonne soirée';
  const el = document.getElementById('db-greeting');
  if (el) el.textContent = g + ' — As-salâmu alaykum 🌿';
}

/* ---- Badge streak hero ---- */
function _renderStreak(stats) {
  const el = document.getElementById('db-streak-num');
  if (el) el.textContent = stats.streak;
  const best = document.getElementById('db-best-streak');
  if (best) best.textContent = `Meilleur : ${stats.bestStreak} j`;
}

/* ---- 6 cartes de stats ---- */
function _renderStats(stats) {
  const map = {
    'db-s-surahs':   { num: stats.surahsRead,  lbl: 'Sourates lues',      cls: 'green' },
    'db-s-streak':   { num: stats.streak,       lbl: 'Jours consécutifs',  cls: ''      },
    'db-s-bm':       { num: stats.bookmarks,    lbl: 'Marque-pages',       cls: ''      },
    'db-s-notes':    { num: stats.notes,        lbl: 'Notes personnelles',  cls: ''      },
    'db-s-quiz':     { num: stats.quizDone,     lbl: 'Quiz complétés',     cls: ''      },
    'db-s-score':    { num: stats.quizAvg + '%',lbl: 'Score quiz moyen',   cls: stats.quizAvg >= 80 ? 'gold' : '' },
  };
  Object.entries(map).forEach(([id, { num, lbl, cls }]) => {
    const card = document.getElementById(id);
    if (!card) return;
    card.querySelector('.db-stat-num').textContent = num;
    card.querySelector('.db-stat-num').className   = 'db-stat-num ' + cls;
    card.querySelector('.db-stat-lbl').textContent = lbl;
  });
}

/* ---- Progression Coran (114 mini-dots) ---- */
function _renderQuranProgress(stats) {
  const grid    = document.getElementById('db-surahs-grid');
  const pctEl   = document.getElementById('db-quran-pct');
  const fillEl  = document.getElementById('db-progress-fill');
  const countEl = document.getElementById('db-surahs-count');
  if (!grid) return;

  const readMap = stats.surahsMap || {};
  const readN   = Object.keys(readMap).length;
  const pct     = Math.round((readN / 114) * 100);

  if (pctEl)   pctEl.textContent   = pct + '%';
  if (fillEl)  fillEl.style.width  = pct + '%';
  if (countEl) countEl.textContent = `${readN} / 114 sourates`;

  grid.innerHTML = Array.from({ length: 114 }, (_, i) => {
    const n    = i + 1;
    const read = !!readMap[n];
    return `<div class="db-surah-dot ${read ? 'read' : ''}" title="${n}. ${SURAH_NAMES[i] || ''}"></div>`;
  }).join('');
}

/* ---- Badges ---- */
function _renderBadges(stats) {
  const grid = document.getElementById('db-badges-grid');
  if (!grid) return;
  grid.innerHTML = ACHIEVEMENTS.map(a => {
    const ok = a.check(stats);
    return `
      <div class="db-badge ${ok ? 'unlocked' : ''}">
        <span class="db-badge-icon">${a.icon}</span>
        <div class="db-badge-info">
          <div class="db-badge-name">${a.title}</div>
          <div class="db-badge-desc">${a.desc}</div>
        </div>
      </div>`;
  }).join('');
}

/* ---- Graphe hebdomadaire (Canvas) ---- */
function _renderWeekChart(stats) {
  const canvas = document.getElementById('db-chart');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  const W      = canvas.offsetWidth || 600;
  const H      = 120;
  canvas.width  = W * window.devicePixelRatio;
  canvas.height = H * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const week   = stats.week;
  const maxVal = Math.max(...week.map(d => d.surahs), 1);
  const barW   = (W - 40) / 7;
  const barArea= H - 40;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textC  = isDark ? 'rgba(255,255,255,.45)' : 'rgba(0,0,0,.4)';
  const green  = '#1B6B3A';
  const greenL = 'rgba(27,107,58,.15)';

  week.forEach((d, i) => {
    const x   = 20 + i * barW + barW * 0.15;
    const bw  = barW * 0.7;
    const bh  = d.surahs > 0 ? Math.max((d.surahs / maxVal) * barArea, 6) : 4;
    const y   = H - 28 - bh;

    /* Barre fond */
    ctx.fillStyle = greenL;
    ctx.beginPath();
    ctx.roundRect?.(x, H - 28 - barArea, bw, barArea, 4) || ctx.fillRect(x, H-28-barArea, bw, barArea);
    ctx.fill();

    /* Barre valeur */
    if (d.surahs > 0) {
      const grad = ctx.createLinearGradient(0, y, 0, y + bh);
      grad.addColorStop(0, green);
      grad.addColorStop(1, 'rgba(27,107,58,.4)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect?.(x, y, bw, bh, 4) || ctx.fillRect(x, y, bw, bh);
      ctx.fill();
    }

    /* Jour */
    const day  = d.date ? new Date(d.date + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'short' }) : '';
    ctx.fillStyle  = textC;
    ctx.font       = `${11}px Poppins, sans-serif`;
    ctx.textAlign  = 'center';
    ctx.fillText(day, x + bw / 2, H - 10);

    /* Valeur au-dessus si > 0 */
    if (d.surahs > 0) {
      ctx.fillStyle = green;
      ctx.font      = `bold ${10}px Poppins, sans-serif`;
      ctx.fillText(d.surahs, x + bw / 2, y - 4);
    }
  });
}

/* ---- Activité récente (marque-pages + notes) ---- */
function _renderActivity() {
  const wrap = document.getElementById('db-activity-list');
  if (!wrap) return;

  const items = [];

  /* Marque-pages */
  Object.keys(localStorage)
    .filter(k => k.startsWith('alhuda_bm_'))
    .forEach(k => {
      try {
        const b = JSON.parse(localStorage.getItem(k));
        if (b) items.push({ type:'bm', icon:'🔖', ts: b.ts, arabic: b.arabic, label: `${b.surahNameFr} — V.${b.verseNum}`, link: `../quran/surah.html?s=${b.surahNum}#v${b.verseNum}` });
      } catch {}
    });

  /* Notes */
  Object.keys(localStorage)
    .filter(k => k.startsWith('alhuda_note_'))
    .forEach(k => {
      try {
        const [,,sn,vn] = k.split('_');
        const n = JSON.parse(localStorage.getItem(k));
        if (n) items.push({ type:'note', icon:'📝', ts: n.ts, arabic: n.text, label: `Sourate ${sn} — V.${vn}`, link: `../quran/surah.html?s=${sn}#v${vn}` });
      } catch {}
    });

  /* Trier par date décroissante, prendre les 6 derniers */
  items.sort((a, b) => (b.ts||0) - (a.ts||0));
  const recent = items.slice(0, 6);

  if (!recent.length) {
    wrap.innerHTML = `<div class="db-empty"><span class="e-icon">📖</span>Aucune activité récente.<br>Commencez par lire une sourate et sauvegardez vos versets préférés.</div>`;
    return;
  }

  wrap.innerHTML = recent.map(item => `
    <a href="${item.link}" class="db-activity-item" style="text-decoration:none;">
      <div class="db-act-icon">${item.icon}</div>
      <div style="flex:1;min-width:0;">
        <span class="db-act-arabic">${_truncate(item.arabic, 60)}</span>
        <span class="db-act-text">${item.label}</span>
      </div>
      <span class="db-act-date">${_relDate(item.ts)}</span>
    </a>`
  ).join('');
}

/* ---- Utilitaires ---- */
function _truncate(str, max) {
  if (!str) return '';
  return str.length > max ? str.slice(0, max) + '…' : str;
}
function _relDate(ts) {
  if (!ts) return '';
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1)   return "à l'instant";
  if (m < 60)  return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `il y a ${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7)   return `il y a ${d}j`;
  return new Date(ts).toLocaleDateString('fr-FR');
}
