// Service worker: offline app-shell. Network-first for the app (so updates land),
// cache-first for static assets. Never intercept Supabase (auth/data/storage).
const CACHE = 'zbjournal-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url; try { url = new URL(req.url); } catch (_) { return; }
  if (url.hostname.endsWith('supabase.co')) return; // let auth/data/storage hit the network

  // App navigations / index.html: network-first (fresh app), fall back to cache when offline.
  if (req.mode === 'navigate' || (url.origin === location.origin && url.pathname.endsWith('index.html'))) {
    e.respondWith(
      fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', cp)); return r; })
                .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Everything else (icon, manifest, CDN script): cache-first, then network.
  e.respondWith(
    caches.match(req).then(c => c || fetch(req).then(r => {
      if (r && r.status === 200) { const cp = r.clone(); caches.open(CACHE).then(ca => ca.put(req, cp)); }
      return r;
    }))
  );
});
