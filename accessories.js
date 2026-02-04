// Accessories Products Data
const accessories = [
    { id: 1, name: 'سوار ذهبي', price: 150, icon: '💍', type: 'jewelry', rating: 4.5 },
    { id: 2, name: 'عقد فضي', price: 200, icon: '✨', type: 'jewelry', rating: 4.6 },
    { id: 3, name: 'حقيبة يد جلدية', price: 350, icon: '👜', type: 'bags', rating: 4.4 },
    { id: 4, name: 'حقيبة ظهر', price: 280, icon: '🎒', type: 'bags', rating: 4.3 },
    { id: 5, name: 'وشاح حرير', price: 120, icon: '🧣', type: 'scarves', rating: 4.5 },
    { id: 6, name: 'وشاح صوف', price: 95, icon: '🧣', type: 'scarves', rating: 4.2 },
    { id: 7, name: 'حزام جلدي', price: 110, icon: '⌛', type: 'belts', rating: 4.4 },
    { id: 8, name: 'حزام معدني', price: 85, icon: '⌛', type: 'belts', rating: 4.3 },
    { id: 9, name: 'أقراط لؤلؤ', price: 180, icon: '💎', type: 'jewelry', rating: 4.7 },
    { id: 10, name: 'خاتم ماس', price: 450, icon: '💍', type: 'jewelry', rating: 4.8 },
    { id: 11, name: 'حقيبة سفر', price: 320, icon: '🧳', type: 'bags', rating: 4.5 },
    { id: 12, name: 'وشاح قطن', price: 75, icon: '🧣', type: 'scarves', rating: 4.1 }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateCartCount();
    updateFavCount();
    displayProducts(accessories);
    setupFilters();
});

// Display products
function displayProducts(products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.icon}</div>
            <h3>${product.name}</h3>
            <p class="price">${product.price} ريال</p>
            <div class="product-rating">⭐ ${product.rating}</div>
            <div class="product-actions">
                <button class="btn btn-small" onclick="addToCart('${product.name}', ${product.price})">أضف للسلة</button>
                <button class="btn btn-small" onclick="addToFavorites('${product.name}')" style="background-color: #e74c3c;">❤️ مفضل</button>
            </div>
        </div>
    `).join('');
}

// Setup filters
function setupFilters() {
    const sortBy = document.getElementById('sortBy');
    const typeFilter = document.getElementById('typeFilter');
    const priceRange = document.getElementById('priceRange');

    if (sortBy) sortBy.addEventListener('change', applyFilters);
    if (typeFilter) typeFilter.addEventListener('change', applyFilters);
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            document.getElementById('priceValue').textContent = this.value + ' ريال';
            applyFilters();
        });
    }
}

// Apply filters
function applyFilters() {
    let products = [...accessories];
    
    const sortBy = document.getElementById('sortBy').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const maxPrice = parseInt(document.getElementById('priceRange').value);

    // Filter by type
    if (typeFilter) {
        products = products.filter(p => p.type === typeFilter);
    }

    // Filter by price
    products = products.filter(p => p.price <= maxPrice);

    // Sort
    switch(sortBy) {
        case 'price-low':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            products.reverse();
            break;
    }

    displayProducts(products);
}

// Event Listeners Setup
function setupEventListeners() {
    const searchBtn = document.getElementById('searchBtn');
    const searchContainer = document.getElementById('searchContainer');
    const searchSubmit = document.getElementById('searchSubmit');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
        });
    }

    if (searchSubmit) {
        searchSubmit.addEventListener('click', performSearch);
    }

    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            openModal('cartModal');
            displayCart();
        });
    }

    const favBtn = document.getElementById('favBtn');
    if (favBtn) {
        favBtn.addEventListener('click', function() {
            openModal('favModal');
            displayFavorites();
        });
    }

    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            openModal('loginModal');
        });
    }

    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
        });
    }

    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Cart Functions
function addToCart(productName, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = {
        id: Date.now(),
        name: productName,
        price: price,
        quantity: 1
    };

    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${productName} تمت إضافته للسلة`);
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cartItems');
    
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999;">السلة فارغة</p>';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                <small>${item.price} ريال × ${item.quantity}</small>
            </div>
            <button onclick="removeFromCart(${item.id})">حذف</button>
        </div>
    `).join('');

    updateCartTotal();
}

function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        cartTotal.textContent = total;
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn && cart.length > 0) {
        cartBtn.textContent = `🛒 (${cart.length})`;
    }
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showNotification('السلة فارغة');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`تم الطلب بنجاح! الإجمالي: ${total} ريال`);
    localStorage.setItem('cart', JSON.stringify([]));
    updateCartCount();
    closeModal('cartModal');
}

// Favorites Functions
function addToFavorites(productName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(productName)) {
        favorites.push(productName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavCount();
        showNotification(`${productName} تمت إضافته للمفضلة`);
    } else {
        showNotification(`${productName} موجود بالفعل في المفضلة`);
    }
}

function removeFromFavorites(productName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => item !== productName);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
    updateFavCount();
}

function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favItems = document.getElementById('favItems');
    
    if (!favItems) return;

    if (favorites.length === 0) {
        favItems.innerHTML = '<p style="text-align: center; color: #999;">لا توجد عناصر مفضلة</p>';
        return;
    }

    favItems.innerHTML = favorites.map(item => `
        <div class="fav-item">
            <span>${item}</span>
            <button onclick="removeFromFavorites('${item}')">حذف</button>
        </div>
    `).join('');
}

function updateFavCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favBtn = document.getElementById('favBtn');
    if (favBtn && favorites.length > 0) {
        favBtn.textContent = `❤️ (${favorites.length})`;
    }
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Search Function
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase();
    if (query.trim() === '') {
        showNotification('الرجاء إدخال كلمة البحث');
        return;
    }

    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

// Auth Functions
function switchTab(tab) {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (tab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        tabBtns[0].classList.add('active');
        tabBtns[1].classList.remove('active');
    } else {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        tabBtns[1].classList.add('active');
        tabBtns[0].classList.remove('active');
    }
}

function login() {
    const inputs = document.querySelectorAll('#loginTab input');
    const email = inputs[0].value;
    const password = inputs[1].value;

    if (!email || !password) {
        showNotification('الرجاء ملء جميع الحقول');
        return;
    }

    localStorage.setItem('user', JSON.stringify({ email, loggedIn: true }));
    showNotification('تم تسجيل الدخول بنجاح');
    closeModal('loginModal');
    updateNavbar();
}

function register() {
    const inputs = document.querySelectorAll('#registerTab input');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const password = inputs[2].value;

    if (!name || !email || !password) {
        showNotification('الرجاء ملء جميع الحقول');
        return;
    }

    localStorage.setItem('user', JSON.stringify({ name, email, loggedIn: true }));
    showNotification('تم التسجيل بنجاح');
    closeModal('loginModal');
    updateNavbar();
}

function updateNavbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginBtn = document.getElementById('loginBtn');
    
    if (user && user.loggedIn && loginBtn) {
        loginBtn.textContent = '👤 (مسجل)';
        loginBtn.title = user.name || user.email;
    }
}

// Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update navbar on page load
window.addEventListener('load', updateNavbar);
