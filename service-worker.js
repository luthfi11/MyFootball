importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: "/", revision: '1' },
    { url: "/manifest.json", revision: '1' },
    { url: "/nav.html", revision: '1' },
    { url: "/icon.png", revision: '1' },
    { url: "/index.html", revision: '1' },
    { url: "/images/bundes.jpg", revision: '1' },
    { url: "/images/laliga.jpg", revision: '1' },
    { url: "/pages/home.html", revision: '1' },
    { url: "/pages/bundes.html", revision: '1' },
    { url: "/pages/laliga.html", revision: '1' },
    { url: "/pages/favorite.html", revision: '1' },
    { url: "/team.html", revision: '1' },
    { url: "/css/materialize.min.css", revision: '1' },
    { url: "/js/materialize.min.js", revision: '1' },
    { url: "/js/nav.js", revision: '1' },
    { url: "/js/football_api.js", revision: '1' },
    { url: "/js/idb.js", revision: '1' },
    { url: "/js/database.js", revision: '1' },
  ], {
    ignoreUrlParametersMatching: [/.*/]
  });

  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
  );

} else {
  console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});