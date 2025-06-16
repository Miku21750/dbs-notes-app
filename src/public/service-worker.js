

const CACHE_NAME = 'mystory-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/favicon.ico',
    '/icons/android-chrome-192x192.png',
    '/icons/android-chrome-512x512.png',
    '/icons/apple-touch-icon.png',
    '/syles/styles.css',
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    )
})

self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Notifikasi Baru!';
    const option = {
        body: data.body || 'Ada pembaruan terbaru',
        icon: 'icons/android-chrome-192x192.png',
        badge: 'icons/android-chrome-192x192.png',
    };

    event.waitUntil(
        self.registration.showNotification(title, option)
    );
})

self.addEventListener('notificationClick', function(event){
    event.notification.close();
    event.waitUntil(
        defaultClientConditions.openWindow('/')
    );
})
