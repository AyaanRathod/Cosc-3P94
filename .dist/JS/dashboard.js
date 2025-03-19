// Dashboard functionality for HomeFindr website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize dashboard navigation
    initializeDashboardNav();
    
    // Initialize dashboard-specific functionality based on user type
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
      switch(currentUser.type) {
        case 'buyer':
          initializeBuyerDashboard();
          break;
        case 'seller':
          initializeSellerDashboard();
          break;
        case 'admin':
          initializeAdminDashboard();
          break;
      }
    }
    
    // Update current time for admin dashboard
    updateCurrentTime();
  });
  
  // Initialize dashboard navigation
  function initializeDashboardNav() {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the section ID from the href attribute
        const sectionId = link.getAttribute('href').substring(1);
        
        // Hide all sections
        document.querySelectorAll('.dashboard-section').forEach(section => {
          section.classList.remove('active');
        });
        
        // Show the selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.classList.add('active');
        }
        
        // Update active navigation link
        navLinks.forEach(navLink => {
          navLink.classList.remove('active');
        });
        link.classList.add('active');
      });
    });
  }
  
  // Initialize buyer-specific dashboard functionality
  function initializeBuyerDashboard() {
    // Saved properties functionality
    initializeSavedProperties();
    
    // Message reply functionality
    initializeMessages();
    
    // Profile form submission
    initializeProfileForm();
  }
  
  // Initialize seller-specific dashboard functionality
  function initializeSellerDashboard() {
    // Property listing management
    initializePropertyManagement();
    
    // Add property form submission
    initializeAddPropertyForm();
    
    // Message reply functionality
    initializeMessages();
    
    // Profile form submission
    initializeProfileForm();
  }
  
  // Initialize admin-specific dashboard functionality
  function initializeAdminDashboard() {
    // Property management
    initializeAdminPropertyManagement();
    
    // User management
    initializeUserManagement();
    
    // Report handling
    initializeReportHandling();
  }
  
  // Initialize saved properties functionality
  function initializeSavedProperties() {
    const removeButtons = document.querySelectorAll('.property-card .btn-remove');
    
    removeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const card = e.target.closest('.property-card');
        const propertyTitle = card.querySelector('h3').textContent;
        
        if (confirm(`Are you sure you want to remove ${propertyTitle} from your saved properties?`)) {
          // In a real implementation, this would send a request to update the database
          card.remove();
          alert(`${propertyTitle} has been removed from your saved properties.`);
        }
      });
    });
  }
  
  // Initialize property management functionality
  function initializePropertyManagement() {
    const editButtons = document.querySelectorAll('.property-card .btn-edit');
    const deleteButtons = document.querySelectorAll('.property-card .btn-delete');
    
    editButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const card = e.target.closest('.property-card');
        const propertyTitle = card.querySelector('h3').textContent;
        
        // In a real implementation, this would load the property data into the edit form
        alert(`You're now editing ${propertyTitle}. In a real implementation, this would load the property data into the edit form.`);
        
        // Switch to the add property section which would be used as an edit form
        document.querySelectorAll('.dashboard-section').forEach(section => {
          section.classList.remove('active');
        });
        
        const addPropertySection = document.getElementById('add-property');
        if (addPropertySection) {
          addPropertySection.classList.add('active');
          
          // Update the section title and submit button text
          addPropertySection.querySelector('h2').textContent = `Edit Property: ${propertyTitle}`;
          addPropertySection.querySelector('.btn-submit').textContent = 'Update Property';
        }
        
        // Update active navigation link
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
          link.classList.remove('active');
        });
        document.querySelector('.sidebar-nav a[href="#add-property"]').classList.add('active');
      });
    });
    
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const card = e.target.closest('.property-card');
        const propertyTitle = card.querySelector('h3').textContent;
        
        if (confirm(`Are you sure you want to delete ${propertyTitle}? This action cannot be undone.`)) {
          // In a real implementation, this would send a request to delete from the database
          card.remove();
          alert(`${propertyTitle} has been deleted.`);
        }
      });
    });
  }
  
  // Initialize add property form submission
  function initializeAddPropertyForm() {
    const addPropertyForm = document.querySelector('.property-form');
    
    if (addPropertyForm) {
      addPropertyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const propertyTitle = document.getElementById('property-title').value;
        
        if (!propertyTitle.trim()) {
          alert('Please enter a property title.');
          return;
        }
        
        // In a real implementation, this would send a request to create/update the property
        alert(`Property "${propertyTitle}" has been submitted successfully! In a real implementation, this would create or update the property.`);
        
        // Reset the form if it's a new property
        if (addPropertyForm.querySelector('.btn-submit').textContent === 'Submit Property') {
          addPropertyForm.reset();
        } else {
          // If it was an edit, switch back to the my listings section
          document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
          });
          
          const myListingsSection = document.getElementById('my-listings');
          if (myListingsSection) {
            myListingsSection.classList.add('active');
          }
          
          // Update active navigation link
          document.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.classList.remove('active');
          });
          document.querySelector('.sidebar-nav a[href="#my-listings"]').classList.add('active');
          
          // Reset the form title and button
          addPropertyForm.querySelector('h2').textContent = 'Add New Property';
          addPropertyForm.querySelector('.btn-submit').textContent = 'Submit Property';
        }
      });
    }
  }
  
  // Initialize message reply functionality
  function initializeMessages() {
    const replyButtons = document.querySelectorAll('.message .btn-reply');
    
    replyButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const message = e.target.closest('.message');
        const sender = message.querySelector('h4').textContent;
        
        const reply = prompt(`Reply to ${sender}:`);
        if (reply && reply.trim()) {
          // In a real implementation, this would send the reply to the server
          alert(`Your reply to ${sender} has been sent!`);
        }
      });
    });
  }
  
  // Initialize profile form submission
  function initializeProfileForm() {
    const profileForm = document.querySelector('.profile-form');
    
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // In a real implementation, this would send a request to update the user profile
        alert('Your profile has been updated successfully!');
      });
    }
  }
  
  // Initialize admin property management
  function initializeAdminPropertyManagement() {
    const viewButtons = document.querySelectorAll('#property-management .btn-view');
    const editButtons = document.querySelectorAll('#property-management .btn-edit');
    const deleteButtons = document.querySelectorAll('#property-management .btn-delete');
    const approveButtons = document.querySelectorAll('#property-management .btn-approve');
    const rejectButtons = document.querySelectorAll('#property-management .btn-reject');
    const reviewButtons = document.querySelectorAll('#property-management .btn-review');
    
    // View property details
    viewButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const propertyId = row.cells[0].textContent;
        const propertyTitle = row.cells[1].textContent;
        
        alert(`Viewing details for ${propertyTitle} (ID: ${propertyId}). In a real implementation, this would open a property details modal or page.`);
      });
    });
    
    // Edit property
    editButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const propertyId = row.cells[0].textContent;
        const propertyTitle = row.cells[1].textContent;
        
        alert(`Editing ${propertyTitle} (ID: ${propertyId}). In a real implementation, this would open an edit form.`);
      });
    });
    
    // Delete property
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const propertyId = row.cells[0].textContent;
        const propertyTitle = row.cells[1].textContent;
        
        if (confirm(`Are you sure you want to delete ${propertyTitle} (ID: ${propertyId})? This action cannot be undone.`)) {
          // In a real implementation, this would send a request to delete from the database
          row.remove();
          alert(`${propertyTitle} has been deleted.`);
        }
      });
    });
    
    // Approve property
    approveButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const propertyId = row.cells[0].textContent;
        const propertyTitle = row.cells[1].textContent;
        
        // In a real implementation, this would send a request to update the property status
        row.cells[5].innerHTML = '<span class="status active">Active</span>';
        
        // Replace approve/reject buttons with standard action buttons
        const actionsCell = row.cells[6];
        actionsCell.innerHTML = `
          <button class="btn-view">View</button>
          <button class="btn-edit">Edit</button>
          <button class="btn-delete">Delete</button>
        `;
        
        alert(`${propertyTitle} (ID: ${propertyId}) has been approved and is now active.`);
      });
    });
    
    // Reject property
    rejectButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const propertyId = row.cells[0].textContent;
        const propertyTitle = row.cells[1].textContent;
        
        const reason = prompt(`Please provide a reason for rejecting ${propertyTitle}:`);
        if (reason && reason.trim()) {
          // In a real implementation, this would send a request to update the property status
          row.remove();
          alert(`${propertyTitle} (ID: ${propertyId}) has been rejected. A notification will be sent to the seller.`);
        }
      });
    });
    
    // Review reported property
    reviewButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const propertyId = row.cells[0].textContent;
        const propertyTitle = row.cells[1].textContent;
        
        alert(`Reviewing reported property: ${propertyTitle} (ID: ${propertyId}). In a real implementation, this would open a review interface.`);
      });
    });
  }
  
  // Initialize user management
  function initializeUserManagement() {
    const viewButtons = document.querySelectorAll('#user-management .btn-view');
    const editButtons = document.querySelectorAll('#user-management .btn-edit');
    const suspendButtons = document.querySelectorAll('#user-management .btn-suspend');
    const reactivateButtons = document.querySelectorAll('#user-management .btn-reactivate');
    const verifyButtons = document.querySelectorAll('#user-management .btn-verify');
    const deleteButtons = document.querySelectorAll('#user-management .btn-delete');
    
    // View user details
    viewButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const userId = row.cells[0].textContent;
        const userName = row.cells[1].textContent;
        
        alert(`Viewing details for ${userName} (ID: ${userId}). In a real implementation, this would open a user details modal or page.`);
      });
    });
    
    // Edit user
    editButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const userId = row.cells[0].textContent;
        const userName = row.cells[1].textContent;
        
        alert(`Editing ${userName} (ID: ${userId}). In a real implementation, this would open an edit form.`);
      });
    });
    
    // Suspend user
    suspendButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const userId = row.cells[0].textContent;
        const userName = row.cells[1].textContent;
        
        if (confirm(`Are you sure you want to suspend ${userName} (ID: ${userId})?`)) {
          // In a real implementation, this would send a request to update the user status
          row.cells[5].innerHTML = '<span class="status suspended">Suspended</span>';
          
          // Replace suspend button with reactivate button
          const actionsCell = row.cells[6];
          actionsCell.innerHTML = `
            <button class="btn-view">View</button>
            <button class="btn-reactivate">Reactivate</button>
            <button class="btn-delete">Delete</button>
          `;
          
          alert(`${userName} (ID: ${userId}) has been suspended.`);
        }
      });
    });
    
    // Reactivate user
    reactivateButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const userId = row.cells[0].textContent;
        const userName = row.cells[1].textContent;
        
        // In a real implementation, this would send a request to update the user status
        row.cells[5].innerHTML = '<span class="status active">Active</span>';
        
        // Replace reactivate button with suspend button
        const actionsCell = row.cells[6];
        actionsCell.innerHTML = `
          <button class="btn-view">View</button>
          <button class="btn-edit">Edit</button>
          <button class="btn-suspend">Suspend</button>
        `;
        
        alert(`${userName} (ID: ${userId}) has been reactivated.`);
      });
    });
    
    // Verify user
    verifyButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const userId = row.cells[0].textContent;
        const userName = row.cells[1].textContent;
        
        // In a real implementation, this would send a request to update the user status
        row.cells[5].innerHTML = '<span class="status active">Active</span>';
        
        // Replace
        const actionsCell = row.cells[6];
      actionsCell.innerHTML = `
        <button class="btn-view">View</button>
        <button class="btn-edit">Edit</button>
        <button class="btn-suspend">Suspend</button>
      `;
      
      alert(`${userName} (ID: ${userId}) has been verified and is now active.`);
    });
  });
  
  // Delete user
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const userId = row.cells[0].textContent;
      const userName = row.cells[1].textContent;
      
      if (confirm(`Are you sure you want to delete ${userName} (ID: ${userId})? This action cannot be undone.`)) {
        // In a real implementation, this would send a request to delete from the database
        row.remove();
        alert(`${userName} has been deleted.`);
      }
    });
  });
}

// Initialize report handling
function initializeReportHandling() {
  const viewButtons = document.querySelectorAll('#reported-content .btn-view');
  const contactButtons = document.querySelectorAll('#reported-content .btn-contact');
  const resolveButtons = document.querySelectorAll('#reported-content .btn-resolve');
  const deleteButtons = document.querySelectorAll('#reported-content .btn-delete, #reported-content .btn-suspend');
  
  // View reported item
  viewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const reportCard = e.target.closest('.report-card');
      const reportHeader = reportCard.querySelector('h3').textContent;
      
      alert(`Viewing details for ${reportHeader}. In a real implementation, this would open a detailed view.`);
    });
  });
  
  // Contact reporter
  contactButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const reportCard = e.target.closest('.report-card');
      const reporterInfo = reportCard.querySelector('p:first-child').textContent;
      
      const reporter = reporterInfo.split(':')[1].trim();
      const message = prompt(`Message to ${reporter}:`);
      
      if (message && message.trim()) {
        // In a real implementation, this would send a message to the reporter
        alert(`Your message to ${reporter} has been sent.`);
      }
    });
  });
  
  // Resolve report
  resolveButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const reportCard = e.target.closest('.report-card');
      const reportHeader = reportCard.querySelector('h3').textContent;
      
      if (confirm(`Are you sure you want to mark ${reportHeader} as resolved?`)) {
        // In a real implementation, this would update the report status
        reportCard.style.opacity = '0.6';
        reportCard.style.borderLeftColor = '#2ecc71';
        
        // Update the button text
        button.textContent = 'Resolved';
        button.disabled = true;
        button.style.backgroundColor = '#7f8c8d';
        
        alert(`${reportHeader} has been marked as resolved.`);
      }
    });
  });
  
  // Delete reported item or suspend user
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const reportCard = e.target.closest('.report-card');
      const reportHeader = reportCard.querySelector('h3').textContent;
      
      const action = button.classList.contains('btn-delete') ? 'delete' : 'suspend';
      const target = action === 'delete' ? 'item' : 'user';
      
      if (confirm(`Are you sure you want to ${action} this ${target}? ${action === 'delete' ? 'This action cannot be undone.' : ''}`)) {
        // In a real implementation, this would update the database
        reportCard.remove();
        alert(`The ${target} has been ${action === 'delete' ? 'deleted' : 'suspended'}.`);
      }
    });
  });
}

// Update current time for admin dashboard
function updateCurrentTime() {
  const currentTimeElement = document.getElementById('current-time');
  if (currentTimeElement) {
    // Use the provided time from the conversation
    currentTimeElement.textContent = '2025-03-19 11:44:32';
    
    // In a real implementation, this would update every second
    /*
    setInterval(() => {
      const now = new Date();
      const formattedDate = now.toISOString().replace('T', ' ').slice(0, 19);
      currentTimeElement.textContent = formattedDate;
    }, 1000);
    */
  }
}