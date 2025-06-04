// Main JavaScript for ModMaster

// Data structure
let appData = {
    apps: [],
    categories: [],
    settings: {
        siteTitle: "ModMaster - Premium Modded APKs",
        siteDescription: "Download the latest modded APK files for Android games and apps. Premium features unlocked for free.",
        contactEmail: "ishant150407@gmail.com",
        socialLinks: {
            facebook: "",
            twitter: "",
            instagram: "",
            telegram: ""
        }
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00F5FF" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00F5FF",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // Load data from localStorage or use default
    loadData();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize FAQ toggles
    initFaqToggles();

    // Initialize page-specific functionality
    initPageSpecific();

    // Update footer categories
    updateFooterCategories();
});

// Load data from localStorage or use default
function loadData() {
    const savedData = localStorage.getItem('modmasterData');
    
    if (savedData) {
        try {
            appData = JSON.parse(savedData);
        } catch (e) {
            console.error('Error parsing saved data:', e);
            createDefaultData();
        }
    } else {
        createDefaultData();
    }
}

// Create default data if none exists
function createDefaultData() {
    // Default categories
    appData.categories = [
        {
            id: "games",
            name: "Games",
            icon: "fas fa-gamepad",
            description: "Modified games with unlimited coins, gems, and unlocked features"
        },
        {
            id: "social",
            name: "Social",
            icon: "fas fa-comments",
            description: "Modified social media apps with premium features"
        },
        {
            id: "productivity",
            name: "Productivity",
            icon: "fas fa-briefcase",
            description: "Office and productivity apps with pro features unlocked"
        },
        {
            id: "education",
            name: "Education",
            icon: "fas fa-graduation-cap",
            description: "Educational apps and tools with premium content"
        },
        {
            id: "entertainment",
            name: "Entertainment",
            icon: "fas fa-film",
            description: "Entertainment apps with ad-free experience and premium features"
        },
        {
            id: "tools",
            name: "Tools",
            icon: "fas fa-tools",
            description: "Utility apps with pro features unlocked"
        }
    ];

    // Default apps
    appData.apps = [
        {
            id: "minecraft",
            name: "Minecraft PE",
            packageName: "com.mojang.minecraftpe",
            version: "1.19.2",
            size: "150",
            category: "games",
            featured: true,
            icon: "https://play-lh.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP",
            description: "Explore infinite worlds and build everything from the simplest of homes to the grandest of castles in Minecraft. This mod includes unlocked premium skins, texture packs, and more.",
            downloadLink: "https://drive.google.com/file/d/example/view",
            screenshots: [
                "https://play-lh.googleusercontent.com/B8L_Bq3vzCIoQrdnDQQsHZ9q9G3Z-qBQxLh6CFkC8OJC5vEGoFNPTQWV5RJb1WvVfg",
                "https://play-lh.googleusercontent.com/OlLY3S6LpDFmjwOYG7noN1otxID3JKHqXGYQxth_xpvP9peSKvS5TYwQiZ7rJCn3W8Gs",
                "https://play-lh.googleusercontent.com/6bG5U-wvRwVt-rWOZ8i2jmUL_wkww9qXEtMGlMwa5SsebLMTX_74ynLm6WEV6C3FJg"
            ],
            modFeatures: [
                "Unlocked premium skins and texture packs",
                "Unlimited resources in survival mode",
                "All items unlocked in creative mode",
                "No damage from falls or attacks"
            ],
            requirements: [
                "Android 5.0 or higher",
                "At least 1GB RAM",
                "500MB free storage"
            ],
            downloads: 15750,
            rating: 4.8,
            dateAdded: "2023-10-15"
        },
        {
            id: "spotify",
            name: "Spotify Premium",
            packageName: "com.spotify.music",
            version: "8.7.68.568",
            size: "85",
            category: "entertainment",
            featured: true,
            icon: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qRRPrKxH1tUmkNfHRKhi6CHQX0g_sYw-MtUhA",
            description: "Spotify is a digital music streaming service with millions of songs. This mod unlocks premium features like ad-free listening, unlimited skips, and high quality audio.",
            downloadLink: "https://drive.google.com/file/d/example2/view",
            screenshots: [
                "https://play-lh.googleusercontent.com/68RxQDi8NH3ly2iJzmL_FgN1PTeoLZCnTfg26S6LXXl3zMT3jNFYYPurUimB8v4bKRB3",
                "https://play-lh.googleusercontent.com/FLPkrLWUzWLqCh2RbKfPZwOltdEpnKjYMVHgG7JQZXq1K42dBzuRjZmyBrOlMwqKRCLb",
                "https://play-lh.googleusercontent.com/hgWGYR9WUWKajg5KszB2X_WtGvYyGx8yGV4XhT6JwjRsaO4BW1gQAYHQExfpn1Z6BLc"
            ],
            modFeatures: [
                "Ad-free listening experience",
                "Unlimited skips",
                "Extreme audio quality (320kbps)",
                "Offline listening",
                "No forced shuffle for playlists"
            ],
            requirements: [
                "Android 6.0 or higher",
                "At least 1GB RAM",
                "200MB free storage"
            ],
            downloads: 28430,
            rating: 4.9,
            dateAdded: "2023-11-03"
        },
        {
            id: "netflix",
            name: "Netflix Premium",
            packageName: "com.netflix.mediaclient",
            version: "8.32.0",
            size: "95",
            category: "entertainment",
            featured: false,
            icon: "https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI",
            description: "Netflix is the leading subscription service for watching TV episodes and movies. This mod unlocks premium features without subscription.",
            downloadLink: "https://drive.google.com/file/d/example3/view",
            screenshots: [
                "https://play-lh.googleusercontent.com/RZ5luCUwc5QtW5emnVMp8o2atj7DIUJoG1EizgFQnXS8ia7NW7n5pJQKOkSjyA8RYmY",
                "https://play-lh.googleusercontent.com/liEoN3LGmSY4E-I9DdOkEXR5kBQfqfFQnMnOJFGdKH1gVGgew0jqUJMqCR0QsQ_hXJc",
                "https://play-lh.googleusercontent.com/hMPfJgAGUfJNFHC-bac6pamXNK6q_8OgCTcvZCFnpvrA-kRIWOQv46x7jKR5mTaIPxQ"
            ],
            modFeatures: [
                "No subscription required",
                "Full HD and 4K streaming",
                "Download for offline viewing",
                "No regional restrictions"
            ],
            requirements: [
                "Android 8.0 or higher",
                "At least 2GB RAM",
                "500MB free storage"
            ],
            downloads: 19870,
            rating: 4.7,
            dateAdded: "2023-12-10"
        },
        {
            id: "adobe_lightroom",
            name: "Adobe Lightroom",
            packageName: "com.adobe.lrmobile",
            version: "7.5.1",
            size: "112",
            category: "productivity",
            featured: true,
            icon: "https://play-lh.googleusercontent.com/CQk2YGH7nnXQaNWJnSZp0iKxM3F4QuxNQJsT0HUEcnVXwDFdR2_cUZABRZZzIvOokA",
            description: "Adobe Lightroom is a powerful photo editor and camera app. This mod unlocks premium features for free without subscription.",
            downloadLink: "https://drive.google.com/file/d/example4/view",
            screenshots: [
                "https://play-lh.googleusercontent.com/sQ_lxGsqnkPAQCuWTEI006F_mZJBnQj2Sh9ToVCGpQdLPrLZEZYa1_GQJXtC_dA0i8Vg",
                "https://play-lh.googleusercontent.com/pTQHIB9SIIL0QVBzFJgW11Zt40KuYzE_o_h7MoXAzLzSOzWRSEJnxO7eGd-S8Z5VHQ",
                "https://play-lh.googleusercontent.com/7GvlQ_EcXZZT5BcYk7OwzQxEzQQjIl1vz3p2H2WWaME9W5KB6bwJQVLbOGJE_BGHcw"
            ],
            modFeatures: [
                "All premium presets unlocked",
                "Advanced editing tools",
                "Cloud storage access",
                "Selective adjustments",
                "Healing brush feature"
            ],
            requirements: [
                "Android 7.0 or higher",
                "At least 3GB RAM",
                "1GB free storage"
            ],
            downloads: 12340,
            rating: 4.6,
            dateAdded: "2024-01-05"
        }
    ];

    // Save the default data to localStorage
    saveData();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('modmasterData', JSON.stringify(appData));
}

// Initialize mobile menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Initialize FAQ toggles
function initFaqToggles() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });
}

// Initialize page-specific functionality
function initPageSpecific() {
    const currentPath = window.location.pathname;
    
    // Home page
    if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
        loadFeaturedApps();
        loadCategories();
        loadLatestApps();
    }
}

// Load featured apps
function loadFeaturedApps() {
    const featuredContainer = document.getElementById('featured-apps-container');
    if (!featuredContainer) return;
    
    // Clear loading spinner
    featuredContainer.innerHTML = '';
    
    // Get featured apps
    const featuredApps = appData.apps.filter(app => app.featured);
    
    if (featuredApps.length === 0) {
        featuredContainer.innerHTML = '<p class="no-items">No featured apps available.</p>';
        return;
    }
    
    // Create app cards
    featuredApps.forEach((app, index) => {
        const category = appData.categories.find(cat => cat.id === app.category);
        const categoryName = category ? category.name : 'Uncategorized';
        
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.style.setProperty('--order', index);
        
        appCard.innerHTML = `
            <div class="app-image">
                <img src="${app.screenshots[0]}" alt="${app.name}">
                <span class="app-category">${categoryName}</span>
                <span class="featured-badge">Featured</span>
            </div>
            <div class="app-info">
                <h3>
                    <img src="${app.icon}" alt="${app.name}" class="app-icon">
                    ${app.name}
                </h3>
                <div class="app-meta">
                    <span>v${app.version}</span>
                    <span>${app.size} MB</span>
                </div>
                <div class="app-description">
                    ${app.description}
                </div>
                <div class="app-actions">
                    <div class="app-rating">
                        <div class="stars">
                            ${generateStars(app.rating)}
                        </div>
                        <span>${app.rating.toFixed(1)}</span>
                    </div>
                    <a href="apps/app-detail.html?id=${app.id}" class="download-btn">
                        <i class="fas fa-info-circle"></i> Details
                    </a>
                </div>
            </div>
        `;
        
        appCard.addEventListener('click', function() {
            window.location.href = `apps/app-detail.html?id=${app.id}`;
        });
        
        featuredContainer.appendChild(appCard);
    });
}

// Load categories
function loadCategories() {
    const categoriesContainer = document.getElementById('categories-container');
    if (!categoriesContainer) return;
    
    categoriesContainer.innerHTML = '';
    
    appData.categories.forEach(category => {
        const appsInCategory = appData.apps.filter(app => app.category === category.id).length;
        
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        
        categoryCard.innerHTML = `
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <h3 class="category-name">${category.name}</h3>
            <p class="category-count">${appsInCategory} Apps</p>
        `;
        
        categoryCard.addEventListener('click', function() {
            // Redirect to category page or filter (for future implementation)
            console.log(`Category clicked: ${category.name}`);
        });
        
        categoriesContainer.appendChild(categoryCard);
    });
}

// Load latest apps
function loadLatestApps() {
    const latestContainer = document.getElementById('latest-apps-container');
    if (!latestContainer) return;
    
    latestContainer.innerHTML = '';
    
    // Sort apps by date added (descending)
    const latestApps = [...appData.apps]
        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        .slice(0, 8); // Get only the first 8 latest apps
    
    latestApps.forEach((app, index) => {
        const category = appData.categories.find(cat => cat.id === app.category);
        const categoryName = category ? category.name : 'Uncategorized';
        
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.style.setProperty('--order', index);
        
        appCard.innerHTML = `
            <div class="app-image">
                <img src="${app.screenshots[0]}" alt="${app.name}">
                <span class="app-category">${categoryName}</span>
            </div>
            <div class="app-info">
                <h3>
                    <img src="${app.icon}" alt="${app.name}" class="app-icon">
                    ${app.name}
                </h3>
                <div class="app-meta">
                    <span>v${app.version}</span>
                    <span>${app.size} MB</span>
                </div>
                <div class="app-description">
                    ${app.description}
                </div>
                <div class="app-actions">
                    <div class="app-rating">
                        <div class="stars">
                            ${generateStars(app.rating)}
                        </div>
                        <span>${app.rating.toFixed(1)}</span>
                    </div>
                    <a href="apps/app-detail.html?id=${app.id}" class="download-btn">
                        <i class="fas fa-info-circle"></i> Details
                    </a>
                </div>
            </div>
        `;
        
        appCard.addEventListener('click', function() {
            window.location.href = `apps/app-detail.html?id=${app.id}`;
        });
        
        latestContainer.appendChild(appCard);
    });
}

// Update footer categories
function updateFooterCategories() {
    const footerCategoriesList = document.getElementById('footer-categories-list');
    if (!footerCategoriesList) return;
    
    footerCategoriesList.innerHTML = '';
    
    // Show only first 5 categories in footer
    const categoriesToShow = appData.categories.slice(0, 5);
    
    categoriesToShow.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#">${category.name}</a>`;
        footerCategoriesList.appendChild(li);
    });
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Search functionality
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm.length < 2) return;
    
    // Implement search functionality (for future implementation)
    console.log(`Searching for: ${searchTerm}`);
    
    // Redirect to search results page (for future implementation)
    // window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
}

// Newsletter subscription
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // In a real implementation, you would send this to a server
        console.log(`Newsletter subscription: ${email}`);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}