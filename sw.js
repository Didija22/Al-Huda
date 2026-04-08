/* ============================================================
   AL-HUDA — Service Worker (PWA)
   Cache-first pour les ressources statiques
   Network-first pour les API
   ============================================================ */

const CACHE_NAME = 'al-huda-v4';
const BASE = '/Al-Huda';

/* Ressources à mettre en cache immédiatement à l'installation */
const STATIC_ASSETS = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/manifest.json',

  /* ── CSS ── */
  BASE + '/assets/css/main.css',
  BASE + '/assets/css/quran.css',
  BASE + '/assets/css/azkars.css',
  BASE + '/assets/css/hadiths.css',
  BASE + '/assets/css/articles.css',
  BASE + '/assets/css/prayers.css',
  BASE + '/assets/css/quiz.css',
  BASE + '/assets/css/nour.css',

  /* ── JS ── */
  BASE + '/assets/js/main.js',
  BASE + '/assets/js/quran.js',
  BASE + '/assets/js/azkars.js',
  BASE + '/assets/js/hadiths.js',
  BASE + '/assets/js/articles.js',
  BASE + '/assets/js/prayers.js',
  BASE + '/assets/js/quiz.js',
  BASE + '/assets/js/quiz-data.js',
  BASE + '/assets/js/nour.js',
  BASE + '/assets/js/surahs-data.js',
  BASE + '/assets/js/azkars-data.js',
  BASE + '/assets/js/hadiths-data.js',
  BASE + '/assets/js/asma-data.js',

  /* ── Pages ── */
  BASE + '/pages/quran/index.html',
  BASE + '/pages/quran/surah.html',
  BASE + '/pages/azkars/index.html',
  BASE + '/pages/hadiths/index.html',
  BASE + '/pages/articles/index.html',
  BASE + '/pages/prayers/index.html',
  BASE + '/pages/quiz/index.html',
  BASE + '/pages/nour/index.html',
  BASE + '/pages/contact/index.html',
  BASE + '/pages/privacy/index.html',
  BASE + '/pages/about/index.html',
  BASE + '/pages/asma/index.html',
  BASE + '/pages/duas/index.html',
  BASE + '/pages/qibla/index.html',
  BASE + '/pages/dashboard/index.html',
  BASE + '/assets/css/qibla.css',
  BASE + '/assets/css/dashboard.css',
  BASE + '/assets/css/sharecard.css',
  BASE + '/assets/js/qibla.js',
  BASE + '/assets/js/tracker.js',
  BASE + '/assets/js/dashboard.js',
  BASE + '/assets/js/sharecard.js',

  /* ── Icônes PWA ── */
  BASE + '/assets/icons/icon-192.png',
  BASE + '/assets/icons/icon-512.png'
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
    url.hostname.includes('api.groq.com') ||
    url.hostname.includes('ip-api.com') ||
    url.hostname.includes('formspree.io')
  ) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          // Mettre en cache la réponse API réussie (hors audio)
          // Ne pas cacher : audio, Groq AI, Formspree
          if (res.ok &&
              !url.hostname.includes('mp3quran') &&
              !url.pathname.includes('/audio') &&
              !url.hostname.includes('api.groq.com') &&
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
