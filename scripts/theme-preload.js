// This script runs immediately to prevent theme flashing
// It applies the theme before any other scripts or stylesheets load

(function() {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem("currentTheme");
    
    // Apply theme if saved
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Use system preference if no saved theme
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const defaultTheme = prefersDark ? "dark" : "light";
        document.documentElement.setAttribute('data-theme', defaultTheme);
        localStorage.setItem("currentTheme", defaultTheme);
    }
})();
