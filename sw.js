const CACHE_NAME = "n5-v5";
const STATIC_ASSETS = [
  "./index.html",
  "./manifest.json",
  "./data/vocab-n5.js",
  "./data/grammar-n5.js",
  "./data/dialogues.js",
  "./modules/state.js",
  "./modules/ai.js",
  "./modules/tts.js",
  "./modules/quiz.js",
  "./modules/dialogue.js",
  "./modules/gamification.js",
  "./modules/ui.js",
  "./modules/utils.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("api.anthropic.com") || event.request.url.includes("api.openai.com")) {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
