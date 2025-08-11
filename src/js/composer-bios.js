// composer-bios.js
// Composer biography popup system with dynamic data loading

// Enable debug mode
const DEBUG = false;

function log(...args) {
  if (DEBUG) {
    console.log('%c[ComposerBios]', 'color: #4338ca; font-weight: bold;', ...args);
  }
}

// Keep track of loaded composer data and preloaded images
let composerData = null;
const preloadedImages = {};

/**
 * Load composer data from JSON file
 */
async function loadComposerData() {
  try {
    const response = await fetch('src/data/composer-data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    composerData = await response.json();
    log('Composer data loaded successfully');
    return composerData;
  } catch (error) {
    console.error('Failed to load composer data:', error);
    throw error;
  }
}

/**
 * Preloads all composer images in the background
 */
function preloadComposerImages() {
  if (!composerData) {
    console.warn('Cannot preload images - composer data not loaded');
    return;
  }
  
  log('Preloading composer images');
  
  Object.keys(composerData).forEach(composerId => {
    const composer = composerData[composerId];
    
    if (composer.image && composer.image.trim() !== '') {
      log(`Preloading image for ${composerId}: ${composer.image}`);
      
      const img = new Image();
      img.src = composer.image;
      
      // Store the preloaded image
      preloadedImages[composerId] = img;
      
      // Log when image is loaded
      img.onload = () => {
        log(`Image for ${composerId} preloaded successfully`);
      };
      
      img.onerror = () => {
        log(`ERROR: Failed to preload image for ${composerId}`);
      };
    }
  });
}

/**
 * Creates the shared bio popup container and adds it to the document body
 */
function createBioPopupContainer() {
  log('Creating bio popup container');

  // Check if container already exists
  if (document.getElementById('composer-bio-popup')) {
    log('Bio popup container already exists, skipping creation');
    return;
  }

  // Create container
  const popupContainer = document.createElement('div');
  popupContainer.id = 'composer-bio-popup';
  popupContainer.className = 'bio-popup rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hidden';
  popupContainer.innerHTML = `
    <div class="p-5 max-h-96 overflow-y-auto">
      <div class="flex justify-between items-start mb-3">
        <h3 id="bio-popup-title" class="font-bold text-indigo-800 dark:text-indigo-300 text-lg"></h3>
        <button id="close-bio" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <img id="bio-popup-image" src="" alt="" class="float-left mr-4 mb-2 rounded-lg w-24 h-24 object-cover hidden" />
      <div id="bio-popup-content" class="text-gray-700 dark:text-gray-300 text-m"></div>
    </div>
  `;

  // Add to document
  document.body.appendChild(popupContainer);
  log('Bio popup container created and added to document body', popupContainer);
}

/**
 * Adds bio buttons to all composer labels with the data-composer attribute
 */
function addBioButtonsToComposers() {
  log('Adding bio buttons to composer labels');

  // Find all composer labels
  const composerLabels = document.querySelectorAll('label[data-composer]');
  log(`Found ${composerLabels.length} composer labels with data-composer attribute`);

  if (composerLabels.length === 0) {
    log('WARNING: No composer labels found with data-composer attribute');
  }

  composerLabels.forEach((label, index) => {
    const composerId = label.dataset.composer;
    log(`Processing label for composer: ${composerId}`);

    // Skip if no matching composer or button already exists
    if (!composerData || !composerData[composerId]) {
      log(`WARNING: No composer data found for ID "${composerId}"`);
      return;
    }

    if (label.nextElementSibling?.querySelector('.composer-bio-btn')) {
      log(`Button already exists for composer ${composerId}, skipping`);
      return;
    }

    // Create bio button container
    const bioButtonContainer = document.createElement('div');
    bioButtonContainer.className = 'ml-4 relative';
    bioButtonContainer.innerHTML = `
      <button class="composer-bio-btn text-sm text-indigo-600 hover:text-indigo-800 flex items-center focus:outline-none px-3 py-1 border border-indigo-200 rounded-md shadow-sm hover:shadow-md transition-all duration-200 dark:bg-white dark:bg-opacity-40" data-composer="${composerId}">
        <svg class="w-4 h-4 mr-2" fill="currentColor" stroke="currentColor" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
          <path d="M111.001 82.058c-4.921-1.406-13.503-1.382-19.757.436-12.727 3.709-21.114 13.309-18.739 21.454 2.376 8.145 14.618 11.757 27.345 8.048 11.709-3.394 19.757-11.854 19.03-19.563V0L47.973 16.387v80.216c-4.921-1.406-13.503-1.382-19.757.436-12.727 3.709-21.114 13.309-18.739 21.454 2.376 8.145 14.618 11.757 27.345 8.048 11.709-3.394 19.757-11.854 19.03-19.563V34.423l55.15-13.284v60.919z" />
        </svg>
        <span>Composer Bio</span>
      </button>
    `;

    // Find the parent flex container and append the button
    const parentFlex = label.parentElement;
    if (parentFlex && parentFlex.classList.contains('flex')) {
      parentFlex.appendChild(bioButtonContainer);
      log(`Added bio button for composer ${composerId}`, bioButtonContainer);
    } else {
      log(`WARNING: Parent element for ${composerId} is not a flex container or doesn't exist:`, parentFlex);
    }
  });
}

/**
 * Sets up event handlers for the bio popup
 */
function setupBioPopupHandlers() {
  log('Setting up bio popup event handlers');

  const bioPopup = document.getElementById('composer-bio-popup');
  if (!bioPopup) {
    console.error('Bio popup element not found, cannot set up handlers');
    return;
  }

  const bioPopupTitle = document.getElementById('bio-popup-title');
  const bioPopupImage = document.getElementById('bio-popup-image');
  const bioPopupContent = document.getElementById('bio-popup-content');
  const closeBioButton = document.getElementById('close-bio');

  log('Popup elements found:', {
    popup: bioPopup,
    title: bioPopupTitle,
    image: bioPopupImage,
    content: bioPopupContent,
    closeButton: closeBioButton
  });

  // Hide popup function
  function hidePopup() {
    log('Hiding popup');
    bioPopup.classList.add('hidden');
    
    // Clear the image src when hiding the popup
    bioPopupImage.src = '';
    bioPopupImage.alt = '';
    bioPopupImage.classList.add('hidden');
    
    log('Image cleared and hidden');
  }

  // Show popup when bio button is clicked
  document.addEventListener('click', function (event) {
    const bioButton = event.target.closest('.composer-bio-btn');

    if (bioButton) {
      log('Bio button clicked', bioButton);
      event.stopPropagation();

      const composerId = bioButton.dataset.composer;
      log(`Composer ID: ${composerId}`);

      const composer = composerData ? composerData[composerId] : null;

      if (composer) {
        log(`Found composer data for ${composerId}:`, composer);

        // Fill the popup with composer data
        bioPopupTitle.textContent = `${composer.name} (${composer.years})`;
        
        // Handle the image - first hide it, then set source and show when ready
        bioPopupImage.classList.add('hidden');
        
        if (composer.image && composer.image.trim() !== '') {
          // Use the preloaded image if available
          if (preloadedImages[composerId] && preloadedImages[composerId].complete) {
            log(`Using preloaded image for ${composerId}`);
            bioPopupImage.src = composer.image;
            bioPopupImage.alt = `Portrait of ${composer.name}, classical music composer (${composer.years})`;
            bioPopupImage.classList.remove('hidden');
          } else {
            // If not preloaded, set the source and add an onload event
            log(`Setting image source for ${composerId}`);
            bioPopupImage.src = composer.image;
            bioPopupImage.alt = `Portrait of ${composer.name}, classical music composer (${composer.years})`;
            
            // Wait for the image to load before displaying it
            bioPopupImage.onload = function() {
              log(`Image for ${composerId} loaded, displaying now`);
              bioPopupImage.classList.remove('hidden');
            };
            
            bioPopupImage.onerror = function() {
              log(`ERROR: Failed to load image for ${composerId}`);
              bioPopupImage.classList.add('hidden');
            };
          }
        } else {
          // Hide the image element if no image provided
          log(`No image for ${composerId}, keeping image hidden`);
          bioPopupImage.classList.add('hidden');
        }

        // Convert bio text to paragraphs with typographic quotes
        const withTypographicQuotes = composer.bio
          .replace(/(\s|^)"(\S)/g, '$1&ldquo;$2')  // Opening quotes at start of words
          .replace(/(\S)"(\s|$|[,.;:!?])/g, '$1&rdquo;$2')  // Closing quotes at end of words
          .replace(/(\s|^)'(\S)/g, '$1&lsquo;$2')  // Opening single quotes at start of words
          .replace(/(\S)'(\s|$|[,.;:!?])/g, '$1&rsquo;$2'); // Closing single quotes/apostrophes

        const paragraphs = withTypographicQuotes.split('\n\n').map(p => `<p class="mb-3">${p}</p>`).join('');
        bioPopupContent.innerHTML = paragraphs;

        // Position the popup near the button
        const buttonRect = bioButton.getBoundingClientRect();
        log('Button position:', buttonRect);

        bioPopup.style.position = 'absolute';
        bioPopup.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
        bioPopup.style.left = `${buttonRect.left + window.scrollX}px`;
        bioPopup.style.zIndex = '100';

        log('Setting popup position:', {
          top: `${buttonRect.bottom + window.scrollY + 10}px`,
          left: `${buttonRect.left + window.scrollX}px`
        });

        // Show the popup
        bioPopup.classList.remove('hidden');
        log('Popup should now be visible');
      } else {
        log(`WARNING: No composer data found for ID "${composerId}"`);
      }
    }
  });

  log('Added click listener for bio buttons');

  // Close popup when close button is clicked
  closeBioButton.addEventListener('click', function (event) {
    log('Close button clicked');
    event.stopPropagation();
    hidePopup();
  });

  // Close popup when clicking outside
  document.addEventListener('click', function (event) {
    if (!bioPopup.classList.contains('hidden') &&
      !bioPopup.contains(event.target) &&
      !event.target.closest('.composer-bio-btn')) {
      log('Clicked outside popup, hiding');
      hidePopup();
    }
  });

  // Close popup when pressing Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !bioPopup.classList.contains('hidden')) {
      log('Escape key pressed, hiding popup');
      hidePopup();
    }
  });

  // Prevent clicks inside popup from closing it
  bioPopup.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  log('All popup event handlers set up successfully');
}

/**
 * Initialize the composer bio system
 */
async function initComposerBios() {
  log('Initializing composer bio system');

  try {
    // Load composer data first
    if (!composerData) {
      await loadComposerData();
    }
    
    // Initialize the UI components
    createBioPopupContainer();
    addBioButtonsToComposers();
    setupBioPopupHandlers();
    preloadComposerImages();
    
    log('Initialization complete');
  } catch (error) {
    console.error('Error initializing composer bio system:', error);
  }
}

// When the module loads, immediately log presence
log('Composer bios module loaded');

// Export the initialization function and utilities
export { 
  initComposerBios, 
  loadComposerData, 
  addBioButtonsToComposers,
  setupBioPopupHandlers
};

// Also make available globally for non-module usage
if (typeof window !== 'undefined') {
  window.ComposerBios = {
    initComposerBios,
    loadComposerData,
    addBioButtonsToComposers,
    setupBioPopupHandlers
  };
}