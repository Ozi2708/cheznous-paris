/* Service worker « Chez nous à Paris » — installation PWA + hors-ligne.
   Sans dépendance : app-shell précaché + cache runtime des assets hashés. */
const CACHE = 'cheznous-v1';
const SHELL = ['/', '/manifest.json', '/icon-192.png', '/icon-512.png', '/apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // ne touche pas au réseau externe

  // Navigations : réseau d'abord (app fraîche en ligne), repli sur l'app-shell hors-ligne.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { caches.open(CACHE).then((c) => c.put('/', res.clone())); return res; })
        .catch(() => caches.match('/'))
    );
    return;
  }

  // Assets (JS/CSS/images) : cache d'abord, mise à jour en arrière-plan (stale-while-revalidate).
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => { if (res && res.status === 200) caches.open(CACHE).then((c) => c.put(req, res.clone())); return res; })
        .catch(() => cached);
      return cached || network;
    })
  );
});
