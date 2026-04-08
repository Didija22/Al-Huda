/* ============================================================
   AL-HUDA — Générateur de cartes de versets partageables
   Canvas API — 1080×1080 (carré) ou 1080×1920 (story)
   ============================================================ */

/* ---- 5 thèmes visuels ---- */
const SC_THEMES = [
  {
    id: 'green',
    label: 'Vert islamique',
    swatch: ['#0a1a0b', '#1B6B3A'],
    bg:     ['#061208', '#0d2410', '#1a4a22'],
    text:   '#FFFFFF',
    accent: '#C9A84C',
    sub:    'rgba(255,255,255,0.62)',
    ref:    '#C9A84C',
  },
  {
    id: 'gold',
    label: 'Or & Nuit',
    swatch: ['#120d00', '#C9A84C'],
    bg:     ['#0a0800', '#181000', '#251a00'],
    text:   '#FFFFFF',
    accent: '#C9A84C',
    sub:    'rgba(255,255,255,0.60)',
    ref:    '#E8C96A',
  },
  {
    id: 'navy',
    label: 'Bleu nuit',
    swatch: ['#060a18', '#1a3060'],
    bg:     ['#050810', '#080d1c', '#0e1830'],
    text:   '#FFFFFF',
    accent: '#7EC8E3',
    sub:    'rgba(255,255,255,0.58)',
    ref:    '#7EC8E3',
  },
  {
    id: 'cream',
    label: 'Lumière',
    swatch: ['#f5f0e8', '#c8b88a'],
    bg:     ['#faf6ee', '#f2e8d4', '#e8dcc0'],
    text:   '#1a2a1a',
    accent: '#1B6B3A',
    sub:    'rgba(27,107,58,0.65)',
    ref:    '#1B6B3A',
  },
  {
    id: 'purple',
    label: 'Mystique',
    swatch: ['#0f0a18', '#3d1a5a'],
    bg:     ['#080510', '#100818', '#1c1030'],
    text:   '#FFFFFF',
    accent: '#C8A8E8',
    sub:    'rgba(255,255,255,0.58)',
    ref:    '#C8A8E8',
  },
];

/* ---- État ---- */
let _scVerse   = null;   // { arabic, french, surahName, surahNum, verseNum }
let _scTheme   = 0;
let _scFormat  = 'square'; // 'square' | 'story'
let _scShowFr  = true;
let _scReady   = false;
let _scOffscreen = null; // canvas HD pour le download

/* ============================================================
   INITIALISATION (appelé une fois au chargement de la page)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  _buildSwatches();

  /* Fermer */
  document.getElementById('sc-close')?.addEventListener('click', closeShareCard);
  document.getElementById('sc-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeShareCard();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('sc-overlay')?.classList.contains('open')) {
      closeShareCard();
    }
  });

  /* Toggle traduction */
  document.getElementById('sc-show-fr')?.addEventListener('change', e => {
    _scShowFr = e.target.checked;
    _scRender();
  });

  /* Format */
  document.querySelectorAll('.sc-fmt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sc-fmt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _scFormat = btn.dataset.fmt;
      _scRender();
    });
  });

  /* Actions */
  document.getElementById('sc-download')?.addEventListener('click', _scDownload);
  document.getElementById('sc-share')?.addEventListener('click', _scShare);
});

/* ---- Générer les swatches dynamiquement ---- */
function _buildSwatches() {
  const wrap = document.getElementById('sc-swatches');
  if (!wrap) return;
  wrap.innerHTML = SC_THEMES.map((t, i) => `
    <div style="display:flex;flex-direction:column;align-items:center;gap:.3rem;">
      <button class="sc-swatch ${i === 0 ? 'active' : ''}"
              data-theme="${i}"
              title="${t.label}"
              style="background:linear-gradient(135deg,${t.swatch[0]},${t.swatch[1]})">
      </button>
      <span class="sc-swatch-label">${t.label}</span>
    </div>
  `).join('');

  wrap.querySelectorAll('.sc-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.sc-swatch').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _scTheme = parseInt(btn.dataset.theme);
      _scRender();
    });
  });
}

/* ============================================================
   OUVERTURE DU MODAL
   ============================================================ */
async function openShareCard(surahNum, verseNum, surahName) {
  const block  = document.getElementById(`v${verseNum}`);
  const arabic = block?.querySelector('.verse-arabic-text')?.textContent?.trim() || '';
  const french = block?.querySelector('.verse-french-text')?.textContent?.trim() || '';
  _scVerse = { arabic, french, surahName, surahNum, verseNum };

  const overlay = document.getElementById('sc-overlay');
  overlay?.classList.add('open');
  document.body.style.overflow = 'hidden';

  /* Attendre les fonts la première fois */
  if (!_scReady) {
    _showLoading(true);
    await document.fonts.ready;
    _scReady = true;
    _showLoading(false);
  }

  _scRender();
}

function closeShareCard() {
  document.getElementById('sc-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function _showLoading(on) {
  const el = document.getElementById('sc-loading');
  if (el) el.style.display = on ? 'flex' : 'none';
}

/* ============================================================
   RENDU CANVAS
   ============================================================ */
function _scRender() {
  if (!_scVerse) return;

  const isStory = _scFormat === 'story';
  const CW = 1080;
  const CH = isStory ? 1920 : 1080;

  /* Canvas haute résolution */
  const off = document.createElement('canvas');
  off.width  = CW;
  off.height = CH;
  const ctx  = off.getContext('2d');
  _scOffscreen = off;

  const T = SC_THEMES[_scTheme];

  _drawBg(ctx, CW, CH, T);
  _drawDecor(ctx, CW, CH, T);
  _drawContent(ctx, CW, CH, T, isStory);

  /* Afficher dans le canvas preview redimensionné */
  const prevCanvas = document.getElementById('sc-canvas');
  if (!prevCanvas) return;

  /* Taille du preview */
  const maxW  = Math.min((prevCanvas.parentElement?.clientWidth || 400) - 32, 420);
  const ratio = maxW / CW;
  prevCanvas.width  = maxW;
  prevCanvas.height = Math.round(CH * ratio);
  prevCanvas.getContext('2d').drawImage(off, 0, 0, prevCanvas.width, prevCanvas.height);
}

/* ---- Background dégradé ---- */
function _drawBg(ctx, W, H, T) {
  const grad = ctx.createLinearGradient(0, 0, W * 0.6, H);
  T.bg.forEach((c, i) => grad.addColorStop(i / (T.bg.length - 1), c));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  /* Halo radial central */
  const glow = ctx.createRadialGradient(W * 0.5, H * 0.48, 0, W * 0.5, H * 0.5, W * 0.55);
  glow.addColorStop(0, T.id === 'cream'
    ? 'rgba(200,184,140,0.15)'
    : 'rgba(27,107,58,0.10)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
}

/* ---- Décoration géométrique ---- */
function _drawDecor(ctx, W, H, T) {
  ctx.save();

  /* Cercles concentriques coins */
  const corners = [[W * 0.88, H * 0.06], [W * 0.12, H * 0.94]];
  corners.forEach(([cx, cy]) => {
    [90, 150, 210, 270].forEach(r => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = T.accent;
      ctx.lineWidth   = 1.2;
      ctx.globalAlpha = 0.07;
      ctx.stroke();
    });
  });

  /* Lignes de séparation dorées */
  const sepY1 = H * 0.165;
  const sepY2 = H * 0.835;
  [sepY1, sepY2].forEach(y => {
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = T.accent;
    ctx.lineWidth   = 1.5;
    ctx.beginPath();
    ctx.moveTo(W * 0.08, y);
    ctx.lineTo(W * 0.92, y);
    ctx.stroke();

    /* Losange central sur la ligne */
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle   = T.accent;
    ctx.translate(W / 2, y);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-6, -6, 12, 12);
    ctx.restore();
  });

  /* Petits ornements de coin sur les lignes */
  [[W * 0.08, sepY1], [W * 0.92, sepY1],
   [W * 0.08, sepY2], [W * 0.92, sepY2]].forEach(([x, y]) => {
    ctx.globalAlpha = 0.45;
    ctx.fillStyle   = T.accent;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/* ---- Contenu : logo + texte + ref ---- */
function _drawContent(ctx, W, H, T, isStory) {
  /* Logo en haut */
  ctx.save();
  ctx.textAlign   = 'center';
  ctx.fillStyle   = T.accent;
  ctx.globalAlpha = 0.88;
  ctx.font        = `bold ${W * 0.026}px Poppins, sans-serif`;
  ctx.fillText('Al-Huda  ·  الهُدى', W / 2, H * 0.098);
  ctx.restore();

  /* Zone de contenu (entre les deux lignes) */
  const zoneTop    = H * 0.18;
  const zoneBottom = H * 0.83;
  const zoneH      = zoneBottom - zoneTop;

  /* --- Calcul des blocs de texte --- */
  const arabicSize = isStory ? W * 0.068 : W * 0.075;
  const frenchSize = isStory ? W * 0.032 : W * 0.034;
  const arabicLH   = arabicSize * 1.95;
  const frenchLH   = frenchSize * 1.6;
  const gap        = H * 0.04;

  ctx.save();
  ctx.direction = 'rtl';
  ctx.font      = `${arabicSize}px Amiri, serif`;
  const arabicLines = _wrapText(ctx, _scVerse.arabic, W * 0.80);
  ctx.restore();

  const frText     = _scShowFr ? `« ${_scVerse.french} »` : '';
  let frLines      = [];
  if (_scShowFr) {
    ctx.save();
    ctx.direction = 'ltr';
    ctx.font      = `italic ${frenchSize}px Poppins, sans-serif`;
    frLines = _wrapText(ctx, frText, W * 0.76);
    ctx.restore();
  }

  const arabicTotalH = arabicLines.length * arabicLH;
  const frenchTotalH = frLines.length * frenchLH;
  const totalH = arabicTotalH + (_scShowFr ? gap + frenchTotalH : 0);

  /* Centrage vertical dans la zone */
  let curY = zoneTop + (zoneH - totalH) / 2;

  /* --- Texte arabe --- */
  ctx.save();
  ctx.direction  = 'rtl';
  ctx.textAlign  = 'center';
  ctx.fillStyle  = T.text;
  ctx.font       = `${arabicSize}px Amiri, serif`;
  ctx.shadowColor = T.id === 'cream' ? 'transparent' : 'rgba(0,0,0,0.25)';
  ctx.shadowBlur  = 12;

  arabicLines.forEach((line, i) => {
    ctx.fillText(line, W / 2, curY + (i + 1) * arabicLH - arabicLH * 0.25);
  });
  curY += arabicTotalH + gap;
  ctx.restore();

  /* --- Traduction française --- */
  if (_scShowFr && frLines.length) {
    ctx.save();
    ctx.direction  = 'ltr';
    ctx.textAlign  = 'center';
    ctx.fillStyle  = T.sub;
    ctx.font       = `italic ${frenchSize}px Poppins, sans-serif`;

    frLines.forEach((line, i) => {
      ctx.fillText(line, W / 2, curY + i * frenchLH + frenchSize);
    });
    ctx.restore();
  }

  /* --- Référence verset --- */
  ctx.save();
  ctx.textAlign   = 'center';
  ctx.fillStyle   = T.ref;
  ctx.font        = `600 ${W * 0.030}px Poppins, sans-serif`;
  ctx.globalAlpha = 0.95;
  ctx.fillText(
    `${_scVerse.surahName}  ·  Verset ${_scVerse.verseNum}`,
    W / 2,
    H * 0.87
  );
  ctx.restore();

  /* --- Filigrane bas --- */
  ctx.save();
  ctx.textAlign   = 'center';
  ctx.fillStyle   = T.text;
  ctx.globalAlpha = 0.2;
  ctx.font        = `${W * 0.020}px Poppins, sans-serif`;
  ctx.fillText('al-huda.app', W / 2, H * 0.955);
  ctx.restore();
}

/* ---- Retour à la ligne Canvas ---- */
function _wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w;
    if (ctx.measureText(test).width > maxWidth && cur) {
      lines.push(cur); cur = w;
    } else { cur = test; }
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [''];
}

/* ============================================================
   TÉLÉCHARGEMENT & PARTAGE
   ============================================================ */
function _scDownload() {
  if (!_scOffscreen) return;
  const link     = document.createElement('a');
  link.download  = `alhuda-${_scVerse?.surahName || 'verset'}-${_scVerse?.verseNum || ''}.png`;
  link.href      = _scOffscreen.toDataURL('image/png');
  link.click();
  /* Toast si disponible */
  if (typeof showToast === 'function') showToast('⬇️ Image téléchargée !');
}

async function _scShare() {
  if (!_scOffscreen) return;
  if (!navigator.share && !navigator.clipboard) { _scDownload(); return; }

  _scOffscreen.toBlob(async blob => {
    const file = new File([blob], 'alhuda-verset.png', { type: 'image/png' });
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `${_scVerse?.surahName} · Verset ${_scVerse?.verseNum} — Al-Huda`,
        });
      } catch { _scDownload(); }
    } else {
      _scDownload();
    }
  }, 'image/png', 0.95);
}

/* ---- Exposer globalement ---- */
window.openShareCard  = openShareCard;
window.closeShareCard = closeShareCard;
