// syllabus-integration.js
// Integration layer to reinitialize functionality after dynamic syllabus loading

import { DOM, Utils } from './utils.js';
import { reinitProgressTracker } from './progress-tracker.js';
import { initComposerBios } from './composer-bios.js';
import navigationManager from './navigation.js';

/**
 * Integration manager for post-dynamic-load functionality
 */
class SyllabusIntegration {
  constructor() {
    this.initialized = false;
  }

  /**
   * Reinitialize all existing functionality after dynamic HTML is loaded
   * This function should be called after the syllabus HTML is dynamically generated
   */
  reinitializeAll() {
    if (this.initialized) {
      Utils.log('Syllabus integration already initialized');
      return;
    }

    Utils.log('Reinitializing functionality after dynamic syllabus load...');
    
    try {
      // Wait a moment for DOM to settle
      setTimeout(() => {
        this.performReinitialization();
      }, 100);

    } catch (error) {
      console.error('Error during syllabus integration:', error);
    }
  }

  /**
   * Perform the actual reinitialization
   */
  performReinitialization() {
    try {
      // Reinitialize progress tracking (handles checkboxes, notes, progress bubble)
      reinitProgressTracker();
      Utils.log('✓ Progress tracking reinitialized');

      // Reinitialize composer biography system
      if (typeof initComposerBios === 'function') {
        initComposerBios();
        Utils.log('✓ Composer bios reinitialized');
      } else {
        Utils.log('⚠ Composer bio system not available');
      }

      // Reinitialize navigation menu now that sections exist
      if (navigationManager && typeof navigationManager.generateMenu === 'function') {
        navigationManager.generateMenu();
        Utils.log('✓ Navigation menu reinitialized');
      } else {
        Utils.log('⚠ Navigation manager not available');
      }

      this.initialized = true;
      Utils.log('All functionality reinitialized successfully');

      // Verify integration worked
      this.verifyIntegration();

    } catch (error) {
      console.error('Error during reinitialization:', error);
      this.showIntegrationError(error);
    }
  }

  /**
   * Verify that integration was successful
   */
  verifyIntegration() {
    const syllabusItems = DOM.getSyllabusItems();
    const checkboxes = DOM.getItemCheckboxes();
    
    if (syllabusItems.length === 0) {
      console.warn('No syllabus items found after integration');
      return false;
    }

    if (checkboxes.length === 0) {
      console.warn('No checkboxes found after integration');
      return false;
    }

    Utils.log(`Integration verified: ${syllabusItems.length} items, ${checkboxes.length} checkboxes`);
    return true;
  }

  /**
   * Show integration error to user
   */
  showIntegrationError(error) {
    const container = DOM.getElementById('dynamic-syllabus-container');
    if (container) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'integration-error bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mt-4';
      errorDiv.innerHTML = `
        <strong>Integration Warning:</strong><br>
        Some functionality may not work correctly: ${error.message}<br>
        <small>Try refreshing the page if you experience issues.</small>
      `;
      container.appendChild(errorDiv);
    }
  }

  /**
   * Force reinitialization (useful for debugging)
   */
  forceReinit() {
    this.initialized = false;
    this.reinitializeAll();
  }

  /**
   * Get integration status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      syllabusItemCount: DOM.getSyllabusItems().length,
      checkboxCount: DOM.getItemCheckboxes().length,
      timestamp: new Date().toISOString()
    };
  }
}

// Create singleton instance
const syllabusIntegration = new SyllabusIntegration();

/**
 * Main function to reinitialize existing functionality after dynamic loading
 * This is called by syllabus-builder.js after HTML generation
 */
export function initializeExistingFunctionality() {
  syllabusIntegration.reinitializeAll();
}

// Export other useful functions
export const forceReinit = () => syllabusIntegration.forceReinit();
export const getIntegrationStatus = () => syllabusIntegration.getStatus();
export { syllabusIntegration as default };

// Make the main function available globally for non-module usage
if (typeof window !== 'undefined') {
  window.initializeExistingFunctionality = initializeExistingFunctionality;
  window.forceReinit = forceReinit;
}