// Authentication simulation for HomeFindr website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize login page functionality
    initializeLogin();
    
    // Initialize registration page functionality
    initializeRegistration();
    
    // Initialize logout button
    initializeLogout();
    
    // Check if user is logged in
    checkAuthStatus();
    
    // Update current user info if available
    updateUserInfo();
  });
  
  // Mock user data (in a real implementation, this would come from a database)
  const mockUsers = [
    {
      id: 'u1001',
      email: 'john.doe@example.com',
      password: 'password123', // In a real implementation, passwords would be hashed
      name: 'John Doe',
      type: 'buyer',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      joinDate: '2025-01-15',
      phone: '(555) 123-4567',
      preferences: 'Looking for a 3-bedroom house in the suburbs with a garden and garage.'
    },
    {
      id: 'u1002',
      email: 'sarah.j@example.com',
      password: 'password123',
      name: 'Sarah Johnson',
      type: 'seller',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      joinDate: '2025-02-01',
      phone: '(555) 987-6543',
      bio: 'Real estate investor with 5 years of experience. Specializing in residential properties.'
    },
    {
      id: 'u1003',
      email: 'admin@homefindr.com',
      password: 'admin123',
      name: 'Admin User',
      type: 'admin',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      joinDate: '2025-01-01'
    }
  ];
  
  // Initialize login page functionality
  function initializeLogin() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('user-type').value;
        
        // In a real implementation, this would be a server request
        const user = mockUsers.find(u => u.email === email && u.password === password && u.type === userType);
        
        if (user) {
          // Store user in session storage (in a real implementation, this would be a secure token)
          sessionStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            avatar: user.avatar
          }));
          
          // Redirect to appropriate dashboard
          window.location.href = `dashboard/${userType}.html`;
        } else {
          alert('Invalid credentials. Please try again.');
        }
      });
    }
  }
  
  // Initialize registration page functionality
  function initializeRegistration() {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const userType = document.getElementById('user-type').value;
        
        // Simple validation
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        
        // Check if email already exists
        if (mockUsers.some(u => u.email === email)) {
          alert('Email is already registered!');
          return;
        }
        
        // In a real implementation, this would be a server request to create a user
        alert(`Registration successful! Welcome, ${name}!`);
        
        // Redirect to login page
        window.location.href = 'login.html';
      });
    }
  }
  
  // Initialize logout button
  function initializeLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Clear user from session storage
        sessionStorage.removeItem('currentUser');
        
        // Redirect to home page
        window.location.href = '../index.html';
      });
    }
  }
  
  // Check if user is logged in and redirect if necessary
  function checkAuthStatus() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    // Get current page path
    const path = window.location.pathname;
    
    // If on a dashboard page but not logged in, redirect to login
    if (path.includes('/dashboard/') && !currentUser) {
      window.location.href = '../login.html';
      return;
    }
    
    // If logged in but on the wrong dashboard, redirect to the correct one
    if (currentUser && path.includes('/dashboard/')) {
      const dashboardType = path.split('/').pop().split('.')[0]; // Extract 'buyer', 'seller', or 'admin'
      
      if (dashboardType !== currentUser.type) {
        window.location.href = `${currentUser.type}.html`;
        return;
      }
    }
  }
  
  // Update user information in the UI
  function updateUserInfo() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    // Update user info in sidebar
    const userNameElement = document.querySelector('.user-info h3');
    const userTypeElement = document.querySelector('.user-info p');
    const userAvatarElement = document.querySelector('.avatar img');
    
    if (userNameElement) userNameElement.textContent = currentUser.name;
    if (userTypeElement) userTypeElement.textContent = currentUser.type.charAt(0).toUpperCase() + currentUser.type.slice(1);
    if (userAvatarElement) userAvatarElement.src = currentUser.avatar;
    
    // Update profile form if on profile section
    const profileNameInput = document.getElementById('name');
    const profileEmailInput = document.getElementById('profile-email');
    
    if (profileNameInput) profileNameInput.value = currentUser.name;
    if (profileEmailInput) profileEmailInput.value = currentUser.email;
  }