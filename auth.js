// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupForms();
});

// Setup forms
function setupForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }
}

// Switch tabs
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
    }\n}\n\n// Handle login\nfunction handleLogin() {\n    const email = document.getElementById('loginEmail').value;\n    const password = document.getElementById('loginPassword').value;\n    const rememberMe = document.getElementById('rememberMe').checked;\n\n    if (!email || !password) {\n        showNotification('الرجاء ملء جميع الحقول');\n        return;\n    }\n\n    // Validate email format\n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    if (!emailRegex.test(email)) {\n        showNotification('البريد الإلكتروني غير صحيح');\n        return;\n    }\n\n    // Simulate login\n    const userData = {\n        email,\n        loggedIn: true,\n        loginTime: new Date().toISOString()\n    };\n\n    localStorage.setItem('user', JSON.stringify(userData));\n    \n    if (rememberMe) {\n        localStorage.setItem('rememberEmail', email);\n    }\n\n    showNotification('تم تسجيل الدخول بنجاح!');\n    \n    setTimeout(() => {\n        window.location.href = 'index.html';\n    }, 1500);\n}\n\n// Handle register\nfunction handleRegister() {\n    const name = document.getElementById('registerName').value;\n    const email = document.getElementById('registerEmail').value;\n    const phone = document.getElementById('registerPhone').value;\n    const password = document.getElementById('registerPassword').value;\n    const confirmPassword = document.getElementById('confirmPassword').value;\n    const agreeTerms = document.getElementById('agreeTerms').checked;\n\n    if (!name || !email || !password || !confirmPassword) {\n        showNotification('الرجاء ملء جميع الحقول المطلوبة');\n        return;\n    }\n\n    if (password.length < 6) {\n        showNotification('كلمة المرور يجب أن تكون 6 أحرف على الأقل');\n        return;\n    }\n\n    if (password !== confirmPassword) {\n        showNotification('كلمات المرور غير متطابقة');\n        return;\n    }\n\n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    if (!emailRegex.test(email)) {\n        showNotification('البريد الإلكتروني غير صحيح');\n        return;\n    }\n\n    if (!agreeTerms) {\n        showNotification('يجب أن توافق على شروط الاستخدام');\n        return;\n    }\n\n    // Check if email already exists\n    let users = JSON.parse(localStorage.getItem('users')) || [];\n    if (users.some(u => u.email === email)) {\n        showNotification('هذا البريد الإلكتروني مسجل بالفعل');\n        return;\n    }\n\n    // Register new user\n    const newUser = {\n        id: Date.now(),\n        name,\n        email,\n        phone,\n        password: btoa(password), // Simple encoding (not secure for production)\n        registrationDate: new Date().toISOString()\n    };\n\n    users.push(newUser);\n    localStorage.setItem('users', JSON.stringify(users));\n\n    // Auto login\n    const userData = {\n        email,\n        name,\n        loggedIn: true,\n        loginTime: new Date().toISOString()\n    };\n\n    localStorage.setItem('user', JSON.stringify(userData));\n\n    showNotification('تم التسجيل بنجاح! مرحباً بك في نخبة المتجر');\n    \n    setTimeout(() => {\n        window.location.href = 'index.html';\n    }, 1500);\n}\n\n// Notification Function\nfunction showNotification(message) {\n    const notification = document.createElement('div');\n    notification.style.cssText = `\n        position: fixed;\n        top: 20px;\n        right: 20px;\n        background-color: #27ae60;\n        color: white;\n        padding: 1rem 1.5rem;\n        border-radius: 4px;\n        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n        z-index: 3000;\n        animation: slideIn 0.3s ease;\n        max-width: 300px;\n        font-weight: 600;\n    `;\n    notification.textContent = message;\n    document.body.appendChild(notification);\n\n    // Add animation styles if not already present\n    if (!document.getElementById('notificationStyles')) {\n        const style = document.createElement('style');\n        style.id = 'notificationStyles';\n        style.textContent = `\n            @keyframes slideIn {\n                from {\n                    transform: translateX(400px);\n                    opacity: 0;\n                }\n                to {\n                    transform: translateX(0);\n                    opacity: 1;\n                }\n            }\n\n            @keyframes slideOut {\n                from {\n                    transform: translateX(0);\n                    opacity: 1;\n                }\n                to {\n                    transform: translateX(400px);\n                    opacity: 0;\n                }\n            }\n        `;\n        document.head.appendChild(style);\n    }\n\n    setTimeout(() => {\n        notification.style.animation = 'slideOut 0.3s ease';\n        setTimeout(() => notification.remove(), 300);\n    }, 3000);\n}\n
