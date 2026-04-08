/* ============================================================
   AL-HUDA — Galaxie des Sourates
   Visualisation Canvas interactive — 114 planètes
   ============================================================ */

/* ---- État global ---- */
let _canvas, _ctx, _W, _H;
let _zoom = 1, _panX = 0, _panY = 0;
let _targetZoom = 1, _targetPanX = 0, _targetPanY = 0;
let _drag = false, _lastMX = 0, _lastMY = 0;
let _hovered = null;
let _time = 0;
let _rotation = 0;
let _paused = false;
let _rafId = null;
let _planets = [];
let _stars = [];
let _tooltip = null;

/* Couleurs par type */
const MECQUOISE_COLORS = ['#C9A84C','#D4943A','#E8B84C','#B8882C','#F0C850','#D48A28'];
const MEDINOISE_COLORS = ['#1B6B3A','#22854A','#2A9D5C','#16A38C','#1E7A45','#13906E'];

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  _canvas = document.getElementById('galaxy-canvas');
  if (!_canvas) return;
  _ctx = _canvas.getContext('2d');

  _buildPlanets();
  _buildStars();
  _resize();
  _bindEvents();
  _bindUI();
  _startLoop();

  window.addEventListener('resize', _resize);
});

/* ---- Construction des planètes (phyllotaxis / tournesol) ---- */
function _buildPlanets() {
  const surahs    = window.SURAHS_META || [];
  const maxVerses = Math.max(...surahs.map(s => s.verses));
  const goldenAng = Math.PI * (3 - Math.sqrt(5)); // ~137.5°
  const C         = 28; // espacement

  _planets = surahs.map((s, i) => {
    const angle = i * goldenAng;
    const dist  = C * Math.sqrt(i + 1);
    const rMin  = 7, rMax = 26;
    const r     = rMin + (rMax - rMin) * Math.sqrt(s.verses / maxVerses);
    const isMec = s.type === 'mecquoise';
    const colors = isMec ? MECQUOISE_COLORS : MEDINOISE_COLORS;
    const color  = colors[i % colors.length];

    return {
      ...s,
      dist, angle,
      baseX: Math.cos(angle) * dist,
      baseY: Math.sin(angle) * dist,
      r, color, isMec,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.008,
      orbitSpeed: (0.00008 + Math.random() * 0.00006) * (Math.random() < .5 ? 1 : -1),
      orbitOffset: Math.random() * Math.PI * 2,
      /* hit-test (mis à jour au rendu) */
      _sx: 0, _sy: 0, _sr: 0,
    };
  });
}

/* ---- Étoiles de fond ---- */
function _buildStars() {
  _stars = Array.from({ length: 350 }, () => ({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 1.4 + 0.2,
    a: Math.random() * 0.7 + 0.15,
    da: (Math.random() * 0.004 + 0.001) * (Math.random() < .5 ? 1 : -1),
    gold: Math.random() < 0.1,
  }));
}

/* ---- Redimensionnement ---- */
function _resize() {
  _W = _canvas.width  = window.innerWidth;
  _H = _canvas.height = window.innerHeight;

  /* Zoom initial : faire tenir toute la galaxie */
  const galaxyR = 28 * Math.sqrt(114) + 50;
  const initZ   = Math.min(_W, _H) * 0.44 / galaxyR;
  _zoom = _targetZoom = Math.min(initZ, 1.1);
  _panX = _targetPanX = 0;
  _panY = _targetPanY = 0;
}

/* ============================================================
   BOUCLE D'ANIMATION
   ============================================================ */
function _startLoop() {
  function frame() {
    _time += 0.016;
    if (!_paused) _rotation += 0.00035;

    /* Interpolation douce du zoom/pan */
    _zoom = _lerp(_zoom, _targetZoom, 0.1);
    _panX = _lerp(_panX, _targetPanX, 0.1);
    _panY = _lerp(_panY, _targetPanY, 0.1);

    _draw();
    _rafId = requestAnimationFrame(frame);
  }
  _rafId = requestAnimationFrame(frame);
}

/* ---- Rendu principal ---- */
function _draw() {
  const ctx = _ctx, W = _W, H = _H;
  ctx.clearRect(0, 0, W, H);

  /* Fond */
  const bg = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.8);
  bg.addColorStop(0,   '#0b0f16');
  bg.addColorStop(0.5, '#080b10');
  bg.addColorStop(1,   '#050709');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  /* Étoiles (fixes, indépendantes du pan/zoom) */
  _stars.forEach(s => {
    s.a += s.da;
    if (s.a > 0.9 || s.a < 0.1) s.da *= -1;
    ctx.beginPath();
    ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.gold
      ? `rgba(201,168,76,${s.a * 0.6})`
      : `rgba(255,255,255,${s.a * 0.55})`;
    ctx.fill();
  });

  /* Nébulosité centrale */
  const cx = W / 2 + _panX * _zoom;
  const cy = H / 2 + _panY * _zoom;
  const neb = ctx.createRadialGradient(cx, cy, 0, cx, cy, 380 * _zoom);
  neb.addColorStop(0, 'rgba(27,107,58,0.07)');
  neb.addColorStop(0.4,'rgba(201,168,76,0.03)');
  neb.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = neb;
  ctx.fillRect(0, 0, W, H);

  /* Planètes */
  const cosR = Math.cos(_rotation);
  const sinR = Math.sin(_rotation);

  /* Trier : non-hoverd d'abord, hovered en dernier (toujours au-dessus) */
  const sorted = [..._planets].sort((a, b) =>
    (a === _hovered ? 1 : 0) - (b === _hovered ? 1 : 0)
  );

  sorted.forEach(p => {
    /* Rotation galactique */
    const rx = p.baseX * cosR - p.baseY * sinR;
    const ry = p.baseX * sinR + p.baseY * cosR;

    /* Petite orbite individuelle autour de sa position */
    const ox = Math.cos(_time * p.orbitSpeed * 60 + p.orbitOffset) * p.dist * 0.012;
    const oy = Math.sin(_time * p.orbitSpeed * 60 + p.orbitOffset) * p.dist * 0.012;

    const [sx, sy] = _w2s(rx + ox, ry + oy);
    p._sx = sx; p._sy = sy;

    /* Skip si hors écran */
    if (sx < -80 || sx > W + 80 || sy < -80 || sy > H + 80) { p._sr = 0; return; }

    /* Rayon avec pulsation */
    p.pulse += p.pulseSpeed;
    const pr  = p.r * _zoom * (1 + Math.sin(p.pulse) * 0.07);
    const iH  = p === _hovered;
    const dr  = iH ? pr * 1.22 : pr;
    p._sr = dr;

    /* Halo de lumière */
    const haloR = dr * 4;
    const halo  = ctx.createRadialGradient(sx, sy, dr * 0.5, sx, sy, haloR);
    halo.addColorStop(0, p.color + '50');
    halo.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(sx, sy, haloR, 0, Math.PI * 2);
    ctx.fill();

    /* Corps de la planète */
    const grad = ctx.createRadialGradient(
      sx - dr * 0.32, sy - dr * 0.32, 0,
      sx, sy, dr
    );
    grad.addColorStop(0, _lighten(p.color, 55));
    grad.addColorStop(0.5, p.color);
    grad.addColorStop(1, _darken(p.color, 50));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(sx, sy, dr, 0, Math.PI * 2);
    ctx.fill();

    /* Anneau sur survol */
    if (iH) {
      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.lineWidth   = 1.8;
      ctx.stroke();
      /* Second anneau plus large */
      ctx.beginPath();
      ctx.arc(sx, sy, dr + 5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth   = 1;
      ctx.stroke();
    }

    /* Numéro de sourate (petit) */
    if (_zoom > 0.4 && dr > 8) {
      ctx.fillStyle = iH ? '#fff' : 'rgba(255,255,255,0.75)';
      ctx.font      = `bold ${Math.max(7, Math.min(dr * 0.7, 12))}px Poppins, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.number, sx, sy);
    }

    /* Nom de la sourate */
    if (_zoom > 0.65 || iH) {
      ctx.textBaseline = 'top';
      ctx.fillStyle = iH ? '#fff' : 'rgba(255,255,255,0.55)';
      ctx.font      = `${iH ? 'bold ' : ''}${Math.max(9, 11 * _zoom)}px Poppins, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(p.name, sx, sy + dr + 5 * _zoom);
    }

    /* Nom arabe au-dessus si survol */
    if (iH) {
      ctx.textBaseline = 'bottom';
      ctx.fillStyle    = '#C9A84C';
      ctx.font         = `${Math.max(14, 16 * _zoom)}px Amiri, serif`;
      ctx.textAlign    = 'center';
      ctx.fillText(p.arabic, sx, sy - dr - 6 * _zoom);
    }

    ctx.textBaseline = 'alphabetic';
  });

  /* Tooltip info-bulle */
  if (_hovered) _drawTooltip(_hovered);

  /* Compteur discret */
  ctx.fillStyle    = 'rgba(255,255,255,0.18)';
  ctx.font         = '11px Poppins, sans-serif';
  ctx.textAlign    = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('🌌 Galaxie des 114 Sourates — Al-Huda', 14, H - 14);
}

/* ---- Tooltip ---- */
function _drawTooltip(p) {
  const ctx = _ctx;
  const [sx, sy] = [p._sx, p._sy];

  const lines = [
    { text: p.name,    font: `bold 15px Poppins, sans-serif`, color: '#fff'  },
    { text: p.arabic,  font: `18px Amiri, serif`,             color: '#C9A84C', rtl: true },
    { text: p.meaning, font: `12px Poppins, sans-serif`,      color: 'rgba(255,255,255,0.6)' },
    { text: `${p.verses} versets · ${p.type === 'mecquoise' ? 'Mecquoise' : 'Médinoise'} · Juz ${p.juz}`,
                       font: `11px Poppins, sans-serif`,      color: p.isMec ? '#E8B84C' : '#2DD4BF' },
  ];

  const PAD = 14, GAP = 5;
  let maxW = 0, totalH = PAD;
  lines.forEach(l => {
    ctx.font = l.font;
    const w = ctx.measureText(l.text).width;
    if (w > maxW) maxW = w;
    totalH += parseInt(l.font) + GAP;
  });
  const boxW = maxW + PAD * 2;
  const boxH = totalH + PAD;

  /* Position: essayer d'afficher au-dessus, sinon en-dessous */
  let bx = sx - boxW / 2;
  let by = sy - p._sr - boxH - 12;
  if (by < 8) by = sy + p._sr + 12;
  bx = Math.max(8, Math.min(_W - boxW - 8, bx));
  by = Math.max(8, Math.min(_H - boxH - 8, by));

  /* Ombre */
  ctx.shadowColor  = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur   = 20;

  /* Fond */
  ctx.fillStyle = 'rgba(8,14,20,0.92)';
  _roundRect(ctx, bx, by, boxW, boxH, 12);
  ctx.fill();
  ctx.shadowBlur = 0;

  /* Bordure colorée */
  ctx.strokeStyle = p.color + 'aa';
  ctx.lineWidth   = 1.5;
  _roundRect(ctx, bx, by, boxW, boxH, 12);
  ctx.stroke();

  /* Texte */
  let ty = by + PAD + 2;
  lines.forEach(l => {
    const fSize = parseInt(l.font);
    ctx.fillStyle    = l.color;
    ctx.font         = l.font;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(l.text, bx + boxW / 2, ty);
    ty += fSize + GAP;
  });

  /* Hint clic */
  ctx.fillStyle    = 'rgba(255,255,255,0.25)';
  ctx.font         = '10px Poppins, sans-serif';
  ctx.textAlign    = 'center';
  ctx.fillText('↵ Cliquer pour lire', bx + boxW / 2, ty + 2);
}

/* ============================================================
   ÉVÉNEMENTS
   ============================================================ */
function _bindEvents() {
  /* ---- Survol ---- */
  _canvas.addEventListener('mousemove', e => {
    const rect = _canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (_drag) {
      _targetPanX += (mx - _lastMX) / _zoom;
      _targetPanY += (my - _lastMY) / _zoom;
      _panX = _targetPanX;
      _panY = _targetPanY;
      _lastMX = mx; _lastMY = my;
      return;
    }

    _hovered = _planets.find(p => {
      const dx = p._sx - mx, dy = p._sy - my;
      return p._sr > 0 && Math.sqrt(dx*dx + dy*dy) < p._sr + 4;
    }) || null;

    _canvas.style.cursor = _hovered ? 'pointer' : 'grab';
    _paused = !!_hovered;
  });

  _canvas.addEventListener('mouseleave', () => { _hovered = null; _paused = false; });

  /* ---- Clic navigation ---- */
  _canvas.addEventListener('click', e => {
    if (_hovered) {
      window.location.href = `../quran/surah.html?s=${_hovered.number}`;
    }
  });

  /* ---- Drag ---- */
  _canvas.addEventListener('mousedown', e => {
    _drag = true;
    _lastMX = e.clientX; _lastMY = e.clientY;
    _canvas.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', () => {
    _drag = false;
    _canvas.style.cursor = _hovered ? 'pointer' : 'grab';
  });

  /* ---- Molette / Zoom ---- */
  _canvas.addEventListener('wheel', e => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    const newZ   = Math.max(0.25, Math.min(4.0, _targetZoom * factor));

    /* Zoom centré sur la souris */
    const rect = _canvas.getBoundingClientRect();
    const mx   = e.clientX - rect.left - _W / 2;
    const my   = e.clientY - rect.top  - _H / 2;
    _targetPanX += mx / _targetZoom - mx / newZ;
    _targetPanY += my / _targetZoom - my / newZ;
    _targetZoom  = newZ;

    _updateZoomDisplay();
  }, { passive: false });

  /* ---- Touch (mobile) ---- */
  let _lastTouches = [];
  _canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    _lastTouches = [...e.touches];
  }, { passive: false });

  _canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length === 1 && _lastTouches.length === 1) {
      /* Pan */
      const dx = e.touches[0].clientX - _lastTouches[0].clientX;
      const dy = e.touches[0].clientY - _lastTouches[0].clientY;
      _targetPanX += dx / _zoom;
      _targetPanY += dy / _zoom;
      _panX = _targetPanX; _panY = _targetPanY;
    } else if (e.touches.length === 2 && _lastTouches.length === 2) {
      /* Pinch zoom */
      const prevD = _dist(_lastTouches[0], _lastTouches[1]);
      const curD  = _dist(e.touches[0], e.touches[1]);
      const factor = curD / prevD;
      _targetZoom = Math.max(0.25, Math.min(4.0, _targetZoom * factor));
      _updateZoomDisplay();
    }
    _lastTouches = [...e.touches];
  }, { passive: false });

  _canvas.addEventListener('touchend', e => {
    if (e.changedTouches.length === 1 && _lastTouches.length === 1) {
      /* Tap → chercher planète proche */
      const rect = _canvas.getBoundingClientRect();
      const tx = e.changedTouches[0].clientX - rect.left;
      const ty = e.changedTouches[0].clientY - rect.top;
      const hit = _planets.find(p => {
        const dx = p._sx - tx, dy = p._sy - ty;
        return p._sr > 0 && Math.sqrt(dx*dx + dy*dy) < p._sr + 8;
      });
      if (hit) window.location.href = `../quran/surah.html?s=${hit.number}`;
    }
    _lastTouches = [];
  });
}

/* ---- Contrôles UI ---- */
function _bindUI() {
  /* Zoom + / - */
  document.getElementById('gal-zoom-in')?.addEventListener('click', () => {
    _targetZoom = Math.min(4.0, _targetZoom * 1.3);
    _updateZoomDisplay();
  });
  document.getElementById('gal-zoom-out')?.addEventListener('click', () => {
    _targetZoom = Math.max(0.25, _targetZoom * 0.77);
    _updateZoomDisplay();
  });
  document.getElementById('gal-zoom-reset')?.addEventListener('click', () => {
    const galaxyR  = 28 * Math.sqrt(114) + 50;
    _targetZoom    = Math.min(_W, _H) * 0.44 / galaxyR;
    _targetPanX    = 0; _targetPanY = 0;
    _updateZoomDisplay();
  });

  /* Recherche sourate */
  const searchInput = document.getElementById('gal-search');
  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) return;
    const found = _planets.find(p =>
      p.name.toLowerCase().includes(q) ||
      p.arabic.includes(q) ||
      String(p.number) === q
    );
    if (found) _flyTo(found);
  });
  searchInput?.addEventListener('keydown', e => {
    if (e.key === 'Escape') searchInput.value = '';
  });

  /* Pause rotation */
  document.getElementById('gal-pause')?.addEventListener('click', () => {
    _paused = !_paused;
    const btn = document.getElementById('gal-pause');
    btn.textContent = _paused ? '▶' : '⏸';
    btn.title = _paused ? 'Reprendre la rotation' : 'Pause';
  });
}

/* ---- Centrer la caméra sur une planète ---- */
function _flyTo(planet) {
  const cosR = Math.cos(_rotation);
  const sinR = Math.sin(_rotation);
  const rx = planet.baseX * cosR - planet.baseY * sinR;
  const ry = planet.baseX * sinR + planet.baseY * cosR;
  _targetPanX  = -rx;
  _targetPanY  = -ry;
  _targetZoom  = Math.min(4, Math.max(1.5, _targetZoom));
  _hovered     = planet;
}

function _updateZoomDisplay() {
  const el = document.getElementById('gal-zoom-val');
  if (el) el.textContent = Math.round(_targetZoom * 100) + '%';
}

/* ============================================================
   UTILITAIRES
   ============================================================ */
function _w2s(wx, wy) {
  return [
    _W / 2 + (wx + _panX) * _zoom,
    _H / 2 + (wy + _panY) * _zoom,
  ];
}

function _lerp(a, b, t) { return a + (b - a) * t; }

function _dist(t1, t2) {
  return Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
}

function _roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function _hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function _lighten(hex, a) {
  const [r, g, b] = _hexToRgb(hex);
  return `rgb(${Math.min(255,r+a)},${Math.min(255,g+a)},${Math.min(255,b+a)})`;
}

function _darken(hex, a) {
  const [r, g, b] = _hexToRgb(hex);
  return `rgb(${Math.max(0,r-a)},${Math.max(0,g-a)},${Math.max(0,b-a)})`;
}
