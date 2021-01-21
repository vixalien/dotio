let CACHE = 'v1';

// utils

function fromCache(request) {
	return caches.open(CACHE).then(function (cache) {
		return cache.match(request).then(function (matching) {
			return matching || Promise.reject('no-match');
		});
	});
}

function toCache(request, response) {
	return caches.open(CACHE).then(function (cache) {
		if (response.status < 200 || response.status > 399) return "not stored"
		return cache.put(request, response.clone()).then(() => response);
	});
}

function update(request) {
	return fetch(request).then(function (response) {
		return toCache(request, response);
	})
	// failed to fetch, probably offline, do nothing
	.catch(() => {});
}

// functions

let Precache = (list) => {
	return caches.open(CACHE).then(function (cache) {
		return cache.addAll(list);
	});
}

// strategies

let StaleWhileRevalidate = () => {
	return {
		onfetch: (req) => fromCache(req).catch(() => fetch(req)),
		waitUntil: (req) => update(req)
	}
}

let NetworkOnly = () => {
	return {
		onfetch: (req) => fetch(req)
	}
}

let CacheOnly = () => {
	return {
		onfetch: (req) => fromCache(req)
	}
}

let NetworkFirst = () => {
	return {
		onfetch: (req) => fetch(req).catch(() => fromCache(req))
	}
}

let CacheFirst = () => {
	return {
		onfetch: (req) => fromCache(req).catch(() => fetch(req).then(res => toCache(req, res)))
	}
}

let useFallback = (fn, fallback) => function Fallback() {
	let strategy = fn();
	let onfetch;
	if (strategy.onfetch) {
		onfetch = (req) => strategy.onfetch(req).catch(() => fallback(req))
	} else {
		onfetch = fallback;
	}
	return {
		onfetch,
		waitUntil: strategy.waitUntil
	}
}

let Offline = () => fromCache('/offline');
let useOffline = (fn) => useFallback(fn, Offline)

let otherSiteRegex = `^((?!${location.host}).)*$`

let Paths = {
	// requests to other sites
	[otherSiteRegex]: NetworkOnly,
	"sw\.js": NetworkOnly,
	"/favicon/.*": CacheFirst,
	"\.json$": StaleWhileRevalidate,
	"/lib/\.*": CacheFirst,
	"bundle.production.min.js": CacheFirst,
	"\.(css|js)$": StaleWhileRevalidate,
	"/offline(.js)?$": CacheOnly,
	"\.*": useOffline(StaleWhileRevalidate),
}


addEventListener('install', evt => 
	evt.waitUntil(Precache([
		'/offline',
		'/',
		'/unbox.css',
	]))
);

// Fetch, timeout, load from cache or just load
addEventListener('fetch', async (evt) => {
	for (key in Paths) {
		if(evt.request.url.match(new RegExp(key))) {
			let handler = Paths[key]();
			let waitUntil = handler.waitUntil || (() => Promise.resolve("done"));
			console.debug('[SW]', 'Loading:  ', evt.request.url, 'with: ', Paths[key].name);
			evt.waitUntil(waitUntil(evt.request));
			evt.respondWith(handler.onfetch(evt.request))
			return;
		}
	}
});

// Content indexing
if ('index' in registration) {
	registration.index.add({
		id: 'home',
		url: '/',
		launchUrl: '/',
		title: 'vixalien.io',
		description: 'Blog for vixalien',
		icons: [{
			src: '/favicon/android-chrome-192x192.png',
			sizes: '192x192',
			type: 'image/png',
		}],
		category: 'homepage'
	})
}