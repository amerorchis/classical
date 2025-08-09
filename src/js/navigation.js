// navigation.js
// Navigation, scrolling, and menu functionality

import { DOM, Events, Utils } from './utils.js';

/**
 * Navigation and scroll management system
 */
class NavigationManager {
  constructor() {
    this.initialized = false;
    this.observers = [];
    this.activeSection = '';
    this.currentlyExpandedSection = null;
  }

  /**
   * Initialize navigation system
   */
  init() {
    if (this.initialized) {
      Utils.log('NavigationManager already initialized');
      return;
    }

    Utils.log('Initializing navigation management system');
    
    this.setupScrollHighlighting();
    this.setupScrollToTop();
    this.setupSideMenu();
    
    this.initialized = true;
    Utils.log('Navigation management initialized successfully');
  }

  /**
   * Set up scroll highlighting for timeline navigation
   */
  setupScrollHighlighting() {
    // Remove existing scroll listener to avoid duplicates
    document.removeEventListener('scroll', this.handleScroll);
    
    // Use debounced scroll handler for better performance
    const debouncedScrollHandler = Events.debounce(() => this.handleScroll(), 16); // ~60fps
    document.addEventListener('scroll', debouncedScrollHandler);
    
    Utils.log('Scroll highlighting set up');
  }

  /**
   * Handle scroll events for timeline navigation highlighting
   */
  handleScroll() {
    const scrollY = window.scrollY;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.timeline-link');

    let currentSection = '';
    const offset = 100; // Offset for fixed header

    // Find the currently visible section
    sections.forEach(section => {
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    // Only update if section changed
    if (currentSection !== this.activeSection) {
      this.activeSection = currentSection;
      
      // Update navigation links
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${currentSection}`) {
          link.classList.add('active');
        }
      });

      // Notify observers
      this.notifyObservers('sectionChanged', { 
        previous: this.activeSection,
        current: currentSection 
      });

      Utils.log(`Active section changed to: ${currentSection}`);
    }
  }

  /**
   * Set up scroll to top functionality
   */
  setupScrollToTop() {
    const scrollToTopButton = DOM.getElementById('scroll-to-top');
    
    if (!scrollToTopButton) {
      Utils.log('Scroll to top button not found');
      return;
    }

    // Remove existing listener to avoid duplicates
    scrollToTopButton.removeEventListener('click', this.handleScrollToTop);
    scrollToTopButton.addEventListener('click', () => this.handleScrollToTop());
    
    Utils.log('Scroll to top functionality set up');
  }

  /**
   * Handle scroll to top button click
   */
  handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    Utils.log('Scrolled to top');
  }

  /**
   * Set up side menu functionality
   */
  setupSideMenu() {
    const menuToggle = DOM.getElementById('menu-toggle');
    const sideMenu = DOM.getElementById('side-menu');
    const closeMenu = DOM.getElementById('close-menu');
    
    if (!menuToggle || !sideMenu) {
      Utils.log('Side menu elements not found');
      return;
    }

    // Set up z-index for proper layering
    if (sideMenu) {
      sideMenu.style.zIndex = "60";
    }
    if (menuToggle) {
      menuToggle.style.zIndex = "60";
      menuToggle.style.top = "190px";
    }

    // Remove existing listeners to avoid duplicates
    menuToggle.removeEventListener('click', this.handleMenuToggle);
    menuToggle.addEventListener('click', () => this.handleMenuToggle());

    if (closeMenu) {
      closeMenu.removeEventListener('click', this.handleMenuClose);
      closeMenu.addEventListener('click', () => this.handleMenuClose());
    }

    // Close menu when clicking outside
    document.removeEventListener('click', this.handleOutsideClick);
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
    
    Utils.log('Side menu functionality set up');
  }

  /**
   * Handle menu toggle button click
   */
  handleMenuToggle() {
    const sideMenu = DOM.getElementById('side-menu');
    const menuContent = DOM.getElementById('dynamic-menu-content');
    
    if (!sideMenu) return;

    const isHidden = sideMenu.classList.contains('-translate-x-full');
    
    if (isHidden) {
      // Show menu
      sideMenu.classList.remove('-translate-x-full');
      
      // Generate/update menu content
      this.generateMenu();
      
      Utils.log('Side menu opened');
      this.notifyObservers('menuOpened', {});
    } else {
      // Hide menu
      this.closeMenu();
    }
  }

  /**
   * Handle menu close button click
   */
  handleMenuClose() {
    this.closeMenu();
  }

  /**
   * Close the side menu
   */
  closeMenu() {
    const sideMenu = DOM.getElementById('side-menu');
    
    if (sideMenu && !sideMenu.classList.contains('-translate-x-full')) {
      sideMenu.classList.add('-translate-x-full');
      Utils.log('Side menu closed');
      this.notifyObservers('menuClosed', {});
    }
  }

  /**
   * Handle clicks outside the menu to close it
   */
  handleOutsideClick(event) {
    const sideMenu = DOM.getElementById('side-menu');
    const menuToggle = DOM.getElementById('menu-toggle');
    
    if (!sideMenu || sideMenu.classList.contains('-translate-x-full')) {
      return; // Menu is already closed
    }

    // Check if click is outside menu and toggle button
    if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      this.closeMenu();
    }
  }

  /**
   * Update menu content dynamically
   */
  updateMenuContent() {
    const menuContent = DOM.getElementById('dynamic-menu-content');
    
    if (!menuContent) {
      Utils.log('Dynamic menu content container not found');
      return;
    }

    this.generateMenu();
  }

  /**
   * Generate the complete menu with era sections and progress tracking
   */
  generateMenu() {
    const menuContent = DOM.getElementById('dynamic-menu-content');
    if (!menuContent) return;

    // Clear existing content and reset expanded section
    menuContent.innerHTML = '';
    this.currentlyExpandedSection = null;

    // Find all period sections - they're created inside #dynamic-syllabus-container
    const sections = document.querySelectorAll('#dynamic-syllabus-container section');
    
    if (sections.length === 0) {
      // Content hasn't loaded yet, show loading message
      menuContent.innerHTML = `
        <div class="p-4 text-center text-gray-500">
          <p class="text-sm">Loading menu...</p>
        </div>
      `;
      return;
    }

    // Find the next uncompleted work
    let nextUncompletedItem = null;
    let foundNext = false;

    // First pass to identify the next uncompleted item
    sections.forEach(section => {
      if (foundNext) return;

      const sectionItems = section.querySelectorAll('.syllabus-item');
      for (const item of sectionItems) {
        const checkbox = item.querySelector('.item-checkbox');
        if (checkbox && !checkbox.checked) {
          nextUncompletedItem = item;
          foundNext = true;
          break;
        }
      }
    });

    // Process each section
    sections.forEach(section => {
      // Get section ID and title
      const sectionId = section.id;
      const sectionTitleElement = section.querySelector('h2');
      if (!sectionTitleElement) return;
      
      const sectionTitle = sectionTitleElement.textContent.split('(')[0].trim();

      // Create section container
      const sectionDiv = document.createElement('div');
      sectionDiv.className = 'menu-section';

      // Create section header button
      const sectionButton = document.createElement('button');
      sectionButton.className = 'w-full flex justify-between items-center py-2 px-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none';
      sectionButton.innerHTML = `
        <span class="font-medium text-indigo-600 dark:text-indigo-400">${sectionTitle}</span>
        <svg class="menu-arrow w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      `;

      // Create content container (initially hidden)
      const contentDiv = document.createElement('div');
      contentDiv.className = 'menu-content hidden pl-4 py-2 space-y-2';

      // Find all syllabus items in this section
      const menuItems = section.querySelectorAll('.syllabus-item');

      // Check if next item is in this section
      let sectionHasNextItem = false;
      if (nextUncompletedItem) {
        const itemsArray = Array.from(menuItems);
        sectionHasNextItem = itemsArray.some(item => item === nextUncompletedItem);
      }

      // Add each item to the content
      menuItems.forEach(item => {
        const itemId = item.getAttribute('data-id');
        const labelElement = item.querySelector('label');
        if (!labelElement || !itemId) return;
        
        const itemTitle = labelElement.textContent.trim();
        const checkbox = item.querySelector('.item-checkbox');
        const isCompleted = checkbox && checkbox.checked;
        const isNextItem = item === nextUncompletedItem;

        const itemLink = document.createElement('a');
        itemLink.href = `#${itemId}`;

        // Apply different styling based on status
        if (isCompleted) {
          itemLink.className = 'work-link block text-sm py-1 px-2 rounded bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 transition-colors';
        } else if (isNextItem) {
          itemLink.className = 'work-link block text-sm py-1 px-2 rounded bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors font-medium';
        } else {
          itemLink.className = 'work-link block text-sm py-1 px-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors';
        }

        itemLink.textContent = itemTitle;

        // Add click handler for smooth scrolling and menu closing
        itemLink.addEventListener('click', (e) => {
          e.preventDefault(); // Prevent default anchor behavior

          // Close the menu
          this.closeMenu();

          // Find the target element
          const targetItem = document.querySelector(`[data-id="${itemId}"]`);

          if (targetItem) {
            // Scroll to the item with smooth behavior and proper offset for fixed header
            const navHeight = document.querySelector('nav')?.offsetHeight || 0;
            const targetPosition = targetItem.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });

            // Highlight the item briefly
            targetItem.classList.add('ring-4', 'ring-indigo-500', 'ring-opacity-75');
            setTimeout(() => {
              targetItem.classList.remove('ring-4', 'ring-indigo-500', 'ring-opacity-75');
            }, 2000);
          }
        });

        contentDiv.appendChild(itemLink);
      });

      // Toggle content visibility when section header is clicked
      sectionButton.addEventListener('click', () => {
        // If this section is already expanded, just collapse it
        if (!contentDiv.classList.contains('hidden')) {
          contentDiv.classList.add('hidden');
          sectionButton.querySelector('.menu-arrow')?.classList.remove('rotate-180');
          this.currentlyExpandedSection = null;
          return;
        }

        // If another section is currently expanded, collapse it first
        if (this.currentlyExpandedSection) {
          const prevContent = this.currentlyExpandedSection.querySelector('.menu-content');
          const prevArrow = this.currentlyExpandedSection.querySelector('.menu-arrow');

          if (prevContent) prevContent.classList.add('hidden');
          if (prevArrow) prevArrow.classList.remove('rotate-180');
        }

        // Expand this section
        contentDiv.classList.remove('hidden');
        sectionButton.querySelector('.menu-arrow')?.classList.add('rotate-180');
        this.currentlyExpandedSection = sectionDiv;
      });

      // Assemble and add to menu
      sectionDiv.appendChild(sectionButton);
      sectionDiv.appendChild(contentDiv);
      menuContent.appendChild(sectionDiv);

      // Auto-expand section with next item
      if (sectionHasNextItem && !this.currentlyExpandedSection) {
        setTimeout(() => {
          sectionButton.click();
        }, 0);
      }
    });

    // Add tip about progress bubble inside the menu
    const tipDiv = document.createElement('div');
    tipDiv.className = 'text-xs text-gray-400 dark:text-gray-500 mt-16 px-2';
    tipDiv.innerHTML = 'Tip: Click the circular progress bubble in the bottom-right corner to scroll to your next unlistened work.';
    menuContent.appendChild(tipDiv);

    // Set up checkbox change listeners for dynamic updates
    this.setupMenuUpdateListeners();
  }

  /**
   * Set up listeners to update menu when checkboxes change
   */
  setupMenuUpdateListeners() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    checkboxes.forEach(checkbox => {
      // Remove existing listeners to avoid duplicates
      checkbox.removeEventListener('change', this.handleCheckboxChange);
      checkbox.addEventListener('change', () => this.handleCheckboxChange());
    });
    
    Utils.log(`Set up ${checkboxes.length} checkbox listeners for menu updates`);
  }

  /**
   * Handle checkbox changes to update menu
   */
  handleCheckboxChange() {
    this.currentlyExpandedSection = null;
    this.generateMenu();
    Utils.log('Menu updated after checkbox change');
  }

  /**
   * Scroll to a specific section
   */
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    
    if (section) {
      Utils.scrollToElement(section);
      Utils.log(`Scrolled to section: ${sectionId}`);
      this.notifyObservers('scrolledToSection', { sectionId });
    } else {
      Utils.log(`Section not found: ${sectionId}`);
    }
  }

  /**
   * Get current active section
   */
  getActiveSection() {
    return this.activeSection;
  }

  /**
   * Add observer for navigation events
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
        console.error('Error in navigation observer:', error);
      }
    });
  }

  /**
   * Get navigation statistics
   */
  getNavigationInfo() {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.timeline-link'));
    
    return {
      activeSection: this.activeSection,
      totalSections: sections.length,
      totalNavLinks: navLinks.length,
      sections: sections.map(s => ({
        id: s.id,
        offsetTop: s.offsetTop,
        offsetHeight: s.offsetHeight
      }))
    };
  }
}

// Create singleton instance
const navigationManager = new NavigationManager();

// Export the singleton and key functions
export { navigationManager as default };
export const initNavigation = () => navigationManager.init();
export const scrollToSection = (sectionId) => navigationManager.scrollToSection(sectionId);
export const getActiveSection = () => navigationManager.getActiveSection();
export const closeMenu = () => navigationManager.closeMenu();
export const updateMenuContent = () => navigationManager.updateMenuContent();
export const getNavigationInfo = () => navigationManager.getNavigationInfo();