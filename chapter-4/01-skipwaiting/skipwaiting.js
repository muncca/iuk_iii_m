const expectedCaches = ['skip-waiting'];

self.addEventListener('install', event => {
  console.log('installing...');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  console.log('activate...');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  console.log('fetch...');
  if(/\.svg$/.test(event.request.url)) {
    event.respondWith(fetch('crazyman.svg'));
  }
});