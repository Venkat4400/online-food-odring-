// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Render menu categories and items
  renderCategoryTabs();
  renderMenuItems();
  
  // Initialize cart functionality
  initCart();
  
  // Add smooth scrolling for menu navigation
  initSmoothScrolling();
  
  // Add intersection observer for menu categories
  initCategoryObserver();
});

// Function to initialize smooth scrolling for the page
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Function to observe category sections and update active tab
function initCategoryObserver() {
  const categoryHeadings = document.querySelectorAll('.category-heading');
  const tabs = document.querySelectorAll('.category-tab');
  
  // Create an intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const categoryId = entry.target.dataset.heading;
        
        // Update active tab
        tabs.forEach(tab => {
          if (tab.dataset.category === categoryId) {
            tab.classList.add('active');
          } else {
            tab.classList.remove('active');
          }
        });
      }
    });
  }, { 
    rootMargin: '-100px 0px -80% 0px', 
    threshold: 0 
  });
  
  // Observe each category heading
  categoryHeadings.forEach(heading => {
    observer.observe(heading);
  });
}

// Add a notification animation when an item is added to cart
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove after animation completes
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

// Add CSS for notification
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
  .notification {
    position: fixed;
    top: 80px;
    right: 16px;
    background-color: var(--success);
    color: white;
    padding: 12px 16px;
    border-radius: var(--border-radius);
    z-index: 1000;
    opacity: 0;
    transform: translateX(20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .notification.show {
    opacity: 1;
    transform: translateX(0);
  }
`;
document.head.appendChild(notificationStyle);