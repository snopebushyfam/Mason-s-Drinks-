// Bei jeder Änderung an Rezepten oder Bildern VERSION erhöhen.
const VERSION = 'v4';
const CACHE = 'masons-drinks-' + VERSION;
const CORE = [
  './', 'index.html', 'style.css?v=4', 'app.js?v=4', 'drinks.js?v=4', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/apple-touch-icon.png', 'icons/logo@3x.png'
];
const IMAGES = [
  'img/adios-motherfucker.jpg',
  'img/amaretto-sour.jpg',
  'img/amore-piccante.jpg',
  'img/aperol-spritz.jpg',
  'img/b52.jpg',
  'img/bahama-mama.jpg',
  'img/baileys-colada.jpg',
  'img/bellini.jpg',
  'img/beverly-hills-iced-tea.jpg',
  'img/blow-job.jpg',
  'img/bora-bora.jpg',
  'img/bubblegum-shot.jpg',
  'img/caipifragola.jpg',
  'img/caipirinha.jpg',
  'img/coconut-kiss.jpg',
  'img/cosmopolitan.jpg',
  'img/cuba-libre.jpg',
  'img/daiquiri.jpg',
  'img/frozen-strawberry-daiquiri.jpg',
  'img/del-mar.jpg',
  'img/espresso-martini.jpg',
  'img/gin-sour.jpg',
  'img/hardcore.jpg',
  'img/hugo.jpg',
  'img/hurricane.jpg',
  'img/ipanema.jpg',
  'img/lillet-wildberry.jpg',
  'img/london-mule.jpg',
  'img/long-island-iced-tea.jpg',
  'img/mai-tai.jpg',
  'img/margarita.jpg',
  'img/frozen-margarita.jpg',
  'img/martini.jpg',
  'img/matcha-erdbeer.jpg',
  'img/matcha-latte.jpg',
  'img/matcha-mango.jpg',
  'img/melon-colada.jpg',
  'img/melon-sour.jpg',
  'img/mojito.jpg',
  'img/moscow-mule.jpg',
  'img/pina-colada.jpg',
  'img/pimms-cup.jpg',
  'img/pornstar-martini.jpg',
  'img/rainbow.jpg',
  'img/sarti-spritz.jpg',
  'img/sex-on-the-beach.jpg',
  'img/lotus-shake.jpg',
  'img/oreo-shake.jpg',
  'img/raffaello-shake.jpg',
  'img/spaghetti-eis-shot.jpg',
  'img/strawberry-colada.jpg',
  'img/swimming-pool.jpg',
  'img/tequila-sunrise.jpg',
  'img/touch-down.jpg',
  'img/tropical.jpg',
  'img/virgin-colada.jpg',
  'img/virgin-mojito.jpg',
  'img/virgin-strawberry-colada.jpg',
  'img/white-russian.jpg',
  'img/whisky-sour.jpg',
  'img/zombie.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).then(() => c.addAll(IMAGES).catch(() => {}))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Seiten & Daten: erst Netz (damit Änderungen sofort ankommen), sonst Cache.
// Bilder: erst Cache.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isImg = req.destination === 'image';
  if (isImg) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    })));
  } else {
    e.respondWith(fetch(req, { cache: 'no-cache' }).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
  }
});
