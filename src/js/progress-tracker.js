// progress-tracker.js
// Progress tracking and local storage management

import { DOM, Storage, Progress, Events, Utils } from './utils.js';

/**
 * Progress tracking system
 */
class ProgressTracker {
  constructor() {
    this.initialized = false;
    this.observers = [];
  }

  /**
   * Initialize progress tracking
   */
  init() {
    if (this.initialized) {
      Utils.log('ProgressTracker already initialized');
      return;
    }

    Utils.log('Initializing progress tracking system');
    
    // Wait for syllabus items to be loaded
    this.setupProgressTracking();
    this.setupProgressBubble();
    this.setupResetButton();
    
    this.initialized = true;
    Utils.log('Progress tracking initialized successfully');
  }

  /**
   * Reinitialize after dynamic content loading
   */
  reinit() {
    Utils.log('Reinitializing progress tracking after dynamic content load');
    this.setupProgressTracking();
    this.updateProgress();
  }

  /**
   * Set up progress tracking on syllabus items
   */
  setupProgressTracking() {
    const syllabusItems = DOM.getSyllabusItems();
    Utils.log(`Setting up progress tracking for ${syllabusItems.length} items`);

    if (syllabusItems.length === 0) {
      Utils.log('No syllabus items found - skipping progress setup');
      return;
    }

    syllabusItems.forEach(item => {
      const id = item.getAttribute('data-id');
      if (!id) {
        console.warn('Syllabus item missing data-id attribute');
        return;
      }

      const checkbox = item.querySelector('.item-checkbox');
      const textarea = item.querySelector('.item-notes');
      const itemState = Storage.getItemState(id);

      // Restore saved state
      if (checkbox && itemState.checked) {
        checkbox.checked = true;
      }

      if (textarea && itemState.notes) {
        textarea.value = itemState.notes;
      }

      // Add event listeners
      if (checkbox) {
        // Remove existing listener to avoid duplicates
        checkbox.removeEventListener('change', this.handleCheckboxChange);
        checkbox.addEventListener('change', (e) => this.handleCheckboxChange(e, id));
      }

      if (textarea) {
        // Use debounced input handler to avoid excessive saves
        const debouncedHandler = Events.debounce((e) => this.handleNotesChange(e, id), 500);
        textarea.removeEventListener('input', debouncedHandler);
        textarea.addEventListener('input', debouncedHandler);
      }
    });

    // Update progress display
    this.updateProgress();
  }

  /**
   * Handle checkbox state changes
   */
  handleCheckboxChange(event, itemId) {
    const checkbox = event.target;
    const item = checkbox.closest('.syllabus-item');
    const textarea = item ? item.querySelector('.item-notes') : null;
    const notes = textarea ? textarea.value : '';

    // Save state
    Storage.saveItemState(itemId, checkbox.checked, notes);

    // Trigger confetti when checkbox is checked. The hidden checkbox has no
    // layout box, so anchor the burst on the visible "Mark as listened" button
    // (or the work entry itself as a fallback) for a centered, visible effect.
    if (checkbox.checked && typeof window.triggerConfetti === 'function') {
      const heardBtn = item ? item.querySelector('.work__heard') : null;
      const anchor = heardBtn || item || checkbox;
      window.triggerConfetti(anchor);
    }
    
    // Update progress display
    this.updateProgress();
    
    // Notify observers
    this.notifyObservers('checkboxChanged', { itemId, checked: checkbox.checked, notes });
    
    Utils.log(`Item ${itemId} marked as ${checkbox.checked ? 'completed' : 'incomplete'}`);
  }

  /**
   * Handle notes changes
   */
  handleNotesChange(event, itemId) {
    const textarea = event.target;
    const item = textarea.closest('.syllabus-item');
    const checkbox = item ? item.querySelector('.item-checkbox') : null;
    const checked = checkbox ? checkbox.checked : false;

    // Save state
    Storage.saveItemState(itemId, checked, textarea.value);
    
    // Notify observers
    this.notifyObservers('notesChanged', { itemId, checked, notes: textarea.value });
    
    Utils.log(`Notes updated for item ${itemId}`);
  }

  /**
   * Set up progress bubble functionality
   */
  setupProgressBubble() {
    const progressBubble = DOM.getElementById('progress-bubble');
    if (!progressBubble) {
      Utils.log('Progress bubble not found');
      return;
    }

    // Remove existing listener to avoid duplicates
    progressBubble.removeEventListener('click', this.handleProgressBubbleClick);
    progressBubble.addEventListener('click', () => this.handleProgressBubbleClick());
    
    Utils.log('Progress bubble functionality set up');
  }

  /**
   * Handle progress bubble click - scroll to next incomplete item
   */
  handleProgressBubbleClick() {
    const syllabusItems = DOM.getSyllabusItems();
    
    for (const item of syllabusItems) {
      const checkbox = item.querySelector('.item-checkbox');
      if (checkbox && !checkbox.checked) {
        // Scroll the item just below the sticky era header. The offset is
        // handled in CSS (html { scroll-padding-top } + .work
        // { scroll-margin-top }); computing it here was buggy because
        // document.querySelector('nav') matched the full-height side-menu
        // drawer, not the ~60px header, leaving the work near the bottom edge.
        item.scrollIntoView({ behavior: Utils.scrollBehavior(), block: 'start' });

        // Move focus to the next work so keyboard/SR users are taken there
        // too, not just the viewport (WCAG 2.4.3).
        Utils.focusTransient(item);

        // Highlight the item briefly (same as side navigation)
        item.classList.add('ring-4', 'ring-indigo-500', 'ring-opacity-75');
        setTimeout(() => {
          item.classList.remove('ring-4', 'ring-indigo-500', 'ring-opacity-75');
        }, 2000);
        
        Utils.log(`Scrolled to next incomplete item: ${item.getAttribute('data-id')}`);
        return;
      }
    }
    
    Utils.log('All items completed!');
  }

  /**
   * Set up reset button functionality
   */
  setupResetButton() {
    // This is handled in the main app, but we provide the reset method
  }

  /**
   * Reset all progress
   */
  reset() {
    Utils.log('Resetting all progress');
    
    // Clear localStorage
    Storage.clearSyllabusState();
    
    // Reset UI
    const syllabusItems = DOM.getSyllabusItems();
    syllabusItems.forEach(item => {
      const checkbox = item.querySelector('.item-checkbox');
      const textarea = item.querySelector('.item-notes');
      
      if (checkbox) {
        checkbox.checked = false;
      }
      
      if (textarea) {
        textarea.value = '';
      }
    });
    
    // Update progress display
    this.updateProgress();
    
    // Notify observers
    this.notifyObservers('reset', {});
    
    Utils.log('Progress reset completed');
  }

  /**
   * Update progress display
   */
  updateProgress() {
    Progress.updateProgressBubble();
    
    // Get stats for logging
    const stats = Progress.getProgressStats();
    Utils.log(`Progress updated: ${stats.completed}/${stats.total} (${stats.percentage}%)`);
    
    // Notify observers
    this.notifyObservers('progressUpdated', stats);
  }

  /**
   * Add observer for progress events
   */
  addObserver(callback) {
    this.observers.push(callback);
  }

  /**
   * Remove observer
   */
  removeObserver(callback) {
    this.observers = this.observers.filter(obs => obs !== callback);
  }

  /**
   * Notify all observers of events
   */
  notifyObservers(event, data) {
    this.observers.forEach(callback => {
      try {
        callback(event, data);
      } catch (error) {
        console.error('Error in progress observer:', error);
      }
    });
  }

  /**
   * Get current progress statistics
   */
  getStats() {
    return Progress.getProgressStats();
  }
}

// Create singleton instance
const progressTracker = new ProgressTracker();

// Export the singleton and key functions
export { progressTracker as default };
export const initProgressTracker = () => progressTracker.init();
export const reinitProgressTracker = () => progressTracker.reinit();
export const resetProgress = () => progressTracker.reset();
export const updateProgress = () => progressTracker.updateProgress();
export const getProgressStats = () => progressTracker.getStats();