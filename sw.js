var staticAssetsCacheName = 'todo-assets-v6';
var dynamicCacheName = 'todo-dynamic-v6';

self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
      caches.open(staticAssetsCacheName).then(function (cache) {
        cache.addAll([
            '/',
            "14eaac23ec191904c72b6844b3082658.mp3","33df3f0790cee72bb6d12c5d2a1240b9.mp3","930b82081238d08754da34145e2e3e11.mp3","aa23f122d6523a5a8e8979ea2446eae1.mp3","images/Background2.png","images/Background3-compressor.png","images/Background3.png","images/CharacterLowerSpriteSheet.png","images/CharacterUpper.png","images/CharacterUpperFlipped.png","images/Flash.svg","images/Lamp.svg","images/logo.svg","images/Pot.svg","images/scene.png","images/score.svg","images/Seed.png","images/Seed.svg","images/SpiderSplash.svg","images/SpiderSpriteSheet.png","images/SVG/Asset 1.svg","images/SVG/CharacterLower.svg","images/SVG/CharacterLowerFlipped.svg","images/SVG/CharacterLowerSpriteSheet.svg","images/SVG/CharacterLowerSpriteSheetOld.svg","images/SVG/CharacterUpper.svg","images/SVG/CharacterUpperFlipped.svg","images/SVG/leaf.svg","images/SVG/SpiderSpriteSheet.svg","images/title-background.png","index.html","main.da0f6856d5b4e9ef7305.js","manifests/character.json","manifests/gameConfig.json","manifests/light.json","manifests/plant.json","manifests/scene.json","manifests/spider.json","plants/Plant1.png","plants/Plant1.svg","plants/Plant2.png","plants/Plant2.svg","plants/Plant3.png","plants/Plant3.svg","plants/Plant4.png","plants/Plant4.svg","sounds/GlassShatter.mp3","sounds/hush.mp3","sounds/reggae.mp3","sounds/Shotgun.mp3","sounds/ShotgunQuieter.mp3","sounds/Splash.mp3"
        ]
        );
      }).catch((error) => {
        console.log('Error caching static assets:', error);
      })
    );
  });

  self.addEventListener('activate', function (event) {
    if (self.clients && clients.claim) {
      clients.claim();
    }
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.filter(function (cacheName) {
            return (cacheName.startsWith('todo-')) && cacheName !== staticAssetsCacheName;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
        ).catch((error) => {
            console.log('Some error occurred while removing existing cache:', error);
        });
      }).catch((error) => {
        console.log('Some error occurred while removing existing cache:', error);
    }));
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request)
          .then((fetchResponse) => {
              return cacheDynamicRequestData(dynamicCacheName, event.request.url, fetchResponse.clone());
          }).catch((error) => {
            console.log(error);
          });
      }).catch((error) => {
        console.log(error);
      })
    );
  });

  function cacheDynamicRequestData(dynamicCacheName, url, fetchResponse) {
    return caches.open(dynamicCacheName)
      .then((cache) => {
        cache.put(url, fetchResponse.clone());
        return fetchResponse;
      }).catch((error) => {
        console.log(error);
      });
  }
