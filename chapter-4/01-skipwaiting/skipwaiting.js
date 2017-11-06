const expectedCaches = ['skip-waiting'];

self.addEventListener('install', event => {
  console.log('installing...');
  
  self.skipWaiting();
  event.waitUntil(clients.claim());
  
  event.waitUntil(
    caches.open('skip-waiting').then(cache => cache.add('crazyman.svg'))
  );
});

self.addEventListener('activate', event => {
  clients.claim();
  console.log('Now ready to handle fetches!');
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Images from https://openclipart.org
  if (url.origin == location.origin && url.pathname.endsWith('alien.svg')) {
    event.respondWith(caches.match('crazyman.svg'));
  }
});