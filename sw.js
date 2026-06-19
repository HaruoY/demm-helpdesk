const CACHE_NAME = 'demm-helpdesk-v1';
const urlsToCache = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', e => {
  // Non intercettare chiamate verso Google Script (devono sempre essere live)
  if (e.request.url.includes('script.google.com')) return;
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
