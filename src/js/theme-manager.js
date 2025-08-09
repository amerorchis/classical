// theme-manager.js
// Dark mode and theme management

import { DOM, Storage, Events, Utils } from './utils.js';

/**
 * Theme management system
 */
class ThemeManager {
  constructor() {
    this.initialized = false;
    this.observers = [];
    this.currentTheme = 'light';
  }

  /**
   * Initialize theme system
   */
  init() {
    if (this.initialized) {
      Utils.log('ThemeManager already initialized');
      return;
    }

    Utils.log('Initializing theme management system');
    
    // Apply initial theme based on saved preference or system preference
    this.applyInitialTheme();
    
    // Set up dark mode toggle
    this.setupDarkModeToggle();
    
    this.initialized = true;
    Utils.log('Theme management initialized successfully');
  }

  /**
   * Apply initial theme on page load
   */
  applyInitialTheme() {
    // Check if the document already has dark class applied (from head script)
    const isDarkAlready = document.documentElement.classList.contains('dark');
    const savedTheme = Storage.getDarkMode();
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Sync with what was already applied in the head
    this.currentTheme = isDarkAlready ? 'dark' : 'light';
    
    Utils.log(`Synced with existing theme: ${this.currentTheme} (saved: ${savedTheme}, system: ${systemPrefersDark}, DOM: ${isDarkAlready})`);
  }

  /**
   * Set up dark mode toggle button
   */
  setupDarkModeToggle() {
    const darkModeToggle = DOM.getElementById('dark-mode-toggle');
    
    if (!darkModeToggle) {
      Utils.log('Dark mode toggle button not found');
      return;
    }

    // Remove existing listener to avoid duplicates
    darkModeToggle.removeEventListener('click', this.handleToggleClick);
    darkModeToggle.addEventListener('click', () => this.handleToggleClick());
    
    Utils.log('Dark mode toggle set up successfully');
  }

  /**
   * Handle dark mode toggle button click
   */
  handleToggleClick() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme, true);
    
    Utils.log(`Theme toggled to: ${newTheme}`);
  }

  /**
   * Set theme
   */
  setTheme(theme, save = true) {
    const isDark = theme === 'dark';
    
    // Update DOM
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Update internal state
    this.currentTheme = theme;
    
    // Save preference if requested
    if (save) {
      Storage.setDarkMode(isDark ? 'true' : 'false');
    }
    
    // Notify observers
    this.notifyObservers('themeChanged', { theme, isDark });
    }

  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Check if dark mode is active
   */
  isDarkMode() {
    return this.currentTheme === 'dark';
  }

  /**
   * Toggle theme
   */
  toggleTheme() {
    this.handleToggleClick();
  }

  /**
   * Listen for system theme changes
   */
  setupSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      const savedTheme = Storage.getDarkMode();
      
      // Only auto-switch if user hasn't explicitly set a preference
      if (savedTheme === null) {
        const newTheme = e.matches ? 'dark' : 'light';
        this.setTheme(newTheme, false); // Don't save system preference
        Utils.log(`System theme changed to: ${newTheme}`);
      }
    };

    // Remove existing listener
    mediaQuery.removeEventListener('change', handleSystemThemeChange);
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    Utils.log('System theme change listener set up');
  }

  /**
   * Reset theme to system default
   */
  resetToSystemDefault() {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const newTheme = systemPrefersDark ? 'dark' : 'light';
    
    // Clear saved preference
    localStorage.removeItem('darkMode');
    
    // Apply system preference
    this.setTheme(newTheme, false);
    
    Utils.log(`Reset to system default theme: ${newTheme}`);
  }

  /**
   * Add observer for theme events
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
        console.error('Error in theme observer:', error);
      }
    });
  }

  /**
   * Get theme statistics
   */
  getThemeInfo() {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = Storage.getDarkMode();
    
    return {
      current: this.currentTheme,
      isDark: this.isDarkMode(),
      systemPrefers: systemPrefersDark ? 'dark' : 'light',
      saved: savedTheme,
      isSystemDefault: savedTheme === null
    };
  }
}

// Create singleton instance
const themeManager = new ThemeManager();

// Export the singleton and key functions
export { themeManager as default };
export const initThemeManager = () => {
  themeManager.init();
  themeManager.setupSystemThemeListener();
};
export const toggleTheme = () => themeManager.toggleTheme();
export const setTheme = (theme) => themeManager.setTheme(theme, true);
export const getCurrentTheme = () => themeManager.getCurrentTheme();
export const isDarkMode = () => themeManager.isDarkMode();
export const resetToSystemDefault = () => themeManager.resetToSystemDefault();
export const getThemeInfo = () => themeManager.getThemeInfo();