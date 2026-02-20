/**
 * Tracy Jia Real Estate - Service Worker
 * Enables offline support + installable PWA on iOS & Android
 */

const CACHE_NAME = 'tracy-jia-re-v1';
const OFFLINE_URL = './index.html';

// Core assets to pre-cache for offline use
const PRECACHE_ASSETS = [
    './',
    './index.html',
    './css/styles.css',
    './js/main.js',
    './js/chat.js',
    './js/knowledge-base.js',
    './manifest.json',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png'
];

// External assets to cache on first use
const EXTERNAL_CACHE_URLS = [
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// ============================================
// INSTALL - Pre-cache core assets
// ============================================
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Pre-caching core assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// ============================================
// ACTIVATE - Clean up old caches
// ============================================
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// ============================================
// FETCH - Network-first with cache fallback
// ============================================
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip chrome-extension and other non-http requests
    if (!request.url.startsWith('http')) return;

    // For navigation requests (HTML pages)
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Cache the latest version
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                    return response;
                })
                .catch(() => {
                    // Offline fallback
                    return caches.match(OFFLINE_URL);
                })
        );
        return;
    }

    // For local assets - cache first, network fallback
    if (request.url.includes(self.location.origin)) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) {
                    // Return cache but also update in background
                    fetch(request).then((response) => {
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, response));
                    }).catch(() => {});
                    return cached;
                }
                return fetch(request).then((response) => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                    return response;
                });
            })
        );
        return;
    }

    // For external resources (fonts, CDN) - cache first strategy
    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) return cached;

            return fetch(request).then((response) => {
                // Only cache successful responses
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                }
                return response;
            }).catch(() => {
                // Return nothing for failed external requests
                return new Response('', { status: 408, statusText: 'Offline' });
            });
        })
    );
});
