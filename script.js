// Switch Pages
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(pageId).classList.add('active-page');
    
    if(pageId === 'wardrobe') updateDisplay();
}

// Scroll in Home
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// User Registration [cite: 42, 43]
function registerUser() {
    const user = document.getElementById('regUser').value;
    const pass = document.getElementById('regPass').value;
    
    if (user && pass) {
        localStorage.setItem('userAccount', JSON.stringify({ user, pass }));
        alert("Account Created! Redirecting to Login...");
        showPage('login');
    } else {
        alert("Please provide both username and password.");
    }
}

// Login Logic
function loginUser() {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    const stored = JSON.parse(localStorage.getItem('userAccount'));

    if (stored && stored.user === user && stored.pass === pass) {
        alert("Welcome to Let's Dress!");
        showPage('wardrobe');
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// Wardrobe Management
function addToWardrobe() {
    const category = document.getElementById('clothCategory').value;
    const color = document.getElementById('clothColor').value;

    if (!color) {
        alert("What color is this item?");
        return;
    }

    let items = JSON.parse(localStorage.getItem('wardrobe') || "[]");
    items.push({ category, color });
    localStorage.setItem('wardrobe', JSON.stringify(items));
    
    document.getElementById('clothColor').value = "";
    updateDisplay();
}

function updateDisplay() {
    const area = document.getElementById('display-wardrobe');
    let items = JSON.parse(localStorage.getItem('wardrobe') || "[]");
    
    area.innerHTML = items.map(item => `
        <div class="item-card">
            <strong>${item.category}</strong><br>
            <small>${item.color}</small>
        </div>
    `).join('');
}

// Initial Load
window.onload = updateDisplay;