const baseScript = `if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker.register("__SW_FILENAME__");
    const manifestLink = document.createElement("link");
    manifestLink.rel = "manifest";
    manifestLink.href = "__MANIFEST_FILENAME__";
    document.head.appendChild(manifestLink);
  } else {
    const urlsToCache = ["__URLS_TO_CACHE__"];
    const urlsIgnoredToCache = ["__URLS_IGNORED_TO_CACHE__"];
    const cacheName = "__CACHE_NAME__";
    self.addEventListener("install", function(event) {
      event.waitUntil(
        caches.open(cacheName).then(function(cache) {
          return cache.addAll(urlsToCache);
        })
      );
    });
    self.addEventListener("fetch", function(event) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          if (response) {
            return response;
          }
          const fetchRequest = event.request.clone();
          return fetch(fetchRequest).then(function(response) {
            if (!response || response.status !== 200 || response.type !== "basic") {
              return response;
            }
            const responseToCache = response.clone();
            if (!urlsIgnoredToCache.some((ignoredUrl) => response.url.match(ignoredUrl))) {
              caches.open(cacheName).then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          });
        })
      );
    });
  }`;

export { baseScript };
