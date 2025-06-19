self.addEventListener('push', function(event) {
  console.log('Push received')
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
});

self.addEventListener('notificationClick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
