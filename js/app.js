document.addEventListener('DOMContentLoaded', () => {
initThemeToggle();
initBurgerMenu();
initLanguageDropdown();
initDragAndDrop();
initBackToTopButton();
});

// Initialize Theme Toggle
function initThemeToggle() {
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('bIcon');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
themeIcon.src = currentTheme === 'dark' ? 'img/icons/sun.png' : 'img/icons/moon.svg';

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.src = newTheme === 'dark' ? 'img/icons/sun.png' : 'img/icons/moon.svg';
});
}

// Initialize Burger Menu
function initBurgerMenu() {
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.querySelector('.navigation');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});
}

// Initialize Language Dropdown
function initLanguageDropdown() {
const languageSelect = document.getElementById('language-select');
const currentLang = localStorage.getItem('lang') || 'en';

// Set initial language
languageSelect.value = currentLang;
document.documentElement.setAttribute('data-lang', currentLang);
loadContent(currentLang);

// Handle language change
languageSelect.addEventListener('change', (event) => {
    const newLang = event.target.value;
    document.documentElement.setAttribute('data-lang', newLang);
    localStorage.setItem('lang', newLang);
    loadContent(newLang);
});
}

// Load Content Based on Language
function loadContent(lang) {
fetch('../json/text.json')
    .then((response) => response.json())
    .then((data) => {
    const content = data[lang];
    updateTextContent(content);
    })
    .catch((error) => console.error('Error loading content:', error));
}

// Update Text Content
function updateTextContent(content) {
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
content.moreAbout.paragraphs.forEach((paragraph) => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    moreAboutContent.appendChild(p);
});

// Skills Section
document.getElementById('skills-title').textContent = content.skills.title;

// Projects Section
document.getElementById('Project-Title').textContent = content.projects.title;

// Contact Section
const contactElement = document.getElementById('Contacts2');
    if (contactElement) {
        contactElement.textContent = content.header.contact;
    }
}

    // Initialize Drag-and-Drop
    function initDragAndDrop() {
    const icons = document.querySelectorAll('.icon-card');
    const skillSets = document.querySelectorAll('.skills-wrapper > div');
    let draggedItem = null;

    // Add dragstart and dragend event listeners
    icons.forEach((icon) => {
        icon.addEventListener('dragstart', () => {
        draggedItem = icon;
        setTimeout(() => (icon.style.display = 'none'), 0);
        });

        icon.addEventListener('dragend', () => {
        setTimeout(() => {
            icon.style.display = 'block';
            draggedItem = null;
        }, 0);
        });
    });

    // Add dragover, dragleave, and drop event listeners
    skillSets.forEach((set) => {
        set.addEventListener('dragover', (e) => {
        e.preventDefault();
        set.classList.add('dragover');
        });

        set.addEventListener('dragleave', () => {
        set.classList.remove('dragover');
        });

        set.addEventListener('drop', (e) => {
        e.preventDefault();
        set.classList.remove('dragover');
        if (draggedItem) {
            set.appendChild(draggedItem);
            sortIcons(set);
        }
        });
    });
}

// Sort Icons Alphabetically
function sortIcons(container) {
    const icons = Array.from(container.querySelectorAll('.icon-card'));
    icons.sort((a, b) => {
        const altA = a.getAttribute('alt').toLowerCase();
        const altB = b.getAttribute('alt').toLowerCase();
        return altA.localeCompare(altB);
    });
    icons.forEach((icon) => container.appendChild(icon));
    }

    // Initialize Back-to-Top Button
    function initBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');

    // Show or hide the button based on scroll position
    window.addEventListener('scroll', () => {
        backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    // Scroll to the top when the button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}