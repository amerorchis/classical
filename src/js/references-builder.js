// references-builder.js
// Renders the bibliography / references section from src/data/sources.json.

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function joinMeta(parts) {
  return parts.filter(Boolean).map(escapeHTML).join(', ');
}

function renderBookEntry(book) {
  const meta = joinMeta([book.publisher, book.year]);
  return `
    <li class="reference-entry">
      <span class="reference-entry__author">${escapeHTML(book.author)}</span>
      <em class="reference-entry__title">${escapeHTML(book.title)}</em>
      ${meta ? `<span class="reference-entry__meta">${meta}</span>` : ''}
    </li>`;
}

function renderTitleEntry(item) {
  let byline = '';
  if (item.editors) byline = `Edited by ${item.editors}`;
  else if (item.authors) byline = item.authors;
  else if (item.host) byline = `Hosted by ${item.host}`;
  else if (item.founder) byline = `Founded by ${item.founder}`;
  const meta = joinMeta([byline, item.publisher]);
  return `
    <li class="reference-entry">
      <em class="reference-entry__title">${escapeHTML(item.title)}</em>
      ${meta ? `<span class="reference-entry__meta">${meta}</span>` : ''}
      ${item.note ? `<span class="reference-entry__note">${escapeHTML(item.note)}</span>` : ''}
    </li>`;
}

function renderGroup(label, entriesHTML) {
  if (!entriesHTML) return '';
  return `
    <section class="references__group">
      <h3 class="references__group-title">${escapeHTML(label)}</h3>
      <ul class="references__list">${entriesHTML}</ul>
    </section>`;
}

function renderReferences(data) {
  const books = (data.books || []).map(renderBookEntry).join('');
  const refs = (data.references || []).map(renderTitleEntry).join('');
  const guides = (data.recordingGuides || []).map(renderTitleEntry).join('');
  const podcasts = (data.podcasts || []).map(renderTitleEntry).join('');

  return `
    <div class="references__head">
      <span class="references__rule"></span>
      <h2 class="references__title">References</h2>
      <span class="references__rule"></span>
    </div>
    <p class="references__blurb">
      Sources consulted in shaping this guide. Recommended further reading
      and listening for those drawn deeper into the tradition.
    </p>
    <div class="references__groups">
      ${renderGroup('Books', books)}
      ${renderGroup('Reference Works', refs)}
      ${renderGroup('Recording Guides & Reviews', guides)}
      ${renderGroup('Podcasts', podcasts)}
    </div>
  `;
}

export async function initializeReferences() {
  const container = document.getElementById('references-section');
  if (!container) return;
  try {
    const response = await fetch('src/data/sources.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    container.innerHTML = renderReferences(data);
  } catch (error) {
    console.error('Failed to load references:', error);
    container.innerHTML = '';
  }
}
