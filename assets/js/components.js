/* ============================================================
   AL-HUDA — Composants partagés (Programmation Modulaire)
   Génère et injecte la navbar + menu mobile sur toutes les pages
   Requiert : icons.js chargé avant ce script
   ============================================================ */

(function () {
  const ic = window.AlHudaIcons;

  /* ── 1. Chemin de base + section active ──────────────────── */
  const path    = window.location.pathname;
  const inPages = path.includes('/pages/');
  const base    = inPages ? '../../' : './';
  const section = path.match(/\/pages\/([^/]+)/)?.[1] || 'home';

  /* ── 2. Helper : construit un lien href ─────────────────── */
  function href(link) {
    return base + (link.href || 'index.html');
  }
  function active(link) {
    return section === link.key ? ' class="active"' : '';
  }

  /* ── 3. Liens navbar principale (desktop) ───────────────── */
  const NAV = [
    { href: '',                          label: 'Accueil',      key: 'home'     },
    { href: 'pages/quran/index.html',    label: 'Coran',        key: 'quran'    },
    { href: 'pages/azkars/index.html',   label: 'Azkars',       key: 'azkars'   },
    { href: 'pages/prayers/index.html',  label: 'Prières',      key: 'prayers'  },
    { href: 'pages/hadiths/index.html',  label: 'Hadiths',      key: 'hadiths'  },
    { href: 'pages/articles/index.html', label: 'Bibliothèque', key: 'articles' },
    { href: 'pages/quiz/index.html',     label: 'Quiz',         key: 'quiz'     },
  ];

  /* ── 4. Liens menu mobile (complet + icônes) ─────────────── */
  const MOBILE = [
    { href: '',                               icon: 'home',      label: 'Accueil',          key: 'home'      },
    { href: 'pages/quran/index.html',         icon: 'quran',     label: 'Coran',            key: 'quran'     },
    { href: 'pages/azkars/index.html',        icon: 'azkars',    label: 'Azkars',           key: 'azkars'    },
    { href: 'pages/prayers/index.html',       icon: 'prayers',   label: 'Prières',          key: 'prayers'   },
    { href: 'pages/hadiths/index.html',       icon: 'hadiths',   label: 'Hadiths',          key: 'hadiths'   },
    { href: 'pages/articles/index.html',      icon: 'library',   label: 'Bibliothèque',     key: 'articles'  },
    { href: 'pages/quiz/index.html',          icon: 'quiz',      label: 'Quiz',             key: 'quiz'      },
    { href: 'pages/asma/index.html',          icon: 'asma',      label: "99 Noms d'Allah",  key: 'asma'      },
    { href: 'pages/duas/index.html',          icon: 'duas',      label: 'Duas',             key: 'duas'      },
    { href: 'pages/qibla/index.html',         icon: 'qibla',     label: 'Qibla',            key: 'qibla'     },
    { href: 'pages/dashboard/index.html',     icon: 'dashboard', label: 'Tableau de bord',  key: 'dashboard' },
  ];

  /* ── 5. Icône thème courante ─────────────────────────────── */
  const isDark   = document.documentElement.getAttribute('data-theme') === 'dark';
  const themeIcon = isDark
    ? (ic?.get('sun', 18) || '☀️')
    : (ic?.get('moon', 18) || '🌙');

  /* ── 6. Construction HTML ────────────────────────────────── */
  const navLinks = NAV.map(l =>
    `<li><a href="${href(l)}"${active(l)}>${l.label}</a></li>`
  ).join('');

  const mobileLinks = MOBILE.map(l =>
    `<a href="${href(l)}"${active(l)}>${ic ? ic.get(l.icon, 18) : ''}<span>${l.label}</span></a>`
  ).join('');

  const html = `
<nav class="navbar${section === 'home' ? '' : ' scrolled'}" id="navbar">
  <div class="container">
    <div class="navbar-inner">

      <a href="${base}index.html" class="logo">
        <div class="logo-icon">ه</div>
        <div class="logo-text">
          <div class="name">Al-Huda</div>
          <div class="tagline">الهُدى • Le Guide</div>
        </div>
      </a>

      <ul class="nav-links">${navLinks}</ul>

      <div class="nav-cta">
        <div class="nav-prayer-time">
          <span class="dot"></span>
          <span id="next-prayer-nav">Prochaine prière</span>
        </div>
        <button class="theme-toggle" id="theme-toggle" title="Changer le thème" aria-label="Basculer mode sombre/clair">
          ${themeIcon}
        </button>
      </div>

      <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>

    </div>
  </div>
</nav>

<div class="mobile-menu" id="mobile-menu">
  ${mobileLinks}
</div>`;

  /* ── 7. Injection ────────────────────────────────────────── */
  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) {
    placeholder.outerHTML = html;
  } else {
    document.body.insertAdjacentHTML('afterbegin', html);
  }

  /* ── 8. Thème toggle (géré ici, sans dépendre de main.js) ── */
  document.getElementById('theme-toggle')?.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('al-huda-theme-v2', next);
    this.innerHTML = next === 'dark'
      ? (ic?.get('sun', 18)  || '☀️')
      : (ic?.get('moon', 18) || '🌙');
  });

  /* ── 9. Hamburger (géré ici, sans dépendre de main.js) ───── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

})();
