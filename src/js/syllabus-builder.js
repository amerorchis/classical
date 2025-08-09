// syllabus-builder.js
// Dynamic syllabus HTML generation from JSON data

let syllabusData = null;

/**
 * Load syllabus data from JSON file
 */
async function loadSyllabusData() {
  try {
    const response = await fetch('src/data/syllabus-data.json');
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
 * Generate HTML for a single syllabus work
 */
function generateWorkHTML(work) {
  // Handle composer bio button if composer is specified
  const composerAttribute = work.composer ? `data-composer="${work.composer}"` : '';
  
  // Generate notes list HTML
  const notesHTML = work.notes.map(note => `<li>${note}</li>`).join('\n                ');
  
  // Generate recording suggestion HTML
  const recordingHTML = work.recording ? `
                <a href="${work.recording.url}"
                  rel="noopener noreferrer" target="_blank">
                  <svg>
                    <use href="#spotify-icon"></use>
                  </svg>
                  ${work.recording.performer}
                </a>` : 'No recording suggestion available';

  return `
          <!-- ${work.title} -->
          <div
            class="syllabus-item bg-white p-6 rounded-lg shadow-md transition transform hover:scale-[1.01] hover:shadow-xl"
            data-id="${work.id}">
            <div class="flex items-center">
              <input class="item-checkbox h-6 w-6 text-indigo-600" id="${work.id}-checkbox" type="checkbox" />
              <label class="ml-3 text-xl font-semibold" for="${work.id}-checkbox" ${composerAttribute}>${work.title}</label>
            </div>
            <div class="mt-3 text-gray-600">
              <p><strong>Recording Suggestion:</strong>
                ${recordingHTML}
              </p>
              <p><strong>Year:</strong> ${work.year}</p>
              <p><strong>Notes:</strong></p>
              <ul class="list-disc ml-6">
                ${notesHTML}
              </ul>
              <div class="historical-context">
                <p><strong>Historical Context and Significance:</strong> ${work.historicalContext}</p>
              </div>
            </div>
            <textarea
              class="item-notes mt-4 w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Add personal notes..."></textarea>
          </div>`;
}

/**
 * Generate HTML for an entire era section
 */
function generateEraHTML(eraKey, eraData) {
  const worksHTML = eraData.works.map(work => generateWorkHTML(work)).join('\n        ');
  
  return `
      <section class="mb-12" id="${eraKey}">
        <h2 class="text-3xl font-bold text-indigo-700 border-b-2 border-indigo-300 pb-2 mb-6">${eraData.title}</h2>
        <div class="space-y-6">
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
    // Load syllabus data
    await loadSyllabusData();
    
    // Find the target container in the DOM
    const container = document.getElementById('dynamic-syllabus-container');
    if (!container) {
      throw new Error('Dynamic syllabus container not found. Add element with id="dynamic-syllabus-container" to HTML.');
    }
    
    // Generate and insert HTML
    const syllabusHTML = generateSyllabusHTML();
    container.innerHTML = syllabusHTML;
    
    console.log('Dynamic syllabus rendered successfully');
    
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