// Service Worker：缓存 app 外壳，实现离线可用
const CACHE = 'guitar-kit-v2';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const req = e.request;
  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    // HTML 页面：网络优先（保证拿到更新），离线再回退缓存
    e.respondWith(
      fetch(req).then(resp => { const c = resp.clone(); caches.open(CACHE).then(ca => ca.put(req, c)).catch(()=>{}); return resp; })
        .catch(() => caches.match(req).then(h => h || caches.match('./index.html')))
    );
  } else {
    // 图标等静态资源：缓存优先
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(resp => {
        const c = resp.clone(); caches.open(CACHE).then(ca => ca.put(req, c)).catch(()=>{}); return resp;
      }))
    );
  }
});
