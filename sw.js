/* Service worker — coque hors-ligne ; HTML toujours d'abord depuis le réseau */
const CACHE = 'planning2026-v5';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isPage = req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/') || url.pathname.endsWith('/planning');

  event.respondWith((async () => {
    // Pages HTML : réseau d'abord, sinon cache (évite une vieille coque)
    if (isPage) {
      try {
        const res = await fetch(req);
        if (url.origin === self.location.origin && res.ok) {
          const cache = await caches.open(CACHE);
          cache.put(req, res.clone());
        }
        return res;
      } catch (e) {
        const cached = await caches.match(req);
        if (cached) return cached;
        return caches.match('./index.html');
      }
    }
    // Autres assets : cache puis réseau
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (url.origin === self.location.origin && res.ok) {
        const cache = await caches.open(CACHE);
        cache.put(req, res.clone());
      }
      return res;
    } catch (e) {
      throw e;
    }
  })());
});
