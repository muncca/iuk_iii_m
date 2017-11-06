self.addEventListener('install', event => {
  console.log('installing...');
});

self.addEventListener('activate', event => {  
  console.log('activate...');
});

self.addEventListener('fetch', function(event) {
	console.log('fetch...');
	if(/\.png$/.test(event.request.url)) {
		event.respondWith(fetch('unicorn.png'));
	}
});