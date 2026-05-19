// symphonies.js
// Powers two features off src/data/symphonies.json (see SYMPHONY_DATA.md):
//   1. A "Listen to a random symphony" popup — wired to any element with the
//      [data-random-symphony] attribute (present on index.html + symphonies.html).
//   2. The full, searchable list rendered into #symphony-list (symphonies.html).

let dataPromise = null;
let lastShownId = null;

function loadSymphonies() {
  if (!dataPromise) {
    dataPromise = fetch('src/data/symphonies.json', { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(doc => doc.symphonies || []);
  }
  return dataPromise;
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const SPOTIFY_GLYPH = '<svg viewBox="0 0 50 50" aria-hidden="true"><use href="#spotify-icon"></use></svg>';
const YOUTUBE_GLYPH = '<svg viewBox="0 0 24 24" aria-hidden="true">'
  + '<path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" fill="currentColor"/></svg>';

/* ----- Random popup ------------------------------------------------------- */

let lastFocusedTrigger = null;

function tabbables(root) {
  return Array.from(root.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter(el => el.offsetParent !== null);
}

function closeModal(backdrop) {
  if (backdrop.classList.contains('hidden')) return;
  backdrop.classList.add('hidden');
  // Restore focus to whatever opened the dialog (WCAG 2.4.3).
  if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
    lastFocusedTrigger.focus();
  }
}

function ensureModal() {
  let backdrop = document.getElementById('symphony-backdrop');
  if (backdrop) return backdrop;

  backdrop = document.createElement('div');
  backdrop.id = 'symphony-backdrop';
  backdrop.className = 'hidden';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-labelledby', 'symphony-modal-work');
  backdrop.setAttribute('aria-describedby', 'symphony-modal-composer');
  backdrop.innerHTML = `
    <div class="symphony-modal" tabindex="-1">
      <button class="symphony-modal__close" type="button" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <p class="symphony-modal__eyebrow">A symphony for you</p>
      <div class="symphony-modal__live" aria-live="polite">
        <p class="symphony-modal__composer" id="symphony-modal-composer" data-field="composer"></p>
        <h2 class="symphony-modal__work" id="symphony-modal-work" data-field="work"></h2>
        <p class="symphony-modal__recording" data-field="recording"></p>
        <div class="symphony-modal__divider"></div>
        <div data-field="spotify"></div>
      </div>
      <button class="symphony-modal__again" type="button">Hear another</button>
    </div>`;
  document.body.appendChild(backdrop);

  backdrop.querySelector('.symphony-modal__close')
    .addEventListener('click', () => closeModal(backdrop));
  backdrop.querySelector('.symphony-modal__again')
    .addEventListener('click', () => showRandom());
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(backdrop); });
  document.addEventListener('keydown', e => {
    if (backdrop.classList.contains('hidden')) return;
    if (e.key === 'Escape') {
      closeModal(backdrop);
    } else if (e.key === 'Tab') {
      // Trap focus inside the dialog (WCAG 2.1.2).
      const items = tabbables(backdrop);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  return backdrop;
}

function pickRandom(symphonies) {
  // The headline is "Listen to a random symphony", so prefer entries that
  // are actually listenable (Spotify or YouTube). Fall back to the whole
  // list only if none are linked.
  let pool = symphonies.filter(s => s.spotify || s.youtube);
  if (pool.length === 0) pool = symphonies;
  if (pool.length === 0) return null;
  let pick = pool[Math.floor(Math.random() * pool.length)];
  if (pool.length > 1 && pick.id === lastShownId) {
    pick = pool[(pool.indexOf(pick) + 1) % pool.length];
  }
  lastShownId = pick.id;
  return pick;
}

function renderListenBlock(sym) {
  if (sym.spotify) {
    return `<a class="symphony-modal__listen-link symphony-modal__listen-link--spotify"
              href="${escapeHTML(sym.spotify)}" target="_blank" rel="noopener noreferrer">
              ${SPOTIFY_GLYPH}<span>Listen on Spotify</span></a>`;
  }
  if (sym.youtube) {
    return `<a class="symphony-modal__listen-link symphony-modal__listen-link--youtube"
              href="${escapeHTML(sym.youtube)}" target="_blank" rel="noopener noreferrer">
              ${YOUTUBE_GLYPH}<span>Watch on YouTube</span></a>`;
  }
  return '<p class="symphony-modal__nolink">No recording available for this one.</p>';
}

async function showRandom() {
  const backdrop = ensureModal();
  const opening = backdrop.classList.contains('hidden');
  let symphonies;
  try {
    symphonies = await loadSymphonies();
  } catch (err) {
    console.error('Failed to load symphonies:', err);
    return;
  }
  const sym = pickRandom(symphonies);
  if (!sym) return;

  backdrop.querySelector('[data-field="composer"]').textContent = sym.composer;
  backdrop.querySelector('[data-field="work"]').textContent = sym.work;

  const recEl = backdrop.querySelector('[data-field="recording"]');
  if (sym.recording) {
    recEl.innerHTML = `<span class="symphony-modal__recording-label">As recorded by</span> ${escapeHTML(sym.recording)}`;
    recEl.hidden = false;
  } else {
    recEl.textContent = '';
    recEl.hidden = true;
  }

  backdrop.querySelector('[data-field="spotify"]').innerHTML = renderListenBlock(sym);
  backdrop.classList.remove('hidden');
  // On first open move focus into the dialog; on "Hear another" reroll the
  // dialog is already open, so leave focus on the pressed button.
  if (opening) backdrop.querySelector('.symphony-modal__close').focus();
}

/* ----- Full list page ----------------------------------------------------- */

function rowHTML(sym) {
  let listen;
  if (sym.spotify) {
    listen = `<a class="symphony-table__listen--spotify" href="${escapeHTML(sym.spotify)}"
                target="_blank" rel="noopener noreferrer"
                aria-label="Listen on Spotify">${SPOTIFY_GLYPH}Listen</a>`;
  } else if (sym.youtube) {
    listen = `<a class="symphony-table__listen--youtube" href="${escapeHTML(sym.youtube)}"
                target="_blank" rel="noopener noreferrer"
                aria-label="Watch on YouTube">${YOUTUBE_GLYPH}Watch</a>`;
  } else {
    listen = '<span>—</span>';
  }
  return `<tr data-search="${escapeHTML((sym.composer + ' ' + sym.work).toLowerCase())}">
      <td class="symphony-table__num">${escapeHTML(sym.id)}</td>
      <td class="symphony-table__composer">${escapeHTML(sym.composer)}</td>
      <td class="symphony-table__work">${escapeHTML(sym.work)}</td>
      <td class="symphony-table__listen">${listen}</td>
    </tr>`;
}

async function renderList(container) {
  let symphonies;
  try {
    symphonies = await loadSymphonies();
  } catch (err) {
    console.error('Failed to load symphonies:', err);
    container.innerHTML = '<p class="symphony-empty">Could not load the symphony list.</p>';
    return;
  }

  container.innerHTML = `
    <div class="symphony-toolbar">
      <input class="symphony-search" type="search" placeholder="Search composer or work…"
             aria-label="Search symphonies" />
      <span class="symphony-count" role="status" aria-live="polite"></span>
    </div>
    <table class="symphony-table">
      <caption class="sr-only">List of ${symphonies.length} symphonies, searchable by composer or work.</caption>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Composer</th>
          <th scope="col">Symphony</th>
          <th scope="col"><span class="sr-only">Recording</span></th>
        </tr>
      </thead>
      <tbody>${symphonies.map(rowHTML).join('')}</tbody>
    </table>
    <p class="symphony-empty" hidden>No symphonies match that search.</p>`;

  const search = container.querySelector('.symphony-search');
  const countEl = container.querySelector('.symphony-count');
  const rows = Array.from(container.querySelectorAll('tbody tr'));
  const emptyEl = container.querySelector('.symphony-empty');

  const update = () => {
    const q = search.value.trim().toLowerCase();
    let visible = 0;
    rows.forEach(tr => {
      const show = !q || tr.dataset.search.includes(q);
      tr.hidden = !show;
      if (show) visible++;
    });
    countEl.textContent = q
      ? `${visible} of ${symphonies.length} symphonies`
      : `${symphonies.length} symphonies`;
    emptyEl.hidden = visible !== 0;
  };

  let t;
  search.addEventListener('input', () => { clearTimeout(t); t = setTimeout(update, 120); });
  update();
}

/* ----- Init --------------------------------------------------------------- */

function updateHeadlineCount() {
  const el = document.getElementById('symphony-headline-count');
  if (!el) return;
  loadSymphonies()
    .then(symphonies => { el.textContent = symphonies.length.toLocaleString(); })
    .catch(() => { /* keep the static fallback */ });
}

export function initSymphonies() {
  document.querySelectorAll('[data-random-symphony]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      lastFocusedTrigger = e.currentTarget; // restore focus here on close
      showRandom();
    });
  });
  updateHeadlineCount();
  const listContainer = document.getElementById('symphony-list');
  if (listContainer) renderList(listContainer);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSymphonies);
} else {
  initSymphonies();
}
