// syllabus-builder.js
// Dynamic syllabus HTML generation from JSON data

let syllabusData = null;
let composerLookup = null;

/**
 * Load syllabus data from JSON file
 */
async function loadSyllabusData() {
  try {
    const response = await fetch('src/data/syllabus-data.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    syllabusData = await response.json();
    console.log('Syllabus data loaded successfully');
    return syllabusData;
  } catch (error) {
    console.error('Failed to load syllabus data:', error);
    throw error;
  }
}

/**
 * Load composer data so work entries can render portraits + lifespans inline.
 */
async function loadComposerLookup() {
  try {
    const response = await fetch('src/data/composer-data.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    composerLookup = await response.json();
    return composerLookup;
  } catch (error) {
    console.error('Failed to load composer lookup:', error);
    composerLookup = {};
    return composerLookup;
  }
}

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function extractYearRange(eraTitle) {
  // "Medieval (500-1400)" -> "500–1400"; "20th Century & Beyond" -> "1900–Present"
  const m = eraTitle.match(/\(([^)]+)\)/);
  if (m) return m[1].replace(/-/g, '–');
  return '1900–Present';
}

/**
 * Generate HTML for a single syllabus work in candlelit-manuscript style.
 */
function generateWorkHTML(work, eraName, eraYearRange) {
  const composerAttribute = work.composer ? `data-composer="${work.composer}"` : '';
  const composer = work.composer && composerLookup ? composerLookup[work.composer] : null;
  const composerDisplayName = composer ? composer.name : '';
  const composerLifespan = composer ? composer.years : '';
  // Image precedence: explicit work.image > composer.image > none.
  const workImage = work.image && work.image.trim() !== '' ? work.image : '';
  const composerImagePath = composer && composer.image && composer.image.trim() !== '' ? composer.image : '';
  const folioImage = workImage || composerImagePath;
  // Caption: only show under the picture for an actual person (we have a
  // specific composer with their lifespan). For non-person works (chant,
  // troubadour, etc.) the year already appears in the work header.
  const folioCaption = work.imageCaption !== undefined
    ? work.imageCaption
    : (composer && composerLifespan ? composerLifespan : '');

  // Folio: portrait if image, era placeholder if not.
  const captionHTML = folioCaption
    ? `<span class="work__lifespan">${folioCaption}</span>`
    : '';
  let folioHTML;
  if (folioImage) {
    folioHTML = `
              <img src="${folioImage}" alt="" class="work__portrait" loading="lazy">
              ${captionHTML}`;
  } else {
    folioHTML = `
              <div class="work__placeholder"><em>${eraName}</em></div>
              ${captionHTML}`;
  }

  // Drop-cap split: trim leading whitespace and a single leading quote glyph.
  const ctx = (work.historicalContext || '').replace(/^\s+/, '').replace(/^["“'‘]/, '');
  const firstChar = ctx.slice(0, 1);
  const rest = ctx.slice(1);

  // Notes list (bulletted).
  const notesHTML = (work.notes || []).map(n => `<li>${n}</li>`).join('\n                ');

  // Performer line: label + Spotify-linked artist name + Spotify glyph/text link.
  const performerHTML = work.recording
    ? `
              <span class="work__performer-label">As recorded by</span>
              <a href="${work.recording.url}" class="work__performer-link" rel="noopener noreferrer" target="_blank">
                <span class="work__performer-name">${work.recording.performer}</span>
                <svg class="work__performer-spotify-glyph"><use href="#spotify-icon"></use></svg>
              </a>`
    : '<span class="work__performer-label">No recording suggestion available</span>';

  const displayTitle = work.displayTitle || work.title;

  return `
          <article class="syllabus-item work" data-id="${work.id}" id="${work.id}">
            <header class="work__head">
              <span class="work__period">${eraName}</span>
              <span class="work__year">${work.year}</span>
            </header>
            <div class="work__layout">
              <aside class="work__folio">${folioHTML}
              </aside>
              <div class="work__body">
                ${composerDisplayName ? `<p class="work__composer">${composerDisplayName}</p>` : ''}
                <h3 class="work__title">
                  <label for="${work.id}-checkbox" ${composerAttribute}>${displayTitle}</label>
                </h3>
                <input class="item-checkbox" id="${work.id}-checkbox" type="checkbox" hidden />
                <button class="work__heard" type="button" aria-pressed="false">
                  <span class="work__heard-disc" aria-hidden="true"></span>
                  <span class="work__heard-label">Mark as listened</span>
                </button>
                <ul class="work__notes">
                  ${notesHTML}
                </ul>
                <div class="work__essay">
                  <p class="work__essay-text">${firstChar ? `<span class="work__dropcap">${firstChar}</span>` : ''}${rest}</p>
                </div>
                <p class="work__performer">${performerHTML}
                </p>
                <label class="work__personal">
                  <span class="work__personal-label">Your notes</span>
                  <textarea class="item-notes" placeholder="Add personal notes…"></textarea>
                </label>
              </div>
            </div>
          </article>`;
}

/**
 * Generate HTML for an entire era section
 */
function generateEraHTML(eraKey, eraData) {
  const eraName = eraData.title.split('(')[0].trim();
  const eraYearRange = extractYearRange(eraData.title);
  const worksHTML = eraData.works
    .map(work => generateWorkHTML(work, eraName, eraYearRange))
    .join('\n        ');

  return `
      <section class="era" id="${eraKey}">
        <header class="era__head">
          <span class="era__rule"></span>
          <h2 class="era__title">${eraName}</h2>
          <span class="era__years">${eraYearRange}</span>
          <span class="era__rule"></span>
        </header>
        <div class="era__works">
        ${worksHTML}
        </div>
      </section>`;
}

/**
 * Generate complete syllabus HTML from loaded data
 */
function generateSyllabusHTML() {
  if (!syllabusData) {
    throw new Error('Syllabus data not loaded. Call loadSyllabusData() first.');
  }
  
  const eraOrder = ['medieval', 'renaissance', 'baroque', 'classical', 'romantic', 'modern'];
  
  const sectionsHTML = eraOrder
    .filter(era => syllabusData[era]) // Only include eras that exist in data
    .map(era => generateEraHTML(era, syllabusData[era]))
    .join('\n    ');
  
  return `
    <div class="syllabus-content">
    ${sectionsHTML}
    </div>`;
}

/**
 * Initialize and render the dynamic syllabus
 */
async function initializeSyllabus() {
  try {
    // Load syllabus + composer data in parallel
    await Promise.all([loadSyllabusData(), loadComposerLookup()]);

    // Find the target container in the DOM
    const container = document.getElementById('dynamic-syllabus-container');
    if (!container) {
      throw new Error('Dynamic syllabus container not found. Add element with id="dynamic-syllabus-container" to HTML.');
    }

    // Generate and insert HTML
    const syllabusHTML = generateSyllabusHTML();
    container.innerHTML = syllabusHTML;

    console.log('Dynamic syllabus rendered successfully');

    // Wire the "Mark as heard" buttons to the hidden item-checkbox so
    // existing progress-tracker / sync logic keeps working untouched.
    bindHeardButtons();

    // Re-initialize any existing functionality that depends on the DOM
    // This will be called after HTML is inserted
    if (typeof initializeExistingFunctionality === 'function') {
      initializeExistingFunctionality();
    }

    return true;
  } catch (error) {
    console.error('Failed to initialize syllabus:', error);
    
    // Show error message to user
    const container = document.getElementById('dynamic-syllabus-container');
    if (container) {
      container.innerHTML = `
        <div class="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error loading syllabus:</strong> ${error.message}
        </div>`;
    }
    
    throw error;
  }
}

/**
 * Wire each .work__heard button to its hidden item-checkbox so the existing
 * progress-tracker change handler fires (it listens to `change` on .item-checkbox).
 * Also reflects the visual state on initial render.
 */
function bindHeardButtons() {
  const works = document.querySelectorAll('.work');
  works.forEach(work => {
    const button = work.querySelector('.work__heard');
    const checkbox = work.querySelector('.item-checkbox');
    if (!button || !checkbox) return;

    const sync = () => {
      const listened = !!checkbox.checked;
      button.setAttribute('aria-pressed', listened ? 'true' : 'false');
      const label = button.querySelector('.work__heard-label');
      if (label) label.textContent = listened ? 'Listened' : 'Mark as listened';
    };

    button.addEventListener('click', (e) => {
      e.preventDefault();
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      sync();
    });

    // Reflect any initial state (restored from localStorage by progress-tracker).
    // Sync now and again shortly after, since progress-tracker restores in setupProgressTracking.
    sync();
    setTimeout(sync, 250);
    checkbox.addEventListener('change', sync);
  });
}

/**
 * Get syllabus data (useful for other scripts)
 */
function getSyllabusData() {
  return syllabusData;
}

/**
 * Get data for a specific work by ID
 */
function getWorkById(workId) {
  if (!syllabusData) return null;
  
  for (const era of Object.values(syllabusData)) {
    const work = era.works.find(w => w.id === workId);
    if (work) return work;
  }
  
  return null;
}

/**
 * Get all works for a specific era
 */
function getWorksByEra(eraKey) {
  if (!syllabusData || !syllabusData[eraKey]) return [];
  return syllabusData[eraKey].works;
}

// Export functions for use by other modules
export {
  loadSyllabusData,
  initializeSyllabus,
  generateSyllabusHTML,
  getSyllabusData,
  getWorkById,
  getWorksByEra
};

// Also make available globally for non-module usage
if (typeof window !== 'undefined') {
  window.SyllabusBuilder = {
    loadSyllabusData,
    initializeSyllabus,
    generateSyllabusHTML,
    getSyllabusData,
    getWorkById,
    getWorksByEra
  };
}