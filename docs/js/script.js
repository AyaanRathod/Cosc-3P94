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

  initializeChat();

  initializeImageSlider();
});


function initializeChat() {
  const chatButton = document.getElementById('chatButton');
  const chatDialog = document.getElementById('chatDialog');
  const chatClose = document.getElementById('chatClose');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatMessages = document.getElementById('chatMessages');
  
  // Pre-defined AI responses for real estate
  const aiResponses = [
    "I can help you find properties that match your criteria. What area are you interested in?",
    "Our newest listings are in downtown and the eastern suburbs. Would you like to see those?",
    "You can filter properties by bedrooms, bathrooms, and price range using our search filters above.",
    "Most of our properties offer virtual tours. Would you like me to show you how to access them?",
    "The average price per square foot in that area is around $250-300.",
    "We have several financing options available. Would you like to speak with one of our agents about mortgage pre-approval?",
    "I recommend checking out our featured properties section for the best deals currently available."
  ];
  
  // Toggle chat dialog
  chatButton.addEventListener('click', () => {
    chatDialog.style.display = 'flex';
    chatButton.style.display = 'none';
  });
  
  chatClose.addEventListener('click', () => {
    chatDialog.style.display = 'none';
    chatButton.style.display = 'flex';
  });
  
  // Send message function
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      // Add user message
      addMessage(message, 'user');
      chatInput.value = '';
      
      // Simulate AI thinking with delay
      setTimeout(() => {
        // Get random AI response
        const aiResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        addMessage(aiResponse, 'ai');
      }, 1000);
    }
  }
  
  // Add message to chat
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Event listeners for sending messages
  chatSend.addEventListener('click', sendMessage);
  
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}



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
  
  
}

function initializeImageSlider() {
  const slides = document.querySelectorAll('.slide');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const prevButton = document.getElementById('prevSlide');
  const nextButton = document.getElementById('nextSlide');
  
  if (!slides.length || !thumbnails.length) return;
  
  let currentIndex = 0;
  const maxIndex = slides.length - 1;
  
  // Initialize
  updateSlider();
  
  // Navigation buttons
  prevButton.addEventListener('click', () => {
    currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    updateSlider();
  });
  
  nextButton.addEventListener('click', () => {
    currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  });
  
  // Thumbnail navigation
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      currentIndex = parseInt(thumbnail.dataset.index);
      updateSlider();
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
      updateSlider();
    } else if (e.key === 'ArrowRight') {
      currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
      updateSlider();
    }
  });
  
  // Auto-advance slides every 5 seconds
  let slideInterval = setInterval(() => {
    currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  }, 5000);
  
  // Pause auto-advancement when hovering over slider
  const sliderContainer = document.querySelector('.slider-container');
  sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
      currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
      updateSlider();
    }, 5000);
  });
  
  // Function to update active slide and thumbnail
  function updateSlider() {
    // Update slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    slides[currentIndex].classList.add('active');
    
    // Update thumbnails
    thumbnails.forEach(thumbnail => {
      thumbnail.classList.remove('active');
    });
    thumbnails[currentIndex].classList.add('active');
  }
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