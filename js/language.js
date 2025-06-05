export function initLanguageDropdown() {
    const languageSelect = document.getElementById('language-select');
    const currentLang = localStorage.getItem('lang') || 'en';

    languageSelect.value = currentLang;
    document.documentElement.setAttribute('data-lang', currentLang);
    loadContent(currentLang);

    languageSelect.addEventListener('change', (event) => {
        const newLang = event.target.value;
        document.documentElement.setAttribute('data-lang', newLang);
        localStorage.setItem('lang', newLang);
        loadContent(newLang);
    });
}

function loadContent(lang) {
    fetch('../json/text.json')
        .then((response) => response.json())
        .then((data) => {
            const content = data[lang];
            updateTextContent(content);
        })
        .catch((error) => console.error('Error loading content:', error));
}

function updateTextContent(content) {
    const about = document.getElementById('About');
    if (about) about.textContent = content.header.about;
    const skills = document.getElementById('Skills');
    if (skills) skills.textContent = content.header.skills;
    const projects = document.getElementById('Projects');
    if (projects) projects.textContent = content.header.projects;
    const contact = document.getElementById('Contact');
    if (contact) contact.textContent = content.header.contact;

    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.textContent = content.hero.title;
    const heroDesc = document.getElementById('hero-description');
    if (heroDesc) heroDesc.textContent = content.hero.description;

    const moreAboutTitle = document.getElementById('more-about-title');
    if (moreAboutTitle) moreAboutTitle.textContent = content.moreAbout.title;
    const moreAboutContent = document.getElementById('more-about-content');
    if (moreAboutContent) {
        moreAboutContent.innerHTML = '';
        content.moreAbout.paragraphs.forEach((paragraph) => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            moreAboutContent.appendChild(p);
        });
    }

    const skillsTitle = document.getElementById('skills-title');
    if (skillsTitle) skillsTitle.textContent = content.skills.title;

    const projectTitle = document.getElementById('Project-Title');
    if (projectTitle) projectTitle.textContent = content.projects.title;

    const contactElement = document.getElementById('Contacts2');
    if (contactElement) contactElement.textContent = content.header.contact;
}