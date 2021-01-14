var CACHE = 'cache-v3';

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  })
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    }).catch(() => {});
  });
}

// This fallback never fails since it uses embedded fallbacks.
function useFallback() {
  return fromCache('/offline').catch(() => new Response('offline'));
}

let CacheAndUpdate = (req) => {
  return fromCache(req)
    .then(e => {
      update(request);
      return e;
    });
}

let NetworkOrCache = (request) => {
  return fetch(request).then(function (response) {
    return response.ok ? response : fromCache(request);
  })
  .catch(function () {
    return fromCache(request);
  });
}

let CacheOnly = fromCache;


addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE).then((cache) => {
			return cache.addAll([
				'/lib/react.js',
				'/lib/react-dom.js',
				'/lib/hydrate.js',
				'/lib/wrapper.js',
				'/offline',
				'/views/views/default/offline.js'
			]);
		})
	);
});

addEventListener('activate', (event) => {
	var cacheKeeplist = [CACHE];
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(keyList.map((key) => {
				if (cacheKeeplist.indexOf(key) === -1) {
					return caches.delete(key);
				}
			}));
		})
	);
});

onmessage = e => { console.log(e) }

let networkOrFallback = (evt) => {
	evt.respondWith(
	  fetch(evt.request)
    .catch(() => fromCache(evt.request)
  	.catch(() => offline()))
  );

  evt.waitUntil(
    update(evt.request)
    .then(refresh)
  );
};

let networkThenCache = (evt) => {
	evt.respondWith(
  	fromNetwork(evt.request, 500)
  	.catch(() => fromCache(evt.request)
  	.catch(() => fetch(evt.request).catch(e => notFound())))
  );

  evt.waitUntil(
    update(evt.request)
    .then(refresh)
  );
};

let cacheAndUpdate = (evt) => {
	evt.respondWith(
  	fromCache(evt.request)
  	.catch(() => fetch(evt.request).catch(e => notFound()))
  );

  evt.waitUntil(
    update(evt.request)
    .then(refresh)
  );
};

let cache = (evt) => {
	evt.respondWith(
  	fromCache(evt.request)
  	.catch(() => fetch(evt.request).catch(e => notFound()))
  );
};

let network = (evt) => {
	evt.respondWith(fetch(evt.request).catch(e => notFound()));
};

let paths = {
	uncachable: ["sw.js"],
	json: [".json", "registerSW.js"],
	views: [/\/views.*.js/],
	images: [".png", ".svg", ".jpg", ".ico"],
	static: [".woff2"],
	staticLibs: ["lib/react.js", "lib/react-dom.js"],
	libs: [".js"],
	style: [".css"],
	default: [/.*/]
}

let functions = {
	uncachable: network,
	views: networkThenCache,
	json: cacheAndUpdate,
	images: cache,
	static: cache,
	staticLibs: cache,
	libs: cache,
	style: cache,
	default: networkOrFallback,
}

// Fetch, timeout, load from cache or just load
self.addEventListener('fetch', function(evt) {
	// Unlocal resources
  if (new URL(evt.request.url).host != self.location.host) {
		return network(evt);
	}

	let anyMatch = (text, list) => {
		let id = 0;
		let matched = false;
		while(!matched && (id != list.length)) {
			if (typeof list[id] == "string") list[id] = new RegExp(list[id] + "$")
			if(text.match(list[id])) matched = true;
			id++;
		};
		return matched;
	}

  for (key in paths) {
  	if(anyMatch(evt.request.url, paths[key])) {
  		console.debug('[SW]', 'Loading: ', evt.request.url, 'with: ', functions[key].name);
  		functions[key](evt);
  		return;
	  }
	}
});