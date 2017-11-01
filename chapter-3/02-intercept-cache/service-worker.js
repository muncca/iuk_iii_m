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

// Add an event listener for the fetch event to intercept requests
self.addEventListener('fetch', function(event) {
  event.respondWith(
    //Does the current request match anything we might have in cache?
    caches.match(event.request)
    .then(function(response) {
      // If it does, let's return it at this point and conitnue no further
      if (response) {
        return response;
      }
      // It's imortant that we clone the request. A request is a stream and can only be consumed once.
      var fetchRequest = event.request.clone();

      // Try and make the original HTTP request as intended
      return fetch(fetchRequest).then(
        function(response) {
          // If for any reason the request fails or the server responds with an error code, we return that error immediately
          if(!response || response.status !== 200) {
            return response;
          }

          // Again, we need to clone the response because we need to add into cache (Cache and Browser want's to use it) and because it is used for the final return response
          var responseToCache = response.clone();
          // Open cache
          caches.open(cacheName)
          .then(function(cache) {
            // Add response to cache
            cache.put(event.request, responseToCache);
          });

          return response;
        }
      );
    })
  );
});