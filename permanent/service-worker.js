const CACHE_NAME = 'permanent-admin-panel-cache-v1';
const urlsToCache = [
  '/',
  '/index.html', // Ganti 'index.html' dengan nama file HTML panel admin Anda jika berbeda
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@400;500&display=swap'
];

// Event install: Dipanggil saat service worker pertama kali diinstal
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event fetch: Dipanggil setiap kali ada permintaan jaringan
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari jaringan
        return fetch(event.request);
      }
    )
  );
});
