// app.js
// Main application initialization and Firebase integration

import { DOM, Utils } from './utils.js';
import { initThemeManager } from './theme-manager.js';
import { initProgressTracker, resetProgress } from './progress-tracker.js';
import { initNavigation } from './navigation.js';

/**
 * Main Application Class
 */
class ClassicalMusicApp {
  constructor() {
    this.initialized = false;
    this.modules = {
      theme: null,
      progress: null,
      navigation: null
    };
  }

  /**
   * Initialize the entire application
   */
  async init() {
    if (this.initialized) {
      Utils.log('Application already initialized');
      return;
    }

    Utils.log('Initializing Classical Music Syllabus Application');

    try {
      // Configure Tailwind CSS
      this.configureTailwind();

      // Initialize core modules in dependency order
      await this.initializeModules();

      // Set up global functionality
      this.setupGlobalFeatures();

      // Set up Firebase if available
      this.setupFirebase();

      this.initialized = true;
      Utils.log('Application initialization completed successfully');

    } catch (error) {
      console.error('Failed to initialize application:', error);
      this.showInitializationError(error);
    }
  }

  /**
   * Configure Tailwind CSS
   */
  configureTailwind() {
    if (typeof tailwind !== 'undefined') {
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {}
        }
      };
      Utils.log('Tailwind CSS configured');
    }
  }

  /**
   * Initialize all core modules
   */
  async initializeModules() {
    Utils.log('Initializing core modules...');

    // Initialize theme manager first (affects visual appearance)
    initThemeManager();
    Utils.log('✓ Theme manager initialized');

    // Initialize navigation (needs to be ready for scroll events)
    initNavigation();
    Utils.log('✓ Navigation manager initialized');

    // Initialize progress tracker (depends on DOM elements being ready)
    initProgressTracker();
    Utils.log('✓ Progress tracker initialized');

    Utils.log('All core modules initialized successfully');
  }

  /**
   * Set up global application features
   */
  setupGlobalFeatures() {
    // Set up reset functionality
    this.setupResetButton();
    
    Utils.log('Global features set up');
  }

  /**
   * Set up reset button functionality
   */
  setupResetButton() {
    // Make reset function globally available
    window.resetSyllabus = () => {
      if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        resetProgress();
        Utils.log('Syllabus progress reset by user');
      }
    };
  }

  /**
   * Set up Firebase integration (if Firebase is available)
   */
  setupFirebase() {
    // Always show login button by default (signed out state)
    this.showLoginButton();
    
    // Always set up UI handlers (even if Firebase isn't available)
    this.setupFirebaseUI();
    
    // Check if Firebase is available
    if (typeof firebase === 'undefined' || !firebase.apps.length) {
      Utils.log('Firebase not available - running in offline mode');
      return;
    }

    try {
      Utils.log('Setting up Firebase integration...');
      this.initializeFirebase();
    } catch (error) {
      console.error('Firebase setup failed:', error);
      Utils.log('Firebase setup failed - continuing in offline mode');
    }
  }

  /**
   * Show login button (default signed-out state)
   */
  showLoginButton() {
    const loginButton = DOM.getElementById('login-button');
    const userProfile = DOM.getElementById('user-profile');
    
    if (loginButton) loginButton.classList.remove('hidden');
    if (userProfile) userProfile.classList.add('hidden');
    
    Utils.log('Login button shown (default state)');
  }

  /**
   * Initialize Firebase authentication and sync
   */
  initializeFirebase() {
    const auth = firebase.auth();
    const firestore = firebase.firestore();

    // Set up authentication state listener
    auth.onAuthStateChanged((user) => {
      this.handleAuthStateChange(user);
    });

    Utils.log('Firebase integration set up successfully');
  }

  /**
   * Handle Firebase authentication state changes
   */
  handleAuthStateChange(user) {
    const loginButton = DOM.getElementById('login-button');
    const userProfile = DOM.getElementById('user-profile');
    const logoutButton = DOM.getElementById('logout-button');

    if (user) {
      // User is signed in
      if (loginButton) loginButton.classList.add('hidden');
      if (userProfile) userProfile.classList.remove('hidden');
      
      Utils.log(`User signed in: ${user.email}`);
      this.syncUserData(user);
    } else {
      // User is signed out
      if (loginButton) loginButton.classList.remove('hidden');
      if (userProfile) userProfile.classList.add('hidden');
      
      Utils.log('User signed out');
    }
  }

  /**
   * Set up Firebase UI event handlers
   */
  setupFirebaseUI() {
    const loginButton = DOM.getElementById('login-button');
    const logoutButton = DOM.getElementById('logout-button');

    if (loginButton) {
      loginButton.addEventListener('click', () => this.signInWithGoogle());
    }

    if (logoutButton) {
      logoutButton.addEventListener('click', () => this.signOut());
    }
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      Utils.log('Google sign-in successful');
    } catch (error) {
      console.error('Sign-in error:', error);
      alert('Sign-in failed. Please try again.');
    }
  }

  /**
   * Sign out
   */
  async signOut() {
    try {
      await firebase.auth().signOut();
      Utils.log('Sign-out successful');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }

  /**
   * Sync user data with Firebase
   */
  async syncUserData(user) {
    try {
      const firestore = firebase.firestore();
      const userDoc = firestore.collection('users').doc(user.uid);
      
      // Get current local state
      const localState = JSON.parse(localStorage.getItem('syllabusState') || '{}');
      
      // Try to get user data from Firestore
      const doc = await userDoc.get();
      
      if (doc.exists) {
        const cloudData = doc.data().syllabusState || {};
        
        // Merge local and cloud data (cloud takes precedence for conflicts)
        const mergedState = { ...localState, ...cloudData };
        
        // Update local storage
        localStorage.setItem('syllabusState', JSON.stringify(mergedState));
        
        // Reinitialize progress tracker with merged data
        initProgressTracker();
        
        Utils.log('User data synced from cloud');
      } else {
        // First time user - save local data to cloud
        await userDoc.set({ syllabusState: localState });
        Utils.log('Local data backed up to cloud');
      }
      
      // Set up real-time sync for future changes
      this.setupRealtimeSync(userDoc);
      
    } catch (error) {
      console.error('Data sync error:', error);
    }
  }

  /**
   * Set up real-time data synchronization
   */
  setupRealtimeSync(userDoc) {
    // Listen for local storage changes and sync to cloud
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      originalSetItem.apply(this, arguments);
      
      if (key === 'syllabusState') {
        // Debounce cloud updates
        clearTimeout(this.syncTimeout);
        this.syncTimeout = setTimeout(() => {
          userDoc.update({ syllabusState: JSON.parse(value) })
            .catch(error => console.error('Cloud sync error:', error));
        }, 1000);
      }
    };
  }

  /**
   * Show initialization error to user
   */
  showInitializationError(error) {
    const container = DOM.getElementById('dynamic-syllabus-container');
    if (container) {
      container.innerHTML = `
        <div class="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Application Initialization Error:</strong><br>
          ${error.message}<br>
          <small>Please refresh the page and try again.</small>
        </div>
      `;
    }
  }

  /**
   * Get application status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      modules: Object.keys(this.modules),
      timestamp: new Date().toISOString()
    };
  }
}

// Create singleton instance
const app = new ClassicalMusicApp();

// Initialize when DOM is ready
DOM.ready(() => {
  app.init();
});

// Export the app instance and key functions
export { app as default };
export const getAppStatus = () => app.getStatus();