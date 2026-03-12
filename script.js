// Navigation Logic
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active-page'));
    document.getElementById(pageId).classList.add('active-page');
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// "Database" Logic using LocalStorage
function registerUser() {
    const user = document.getElementById('regUser').value;
    const pass = document.getElementById('regPass').value;
    
    if (user && pass) {
        localStorage.setItem('currentUser', JSON.stringify({ user, pass }));
        alert("Registration Successful! Moving to Login...");
        showPage('login');
    } else {
        alert("Please fill all fields.");
    }
}

function loginUser() {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    if (storedUser && storedUser.user === user && storedUser.pass === pass) {
        alert("Welcome to Let's Dress!");
        showPage('avatar');
    } else {
        alert("Invalid Login Credentials.");
    }
}

// Wardrobe Logic
let wardrobe = JSON.parse(localStorage.getItem('myWardrobe')) || [];

function addToWardrobe(type) {
    const category = document.getElementById('clothCategory').value;
    const color = document.getElementById('clothColor').value;

    if (color) {
        wardrobe.push({ category, color });
        localStorage.setItem('myWardrobe', JSON.stringify(wardrobe));
        updateWardrobeDisplay();
        alert("Added to Wardrobe!");
    }
}

function updateWardrobeDisplay() {
    const display = document.getElementById('display-wardrobe');
    display.innerHTML = wardrobe.map(item => `
        <div class="item-card" style="background: #fff; padding: 10px; margin: 5px; border-radius: 5px;">
            ${item.color} ${item.category}
        </div>
    `).join('');
}

// Load wardrobe on startup
window.onload = updateWardrobeDisplay;