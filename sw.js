
const cacheName = 'v1';
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    '/data/restaurants.json'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function(e) {

    e.respondWith(
        caches.match(e.request).then(function(response) {

            if (response) {
                return response;
            }

            else {
                return fetch(e.request)
                    .then(function(response) {
                        const responseDuplicate = response.clone();
                        caches.open(cacheName).then(function(cache) {
                            cache.put(e.request, responseDuplicate);
                        })
                        return response;
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            }         
        })
    );
});