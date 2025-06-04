// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if there are URL parameters to pre-fill the form
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const app = urlParams.get('app');
    
    if (subject) {
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) {
            // Try to find the option that matches the subject parameter
            const options = Array.from(subjectSelect.options);
            const optionToSelect = options.find(option => option.value === subject);
            
            if (optionToSelect) {
                optionToSelect.selected = true;
            }
        }
    }
    
    if (app) {
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
            messageTextarea.value = `App: ${app}\n\nPlease describe your issue or request:`;
        }
    }
    
    // Initialize the contact form
    initContactForm();
    
    // Initialize FAQ toggles
    initFaqToggles();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Update footer categories
    updateFooterCategories();
});

// Initialize the contact form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form will be submitted to formsubmit.co
            // This is just for visual feedback
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
            }
            
            // The form will be submitted normally to formsubmit.co
            // No need to prevent default or handle submission manually
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