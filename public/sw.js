const CACHE_VERSION = 'v1';
const STATIC_CACHE = `swaptrade-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `swaptrade-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `swaptrade-images-${CACHE_VERSION}`;

const PRECACHE_URLS = ['/', '/offline'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const current = new Set([STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !current.has(k)).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // API routes — Network First: always try the network, fall back to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    return;
  }

  // Next.js hashed static chunks — Cache First (immutable, content-addressed)
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Images — Cache First with dedicated bucket
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // HTML pages — Stale While Revalidate
  event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    return (
      cached ??
      new Response(JSON.stringify({ error: 'offline' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      })
    );
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const revalidate = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  if (cached) {
    // Serve stale immediately, revalidate in the background
    revalidate.catch(() => null);
    return cached;
  }

  return (
    (await revalidate) ??
    (await caches.match('/offline')) ??
    new Response('Offline', { status: 503 })
  );
}

/**
 * Push notification event handler
 */
self.addEventListener('push', (event) => {
  if (!event.data) {
    console.warn('Push event received but no data provided');
    return;
  }

  let payload;
  try {
    payload = event.data.json();
  } catch {
    // If not JSON, treat text as notification body
    payload = {
      type: 'system',
      title: 'SwapTrade Notification',
      body: event.data.text(),
    };
  }

  const {
    type = 'system',
    title = 'SwapTrade',
    body = 'New notification',
    icon = '/favicon.ico',
    badge = '/badge.png',
    tag = `notification-${Date.now()}`,
    data = {},
    requireInteraction = false,
  } = payload;

  const notificationOptions = {
    body,
    icon,
    badge,
    tag,
    requireInteraction,
    data: {
      type,
      ...data,
    },
    actions: getActionsForType(type),
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification(title, notificationOptions)
  );
});

/**
 * Notification click event handler
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const { data } = event.notification;
  const { type, orderId, tradedSymbol, link } = data;

  let clientUrl = '/';

  switch (type) {
    case 'trade':
      clientUrl = `/dashboard?tab=trades&orderId=${orderId || ''}`;
      break;
    case 'price-alert':
      clientUrl = `/dashboard?tab=alerts&symbol=${tradedSymbol || ''}`;
      break;
    case 'referral':
      clientUrl = '/dashboard?tab=referrals';
      break;
    default:
      clientUrl = link || '/';
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there's already a window/tab open
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === clientUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, open a new window
      if (clients.openWindow) {
        return clients.openWindow(clientUrl);
      }
    })
  );
});

/**
 * Notification close event handler - for analytics
 */
self.addEventListener('notificationclose', (event) => {
  const { data } = event.notification;
  // Could send analytics here
  console.debug('Notification dismissed:', data.type);
});

/**
 * Message event handler - for main thread communication
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { payload } = event.data;

    const {
      title = 'SwapTrade',
      body = 'Notification',
      icon = '/favicon.ico',
      badge = '/badge.png',
      tag = `notification-${Date.now()}`,
      data = {},
      requireInteraction = false,
    } = payload;

    const notificationOptions = {
      body,
      icon,
      badge,
      tag,
      requireInteraction,
      data,
      vibrate: [200, 100, 200],
    };

    self.registration.showNotification(title, notificationOptions);
  }
});

/**
 * Get notification actions based on notification type
 */
function getActionsForType(type) {
  switch (type) {
    case 'trade':
      return [
        { action: 'view', title: 'View Order' },
        { action: 'close', title: 'Dismiss' },
      ];
    case 'price-alert':
      return [
        { action: 'view', title: 'View Chart' },
        { action: 'close', title: 'Dismiss' },
      ];
    default:
      return [];
  }
}
