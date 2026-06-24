// LifeBridge AI - Service Worker for Offline Caching
const CACHE_NAME = 'lifebridge-v1';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'style.css',
  'data.js',
  'app.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Install Service Worker and cache all vital UI assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell and CDNs');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Service Worker and clean up stale caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Cache-First or Network-Fallback fetch strategy
self.addEventListener('fetch', event => {
  // Only handle local or GET requests (avoid issues with POST or external API endpoints)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse; // Return cache match
        }

        // Fetch from network, cache clone, and return
        return fetch(event.request)
          .then(networkResponse => {
            // Check if response is valid for caching
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            // Offline fallback for mapping tiles
            if (event.request.url.includes('tile.openstreetmap.org')) {
              // Return a placeholder offline tile if possible (blank response or offline image)
              return new Response('', { status: 404, statusText: 'Offline Map Tile Not Cached' });
            }
          });
      })
  );
});
