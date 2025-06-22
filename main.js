document.addEventListener('DOMContentLoaded', () => {
  // Burger Menu
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  // Favorites and Cart
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const updateFavorites = () => {
    const favoritesList = document.getElementById('favorites-list');
    if (favoritesList) {
      favoritesList.innerHTML = favorites.map(item => `
        <div class="flex items-center space-x-4">
          <img src="https://via.placeholder.com/100" alt="${item.name}" class="w-16 h-16 object-cover rounded">
          <div>
            <p class="text-rose-500">${item.name}</p>
            <p class="text-gray-600">${item.price}</p>
          </div>
        </div>
      `).join('');
    }
  };

  const updateCart = () => {
    const cartList = document.getElementById('cart-list');
    if (cartList) {
      cartList.innerHTML = cart.map(item => `
        <div class="flex items-center space-x-4">
          <img src="https://via.placeholder.com/100" alt="${item.name}" class="w-16 h-16 object-cover rounded">
          <div>
            <p class="text-rose-500">${item.name}</p>
            <p class="text-gray-600">${item.price}</p>
          </div>
        </div>
      `).join('');
    }
  };

  // Favorite Button
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const name = btn.closest('.bouquet-card').querySelector('h3').textContent;
      const price = btn.closest('.bouquet-card').querySelector('p').textContent;
      if (!favorites.some(item => item.id === id)) {
        favorites.push({ id, name, price });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavorites();
      }
    });
  });

  // Cart Button
  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const name = btn.closest('.bouquet-card').querySelector('h3').textContent;
      const price = btn.closest('.bouquet-card').querySelector('p').textContent;
      if (!cart.some(item => item.id === id)) {
        cart.push({ id, name, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
      }
    });
  });

  // Order Modal
  const orderBtn = document.getElementById('order-btn');
  const orderModal = document.getElementById('order-modal');
  const cancelOrder = document.getElementById('cancel-order');
  const submitOrder = document.getElementById('submit-order');

  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      orderModal.classList.remove('hidden');
    });
  }

  if (cancelOrder) {
    cancelOrder.addEventListener('click', () => {
      orderModal.classList.add('hidden');
    });
  }

  if (submitOrder) {
    submitOrder.addEventListener('click', () => {
      const name = document.getElementById('order-name').value;
      const address = document.getElementById('order-address').value;
      const phone = document.getElementById('order-phone').value;
      if (name && address && phone) {
        alert('Заказ оформлен!');
        orderModal.classList.add('hidden');
        localStorage.setItem('cart', JSON.stringify([]));
        updateCart();
      } else {
        alert('Заполните все поля');
      }
    });
  }

  // Category Filter
  const categoryButtons = document.querySelectorAll('.category-btn');
  const categorySelect = document.getElementById('category-select');
  const bouquetGrid = document.getElementById('bouquet-grid');

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      filterBouquets(category);
    });
  });

  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      filterBouquets(categorySelect.value);
    });
  }

  function filterBouquets(category) {
    const cards = bouquetGrid.querySelectorAll('.bouquet-card');
    cards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  updateFavorites();
  updateCart();
});