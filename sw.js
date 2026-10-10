/* Keeps the guide available without the internet.
   Only the guide itself (the first page) is stored; map pictures, the weather and directions still need a connection.
   Online, the newest page is always fetched first and the stored copy is replaced.
   The fixed pages of single places (/tr/..., /en/...) are left to the browser and are not stored. */
const CACHE = 'guide-v1', PAGE = './', ROOT = new URL('./', self.location).pathname;
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.add(new Request(PAGE, {cache: 'reload'}))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || r.mode !== 'navigate' || u.origin !== self.location.origin) return;
  if (u.pathname !== ROOT && u.pathname !== ROOT + 'index.html') return;      /* only the guide itself */
  const stored = () => caches.match(PAGE);
  const fresh = fetch(r).then(res => {
    if (res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(PAGE, copy)); }
    return res;
  });
  /* a slow or missing connection: show the stored page after 4 seconds, or at once when the request fails */
  const slow = new Promise(done => setTimeout(done, 4000)).then(stored);
  e.respondWith(Promise.race([fresh.catch(() => null), slow]).then(res => res || stored()).then(res => res || fresh));
});
