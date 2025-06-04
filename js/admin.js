// Admin Panel JavaScript

// Global variables
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
    },
    admin: {
        username: "admin",
        password: "admin123" // In a real app, this would be hashed
    }
};

// Default credentials for demo (would be stored securely in a real app)
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin123";

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load data from localStorage or use default
    loadData();
    
    // Check if user is logged in
    checkLoginStatus();
    
    // Initialize login form
    initLoginForm();
    
    // Initialize sidebar navigation
    initSidebarNav();
    
    // Initialize mobile sidebar toggle
    initMobileSidebar();
    
    // Initialize logout button
    initLogoutButton();
    
    // Initialize dashboard stats
    updateDashboardStats();
    
    // Initialize apps management
    initAppsManagement();
    
    // Initialize categories management
    initCategoriesManagement();
    
    // Initialize settings form
    initSettingsForm();
    
    // Initialize export/import functionality
    initExportImport();
});

// Load data from localStorage or use default
function loadData() {
    const savedData = localStorage.getItem('modmasterData');
    
    if (savedData) {
        try {
            appData = JSON.parse(savedData);
            
            // Ensure admin object exists
            if (!appData.admin) {
                appData.admin = {
                    username: DEFAULT_USERNAME,
                    password: DEFAULT_PASSWORD
                };
            }
            
            // Ensure settings object exists
            if (!appData.settings) {
                appData.settings = {
                    siteTitle: "ModMaster - Premium Modded APKs",
                    siteDescription: "Download the latest modded APK files for Android games and apps. Premium features unlocked for free.",
                    contactEmail: "ishant150407@gmail.com",
                    socialLinks: {
                        facebook: "",
                        twitter: "",
                        instagram: "",
                        telegram: ""
                    }
                };
            }
            
        } catch (e) {
            console.error('Error parsing saved data:', e);
            resetToDefaultData();
        }
    } else {
        resetToDefaultData();
    }
}

// Reset to default data
function resetToDefaultData() {
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

    // Default admin credentials
    appData.admin = {
        username: DEFAULT_USERNAME,
        password: DEFAULT_PASSWORD
    };
    
    // Default settings
    appData.settings = {
        siteTitle: "ModMaster - Premium Modded APKs",
        siteDescription: "Download the latest modded APK files for Android games and apps. Premium features unlocked for free.",
        contactEmail: "ishant150407@gmail.com",
        socialLinks: {
            facebook: "",
            twitter: "",
            instagram: "",
            telegram: ""
        }
    };

    // Save the default data to localStorage
    saveData();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('modmasterData', JSON.stringify(appData));
}

// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    
    if (isLoggedIn === 'true') {
        // Show admin dashboard
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'grid';
        
        // Set session timeout (30 minutes)
        startSessionTimeout();
    } else {
        // Show login form
        document.getElementById('admin-login').style.display = 'flex';
        document.getElementById('admin-dashboard').style.display = 'none';
    }
}

// Initialize login form
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Check credentials
            if (username === appData.admin.username && password === appData.admin.password) {
                // Login successful
                localStorage.setItem('adminLoggedIn', 'true');
                
                // Show admin dashboard
                document.getElementById('admin-login').style.display = 'none';
                document.getElementById('admin-dashboard').style.display = 'grid';
                
                // Set session timeout (30 minutes)
                startSessionTimeout();
            } else {
                // Login failed
                document.getElementById('login-error').textContent = 'Invalid username or password';
            }
        });
    }
}

// Initialize sidebar navigation
function initSidebarNav() {
    const navItems = document.querySelectorAll('.sidebar-nav li');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding content section
            const tabId = this.getAttribute('data-tab');
            
            contentSections.forEach(section => {
                section.classList.remove('active');
                
                if (section.id === `${tabId}-tab`) {
                    section.classList.add('active');
                }
            });
            
            // Close sidebar on mobile
            if (window.innerWidth < 1024) {
                document.querySelector('.sidebar').classList.remove('active');
            }
        });
    });
}

// Initialize mobile sidebar toggle
function initMobileSidebar() {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', function() {
            sidebar.classList.add('active');
        });
    }
    
    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
}

// Initialize logout button
function initLogoutButton() {
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Clear login status
            localStorage.removeItem('adminLoggedIn');
            
            // Show login form
            document.getElementById('admin-login').style.display = 'flex';
            document.getElementById('admin-dashboard').style.display = 'none';
        });
    }
}

// Start session timeout
function startSessionTimeout() {
    // Clear any existing timeout
    if (window.sessionTimeoutId) {
        clearTimeout(window.sessionTimeoutId);
    }
    
    // Set new timeout (30 minutes)
    window.sessionTimeoutId = setTimeout(function() {
        // Log out after 30 minutes of inactivity
        localStorage.removeItem('adminLoggedIn');
        
        // Show login form
        document.getElementById('admin-login').style.display = 'flex';
        document.getElementById('admin-dashboard').style.display = 'none';
        
        // Show message
        alert('Your session has expired. Please log in again.');
    }, 30 * 60 * 1000); // 30 minutes
}

// Reset session timeout on user activity
document.addEventListener('click', startSessionTimeout);
document.addEventListener('keypress', startSessionTimeout);

// Update dashboard stats
function updateDashboardStats() {
    // Total apps
    document.getElementById('total-apps').textContent = appData.apps.length;
    
    // Total categories
    document.getElementById('total-categories').textContent = appData.categories.length;
    
    // Total downloads
    const totalDownloads = appData.apps.reduce((total, app) => total + app.downloads, 0);
    document.getElementById('total-downloads').textContent = formatNumber(totalDownloads);
    
    // Recent apps
    const recentAppsBody = document.getElementById('recent-apps-body');
    if (recentAppsBody) {
        recentAppsBody.innerHTML = '';
        
        // Sort apps by date added (descending)
        const recentApps = [...appData.apps]
            .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
            .slice(0, 5); // Get only the first 5 recent apps
        
        recentApps.forEach(app => {
            const category = appData.categories.find(cat => cat.id === app.category);
            const categoryName = category ? category.name : 'Uncategorized';
            
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${app.name}</td>
                <td>${categoryName}</td>
                <td>${formatDate(app.dateAdded)}</td>
                <td>
                    <button class="btn-icon view-app" data-id="${app.id}"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon edit-app" data-id="${app.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon delete-app" data-id="${app.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            // Add event listeners
            tr.querySelector('.view-app').addEventListener('click', function() {
                window.open(`../apps/app-detail.html?id=${app.id}`, '_blank');
            });
            
            tr.querySelector('.edit-app').addEventListener('click', function() {
                openEditAppModal(app.id);
            });
            
            tr.querySelector('.delete-app').addEventListener('click', function() {
                openDeleteAppConfirm(app.id);
            });
            
            recentAppsBody.appendChild(tr);
        });
    }
}

// Initialize apps management
function initAppsManagement() {
    // Add App button
    const addAppBtn = document.getElementById('add-app-btn');
    if (addAppBtn) {
        addAppBtn.addEventListener('click', function() {
            openAddAppModal();
        });
    }
    
    // Load apps table
    loadAppsTable();
    
    // Initialize app search
    const appSearchBtn = document.getElementById('app-search-btn');
    const appSearchInput = document.getElementById('app-search');
    
    if (appSearchBtn && appSearchInput) {
        appSearchBtn.addEventListener('click', function() {
            loadAppsTable(appSearchInput.value);
        });
        
        appSearchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                loadAppsTable(appSearchInput.value);
            }
        });
    }
    
    // Initialize category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        // Clear existing options
        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        
        // Add category options
        appData.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categoryFilter.appendChild(option);
        });
        
        categoryFilter.addEventListener('change', function() {
            loadAppsTable(appSearchInput.value, this.value);
        });
    }
    
    // Initialize app form modal
    initAppFormModal();
}

// Load apps table
function loadAppsTable(searchTerm = '', categoryFilter = '') {
    const appsTableBody = document.getElementById('apps-table-body');
    if (!appsTableBody) return;
    
    appsTableBody.innerHTML = '';
    
    // Filter apps
    let filteredApps = [...appData.apps];
    
    if (searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        filteredApps = filteredApps.filter(app => 
            app.name.toLowerCase().includes(searchTerm) || 
            app.description.toLowerCase().includes(searchTerm)
        );
    }
    
    if (categoryFilter) {
        filteredApps = filteredApps.filter(app => app.category === categoryFilter);
    }
    
    // Sort apps by date added (descending)
    filteredApps.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    
    // Display apps
    filteredApps.forEach(app => {
        const category = appData.categories.find(cat => cat.id === app.category);
        const categoryName = category ? category.name : 'Uncategorized';
        
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>
                <div class="app-name-with-icon">
                    <img src="${app.icon}" alt="${app.name}" class="table-app-icon">
                    ${app.name}
                </div>
            </td>
            <td>${app.version}</td>
            <td>${categoryName}</td>
            <td>${formatDate(app.dateAdded)}</td>
            <td>${app.featured ? '<span class="featured-badge">Yes</span>' : 'No'}</td>
            <td>
                <button class="btn-icon view-app" data-id="${app.id}"><i class="fas fa-eye"></i></button>
                <button class="btn-icon edit-app" data-id="${app.id}"><i class="fas fa-edit"></i></button>
                <button class="btn-icon delete-app" data-id="${app.id}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        // Add event listeners
        tr.querySelector('.view-app').addEventListener('click', function() {
            window.open(`../apps/app-detail.html?id=${app.id}`, '_blank');
        });
        
        tr.querySelector('.edit-app').addEventListener('click', function() {
            openEditAppModal(app.id);
        });
        
        tr.querySelector('.delete-app').addEventListener('click', function() {
            openDeleteAppConfirm(app.id);
        });
        
        appsTableBody.appendChild(tr);
    });
    
    // Show message if no apps
    if (filteredApps.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="6" class="text-center">No apps found</td>`;
        appsTableBody.appendChild(tr);
    }
}

// Initialize app form modal
function initAppFormModal() {
    // Get modal elements
    const appModal = document.getElementById('app-modal');
    const closeModal = appModal.querySelector('.close-modal');
    const cancelApp = document.getElementById('cancel-app');
    const appForm = document.getElementById('app-form');
    
    // Close modal buttons
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            appModal.style.display = 'none';
        });
    }
    
    if (cancelApp) {
        cancelApp.addEventListener('click', function() {
            appModal.style.display = 'none';
        });
    }
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target === appModal) {
            appModal.style.display = 'none';
        }
    });
    
    // Category select
    const categorySelect = document.getElementById('app-category');
    if (categorySelect) {
        // Load categories
        updateCategorySelect();
    }
    
    // Screenshot and feature buttons
    const addScreenshotBtn = document.getElementById('add-screenshot');
    const addFeatureBtn = document.getElementById('add-feature');
    
    if (addScreenshotBtn) {
        addScreenshotBtn.addEventListener('click', function() {
            addScreenshotInput();
        });
    }
    
    if (addFeatureBtn) {
        addFeatureBtn.addEventListener('click', function() {
            addFeatureInput();
        });
    }
    
    // Submit form
    if (appForm) {
        appForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveAppForm();
        });
    }
}

// Update category select in app form
function updateCategorySelect() {
    const categorySelect = document.getElementById('app-category');
    if (!categorySelect) return;
    
    // Clear existing options
    categorySelect.innerHTML = '';
    
    // Add category options
    appData.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

// Add screenshot input to form
function addScreenshotInput() {
    const screenshotsContainer = document.getElementById('screenshots-container');
    if (!screenshotsContainer) return;
    
    const screenshotInputs = screenshotsContainer.querySelectorAll('.screenshot-input');
    
    // Enable remove button for existing screenshots
    screenshotInputs.forEach(input => {
        input.querySelector('.remove-screenshot').disabled = false;
    });
    
    // Create new screenshot input
    const screenshotInput = document.createElement('div');
    screenshotInput.className = 'screenshot-input';
    
    screenshotInput.innerHTML = `
        <input type="url" class="screenshot-url" required>
        <button type="button" class="remove-screenshot"><i class="fas fa-trash"></i></button>
    `;
    
    // Add event listener to remove button
    screenshotInput.querySelector('.remove-screenshot').addEventListener('click', function() {
        screenshotInput.remove();
    });
    
    screenshotsContainer.appendChild(screenshotInput);
}

// Add feature input to form
function addFeatureInput() {
    const featuresContainer = document.getElementById('features-container');
    if (!featuresContainer) return;
    
    const featureInputs = featuresContainer.querySelectorAll('.feature-input');
    
    // Enable remove button for existing features
    featureInputs.forEach(input => {
        input.querySelector('.remove-feature').disabled = false;
    });
    
    // Create new feature input
    const featureInput = document.createElement('div');
    featureInput.className = 'feature-input';
    
    featureInput.innerHTML = `
        <input type="text" class="mod-feature" required>
        <button type="button" class="remove-feature"><i class="fas fa-trash"></i></button>
    `;
    
    // Add event listener to remove button
    featureInput.querySelector('.remove-feature').addEventListener('click', function() {
        featureInput.remove();
    });
    
    featuresContainer.appendChild(featureInput);
}

// Open add app modal
function openAddAppModal() {
    const appModal = document.getElementById('app-modal');
    const modalTitle = document.getElementById('modal-title');
    const appForm = document.getElementById('app-form');
    
    // Set modal title
    modalTitle.textContent = 'Add New App';
    
    // Reset form
    appForm.reset();
    
    // Clear hidden ID field
    document.getElementById('app-id').value = '';
    
    // Reset screenshots
    const screenshotsContainer = document.getElementById('screenshots-container');
    screenshotsContainer.innerHTML = '';
    
    // Add default screenshot input
    addScreenshotInput();
    
    // Reset features
    const featuresContainer = document.getElementById('features-container');
    featuresContainer.innerHTML = '';
    
    // Add default feature input
    addFeatureInput();
    
    // Show modal
    appModal.style.display = 'block';
}

// Open edit app modal
function openEditAppModal(appId) {
    const app = appData.apps.find(app => app.id === appId);
    if (!app) return;
    
    const appModal = document.getElementById('app-modal');
    const modalTitle = document.getElementById('modal-title');
    
    // Set modal title
    modalTitle.textContent = `Edit App: ${app.name}`;
    
    // Fill form with app data
    document.getElementById('app-id').value = app.id;
    document.getElementById('app-name').value = app.name;
    document.getElementById('app-package').value = app.packageName;
    document.getElementById('app-version').value = app.version;
    document.getElementById('app-size').value = app.size;
    document.getElementById('app-category').value = app.category;
    document.getElementById('app-featured').value = app.featured.toString();
    document.getElementById('app-icon').value = app.icon;
    document.getElementById('app-description').value = app.description;
    document.getElementById('app-download-link').value = app.downloadLink;
    
    // Fill screenshots
    const screenshotsContainer = document.getElementById('screenshots-container');
    screenshotsContainer.innerHTML = '';
    
    app.screenshots.forEach(screenshot => {
        const screenshotInput = document.createElement('div');
        screenshotInput.className = 'screenshot-input';
        
        screenshotInput.innerHTML = `
            <input type="url" class="screenshot-url" value="${screenshot}" required>
            <button type="button" class="remove-screenshot"><i class="fas fa-trash"></i></button>
        `;
        
        // Add event listener to remove button
        screenshotInput.querySelector('.remove-screenshot').addEventListener('click', function() {
            screenshotInput.remove();
        });
        
        screenshotsContainer.appendChild(screenshotInput);
    });
    
    // Enable/disable remove buttons for screenshots
    const screenshotInputs = screenshotsContainer.querySelectorAll('.screenshot-input');
    screenshotInputs.forEach(input => {
        input.querySelector('.remove-screenshot').disabled = screenshotInputs.length <= 1;
    });
    
    // Fill features
    const featuresContainer = document.getElementById('features-container');
    featuresContainer.innerHTML = '';
    
    app.modFeatures.forEach(feature => {
        const featureInput = document.createElement('div');
        featureInput.className = 'feature-input';
        
        featureInput.innerHTML = `
            <input type="text" class="mod-feature" value="${feature}" required>
            <button type="button" class="remove-feature"><i class="fas fa-trash"></i></button>
        `;
        
        // Add event listener to remove button
        featureInput.querySelector('.remove-feature').addEventListener('click', function() {
            featureInput.remove();
        });
        
        featuresContainer.appendChild(featureInput);
    });
    
    // Enable/disable remove buttons for features
    const featureInputs = featuresContainer.querySelectorAll('.feature-input');
    featureInputs.forEach(input => {
        input.querySelector('.remove-feature').disabled = featureInputs.length <= 1;
    });
    
    // Show modal
    appModal.style.display = 'block';
}

// Save app form
function saveAppForm() {
    // Get form data
    const appId = document.getElementById('app-id').value;
    const name = document.getElementById('app-name').value;
    const packageName = document.getElementById('app-package').value;
    const version = document.getElementById('app-version').value;
    const size = document.getElementById('app-size').value;
    const category = document.getElementById('app-category').value;
    const featured = document.getElementById('app-featured').value === 'true';
    const icon = document.getElementById('app-icon').value;
    const description = document.getElementById('app-description').value;
    const downloadLink = document.getElementById('app-download-link').value;
    
    // Get screenshots
    const screenshotInputs = document.querySelectorAll('.screenshot-url');
    const screenshots = Array.from(screenshotInputs).map(input => input.value);
    
    // Get features
    const featureInputs = document.querySelectorAll('.mod-feature');
    const modFeatures = Array.from(featureInputs).map(input => input.value);
    
    // Create app object
    const app = {
        id: appId || generateId(name),
        name,
        packageName,
        version,
        size,
        category,
        featured,
        icon,
        description,
        downloadLink,
        screenshots,
        modFeatures,
        requirements: [
            "Android 5.0 or higher",
            "At least 1GB RAM",
            "500MB free storage"
        ],
        downloads: appId ? (appData.apps.find(app => app.id === appId)?.downloads || 0) : 0,
        rating: appId ? (appData.apps.find(app => app.id === appId)?.rating || 4.5) : 4.5,
        dateAdded: appId ? (appData.apps.find(app => app.id === appId)?.dateAdded || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0]
    };
    
    // Add or update app
    if (appId) {
        // Update existing app
        const index = appData.apps.findIndex(app => app.id === appId);
        if (index !== -1) {
            appData.apps[index] = app;
        }
    } else {
        // Add new app
        appData.apps.push(app);
    }
    
    // Save data
    saveData();
    
    // Close modal
    document.getElementById('app-modal').style.display = 'none';
    
    // Reload apps table
    loadAppsTable();
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Show success message
    alert(appId ? 'App updated successfully' : 'App added successfully');
}

// Open delete app confirmation
function openDeleteAppConfirm(appId) {
    const app = appData.apps.find(app => app.id === appId);
    if (!app) return;
    
    const confirmModal = document.getElementById('confirm-modal');
    const confirmTitle = document.getElementById('confirm-title');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmAction = document.getElementById('confirm-action');
    const cancelConfirm = document.getElementById('cancel-confirm');
    
    // Set modal content
    confirmTitle.textContent = 'Delete App';
    confirmMessage.textContent = `Are you sure you want to delete "${app.name}"? This action cannot be undone.`;
    
    // Set confirm button action
    confirmAction.onclick = function() {
        // Delete app
        const index = appData.apps.findIndex(app => app.id === appId);
        if (index !== -1) {
            appData.apps.splice(index, 1);
        }
        
        // Save data
        saveData();
        
        // Close modal
        confirmModal.style.display = 'none';
        
        // Reload apps table
        loadAppsTable();
        
        // Update dashboard stats
        updateDashboardStats();
        
        // Show success message
        alert('App deleted successfully');
    };
    
    // Set cancel button action
    cancelConfirm.onclick = function() {
        confirmModal.style.display = 'none';
    };
    
    // Close modal on X button
    confirmModal.querySelector('.close-modal').onclick = function() {
        confirmModal.style.display = 'none';
    };
    
    // Close modal on outside click
    window.onclick = function(event) {
        if (event.target === confirmModal) {
            confirmModal.style.display = 'none';
        }
    };
    
    // Show modal
    confirmModal.style.display = 'block';
}

// Initialize categories management
function initCategoriesManagement() {
    // Add Category button
    const addCategoryBtn = document.getElementById('add-category-btn');
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', function() {
            openAddCategoryModal();
        });
    }
    
    // Load categories table
    loadCategoriesTable();
    
    // Initialize category form modal
    initCategoryFormModal();
}

// Load categories table
function loadCategoriesTable() {
    const categoriesTableBody = document.getElementById('categories-table-body');
    if (!categoriesTableBody) return;
    
    categoriesTableBody.innerHTML = '';
    
    appData.categories.forEach(category => {
        const appsInCategory = appData.apps.filter(app => app.category === category.id).length;
        
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${category.name}</td>
            <td><i class="${category.icon}"></i> ${category.icon}</td>
            <td>${appsInCategory}</td>
            <td>
                <button class="btn-icon edit-category" data-id="${category.id}"><i class="fas fa-edit"></i></button>
                <button class="btn-icon delete-category" data-id="${category.id}" ${appsInCategory > 0 ? 'disabled title="Cannot delete category with apps"' : ''}><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        // Add event listeners
        tr.querySelector('.edit-category').addEventListener('click', function() {
            openEditCategoryModal(category.id);
        });
        
        const deleteBtn = tr.querySelector('.delete-category');
        if (!deleteBtn.disabled) {
            deleteBtn.addEventListener('click', function() {
                openDeleteCategoryConfirm(category.id);
            });
        }
        
        categoriesTableBody.appendChild(tr);
    });
}

// Initialize category form modal
function initCategoryFormModal() {
    // Get modal elements
    const categoryModal = document.getElementById('category-modal');
    const closeModal = categoryModal.querySelector('.close-modal');
    const cancelCategory = document.getElementById('cancel-category');
    const categoryForm = document.getElementById('category-form');
    
    // Close modal buttons
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            categoryModal.style.display = 'none';
        });
    }
    
    if (cancelCategory) {
        cancelCategory.addEventListener('click', function() {
            categoryModal.style.display = 'none';
        });
    }
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target === categoryModal) {
            categoryModal.style.display = 'none';
        }
    });
    
    // Icon preview
    const categoryIcon = document.getElementById('category-icon');
    if (categoryIcon) {
        categoryIcon.addEventListener('input', function() {
            const iconPreview = document.getElementById('icon-preview');
            iconPreview.className = this.value;
        });
    }
    
    // Submit form
    if (categoryForm) {
        categoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveCategoryForm();
        });
    }
}

// Open add category modal
function openAddCategoryModal() {
    const categoryModal = document.getElementById('category-modal');
    const modalTitle = document.getElementById('category-modal-title');
    const categoryForm = document.getElementById('category-form');
    
    // Set modal title
    modalTitle.textContent = 'Add New Category';
    
    // Reset form
    categoryForm.reset();
    
    // Clear hidden ID field
    document.getElementById('category-id').value = '';
    
    // Set default icon
    document.getElementById('category-icon').value = 'fas fa-folder';
    document.getElementById('icon-preview').className = 'fas fa-folder';
    
    // Show modal
    categoryModal.style.display = 'block';
}

// Open edit category modal
function openEditCategoryModal(categoryId) {
    const category = appData.categories.find(cat => cat.id === categoryId);
    if (!category) return;
    
    const categoryModal = document.getElementById('category-modal');
    const modalTitle = document.getElementById('category-modal-title');
    
    // Set modal title
    modalTitle.textContent = `Edit Category: ${category.name}`;
    
    // Fill form with category data
    document.getElementById('category-id').value = category.id;
    document.getElementById('category-name').value = category.name;
    document.getElementById('category-icon').value = category.icon;
    document.getElementById('icon-preview').className = category.icon;
    document.getElementById('category-description').value = category.description || '';
    
    // Show modal
    categoryModal.style.display = 'block';
}

// Save category form
function saveCategoryForm() {
    // Get form data
    const categoryId = document.getElementById('category-id').value;
    const name = document.getElementById('category-name').value;
    const icon = document.getElementById('category-icon').value;
    const description = document.getElementById('category-description').value;
    
    // Create category object
    const category = {
        id: categoryId || generateId(name),
        name,
        icon,
        description
    };
    
    // Add or update category
    if (categoryId) {
        // Update existing category
        const index = appData.categories.findIndex(cat => cat.id === categoryId);
        if (index !== -1) {
            appData.categories[index] = category;
        }
    } else {
        // Add new category
        appData.categories.push(category);
    }
    
    // Save data
    saveData();
    
    // Close modal
    document.getElementById('category-modal').style.display = 'none';
    
    // Reload categories table
    loadCategoriesTable();
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Update category selects
    updateCategorySelect();
    
    // Show success message
    alert(categoryId ? 'Category updated successfully' : 'Category added successfully');
}

// Open delete category confirmation
function openDeleteCategoryConfirm(categoryId) {
    const category = appData.categories.find(cat => cat.id === categoryId);
    if (!category) return;
    
    // Check if category has apps
    const appsInCategory = appData.apps.filter(app => app.category === categoryId).length;
    if (appsInCategory > 0) {
        alert('Cannot delete category that has apps. Reassign apps to another category first.');
        return;
    }
    
    const confirmModal = document.getElementById('confirm-modal');
    const confirmTitle = document.getElementById('confirm-title');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmAction = document.getElementById('confirm-action');
    const cancelConfirm = document.getElementById('cancel-confirm');
    
    // Set modal content
    confirmTitle.textContent = 'Delete Category';
    confirmMessage.textContent = `Are you sure you want to delete "${category.name}"? This action cannot be undone.`;
    
    // Set confirm button action
    confirmAction.onclick = function() {
        // Delete category
        const index = appData.categories.findIndex(cat => cat.id === categoryId);
        if (index !== -1) {
            appData.categories.splice(index, 1);
        }
        
        // Save data
        saveData();
        
        // Close modal
        confirmModal.style.display = 'none';
        
        // Reload categories table
        loadCategoriesTable();
        
        // Update dashboard stats
        updateDashboardStats();
        
        // Update category selects
        updateCategorySelect();
        
        // Show success message
        alert('Category deleted successfully');
    };
    
    // Set cancel button action
    cancelConfirm.onclick = function() {
        confirmModal.style.display = 'none';
    };
    
    // Close modal on X button
    confirmModal.querySelector('.close-modal').onclick = function() {
        confirmModal.style.display = 'none';
    };
    
    // Close modal on outside click
    window.onclick = function(event) {
        if (event.target === confirmModal) {
            confirmModal.style.display = 'none';
        }
    };
    
    // Show modal
    confirmModal.style.display = 'block';
}

// Initialize settings form
function initSettingsForm() {
    const settingsForm = document.getElementById('settings-form');
    
    if (settingsForm) {
        // Fill form with settings data
        document.getElementById('site-title').value = appData.settings.siteTitle;
        document.getElementById('site-description').value = appData.settings.siteDescription;
        document.getElementById('contact-email').value = appData.settings.contactEmail;
        document.getElementById('facebook-link').value = appData.settings.socialLinks.facebook || '';
        document.getElementById('twitter-link').value = appData.settings.socialLinks.twitter || '';
        document.getElementById('instagram-link').value = appData.settings.socialLinks.instagram || '';
        document.getElementById('telegram-link').value = appData.settings.socialLinks.telegram || '';
        document.getElementById('admin-username').value = appData.admin.username;
        
        // Submit form
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const siteTitle = document.getElementById('site-title').value;
            const siteDescription = document.getElementById('site-description').value;
            const contactEmail = document.getElementById('contact-email').value;
            const facebookLink = document.getElementById('facebook-link').value;
            const twitterLink = document.getElementById('twitter-link').value;
            const instagramLink = document.getElementById('instagram-link').value;
            const telegramLink = document.getElementById('telegram-link').value;
            const adminUsername = document.getElementById('admin-username').value;
            const adminPassword = document.getElementById('admin-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validate passwords
            if (adminPassword && adminPassword !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Update settings
            appData.settings.siteTitle = siteTitle;
            appData.settings.siteDescription = siteDescription;
            appData.settings.contactEmail = contactEmail;
            appData.settings.socialLinks.facebook = facebookLink;
            appData.settings.socialLinks.twitter = twitterLink;
            appData.settings.socialLinks.instagram = instagramLink;
            appData.settings.socialLinks.telegram = telegramLink;
            
            // Update admin credentials
            appData.admin.username = adminUsername;
            if (adminPassword) {
                appData.admin.password = adminPassword;
            }
            
            // Save data
            saveData();
            
            // Show success message
            alert('Settings saved successfully');
        });
    }
}

// Initialize export/import functionality
function initExportImport() {
    // Export data button
    const exportDataBtn = document.getElementById('export-data');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', function() {
            exportData();
        });
    }
    
    // Import data button
    const importDataBtn = document.getElementById('import-data');
    if (importDataBtn) {
        importDataBtn.addEventListener('click', function() {
            importData();
        });
    }
    
    // Reset data button
    const resetDataBtn = document.getElementById('reset-data');
    if (resetDataBtn) {
        resetDataBtn.addEventListener('click', function() {
            openResetDataConfirm();
        });
    }
}

// Export data
function exportData() {
    // Create data to export
    const dataToExport = JSON.stringify(appData, null, 2);
    
    // Create download link
    const blob = new Blob([dataToExport], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `modmaster-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
}

// Import data
function importData() {
    const importFile = document.getElementById('import-file');
    
    if (!importFile.files.length) {
        alert('Please select a file to import');
        return;
    }
    
    const file = importFile.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Validate imported data
            if (!importedData.apps || !importedData.categories) {
                throw new Error('Invalid data format');
            }
            
            // Confirm import
            if (confirm('Are you sure you want to import this data? This will overwrite all existing data.')) {
                // Update data
                appData = importedData;
                
                // Ensure admin object exists
                if (!appData.admin) {
                    appData.admin = {
                        username: DEFAULT_USERNAME,
                        password: DEFAULT_PASSWORD
                    };
                }
                
                // Ensure settings object exists
                if (!appData.settings) {
                    appData.settings = {
                        siteTitle: "ModMaster - Premium Modded APKs",
                        siteDescription: "Download the latest modded APK files for Android games and apps. Premium features unlocked for free.",
                        contactEmail: "ishant150407@gmail.com",
                        socialLinks: {
                            facebook: "",
                            twitter: "",
                            instagram: "",
                            telegram: ""
                        }
                    };
                }
                
                // Save data
                saveData();
                
                // Reload data
                updateDashboardStats();
                loadAppsTable();
                loadCategoriesTable();
                updateCategorySelect();
                
                // Show success message
                alert('Data imported successfully');
            }
        } catch (error) {
            alert('Error importing data: ' + error.message);
        }
    };
    
    reader.readAsText(file);
}

// Open reset data confirmation
function openResetDataConfirm() {
    const confirmModal = document.getElementById('confirm-modal');
    const confirmTitle = document.getElementById('confirm-title');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmAction = document.getElementById('confirm-action');
    const cancelConfirm = document.getElementById('cancel-confirm');
    
    // Set modal content
    confirmTitle.textContent = 'Reset Data';
    confirmMessage.textContent = 'Are you sure you want to reset all data to default? This action cannot be undone.';
    
    // Set confirm button action
    confirmAction.onclick = function() {
        // Reset data
        resetToDefaultData();
        
        // Close modal
        confirmModal.style.display = 'none';
        
        // Reload data
        updateDashboardStats();
        loadAppsTable();
        loadCategoriesTable();
        updateCategorySelect();
        
        // Show success message
        alert('Data reset successfully');
    };
    
    // Set cancel button action
    cancelConfirm.onclick = function() {
        confirmModal.style.display = 'none';
    };
    
    // Close modal on X button
    confirmModal.querySelector('.close-modal').onclick = function() {
        confirmModal.style.display = 'none';
    };
    
    // Close modal on outside click
    window.onclick = function(event) {
        if (event.target === confirmModal) {
            confirmModal.style.display = 'none';
        }
    };
    
    // Show modal
    confirmModal.style.display = 'block';
}

// Helper functions

// Generate ID from name
function generateId(name) {
    return name.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '_');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}