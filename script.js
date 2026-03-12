/**
 * Let's Dress - Final Project Script
 * Focus: Local Logic & User Experience
 */

// --- 1. PAGE NAVIGATION LOGIC ---
function showPage(pageId) {
    // Hide all page sections
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active-page'));
    
    // Show the target page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active-page');
    }
    
    // Smooth scroll to the top of the new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Refresh dynamic data if entering certain pages
    if(pageId === 'wardrobe') updateWardrobeDisplay();
    if(pageId === 'today') generateTodayRecommendation();
    if(pageId === 'history') updateHistoryDisplay();
}

// Smooth scroll for Home Page Sidebar links
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- 2. REGISTRATION & LOGIN (LOCAL "DATABASE") ---
function registerUser() {
    const user = document.getElementById('regUser').value;
    const pass = document.getElementById('regPass').value;
    const email = document.getElementById('regEmail').value;
    const gender = document.getElementById('regGender').value;

    // Task 5: Logical Validation [cite: 43]
    if (!user || !pass || !email || !gender) {
        alert("Please fill in all details to join the club!");
        return;
    }

    const userData = { user, pass, email, gender };
    localStorage.setItem('userAccount', JSON.stringify(userData));
    
    alert("Registration Successful! Redirecting to login...");
    showPage('login');
}

function loginUser() {
    const userInput = document.getElementById('loginUser').value;
    const passInput = document.getElementById('loginPass').value;
    const storedData = JSON.parse(localStorage.getItem('userAccount'));

    if (storedData && storedData.user === userInput && storedData.pass === passInput) {
        alert("Welcome back! Let's dress for a beautiful life.");
        showPage('home'); // Go to Home or Avatar as per your choice
    } else {
        alert("Invalid Username or Password. Please try again.");
    }
}

// --- 3. WARDROBE MANAGEMENT ---
function addToWardrobe() {
    const category = document.getElementById('clothCategory').value;
    const color = document.getElementById('clothColor').value.trim();
    
    if (!color) {
        alert("Please enter the color of your item!");
        return;
    }

    // Get current wardrobe or empty array
    let wardrobe = JSON.parse(localStorage.getItem('wardrobe') || "[]");
    
    // Create new item object
    const newItem = {
        id: Date.now(), // Unique ID for deleting
        category: category,
        color: color,
        dateAdded: new Date().toLocaleDateString()
    };
    
    wardrobe.push(newItem);
    localStorage.setItem('wardrobe', JSON.stringify(wardrobe));
    
    // Clear input and refresh
    document.getElementById('clothColor').value = "";
    alert("Added to your digital closet!");
    updateWardrobeDisplay();
}

function updateWardrobeDisplay() {
    const displayArea = document.getElementById('display-wardrobe');
    let items = JSON.parse(localStorage.getItem('wardrobe') || "[]");
    
    if (items.length === 0) {
        displayArea.innerHTML = "<p style='padding:20px;'>Your wardrobe is empty. Start adding items!</p>";
        return;
    }

    displayArea.innerHTML = items.map(item => `
        <div class="item-card">
            <strong>${item.category}</strong><br>
            <span>Color: ${item.color}</span><br>
            <button onclick="deleteItem(${item.id})" style="margin-top:10px; padding:5px; font-size:0.8rem;">Remove</button>
        </div>
    `).join('');
}

function deleteItem(id) {
    let items = JSON.parse(localStorage.getItem('wardrobe') || "[]");
    items = items.filter(item => item.id !== id);
    localStorage.setItem('wardrobe', JSON.stringify(items));
    updateWardrobeDisplay();
}

// --- 4. TODAY RECOMMENDATION LOGIC ---
function generateTodayRecommendation() {
    const container = document.getElementById('today-outfit');
    let items = JSON.parse(localStorage.getItem('wardrobe') || "[]");
    
    if (items.length === 0) {
        container.innerHTML = "<h3>Your wardrobe is empty!</h3><p>Add clothes to get daily style tips.</p>";
        return;
    }

    // "AI" Logic: Randomly select an item from local storage
    const luckyPick = items[Math.floor(Math.random() * items.length)];
    
    container.innerHTML = `
        <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; border: 2px solid #D5A9B8;">
            <h3>Our Choice for Today:</h3>
            <p style="font-size: 1.5rem;">The <strong>${luckyPick.color} ${luckyPick.category}</strong></p>
            <p>This choice reflects your unique style and is perfect for today's vibe.</p>
        </div>
    `;
    
    saveToHistory(luckyPick);
}

// --- 5. HISTORY TRACKING ---
function saveToHistory(item) {
    let history = JSON.parse(localStorage.getItem('styleHistory') || "[]");
    
    const entry = {
        description: `${item.color} ${item.category}`,
        date: new Date().toLocaleDateString()
    };
    
    // Avoid duplicate entries for the same day if refreshing
    const lastEntry = history[history.length - 1];
    if (lastEntry && lastEntry.date === entry.date && lastEntry.description === entry.description) {
        return;
    }

    history.push(entry);
    localStorage.setItem('styleHistory', JSON.stringify(history));
}

function updateHistoryDisplay() {
    const list = document.getElementById('history-list');
    let history = JSON.parse(localStorage.getItem('styleHistory') || "[]");
    
    if (history.length === 0) {
        list.innerHTML = "<p>No style history yet. Check 'Today' to get started!</p>";
        return;
    }

    list.innerHTML = history.reverse().map(h => `
        <div style="border-bottom: 1px solid #D5A9B8; padding: 10px; display: flex; justify-content: space-between;">
            <span>${h.description}</span>
            <small>${h.date}</small>
        </div>
    `).join('');
}

// Initialize display on load
window.onload = function() {
    if(document.getElementById('display-wardrobe')) updateWardrobeDisplay();
};