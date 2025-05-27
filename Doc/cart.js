// Cart functionality
let cart = [];

function initCart() {
  // Add to cart button event listeners
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
      const itemId = e.target.dataset.id;
      const quantityInput = document.querySelector(`.quantity-input[data-id="${itemId}"]`);
      const quantity = parseInt(quantityInput.value);
      
      addToCart(itemId, quantity);
      
      // Reset quantity to 1 after adding to cart
      quantityInput.value = 1;
      
      // Show added animation
      showAddedAnimation(e.target);
    }
  });

  // Cart toggle functionality
  const cartIcon = document.getElementById('cart-icon');
  const cartContainer = document.getElementById('cart-container');
  const overlay = document.getElementById('overlay');
  const closeCart = document.getElementById('close-cart');
  
  cartIcon.addEventListener('click', () => {
    cartContainer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  function closeCartMenu() {
    cartContainer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  closeCart.addEventListener('click', closeCartMenu);
  overlay.addEventListener('click', closeCartMenu);

  // Checkout button
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
      alert('Thank you for your order! Your food will be on its way soon.');
      cart = [];
      updateCartDisplay();
    }
  });
}

function addToCart(itemId, quantity) {
  const item = findMenuItem(itemId);
  
  if (!item) return;
  
  // Check if item is already in cart
  const existingItemIndex = cart.findIndex(cartItem => cartItem.id === parseInt(itemId));
  
  if (existingItemIndex !== -1) {
    // Update quantity if already in cart
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({
      id: parseInt(itemId),
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: quantity
    });
  }
  
  // Update cart display
  updateCartDisplay();
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== parseInt(itemId));
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCountElement = document.getElementById('cart-count');
  const cartTotalElement = document.getElementById('cart-total');
  const emptyCartElement = document.getElementById('empty-cart');
  const cartFooter = document.getElementById('cart-footer');
  
  // Update cart count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = totalItems;
  
  // Clear cart items
  cartItemsContainer.innerHTML = '';
  
  // Show empty cart message or cart items
  if (cart.length === 0) {
    emptyCartElement.style.display = 'flex';
    cartFooter.style.display = 'none';
  } else {
    emptyCartElement.style.display = 'none';
    cartFooter.style.display = 'block';
    
    // Add cart items
    cart.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-actions">
            <button class="cart-quantity-btn cart-quantity-decrease" data-id="${item.id}">-</button>
            <span class="cart-quantity">${item.quantity}</span>
            <button class="cart-quantity-btn cart-quantity-increase" data-id="${item.id}">+</button>
            <button class="remove-item-btn" data-id="${item.id}">×</button>
          </div>
        </div>
      `;
      
      cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Add event listeners to cart item buttons
    document.querySelectorAll('.cart-quantity-decrease').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const cartItem = cart.find(item => item.id === id);
        
        if (cartItem && cartItem.quantity > 1) {
          cartItem.quantity--;
          updateCartDisplay();
        }
      });
    });
    
    document.querySelectorAll('.cart-quantity-increase').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const cartItem = cart.find(item => item.id === id);
        
        if (cartItem && cartItem.quantity < 10) {
          cartItem.quantity++;
          updateCartDisplay();
        }
      });
    });
    
    document.querySelectorAll('.remove-item-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        removeFromCart(id);
      });
    });
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  }
}

function showAddedAnimation(button) {
  // Store original text
  const originalText = button.textContent;
  
  // Change button text and style
  button.textContent = 'Added!';
  button.style.backgroundColor = 'var(--success)';
  
  // Reset button after animation
  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = '';
  }, 1000);
}