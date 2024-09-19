const DEFAULT_LANGUAGE = 'en';

function getUserLanguage() {
    return localStorage.getItem('language') || DEFAULT_LANGUAGE;
}


function setUserLanguage(language) {
    localStorage.setItem('language', language);
}


async function loadLanguageFile(language) {
    console.log(`Attempting to load ${language}.json`);
    try {
        const response = await fetch(`JSON/${language}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load ${language}.json`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading language file:', error);
        if (language !== DEFAULT_LANGUAGE) {
            return loadLanguageFile(DEFAULT_LANGUAGE);
        } else {
            throw new Error('Unable to load any language files.');
        }
    }
}


function applyLanguage(data) {
    const logoTextElement = document.getElementById('logo');
    if (logoTextElement) {
        logoTextElement.textContent = data.logo;
    } 

    const homeElement = document.getElementById('Home');
    if (homeElement) homeElement.textContent = data.home;

    const uploadLinkElement = document.getElementById('Upload');
    if (uploadLinkElement) uploadLinkElement.textContent = data.upload;

    const playlistsLinkElement = document.getElementById('Playlists');
    if (playlistsLinkElement) playlistsLinkElement.textContent = data.playlists;

    const favoritesLinkElement = document.getElementById('Favorites');
    if (favoritesLinkElement) favoritesLinkElement.textContent = data.favorites;

    const statsLinkElement = document.getElementById('Analytics');
    if (statsLinkElement) statsLinkElement.textContent = data.stats;

    const settingsLinkElement = document.getElementById('Settings');
    if (settingsLinkElement) settingsLinkElement.textContent = data.settings;

     const communityLinkElement = document.getElementById('Community');
    if (communityLinkElement) communityLinkElement.textContent = data.community;

    const searchInputElement = document.getElementById('searchInput');
    if (searchInputElement) searchInputElement.placeholder = data.search_placeholder;

    const heroH1Element = document.querySelector('.hero h1');
    if (heroH1Element) heroH1Element.textContent = data.featured_podcasts;

    const sectionH2Element = document.querySelector('.section h2');
    if (sectionH2Element) sectionH2Element.textContent = data.trending_podcasts;

    const sectionH3Element = document.querySelector('.section h4');
    if (sectionH3Element) sectionH3Element.textContent = data.uploaded_videos;

    const aboutUsLink = document.querySelector('footer .footer-links a[href="About_Us.html"]');
    if (aboutUsLink) aboutUsLink.textContent = data.about_us;

    const contactLink = document.querySelector('footer .footer-links a[href="Contact.html"]');
    if (contactLink) contactLink.textContent = data.contact;

    const tosLink = document.querySelector('footer .footer-links a[href="ToS.html"]');
    if (tosLink) tosLink.textContent = data.terms_of_service;

    const privPolLink = document.querySelector('footer .footer-links a[href="PrivPol.html"]');
    if (privPolLink) privPolLink.textContent = data.privacy_policy;
}


async function changeLanguage(language) {
    try {
        const languageData = await loadLanguageFile(language);
        applyLanguage(languageData);
        setUserLanguage(language); // Save the selected language
    } catch (error) {
        console.error('Error applying the language:', error);
        // Optionally, show a user-friendly message
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    const savedLanguage = getUserLanguage();
    try {
        const languageData = await loadLanguageFile(savedLanguage);
        applyLanguage(languageData);
        document.getElementById('languageSelector').value = savedLanguage;
    } catch (error) {
        console.error('Error during initialization:', error);
        
    }
});

window.changeLanguage = changeLanguage;
