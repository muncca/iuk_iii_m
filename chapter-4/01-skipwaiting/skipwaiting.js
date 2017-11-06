const expectedCaches = ['skip-waiting'];

self.addEventListener('install', event => {
  console.log('installing...');
  
  self.skipWaiting();  
  event.waitUntil(
    caches.open('skip-waiting').then(cache => cache.add('crazyman.svg'))
  );
});

self.addEventListener('activate', event => {
  console.log('activate...');
  clients.claim();
});

self.addEventListener('fetch', event => {
  console.log('fetch...');
  const url = new URL(event.request.url);

  // Images from https://openclipart.org
  if (url.origin == location.origin && url.pathname.endsWith('alien.svg')) {
    event.respondWith(caches.match('crazyman.svg'));
  }
});