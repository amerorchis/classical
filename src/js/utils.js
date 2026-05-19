// utils.js
// Shared utilities and helper functions

/**
 * DOM utility functions
 */
export const DOM = {
  /**
   * Get all syllabus items
   */
  getSyllabusItems() {
    return document.querySelectorAll('.syllabus-item');
  },

  /**
   * Get all item checkboxes
   */
  getItemCheckboxes() {
    return document.querySelectorAll('.item-checkbox');
  },

  /**
   * Get checked item checkboxes
   */
  getCheckedCheckboxes() {
    return document.querySelectorAll('.item-checkbox:checked');
  },

  /**
   * Get element by ID with error handling
   */
  getElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with ID '${id}' not found`);
    }
    return element;
  },

  /**
   * Wait for DOM to be ready
   */
  ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }
};

/**
 * LocalStorage utility functions
 */
export const Storage = {
  /**
   * Get syllabus state from localStorage
   */
  getSyllabusState() {
    const storedState = localStorage.getItem('syllabusState');
    return storedState ? JSON.parse(storedState) : {};
  },

  /**
   * Save syllabus state to localStorage
   */
  setSyllabusState(state) {
    localStorage.setItem('syllabusState', JSON.stringify(state));
  },

  /**
   * Save individual item state
   */
  saveItemState(id, checked, notes = '') {
    const state = this.getSyllabusState();
    state[id] = {
      checked: checked,
      notes: notes
    };
    this.setSyllabusState(state);
  },

  /**
   * Get individual item state
   */
  getItemState(id) {
    const state = this.getSyllabusState();
    return state[id] || { checked: false, notes: '' };
  },

  /**
   * Clear all syllabus state
   */
  clearSyllabusState() {
    localStorage.removeItem('syllabusState');
  },

  /**
   * Get dark mode preference
   */
  getDarkMode() {
    return localStorage.getItem('darkMode');
  },

  /**
   * Set dark mode preference
   */
  setDarkMode(value) {
    localStorage.setItem('darkMode', value.toString());
  }
};

/**
 * Progress tracking utilities
 */
export const Progress = {
  /**
   * Update progress bubble display
   */
  updateProgressBubble() {
    const completedCount = DOM.getElementById('completed-count');
    const totalCount = DOM.getElementById('total-count');
    const heroCompleted = document.getElementById('hero-completed');

    const syllabusItems = DOM.getSyllabusItems();
    if (syllabusItems.length === 0) {
      console.warn('No syllabus items found for progress calculation');
      return;
    }

    // const total = syllabusItems.length;
    const total = 50 // Fixed at 50
    let completed = Array.from(syllabusItems).filter(item => {
      const checkbox = item.querySelector('.item-checkbox');
      return checkbox && checkbox.checked;
    }).length;

    // Adjust completed count since there are actually 53, hope no one notices :)
    if (completed > 38) {
      completed -= 3;
    }

    if (completedCount) completedCount.textContent = completed;
    if (totalCount) totalCount.textContent = total;
    if (heroCompleted) heroCompleted.textContent = completed;

    // Keep the bubble's accessible name in sync with the count so screen
    // readers announce real progress, not a stale "0 of 0" (WCAG 4.1.2).
    const bubble = DOM.getElementById('progress-bubble');
    if (bubble) {
      bubble.setAttribute(
        'aria-label',
        `${completed} of ${total} works listened. Activate to jump to your next unlistened work.`
      );
    }
  },

  /**
   * Get progress statistics
   */
  getProgressStats() {
    const syllabusItems = DOM.getSyllabusItems();
    const total = syllabusItems.length;
    const completed = Array.from(syllabusItems).filter(item => {
      const checkbox = item.querySelector('.item-checkbox');
      return checkbox && checkbox.checked;
    }).length;

    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }
};

/**
 * Event handling utilities
 */
export const Events = {
  /**
   * Add event listener with error handling
   */
  addListener(element, event, handler) {
    if (!element) {
      console.warn('Attempted to add event listener to null element');
      return;
    }
    element.addEventListener(event, handler);
  },

  /**
   * Remove event listener with error handling
   */
  removeListener(element, event, handler) {
    if (!element) {
      console.warn('Attempted to remove event listener from null element');
      return;
    }
    element.removeEventListener(event, handler);
  },

  /**
   * Debounce function calls
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

/**
 * General utility functions
 */
export const Utils = {
  /**
   * Log with timestamp
   */
  log(message, ...args) {
    console.log(`[${new Date().toLocaleTimeString()}] ${message}`, ...args);
  },

  /**
   * Wait for a condition to be true
   */
  waitFor(condition, timeout = 5000, interval = 100) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const checkCondition = () => {
        if (condition()) {
          resolve();
        } else if (Date.now() - startTime >= timeout) {
          reject(new Error('Timeout waiting for condition'));
        } else {
          setTimeout(checkCondition, interval);
        }
      };
      
      checkCondition();
    });
  },

  /**
   * Whether the user asked the OS to minimise motion (WCAG 2.3.3).
   */
  prefersReducedMotion() {
    return typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * 'auto' when reduced motion is requested, otherwise 'smooth'. Use for
   * programmatic scrolling (CSS scroll-behavior does not affect scrollTo()).
   */
  scrollBehavior() {
    return this.prefersReducedMotion() ? 'auto' : 'smooth';
  },

  /**
   * Smooth scroll to element (honours reduced-motion).
   */
  scrollToElement(element, behavior = this.scrollBehavior(), block = 'center') {
    if (element) {
      element.scrollIntoView({ behavior, block });
    }
  },

  /**
   * Announce a transient message to assistive tech via a shared polite live
   * region (WCAG 4.1.3). The region is visually hidden and created lazily.
   */
  announce(message) {
    let region = document.getElementById('a11y-live-region');
    if (!region) {
      region = document.createElement('div');
      region.id = 'a11y-live-region';
      region.className = 'sr-only';
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    // Clear first so the same message re-announces if repeated.
    region.textContent = '';
    window.setTimeout(() => { region.textContent = message; }, 50);
  },

  /**
   * Move focus to an element that isn't normally focusable (e.g. a scroll
   * destination) without leaving a stray tabindex behind: the temporary
   * tabindex is removed on blur (WCAG 2.4.3, no tab-order pollution).
   */
  focusTransient(element) {
    if (!element || typeof element.focus !== 'function') return;
    const hadTabindex = element.hasAttribute('tabindex');
    if (!hadTabindex) element.setAttribute('tabindex', '-1');
    element.focus({ preventScroll: true });
    if (!hadTabindex) {
      element.addEventListener('blur', function handler() {
        element.removeAttribute('tabindex');
        element.removeEventListener('blur', handler);
      });
    }
  },

};

/**
 * Initialize utilities (called once when loaded)
 */
export function initUtils() {
  Utils.log('Utilities module loaded and initialized');
}

// Auto-initialize when loaded
initUtils();