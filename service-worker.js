const CACHE_NAME = "langlearn-cache-v2";
const urlsToCache = ["/", "/index.html", "/icons/icon-192.png", "/icons/icon-512.png"];

// Install event – Cache core assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate event – Clean up old cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

// Fetch event – Serve from cache or network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});

// Sync event – Simulate sending data when back online
self.addEventListener("sync", event => {
  if (event.tag === 'sync-vocab-progress') {
    event.waitUntil(
      // Simulated background task
      Promise.resolve(console.log("✅ Background sync completed: Vocabulary progress sent"))
    );
  }
});

// Push event – Receive and show notification
self.addEventListener("push", event => {
  const data = event.data.json();
  if (data.method === "pushMessage") {
    event.waitUntil(
      self.registration.showNotification("LangLearn Notification", {
        body: data.message,
        icon: "/icons/icon-192.png"
      })
    );
  }
});
