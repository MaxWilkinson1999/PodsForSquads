fetch(`JSON/${language}.json`)

// Default language setting
const DEFAULT_LANGUAGE = 'en';

// Function to get the user's preferred language from localStorage
function getUserLanguage() {
    return localStorage.getItem('language') || DEFAULT_LANGUAGE;
}

// Function to set the user's preferred language
function setUserLanguage(language) {
    localStorage.setItem('language', language);
}

// Function to load a language file and return its contents as a JSON object
function loadLanguageFile(language) {
    console.log(`Attempting to load ${language}.json`);
    return fetch(`${language}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${language}.json`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error loading language file:', error);
            return loadLanguageFile(DEFAULT_LANGUAGE);
        });
}


// Function to apply the language to the HTML elements
function applyLanguage(data) {
    document.getElementById('logoText').textContent = data.logo;
    document.getElementById('homeLink').textContent = data.home;
    document.getElementById('uploadLink').textContent = data.upload;
    document.getElementById('playlistsLink').textContent = data.playlists;
    document.getElementById('favoritesLink').textContent = data.favorites;
    document.getElementById('statsLink').textContent = data.stats;
    document.getElementById('settingsLink').textContent = data.settings;
    document.getElementById('searchInput').placeholder = data.search_placeholder;
    document.querySelector('.hero h1').textContent = data.featured_podcasts;
    document.querySelector('.section h2').textContent = data.trending_podcasts;
    document.querySelector('.section h3').textContent = data.uploaded_videos;
    document.querySelector('footer .footer-links a[href="About_Us.html"]').textContent = data.about_us;
    document.querySelector('footer .footer-links a[href="Contact.html"]').textContent = data.contact;
    document.querySelector('footer .footer-links a[href="ToS.html"]').textContent = data.terms_of_service;
    document.querySelector('footer .footer-links a[href="PrivPol.html"]').textContent = data.privacy_policy;
}

// Function to change the language
async function changeLanguage(language) {
    const languageData = await loadLanguageFile(language);
    applyLanguage(languageData);
    setUserLanguage(language); // Save the selected language
}

// Initialize the page with the saved or default language
document.addEventListener('DOMContentLoaded', async () => {
    const savedLanguage = getUserLanguage();
    const languageData = await loadLanguageFile(savedLanguage);
    applyLanguage(languageData);
    document.getElementById('languageSelector').value = savedLanguage;
});

// Expose functions to the global scope (if needed)
window.changeLanguage = changeLanguage;
