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
});

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
function initializeSearch() {
  const searchForm = document.querySelector('.search-bar');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchInput = searchForm.querySelector('input').value;
      if (searchInput.trim()) {
        alert(`You searched for: "${searchInput}". In a real implementation, this would show search results.`);
      } else {
        alert('Please enter a search term.');
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