self.addEventListener('fetch', function(event) {
	if(/\.png$/.test(event.request.url)) {
		event.respondWith(fetch('unicorn.png'));
	}
});