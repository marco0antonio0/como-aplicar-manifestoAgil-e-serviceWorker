self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/imagens/small_icon.png',
                '/imagens/medium_icon.png',
                '/imagens/large_icon.png',
                '/imagens/xlarge_icon.png',
                '/imagens/favicon.ico'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
