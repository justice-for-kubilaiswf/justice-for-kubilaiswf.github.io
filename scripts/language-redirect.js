// Language and Theme Manager Script
document.addEventListener('DOMContentLoaded', function() {
    // 1. Theme management when changing languages
    const languageSwitcher = document.querySelectorAll('.language-option');
    if (languageSwitcher) {
        languageSwitcher.forEach(option => {
            option.addEventListener('click', function(e) {
                // Prevent default link behavior
                e.preventDefault();
                
                // Get current theme
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
                
                // Store the language choice
                const targetLanguage = this.getAttribute('href').includes('index-tr.html') ? 'tr' : 'en';
                localStorage.setItem('userLangChoice', targetLanguage);
                
                // Store the theme (in a separate variable for clarity)
                localStorage.setItem('currentTheme', currentTheme);
                
                // Navigate to the new page
                window.location.href = this.getAttribute('href');
            });
        });
    }
    
    // 2. Apply theme on page load (must be before any other theme operations)
    const savedTheme = localStorage.getItem('currentTheme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // 3. Automatic language detection (only on initial visit)
    const userLang = (navigator.language || navigator.userLanguage).toLowerCase();
    const currentPath = window.location.pathname;
    const hasMadeChoice = localStorage.getItem('userLangChoice');

    if (!hasMadeChoice) {
        // First-time visitor with Turkish browser language
        if (userLang.startsWith('tr') && !currentPath.includes('index-tr.html')) {
            localStorage.setItem('userLangChoice', 'tr');
            window.location.href = '/index-tr.html';
        } else if (!userLang.startsWith('tr') && currentPath.includes('index-tr.html')) {
            // First-time visitor with non-Turkish browser on Turkish page
            localStorage.setItem('userLangChoice', 'en');
            window.location.href = '/index.html';
        }
    }
    
    // 4. Language switcher visual effects
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher) {
        // Handle scroll-based opacity
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                langSwitcher.style.opacity = "0.5"; // More transparent when scrolled down
            } else {
                langSwitcher.style.opacity = "1"; // Fully visible at the top
            }
        });
        
        // Restore opacity on hover regardless of scroll position
        langSwitcher.addEventListener('mouseenter', function() {
            this.style.opacity = "1";
        });
        
        langSwitcher.addEventListener('mouseleave', function() {
            if (window.scrollY > 100) {
                this.style.opacity = "0.5";
            }
        });
    }
});
