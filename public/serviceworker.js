const CACHE_NAME = "v1";
const urlToCache = ["index.html"];

const self = this;
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log("cache opened");
			return cache.addAll(urlToCache);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then(() => {
			return fetch(event.request).catch(() => caches.match("index.html"));
		})
	);
});

self.addEventListener("activate", (event) => {
	const cacheWhitelist = [];
	cacheWhitelist.push(CACHE_NAME);
	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						caches.delete(cacheName);
					}
				})
			)
		)
	);
});
