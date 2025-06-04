// App Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get app ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const appId = urlParams.get('id');
    
    if (!appId) {
        showError('App not found');
        return;
    }
    
    // Load app data
    loadAppData(appId);
    
    // Initialize mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});

// Load app data from localStorage
function loadAppData(appId) {
    const savedData = localStorage.getItem('modmasterData');
    
    if (!savedData) {
        showError('Data not found');
        return;
    }
    
    try {
        const appData = JSON.parse(savedData);
        const app = appData.apps.find(app => app.id === appId);
        
        if (!app) {
            showError('App not found');
            return;
        }
        
        // Update page title
        document.title = `${app.name} - ModMaster`;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', `Download ${app.name} mod APK with premium features unlocked. ${app.description}`);
        }
        
        // Fill in app details
        displayAppDetails(app, appData);
        
        // Load similar apps
        loadSimilarApps(app, appData);
        
        // Hide loader and show content
        document.getElementById('app-detail-loader').style.display = 'none';
        document.getElementById('app-detail-content').style.display = 'block';
        
        // Track "view" for this app
        trackAppView(appId);
        
    } catch (e) {
        console.error('Error parsing saved data:', e);
        showError('Error loading app data');
    }
}

// Display app details
function displayAppDetails(app, appData) {
    // Get category name
    const category = appData.categories.find(cat => cat.id === app.category);
    const categoryName = category ? category.name : 'Uncategorized';
    
    // Set app icon
    document.getElementById('app-icon').src = app.icon;
    document.getElementById('app-icon').alt = app.name;
    
    // Set app info
    document.getElementById('app-name').textContent = app.name;
    document.getElementById('app-version').textContent = `v${app.version}`;
    document.getElementById('app-size').textContent = `${app.size} MB`;
    document.getElementById('app-category').textContent = categoryName;
    
    // Set app rating
    document.getElementById('app-rating').innerHTML = generateStars(app.rating);
    document.getElementById('app-downloads').textContent = `${formatNumber(app.downloads)} Downloads`;
    
    // Set download button
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.href = app.downloadLink;
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Track download for this app
        trackAppDownload(app.id);
        
        // Redirect to download link
        window.open(app.downloadLink, '_blank');
    });
    
    // Set report button
    const reportBtn = document.getElementById('report-btn');
    reportBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show report modal or redirect to contact page
        window.location.href = `../contact.html?subject=Report&app=${app.name}`;
    });
    
    // Set screenshots
    const screenshotsContainer = document.getElementById('screenshots-container');
    screenshotsContainer.innerHTML = '';
    
    app.screenshots.forEach(screenshot => {
        const screenshotElement = document.createElement('div');
        screenshotElement.className = 'screenshot';
        
        screenshotElement.innerHTML = `<img src="${screenshot}" alt="${app.name} screenshot">`;
        
        screenshotsContainer.appendChild(screenshotElement);
    });
    
    // Set description
    document.getElementById('app-description').innerHTML = `<p>${app.description}</p>`;
    
    // Set mod features
    const modFeaturesElement = document.getElementById('mod-features');
    modFeaturesElement.innerHTML = '';
    
    app.modFeatures.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modFeaturesElement.appendChild(li);
    });
    
    // Set requirements
    const requirementsElement = document.getElementById('app-requirements');
    requirementsElement.innerHTML = '';
    
    app.requirements.forEach(requirement => {
        const li = document.createElement('li');
        li.textContent = requirement;
        requirementsElement.appendChild(li);
    });
}

// Load similar apps
function loadSimilarApps(currentApp, appData) {
    const similarAppsContainer = document.getElementById('similar-apps-container');
    similarAppsContainer.innerHTML = '';
    
    // Get apps in the same category
    let similarApps = appData.apps.filter(app => 
        app.category === currentApp.category && app.id !== currentApp.id
    );
    
    // If not enough apps in the same category, add some random apps
    if (similarApps.length < 4) {
        const otherApps = appData.apps.filter(app => 
            app.category !== currentApp.category && app.id !== currentApp.id
        );
        
        // Shuffle other apps and take enough to fill up to 4 spots
        const shuffled = otherApps.sort(() => 0.5 - Math.random());
        similarApps = [...similarApps, ...shuffled.slice(0, 4 - similarApps.length)];
    }
    
    // Take only 4 similar apps
    similarApps = similarApps.slice(0, 4);
    
    // Display similar apps
    similarApps.forEach((app, index) => {
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
                    <a href="app-detail.html?id=${app.id}" class="download-btn">
                        <i class="fas fa-info-circle"></i> Details
                    </a>
                </div>
            </div>
        `;
        
        appCard.addEventListener('click', function() {
            window.location.href = `app-detail.html?id=${app.id}`;
        });
        
        similarAppsContainer.appendChild(appCard);
    });
}

// Show error message
function showError(message) {
    document.getElementById('app-detail-loader').style.display = 'none';
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <h2>Error</h2>
        <p>${message}</p>
        <a href="../index.html" class="btn btn-primary">Back to Home</a>
    `;
    
    const appDetailContent = document.querySelector('.app-detail .container');
    appDetailContent.appendChild(errorMessage);
}

// Generate star rating HTML
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

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Track app view
function trackAppView(appId) {
    // In a real app, this would send analytics data to a server
    console.log(`App viewed: ${appId}`);
}

// Track app download
function trackAppDownload(appId) {
    // In a real app, this would increment the download count in the database
    console.log(`App downloaded: ${appId}`);
    
    // For this demo, we'll update the download count in localStorage
    const savedData = localStorage.getItem('modmasterData');
    
    if (savedData) {
        try {
            const appData = JSON.parse(savedData);
            const appIndex = appData.apps.findIndex(app => app.id === appId);
            
            if (appIndex !== -1) {
                appData.apps[appIndex].downloads += 1;
                localStorage.setItem('modmasterData', JSON.stringify(appData));
            }
        } catch (e) {
            console.error('Error updating download count:', e);
        }
    }
}

// Update footer categories
function updateFooterCategories() {
    const footerCategoriesList = document.getElementById('footer-categories-list');
    if (!footerCategoriesList) return;
    
    footerCategoriesList.innerHTML = '';
    
    // Get data from localStorage
    const savedData = localStorage.getItem('modmasterData');
    if (!savedData) return;
    
    try {
        const appData = JSON.parse(savedData);
        
        // Show only first 5 categories in footer
        const categoriesToShow = appData.categories.slice(0, 5);
        
        categoriesToShow.forEach(category => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#">${category.name}</a>`;
            footerCategoriesList.appendChild(li);
        });
    } catch (e) {
        console.error('Error loading categories for footer:', e);
    }
}

// Initialize footer categories
document.addEventListener('DOMContentLoaded', function() {
    updateFooterCategories();
});