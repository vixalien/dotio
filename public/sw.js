importScripts('/workbox-v6.0.2/workbox-sw.js')

workbox.setConfig({modulePathPrefix: '/workbox-v6.0.2/'})

let CACHE = 'cache-v2';

let { precacheAndRoute } = workbox.precaching;
let {registerRoute} = workbox.routing;
let {CacheFirst, StaleWhileRevalidate} = workbox.strategies;

addEventListener('install', () => {
	self.skipWaiting();
	self.clients.claim();
})

registerRoute(
  ({request}) => request.destination === 'style',
  new CacheFirst({
    cacheName: CACHE,
  })
);

registerRoute(
  new RegExp("/views/*.js"),
  new CacheFirst({
    cacheName: CACHE,
  })
);

registerRoute(
  ({url}) => url.pathname.startsWith('/'),
  new StaleWhileRevalidate()
);

precacheAndRoute(['/offline']);