// Menu data
const menuData = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    items: [
      {
        id: 1,
        name: 'Crispy Calamari',
        description: 'Lightly breaded calamari served with marinara sauce',
        price: 299,
        image: 'https://images.pexels.com/photos/7474163/pexels-photo-7474163.jpeg',
        popular: true
      },
      {
        id: 2,
        name: 'Spinach Artichoke Dip',
        description: 'Creamy spinach and artichoke dip served with tortilla chips',
        price: 299,
        image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg'
      },
      {
        id: 3,
        name: 'Stuffed Mushrooms',
        description: 'Button mushrooms stuffed with herb cream cheese and topped with breadcrumbs',
        price: 299,
        image: 'https://images.pexels.com/photos/3693329/pexels-photo-3693329.jpeg'
      }
    ]
  },
  {
    id: 'main-courses',
    name: 'Main Courses',
    items: [
      {
        id: 4,
        name: 'Grilled Salmon',
        description: 'Atlantic salmon grilled to perfection with lemon herb butter',
        price: 299,
        image: 'https://images.pexels.com/photos/5718073/pexels-photo-5718073.jpeg',
        popular: true
      },
      {
        id: 5,
        name: 'Classic Cheeseburger',
        description: 'Angus beef patty with cheddar cheese, lettuce, tomato, and our special sauce',
        price: 199,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
        popular: true
      },
      {
        id: 6,
        name: 'Chicken Alfredo',
        description: 'Fettuccine pasta with grilled chicken and creamy Alfredo sauce',
        price: 699,
        image: 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg'
      },
      {
        id: 7,
        name: 'Veggie Stir Fry',
        description: 'Fresh vegetables stir-fried with tofu in a savory sauce, served over rice',
        price: 1599,
        image: 'https://images.pexels.com/photos/5836775/pexels-photo-5836775.jpeg'
      }
    ]
  },
  {
    id: 'pizzas',
    name: 'Pizzas',
    items: [
      {
        id: 8,
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil',
        price: 1399,
        image: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg',
        popular: true
      },
      {
        id: 9,
        name: 'Pepperoni Pizza',
        description: 'Traditional pizza topped with pepperoni and mozzarella cheese',
        price: 599,
        image: 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg'
      },
      {
        id: 10,
        name: 'Vegetarian Pizza',
        description: 'Pizza topped with bell peppers, mushrooms, onions, and olives',
        price: 199,
        image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg'
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    items: [
      {
        id: 11,
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
        price: 399,
        image: 'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg',
        popular: true
      },
      {
        id: 12,
        name: 'New York Cheesecake',
        description: 'Creamy classic cheesecake with a graham cracker crust',
        price: 299,
        image: 'https://images.pexels.com/photos/3185509/pexels-photo-3185509.png'
      },
      {
        id: 13,
        name: 'Tiramisu',
        description: 'Italian dessert made with espresso-soaked ladyfingers and mascarpone cream',
        price: 399,
        image: 'https://images.pexels.com/photos/6889098/pexels-photo-6889098.jpeg'
      }
    ]
  },
  {
    id: 'drinks',
    name: 'Drinks',
    items: [
      {
        id: 14,
        name: 'Fresh Lemonade',
        description: 'Freshly squeezed lemons with a touch of sweetness',
        price: 299,
        image: 'https://images.pexels.com/photos/158053/fresh-orange-juice-squeezed-refreshing-citrus-158053.jpeg'
      },
      {
        id: 15,
        name: 'Iced Coffee',
        description: 'Cold brewed coffee served over ice',
        price: 299,
        image: 'https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg'
      },
      {
        id: 16,
        name: 'Mango Smoothie',
        description: 'Refreshing smoothie made with fresh mangoes and yogurt',
        price: 299,
        image: 'https://images.pexels.com/photos/8879378/pexels-photo-8879378.jpeg',
        popular: true
      }
    ]
  }
];

// Function to render category tabs
function renderCategoryTabs() {
  const categoryTabsContainer = document.getElementById('category-tabs');
  
  menuData.forEach((category, index) => {
    const tabButton = document.createElement('button');
    tabButton.classList.add('category-tab');
    if (index === 0) tabButton.classList.add('active');
    tabButton.dataset.category = category.id;
    tabButton.textContent = category.name;
    categoryTabsContainer.appendChild(tabButton);
  });

  // Add event listeners to tabs
  const tabs = document.querySelectorAll('.category-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Scroll to the category section
      const categoryId = tab.dataset.category;
      const categoryHeading = document.querySelector(`[data-heading="${categoryId}"]`);
      if (categoryHeading) {
        categoryHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Function to render menu items
function renderMenuItems() {
  const menuItemsContainer = document.getElementById('menu-items');
  
  menuData.forEach(category => {
    // Add category heading
    const categoryHeading = document.createElement('h2');
    categoryHeading.classList.add('category-heading');
    categoryHeading.dataset.heading = category.id;
    categoryHeading.textContent = category.name;
    menuItemsContainer.appendChild(categoryHeading);
    
    // Create grid for this category's items
    const categoryGrid = document.createElement('div');
    categoryGrid.classList.add('menu-items-grid');
    menuItemsContainer.appendChild(categoryGrid);
    
    // Add menu items for this category
    category.items.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item');
      menuItem.dataset.id = item.id;
      
      // Create menu item HTML
      menuItem.innerHTML = `
        <div class="menu-item-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          ${item.popular ? '<span class="menu-item-badge">Popular</span>' : ''}
        </div>
        <div class="menu-item-content">
          <div class="menu-item-header">
            <h3 class="menu-item-title">${item.name}</h3>
            <span class="menu-item-price">${item.price.toFixed(2)}</span>
          </div>
          <p class="menu-item-description">${item.description}</p>
          <div class="menu-item-footer">
            <div class="menu-item-quantity">
              <button class="quantity-btn quantity-decrease" data-id="${item.id}">-</button>
              <input type="number" class="quantity-input" data-id="${item.id}" value="1" min="1" max="10">
              <button class="quantity-btn quantity-increase" data-id="${item.id}">+</button>
            </div>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
          </div>
        </div>
      `;
      
      categoryGrid.appendChild(menuItem);
    });
  });

  // Add event listeners for quantity buttons
  document.querySelectorAll('.quantity-decrease').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const input = document.querySelector(`.quantity-input[data-id="₹{id}"]`);
      if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
      }
    });
  });

  document.querySelectorAll('.quantity-increase').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const input = document.querySelector(`.quantity-input[data-id="₹{id}"]`);
      if (input.value < 10) {
        input.value = parseInt(input.value) + 1;
      }
    });
  });
}

// Function to find menu item by id
function findMenuItem(itemId) {
  for (const category of menuData) {
    const item = category.items.find(item => item.id === parseInt(itemId));
    if (item) return item;
  }
  return null;
}