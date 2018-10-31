var cacheName = 'helloWorld';
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(cacheName)
			.then(cache => cache.addAll([
				'./js/script.js', 
				'./images/hello.png'
				])
			)
		);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
      	console.log('Cache used for ressource: '+event.request.url);
        return response;
      }
      return fetch(event.request);
    })
  );
});