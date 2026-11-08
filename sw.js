/* Offline-Cache. Lädt immer zuerst die neueste Version aus dem Netz,
   und fällt nur ohne Internet auf die gespeicherte Kopie zurück.
   So erscheinen Änderungen an den Rätseln sofort. */
const CACHE = "i-und-m-v7";
const DATEIEN = [
  "./", "index.html", "style.css", "app.js", "raetsel.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "bilder/aufguss.svg",
  "bilder/automat.svg",
  "bilder/bombe.svg",
  "bilder/bushido.svg",
  "bilder/foerderband.svg",
  "bilder/jetons.svg",
  "bilder/kabel1.svg",
  "bilder/kabel2.svg",
  "bilder/kaestchen.svg",
  "bilder/onsen.svg",
  "bilder/poker.svg",
  "bilder/quellen.svg",
  "bilder/regal.svg",
  "bilder/roulette.svg",
  "bilder/samurai.svg",
  "bilder/sauna.svg",
  "bilder/spinde.svg",
  "bilder/sushi.svg",
  "bilder/teehaus.svg",
  "bilder/teller.svg",
  "bilder/therme.svg",
  "bilder/titel.svg",
  "bilder/wuerfel.svg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((antwort) => {
        if (antwort.ok && new URL(e.request.url).origin === location.origin) {
          const kopie = antwort.clone();
          caches.open(CACHE).then((c) => c.put(e.request, kopie));
        }
        return antwort;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
