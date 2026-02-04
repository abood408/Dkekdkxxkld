// All products database
const allProducts = [
    // Electronics
    { name: 'هاتف ذكي 5G', price: 1299, icon: '📱', category: 'electronics' },
    { name: 'لابتوب قوي', price: 2499, icon: '💻', category: 'electronics' },
    { name: 'سماعات لاسلكية', price: 399, icon: '🎧', category: 'electronics' },
    { name: 'كاميرا احترافية', price: 1899, icon: '📷', category: 'electronics' },
    { name: 'ساعة ذكية', price: 599, icon: '⌚', category: 'electronics' },
    { name: 'جهاز تابلت', price: 899, icon: '📲', category: 'electronics' },
    { name: 'شاشة 4K', price: 1599, icon: '🖥️', category: 'electronics' },
    { name: 'بطارية خارجية', price: 199, icon: '🔋', category: 'electronics' },
    // Fashion
    { name: 'قميص كاجوال', price: 89, icon: '👕', category: 'fashion' },
    { name: 'بنطلون جينز', price: 129, icon: '👖', category: 'fashion' },
    { name: 'فستان سهرة', price: 299, icon: '👗', category: 'fashion' },
    { name: 'حذاء رياضي', price: 199, icon: '👟', category: 'fashion' },
    { name: 'سترة شتوية', price: 249, icon: '🧥', category: 'fashion' },
    { name: 'قبعة رياضية', price: 49, icon: '🧢', category: 'fashion' },
    { name: 'حقيبة يد', price: 179, icon: '👜', category: 'fashion' },
    { name: 'نظارة شمسية', price: 159, icon: '😎', category: 'fashion' },
    // Home
    { name: 'كرسي مريح', price: 450, icon: '🪑', category: 'home' },
    { name: 'طاولة قهوة', price: 350, icon: '🛋️', category: 'home' },
    { name: 'سرير مزدوج', price: 1200, icon: '🛏️', category: 'home' },
    { name: 'مصباح أرضي', price: 120, icon: '💡', category: 'home' },
    { name: 'سجادة فاخرة', price: 280, icon: '🧵', category: 'home' },
    { name: 'ستائر حريرية', price: 180, icon: '🪟', category: 'home' },
    { name: 'مرآة ديكور', price: 150, icon: '🪞', category: 'home' },
    { name: 'رفوف معدنية', price: 220, icon: '📚', category: 'home' },
    // Sports
    { name: 'كرة قدم', price: 120, icon: '⚽', category: 'sports' },
    { name: 'راكيت تنس', price: 280, icon: '🎾', category: 'sports' },
    { name: 'دراجة هوائية', price: 650, icon: '🚴', category: 'sports' },
    { name: 'حقيبة رياضية', price: 180, icon: '🎒', category: 'sports' },
    { name: 'حبل قفز', price: 45, icon: '🪢', category: 'sports' },
    { name: 'أثقال تمرين', price: 350, icon: '🏋️', category: 'sports' },
    { name: 'حصيرة يوجا', price: 95, icon: '🧘', category: 'sports' },
    { name: 'زجاجة ماء ذكية', price: 85, icon: '💧', category: 'sports' },
    // Accessories
    { name: 'سوار ذهبي', price: 150, icon: '💍', category: 'accessories' },
    { name: 'عقد فضي', price: 200, icon: '✨', category: 'accessories' },
    { name: 'حقيبة يد جلدية', price: 350, icon: '👜', category: 'accessories' },
    { name: 'حقيبة ظهر', price: 280, icon: '🎒', category: 'accessories' },
    { name: 'وشاح حرير', price: 120, icon: '🧣', category: 'accessories' },
    { name: 'وشاح صوف', price: 95, icon: '🧣', category: 'accessories' },
    { name: 'حزام جلدي', price: 110, icon: '⌛', category: 'accessories' },
    { name: 'حزام معدني', price: 85, icon: '⌛', category: 'accessories' },
    { name: 'أقراط لؤلؤ', price: 180, icon: '💎', category: 'accessories' },
    { name: 'خاتم ماس', price: 450, icon: '💍', category: 'accessories' },
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateCartCount();
    updateFavCount();
    performInitialSearch();
});

// Perform initial search
function performInitialSearch() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') || '';
    
    if (query) {
        document.getElementById('searchInput').value = query;
        searchProducts(query);
    }
}

// Search products
function searchProducts(query) {
    if (!query || query.trim() === '') {
        document.getElementById('resultsInfo').textContent = 'الرجاء إدخال كلمة البحث';
        document.getElementById('resultsContainer').innerHTML = '';
        return;
    }

    const searchTerm = query.toLowerCase();
    const results = allProducts.filter(product => 
        product.name.includes(searchTerm) || 
        product.category.includes(searchTerm)
    );

    displaySearchResults(results, query);
}

// Display search results
function displaySearchResults(results, query) {
    const resultsInfo = document.getElementById('resultsInfo');
    const resultsContainer = document.getElementById('resultsContainer');

    if (results.length === 0) {
        resultsInfo.textContent = `لم يتم العثور على نتائج لـ "${query}"`;
        resultsContainer.innerHTML = `
            <div class="no-results">
                <h2>🔍 لا توجد نتائج</h2>
                <p>عذراً، لم نتمكن من العثور على منتجات تطابق بحثك. حاول البحث عن كلمات أخرى.</p>
            </div>
        `;
        return;
    }

    resultsInfo.textContent = `تم العثور على ${results.length} نتيجة`;
    
    resultsContainer.innerHTML = `
        <div class="products-grid">
            ${results.map(product => `
                <div class="product-card">
                    <div class="product-image">${product.icon}</div>
                    <h3>${product.name}</h3>
                    <p class="price">${product.price} ريال</p>
                    <div class="product-actions">
                        <button class="btn-add" onclick="addToCart('${product.name}', ${product.price})">أضف للسلة</button>
                        <button class="btn-fav" onclick="addToFavorites('${product.name}')">❤️</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Event Listeners Setup
function setupEventListeners() {
    const searchBtn = document.getElementById('searchBtn');
    const searchSubmit = document.getElementById('searchSubmit');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            // Hide search bar if on search page
        });
    }

    if (searchSubmit) {
        searchSubmit.addEventListener('click', function() {
            const query = document.getElementById('searchInput').value;
            searchProducts(query);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts(this.value);
            }
        });
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
