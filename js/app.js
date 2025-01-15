document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('bIcon');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.src = 'img/icons/sun.png';
    } else {
        themeIcon.src = 'img/icons/moon.svg'; // Set icon for light mode
    }

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Change icon based on the new theme
        themeIcon.src = newTheme === 'dark' ? 'img/icons/sun.png' : 'img/icons/moon.svg';
    });

    // Burger Menu Toggle
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.navigation');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Language Toggle
    const langToggle = document.getElementById('lang-toggle');
    const langIcon = document.getElementById('lIcon');
    const currentLang = localStorage.getItem('lang') || 'eng';

    if (currentLang === 'cat') {
        document.documentElement.setAttribute('data-lang', 'cat');
        langIcon.src = 'img/cat.png';
    } else if (currentLang === 'esp') {
        document.documentElement.setAttribute('data-lang', 'esp');
        langIcon.src = 'img/sp.svg';
    } else {
        langIcon.src = 'img/eng.png';
    }

    langToggle.addEventListener('click', () => {
        const lang = document.documentElement.getAttribute('data-lang');
        const newLang = lang === 'esp' ? 'eng' : (lang === 'eng' ? 'cat' : 'esp');
        document.documentElement.setAttribute('data-lang', newLang);
        localStorage.setItem('lang', newLang);

        // Update the language icon based on the new language
        if (newLang === 'cat') {
            langIcon.src = '../img/cat.png';
        } else if (newLang === 'esp') {
            langIcon.src = '../img/sp.svg';
        } else {
            langIcon.src = '../img/eng.png';
        }
        loadContent(newLang);
    });

    // Load initial content based on the current language
    loadContent(currentLang);
});

function loadContent(lang) {
    fetch('../json/text.json')
        .then(response => response.json())
        .then(data => {
            const content = data[lang];
            // Header
            document.getElementById('About').textContent = content.header.about;
            document.getElementById('Skills').textContent = content.header.skills;
            document.getElementById('Projects').textContent = content.header.projects;
            document.getElementById('Contact').textContent = content.header.contact;
            
            // Hero Section
            document.getElementById('hero-title').textContent = content.hero.title;
            document.getElementById('hero-description').textContent = content.hero.description;

            // More About Section
            document.getElementById('more-about-title').textContent = content.moreAbout.title;
            const moreAboutContent = document.getElementById('more-about-content');
            moreAboutContent.innerHTML = ''; // Clear existing content
            content.moreAbout.paragraphs.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                moreAboutContent.appendChild(p);
            });

            // Skills Section
            document.getElementById('skills-title').textContent = content.skills.title;

            document.getElementById('Project-Title').textContent = content.projects.title;
            document.getElementById('Contacts2').textContent = content.header.contact;
        })
        .catch(error => console.error('Error loading content:', error));
}