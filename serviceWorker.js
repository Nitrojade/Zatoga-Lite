if(navigator.onLine && true) {
  importScripts('https://arc.io/arc-sw-core.js');
}

var version = 3.39;

let staticZatoga = "zatoga-v2";
let assets = [
  /*"/",*/
  "/404.html",
  "/media/icon.png",
  "/media/loading.gif",
  "/media/blocked.png",
  "/media/Green_Check_Circle.png",
  "/favicon.ico"/*
  "/status/",
  "/app/",
  "/app/info.html",
  "/app/suggest.html",
  "/app/logout.html",
  "/app/blocked.html",
  "/media/style.css",
  "/media/application.js",
  "/app/games.json",
  "/app/premium/",
  "/app/games/offline/minecraft---javascript-edition/",
  "/app/games/offline/doodle-jump/",
  "/app/games/offline/doodle-jump/background.png",
  "/app/games/offline/doodle-jump/border.png",
  "/app/games/offline/doodle-jump/image.png",
  "/app/games/offline/doodle-jump/main.js",
  "/app/games/offline/doodle-jump/prefixfree.min.js",
  "/app/games/offline/doodle-jump/style.css",
  "/app/games/offline/2048-game/",
  "/app/games/offline/chrome-dino/",
  "/app/games/offline/super-mario/",
  "/app/games/offline/super-mario/game.png",
  "/app/games/offline/super-mario/game.html",
  "/app/games/offline/super-mario/power.html",
  "/app/games/offline/super-mario/audio/theme/Sky.ogg",
  "/app/games/offline/super-mario/audio/coin.ogg",
  "/app/games/offline/super-mario/audio/die.ogg",
  "/app/games/offline/super-mario/audio/enemy_die.ogg",
  "/app/games/offline/super-mario/audio/grow.ogg",
  "/app/games/offline/super-mario/audio/hurt.ogg",
  "/app/games/offline/super-mario/audio/invincibility.ogg",
  "/app/games/offline/super-mario/audio/jump.ogg",
  "/app/games/offline/super-mario/audio/lifeupgrade.ogg",
  "/app/games/offline/super-mario/audio/mushroom.ogg",
  "/app/games/offline/super-mario/audio/music.ogg",
  "/app/games/offline/super-mario/audio/Overworld.ogg",
  "/app/games/offline/super-mario/audio/shell.ogg",
  "/app/games/offline/super-mario/audio/shoot.ogg",
  "/app/games/offline/super-mario/audio/success.ogg",
  "/app/games/offline/super-mario/Content/backgrounds/01.png",
  "/app/games/offline/super-mario/Content/backgrounds/02.png",
  "/app/games/offline/super-mario/Content/backgrounds/03.png",
  "/app/games/offline/super-mario/Content/backgrounds/04.png",
  "/app/games/offline/super-mario/Content/backgrounds/05.png",
  "/app/games/offline/super-mario/Content/backgrounds/06.png",
  "/app/games/offline/super-mario/Content/backgrounds/07.png",
  "/app/games/offline/super-mario/Content/backgrounds/08.png",
  "/app/games/offline/super-mario/Content/fonts/Super Mario Bros.ttf",
  "/app/games/offline/super-mario/Content/mario-enemies.png",
  "/app/games/offline/super-mario/Content/mario-objects.png",
  "/app/games/offline/super-mario/Content/mario-peach.png",
  "/app/games/offline/super-mario/Content/mario-sprites.png",
  "/app/games/offline/super-mario/Content/style.css",
  "/app/games/offline/super-mario/Scripts/constants.js",
  "/app/games/offline/super-mario/Scripts/jquery.js",
  "/app/games/offline/super-mario/Scripts/keys.js",
  "/app/games/offline/super-mario/Scripts/main.js",
  "/app/games/offline/super-mario/Scripts/oop.js",
  "/app/games/offline/super-mario/Scripts/sounds_noop.js",
  "/app/games/offline/super-mario/Scripts/sounds.js",
  "/app/games/offline/super-mario/Scripts/testlevels.js",
  "/app/games/online.html" */
];

self.addEventListener("install", installEvent => {
  // Kill old caches
  caches.keys().then(function(names) {
    for (let name of names)
      caches.delete(name);
  });
  installEvent.waitUntil(
    caches.open(staticZatoga).then(cache => {
      cache.addAll(assets)
    })
  )
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
});