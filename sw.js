/* ============================================================
   AL-HUDA — Service Worker (PWA)
   Cache-first pour les ressources statiques
   Network-first pour les API
   ============================================================ */

const CACHE_NAME = 'al-huda-v10';

/* Ressources à mettre en cache immédiatement à l'installation */
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',

  /* ── CSS ── */
  '/assets/css/main.css',
  '/assets/css/quran.css',
  '/assets/css/azkars.css',
  '/assets/css/hadiths.css',
  '/assets/css/articles.css',
  '/assets/css/prayers.css',
  '/assets/css/quiz.css',

  /* ── JS ── */
  '/assets/js/main.js',
  '/assets/js/icons.js',
  '/assets/js/components.js',
  '/assets/js/quran.js',
  '/assets/js/azkars.js',
  '/assets/js/hadiths.js',
  '/assets/js/articles.js',
  '/assets/js/prayers.js',
  '/assets/js/quiz.js',
  '/assets/js/quiz-data.js',
  '/assets/js/library-data.js',
  '/assets/js/surahs-data.js',
  '/assets/js/azkars-data.js',
  '/assets/js/hadiths-data.js',
  '/assets/js/asma-data.js',

  /* ── Pages ── */
  '/pages/quran/index.html',
  '/pages/quran/surah.html',
  '/pages/azkars/index.html',
  '/pages/hadiths/index.html',
  '/pages/articles/index.html',
  '/pages/prayers/index.html',
  '/pages/quiz/index.html',
  '/pages/contact/index.html',
  '/pages/privacy/index.html',
  '/pages/about/index.html',
  '/pages/asma/index.html',
  '/pages/duas/index.html',
  '/pages/qibla/index.html',
  '/pages/dashboard/index.html',
  '/assets/css/qibla.css',
  '/assets/css/dashboard.css',
  '/assets/css/sharecard.css',
  '/assets/js/qibla.js',
  '/assets/js/tracker.js',
  '/assets/js/dashboard.js',
  '/assets/js/sharecard.js',

  /* ── Icônes PWA ── */
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png'
];

/* --- Installation : mise en cache des assets statiques --- */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* --- Activation : suppression des anciens caches --- */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* --- Fetch : stratégie selon le type de requête --- */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Requêtes API externes → Network-first (avec fallback cache si hors-ligne)
  if (
    url.hostname.includes('api.alquran.cloud') ||
    url.hostname.includes('cdn.islamic.network') ||
    url.hostname.includes('nominatim.openstreetmap.org') ||
    url.hostname.includes('api.aladhan.com') ||
    url.hostname.includes('mp3quran.net') ||
    url.hostname.includes('ip-api.com') ||
    url.hostname.includes('formspree.io')
  ) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res.ok &&
              !url.hostname.includes('mp3quran') &&
              !url.pathname.includes('/audio') &&
              !url.hostname.includes('formspree.io')) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Ressources locales → Cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return res;
      });
    })
  );
});
