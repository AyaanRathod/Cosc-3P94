// Main JavaScript file for HomeFindr website

document.addEventListener('DOMContentLoaded', () => {
  console.log('Welcome to HomeFindr - Your Real Estate Marketplace!');
  
  // Update current year in the footer
  updateFooterYear();
  
  // Add event listeners to property cards
  initializePropertyCards();
  
  // Initialize search functionality
  initializeSearch();
  
  // Initialize contact form
  initializeContactForm();

  initializeMobileMenu();
});


// Initialize mobile menu toggle
function initializeMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuBtn) {
    menuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('show');
    });
  }
}
// Update footer year
function updateFooterYear() {
  const footerYear = document.querySelector('footer p');
  if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace(/\d{4}/, currentYear);
  }
}

// Initialize property cards functionality
function initializePropertyCards() {
  const viewButtons = document.querySelectorAll('.btn-view');
  
  viewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.property-card');
      const propertyTitle = card.querySelector('h3').textContent;
      alert(`You clicked on ${propertyTitle}. In a real implementation, this would take you to the property details page.`);
    });
  });
}

// Initialize search functionality
// Update your initializeSearch function
function initializeSearch() {
  const searchButton = document.querySelector('.search-button');
  const locationInput = document.querySelector('.location-input');
  const filterSelects = document.querySelectorAll('.filter-select');
  
  if (searchButton) {
    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      const location = locationInput.value.trim();
      
      // Collect filter values
      let filterValues = {};
      filterSelects.forEach(select => {
        const filterType = select.options[0].text.toLowerCase().split(' ')[0];
        const value = select.value;
        if (value) {
          filterValues[filterType] = value;
        }
      });
      
      // Show search parameters in an alert (in a real app, this would perform a search)
      if (location || Object.keys(filterValues).length > 0) {
        let searchMsg = 'Searching for properties';
        if (location) searchMsg += ` in "${location}"`;
        
        if (Object.keys(filterValues).length > 0) {
          searchMsg += ' with filters: ';
          for (const [key, value] of Object.entries(filterValues)) {
            searchMsg += `${key}: ${value}, `;
          }
          searchMsg = searchMsg.slice(0, -2); // Remove trailing comma and space
        }
        
        alert(searchMsg);
      } else {
        alert('Please enter a location or select at least one filter.');
      }
    });
  }
}

// Initialize contact form
function initializeContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector('textarea');
      
      if (nameInput.value.trim() && emailInput.value.trim() && messageInput.value.trim()) {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      } else {
        alert('Please fill in all fields before submitting.');
      }
    });
  }
}