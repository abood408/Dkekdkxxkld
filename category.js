// Category Products Data
const categoryProducts = {
    electronics: {
        title: 'الإلكترونيات',
        description: 'استكشف أحدث الأجهزة والتقنيات',
        products: [
            { id: 1, name: 'هاتف ذكي 5G', price: 1299, icon: '📱', rating: 4.5 },
            { id: 2, name: 'لابتوب قوي', price: 2499, icon: '💻', rating: 4.8 },
            { id: 3, name: 'سماعات لاسلكية', price: 399, icon: '🎧', rating: 4.3 },
            { id: 4, name: 'كاميرا احترافية', price: 1899, icon: '📷', rating: 4.6 },
            { id: 5, name: 'ساعة ذكية', price: 599, icon: '⌚', rating: 4.4 },
            { id: 6, name: 'جهاز تابلت', price: 899, icon: '📲', rating: 4.5 },
            { id: 7, name: 'شاشة 4K', price: 1599, icon: '🖥️', rating: 4.7 },
            { id: 8, name: 'بطارية خارجية', price: 199, icon: '🔋', rating: 4.2 }
        ]
    },
    fashion: {
        title: 'الأزياء',
        description: 'أحدث الموضات والملابس العصرية',
        products: [
            { id: 1, name: 'قميص كاجوال', price: 89, icon: '👕', rating: 4.3 },
            { id: 2, name: 'بنطلون جينز', price: 129, icon: '👖', rating: 4.4 },
            { id: 3, name: 'فستان سهرة', price: 299, icon: '👗', rating: 4.6 },
            { id: 4, name: 'حذاء رياضي', price: 199, icon: '👟', rating: 4.5 },
            { id: 5, name: 'سترة شتوية', price: 249, icon: '🧥', rating: 4.4 },
            { id: 6, name: 'قبعة رياضية', price: 49, icon: '🧢', rating: 4.2 },
            { id: 7, name: 'حقيبة يد', price: 179, icon: '👜', rating: 4.5 },
            { id: 8, name: 'نظارة شمسية', price: 159, icon: '😎', rating: 4.3 }
        ]
    },
    home: {
        title: 'المنزل',
        description: 'ديكور وأثاث منزلي عصري',
        products: [
            { id: 1, name: 'كرسي مريح', price: 450, icon: '🪑', rating: 4.5 },
            { id: 2, name: 'طاولة قهوة', price: 350, icon: '🛋️', rating: 4.4 },
            { id: 3, name: 'سرير مزدوج', price: 1200, icon: '🛏️', rating: 4.6 },
            { id: 4, name: 'مصباح أرضي', price: 120, icon: '💡', rating: 4.3 },
            { id: 5, name: 'سجادة فاخرة', price: 280, icon: '🧵', rating: 4.4 },
            { id: 6, name: 'ستائر حريرية', price: 180, icon: '🪟', rating: 4.2 },
            { id: 7, name: 'مرآة ديكور', price: 150, icon: '🪞', rating: 4.5 },
            { id: 8, name: 'رفوف معدنية', price: 220, icon: '📚', rating: 4.3 }
        ]
    },
    sports: {
        title: 'الرياضة',
        description: 'معدات رياضية متنوعة وعالية الجودة',
        products: [
            { id: 1, name: 'كرة قدم', price: 120, icon: '⚽', rating: 4.4 },
            { id: 2, name: 'راكيت تنس', price: 280, icon: '🎾', rating: 4.5 },
            { id: 3, name: 'دراجة هوائية', price: 650, icon: '🚴', rating: 4.6 },
            { id: 4, name: 'حقيبة رياضية', price: 180, icon: '🎒', rating: 4.3 },
            { id: 5, name: 'حبل قفز', price: 45, icon: '🪢', rating: 4.2 },
            { id: 6, name: 'أثقال تمرين', price: 350, icon: '🏋️', rating: 4.5 },
            { id: 7, name: 'حصيرة يوجا', price: 95, icon: '🧘', rating: 4.4 },
            { id: 8, name: 'زجاجة ماء ذكية', price: 85, icon: '💧', rating: 4.3 }
        ]
    }
};

// Get category from URL
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('cat') || 'electronics';
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateCartCount();
    updateFavCount();
    loadCategory();
    setupFilters();
});

// Load category products
function loadCategory() {
    const category = getCategoryFromURL();
    const categoryData = categoryProducts[category];

    if (!categoryData) {
        document.getElementById('categoryTitle').textContent = 'الفئة غير موجودة';
        return;
    }

    document.getElementById('categoryTitle').textContent = categoryData.title;
    document.getElementById('categoryDesc').textContent = categoryData.description;
    displayProducts(categoryData.products);
}

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
    const priceRange = document.getElementById('priceRange');

    if (sortBy) {
        sortBy.addEventListener('change', applyFilters);
    }

    if (priceRange) {
        priceRange.addEventListener('input', function() {
            document.getElementById('priceValue').textContent = this.value + ' ريال';
            applyFilters();
        });
    }
}

// Apply filters
function applyFilters() {
    const category = getCategoryFromURL();
    let products = [...categoryProducts[category].products];
    
    const sortBy = document.getElementById('sortBy').value;
    const maxPrice = parseInt(document.getElementById('priceRange').value);

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

// Event Listeners Setup (same as main script)
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
