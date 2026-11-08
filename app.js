(() => {
  'use strict';

  const DRINKS = window.DRINKS.slice().sort((a, b) => a.name.localeCompare(b.name, 'de'));
  const CATS = window.CATEGORIES;
  const catName = Object.fromEntries(CATS.map(c => [c.id, c.name]));
  const byId = Object.fromEntries(DRINKS.map(d => [d.id, d]));

  const $ = s => document.querySelector(s);
  const el = {
    list: $('#list'), chips: $('#chips'), q: $('#q'), clear: $('#clear'),
    footer: $('#footer'), detail: $('#detail'), toggle: $('#viewToggle'), toolbar: $('#toolbar')
  };

  const store = {
    get(k, d) { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} }
  };

  const state = { q: '', filter: 'all', view: store.get('view', 'grid') };

  /* ---------- Icons ---------- */
  const I = {
    grid: '<svg viewBox="0 0 24 24"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"/></svg>',
    list: '<svg viewBox="0 0 24 24"><path d="M4 5.5h3v3H4v-3Zm5 .5h11v2H9V6Zm-5 4.5h3v3H4v-3Zm5 .5h11v2H9v-2Zm-5 4.5h3v3H4v-3Zm5 .5h11v2H9v-2Z"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 8 14"><path d="M1.3 0 8 7l-6.7 7L0 12.7 5.4 7 0 1.3 1.3 0Z"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M15.4 4.6 8 12l7.4 7.4-1.4 1.4L5.2 12 14 3.2l1.4 1.4Z"/></svg>',
    glass: '<svg viewBox="0 0 24 24"><path d="M5 2h14l-1.6 17.2A3 3 0 0 1 14.4 22H9.6a3 3 0 0 1-3-2.8L5 2Zm2.2 2 .5 5h8.6l.5-5H7.2Z"/></svg>',
    ice: '<svg viewBox="0 0 24 24"><path d="M11 2h2v3.6l2.6-2.6 1.4 1.4-4 4V11h2.6l4-4 1.4 1.4-2.6 2.6H22v2h-3.6l2.6 2.6-1.4 1.4-4-4H13v2.6l4 4-1.4 1.4-2.6-2.6V22h-2v-3.6L8.4 21 7 19.6l4-4V13H8.4l-4 4L3 15.6 5.6 13H2v-2h3.6L3 8.4 4.4 7l4 4H11V8.4l-4-4L8.4 3 11 5.6V2Z"/></svg>',
    shake: '<svg viewBox="0 0 24 24"><path d="M9 1h6v3h-1v1.2c2 .5 3 1.6 3 3.3V20a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V8.5c0-1.7 1-2.8 3-3.3V4H9V1Zm-1 10v9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-9H8Z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24"><path d="M20.5 3.5S21 12 16 17c-3 3-7.3 3.3-9.6 2.3L4.7 21 3.3 19.6l1.6-1.7C3.9 15.6 4.2 11 7 8c5-5 13.5-4.5 13.5-4.5ZM7.6 16.4C11 13 13.4 10.6 15 9l-1-1c-1.6 1.6-4 4-7.4 7.4l1 1Z"/></svg>',
    warn: '<svg viewBox="0 0 24 24"><path d="M12 2 1 21h22L12 2Zm-1 7h2v6h-2V9Zm0 8h2v2h-2v-2Z"/></svg>'
  };

  /* ---------- Search ---------- */
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss');
  const ALIAS = { vodka: 'wodka', 'pina': 'pinacolada', daiquiri: 'daquiri', 'iced tea': 'ice tea', 'lime': 'limette limettensaft', 'zitronensaft': 'zitrone' };
  DRINKS.forEach(d => {
    let t = [d.name, catName[d.cat], d.glass, d.method, d.garnish, ...d.ing.map(i => i[1])].join(' ');
    if (d.af) t += ' alkoholfrei virgin ohne alkohol';
    let n = norm(t);
    for (const [k, v] of Object.entries(ALIAS)) if (n.includes(k)) n += ' ' + v;
    d._s = n;
    d._sub = d.ing.filter(i => i[0] !== 'auffüllen' && i[0] !== '').slice(0, 3).map(i => i[1]).join(' · ');
  });

  function filtered() {
    const terms = norm(state.q.trim()).split(/\s+/).filter(Boolean);
    return DRINKS.filter(d => {
      if (state.filter === 'af' && !d.af) return false;
      if (state.filter !== 'all' && state.filter !== 'af' && d.cat !== state.filter) return false;
      return terms.every(t => d._s.includes(t));
    });
  }

  /* ---------- Render list ---------- */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const img = d => `img/${d.id}.jpg`;

  function renderChips() {
    const counts = { all: DRINKS.length, af: DRINKS.filter(d => d.af).length };
    CATS.forEach(c => counts[c.id] = DRINKS.filter(d => d.cat === c.id).length);
    const items = [{ id: 'all', name: 'Alle' }, { id: 'af', name: 'Alkoholfrei' }, ...CATS];
    el.chips.innerHTML = items.map(c =>
      `<button class="chip${c.id === 'af' ? ' af' : ''}${state.filter === c.id ? ' on' : ''}" data-f="${c.id}" role="tab" aria-selected="${state.filter === c.id}">${esc(c.name)} <span class="n">${counts[c.id]}</span></button>`
    ).join('');
  }

  function renderList() {
    const ds = filtered();
    el.toggle.innerHTML = state.view === 'grid' ? I.list : I.grid;
    if (!ds.length) {
      el.list.innerHTML = `<div class="empty"><b>Nichts gefunden</b>Versuch es mit einem anderen Namen oder einer Zutat.</div>`;
    } else if (state.view === 'grid') {
      el.list.innerHTML = `<div class="grid">${ds.map(d => `
        <button class="card" data-id="${d.id}">
          <div class="ph"><img src="${img(d)}" alt="" loading="lazy" decoding="async">${d.af ? '<span class="badge">0,0 %</span>' : ''}</div>
          <div class="t">${esc(d.name)}</div>
          <div class="s">${esc(catName[d.cat])} · ${esc(d.glass)}</div>
        </button>`).join('')}</div>`;
    } else {
      const groups = {};
      ds.forEach(d => { const L = norm(d.name[0]).toUpperCase(); (groups[/[A-Z]/.test(L) ? L : '#'] ||= []).push(d); });
      el.list.innerHTML = Object.entries(groups).map(([L, arr]) => `
        <div class="section-h">${L}</div>
        <div class="group">${arr.map(d => `
          <button class="row" data-id="${d.id}">
            <img src="${img(d)}" alt="" loading="lazy" decoding="async">
            <div class="tx">
              <div class="t">${esc(d.name)}${d.af ? '<span class="tag0">0,0 %</span>' : ''}</div>
              <div class="s">${esc(d._sub)}</div>
            </div>${I.chev}
          </button>`).join('')}</div>`).join('');
    }
    el.footer.textContent = `${ds.length} von ${DRINKS.length} Drinks · Masons Getränkehandbuch`;
    document.documentElement.style.setProperty('--tb', el.toolbar.offsetHeight + 'px');
  }

  el.chips.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    state.filter = b.dataset.f;
    renderChips(); renderList();
    b.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
    el.chips.querySelector('.on')?.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
  });

  let qTimer;
  el.q.addEventListener('input', () => {
    el.clear.hidden = !el.q.value;
    clearTimeout(qTimer);
    qTimer = setTimeout(() => { state.q = el.q.value; renderList(); }, 60);
  });
  el.q.addEventListener('keydown', e => { if (e.key === 'Enter') el.q.blur(); });
  el.clear.addEventListener('click', e => {
    e.preventDefault(); el.q.value = ''; state.q = ''; el.clear.hidden = true; renderList(); el.q.focus();
  });

  el.toggle.addEventListener('click', () => {
    state.view = state.view === 'grid' ? 'list' : 'grid';
    store.set('view', state.view); renderList();
  });

  el.list.addEventListener('click', e => {
    const b = e.target.closest('[data-id]'); if (b) go(b.dataset.id);
  });

  const onScroll = () => document.body.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Detail ---------- */
  let current = null, portions = 1, wake = null;

  function scale(amount, f) {
    if (f === 1) return amount;
    const m = /^(\d+(?:[.,]\d+)?|½)(\s*)(.*)$/.exec(amount);
    if (!m || /cm/.test(m[3])) return amount;
    const n = (m[1] === '½' ? .5 : parseFloat(m[1].replace(',', '.'))) * f;
    const s = Number.isInteger(n) ? String(n) : n.toFixed(1).replace('.', ',');
    return s + m[2] + m[3];
  }

  function ingHTML(d) {
    return d.ing.map(([a, n, x]) => {
      const fill = a === 'auffüllen' || a === '';
      const amt = a === '' ? '' : scale(a, portions);
      return `<li><span class="a${fill ? ' fill' : ''}">${esc(amt || '–')}</span><span class="n">${esc(n)}${x ? `<span class="x">${esc(x)}</span>` : ''}</span></li>`;
    }).join('');
  }

  function renderDetail(d) {
    const list = filtered();
    const pool = list.some(x => x.id === d.id) ? list : DRINKS;
    const i = pool.findIndex(x => x.id === d.id);
    const prev = pool[(i - 1 + pool.length) % pool.length], next = pool[(i + 1) % pool.length];
    el.detail.innerHTML = `
      <div class="d-bar" id="dbar">
        <button class="back" id="back">${I.back}Drinks</button>
        <span class="lockup d-logo"><img src="icons/logo@3x.png" alt="Masons"><i></i><span>Crew</span></span><div class="d-title">${esc(d.name)}</div>
      </div>
      <div class="hero"><img src="${img(d)}" alt="${esc(d.name)}"></div>
      <div class="d-body">
        <div class="d-cat">${esc(catName[d.cat])}${d.af ? '<span class="tag0">0,0 %</span>' : ''}</div>
        <h2>${esc(d.name)}</h2>
        <div class="facts">
          <div class="fact">${I.glass}<div class="k">Glas</div><div class="v">${esc(d.glass)}</div></div>
          <div class="fact">${I.ice}<div class="k">Eis</div><div class="v">${esc(d.ice)}</div></div>
          <div class="fact">${I.shake}<div class="k">Technik</div><div class="v">${esc(d.method)}</div></div>
        </div>

        <section class="sec">
          <div class="sec-h"><h3>Zutaten</h3>
            <div class="seg" id="seg">${[1, 2, 3, 4].map(n => `<button data-p="${n}" class="${n === portions ? 'on' : ''}">${n}×</button>`).join('')}</div>
          </div>
          <ul class="ing" id="ing">${ingHTML(d)}</ul>
        </section>

        <section class="sec">
          <div class="sec-h"><h3>Zubereitung</h3></div>
          <ol class="steps" id="steps">${d.steps.map(s => `<li><span>${esc(s)}</span></li>`).join('')}</ol>
          <p class="hint">Tippe auf einen Schritt, um ihn abzuhaken.</p>
        </section>

        ${d.garnish && d.garnish !== '–' ? `
        <section class="sec">
          <div class="sec-h"><h3>Deko</h3></div>
          <div class="garnish">${I.leaf}<span>${esc(d.garnish)}</span></div>
        </section>` : ''}

        ${d.note ? `<div class="note">${I.warn}<span>${esc(d.note)}</span></div>` : ''}

        <div class="pn">
          <button data-go="${prev.id}"><div class="k">‹ Vorheriger</div><div class="v">${esc(prev.name)}</div></button>
          <button data-go="${next.id}"><div class="k">Nächster ›</div><div class="v">${esc(next.name)}</div></button>
        </div>
      </div>`;
    el.detail.scrollTop = 0;
    $('#dbar').classList.remove('solid');
  }

  el.detail.addEventListener('click', e => {
    if (e.target.closest('#back')) { closeDetail(); return; }
    const p = e.target.closest('[data-p]');
    if (p) {
      portions = +p.dataset.p;
      el.detail.querySelectorAll('#seg button').forEach(b => b.classList.toggle('on', +b.dataset.p === portions));
      $('#ing').innerHTML = ingHTML(current);
      return;
    }
    const s = e.target.closest('#steps li');
    if (s) { s.classList.toggle('done'); return; }
    const g = e.target.closest('[data-go]');
    if (g) { history.replaceState({ ...(history.state || {}), d: g.dataset.go }, '', '#/' + g.dataset.go); show(g.dataset.go); }
  });

  el.detail.addEventListener('scroll', () => {
    const bar = $('#dbar'); if (!bar) return;
    const h = el.detail.querySelector('.hero')?.offsetHeight || 300;
    bar.classList.toggle('solid', el.detail.scrollTop > h - 90);
  }, { passive: true });

  async function keepAwake(on) {
    try {
      if (on && 'wakeLock' in navigator && !wake) { wake = await navigator.wakeLock.request('screen'); wake.addEventListener('release', () => wake = null); }
      if (!on && wake) { await wake.release(); wake = null; }
    } catch {}
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && current) keepAwake(true); });

  function show(id) {
    const d = byId[id]; if (!d) return hide();
    if (current !== d) portions = 1;
    current = d;
    renderDetail(d);
    document.title = d.name + ' · Masons Crew';
    el.detail.classList.add('open');
    el.detail.setAttribute('aria-hidden', 'false');
    document.body.classList.add('detail-open', 'locked');
    keepAwake(true);
  }

  function hide() {
    current = null;
    document.title = 'Masons Crew – Drinks';
    el.detail.classList.remove('open');
    el.detail.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('detail-open', 'locked');
    keepAwake(false);
  }

  /* ---------- Routing (#/drink-id) ---------- */
  const idFromHash = () => decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  function go(id) { history.pushState({ d: id }, '', '#/' + id); show(id); }
  function closeDetail() {
    const st = history.state;
    if (st && st.d && !st.direct) history.back();
    else { history.replaceState(null, '', location.pathname + location.search); hide(); }
  }
  window.addEventListener('popstate', () => { const id = idFromHash(); id ? show(id) : hide(); });

  /* ---------- Edge swipe back (installed app only; Safari has its own) ---------- */
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (standalone) {
    let sx = null, dx = 0, sy = 0, active = false;
    el.detail.addEventListener('touchstart', e => {
      const t = e.touches[0]; if (t.clientX > 28) return;
      sx = t.clientX; sy = t.clientY; dx = 0; active = false;
    }, { passive: true });
    el.detail.addEventListener('touchmove', e => {
      if (sx === null) return;
      const t = e.touches[0]; dx = Math.max(0, t.clientX - sx);
      if (!active && Math.abs(t.clientY - sy) > Math.abs(dx)) { sx = null; return; }
      active = true;
      el.detail.classList.add('dragging'); document.body.classList.add('dragging');
      el.detail.style.transform = `translateX(${dx}px)`;
      const p = Math.min(1, dx / innerWidth);
      $('#home').style.transform = `translateX(${-24 * (1 - p)}%)`; $('#home').style.opacity = .5 + .5 * p;
    }, { passive: true });
    el.detail.addEventListener('touchend', () => {
      if (sx === null) return; sx = null;
      el.detail.classList.remove('dragging'); document.body.classList.remove('dragging');
      el.detail.style.transform = ''; $('#home').style.transform = ''; $('#home').style.opacity = '';
      if (active && dx > innerWidth * .3) closeDetail();
    });
  }

  /* ---------- Start ---------- */
  renderChips();
  renderList();
  onScroll();
  const startId = idFromHash();
  if (startId && byId[startId]) { history.replaceState({ d: startId, direct: true }, '', '#/' + startId); show(startId); }

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
