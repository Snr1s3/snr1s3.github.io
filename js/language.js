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
            updateProjects(lang)
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

    const projectLink1 = document.getElementById('p1-link');
    if (projectLink1) projectLink1.textContent = content.p1["p1-link"];
    const projectLink2 = document.getElementById('p2-link');
    if (projectLink2) projectLink2.textContent = content.p2["p2-link"];
    const projectLink3 = document.getElementById('p3-link');
    if (projectLink3) projectLink3.textContent = content.p3["p3-link"];

    const contactElement = document.getElementById('Contacts2');
    if (contactElement) contactElement.textContent = content.header.contact;
}

async function updateProjects(lang) {
    try {
        const response = await fetch('../json/projects.json');
        const projects = await response.json();

        // Pick the right description field for the language
        const descField = {
            en: "desc_en",
            cat: "desc_cat",
            esp: "desc_esp"
        }[lang] || "desc_en";

        // Shuffle and pick 3 unique projects
        const shuffled = projects.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        selected.forEach((project, idx) => {
            const num = idx + 1;
            const titleEl = document.getElementById(`p${num}`);
            const descEl = document.getElementById(`p${num}-desc`);
            const linkEl = document.getElementById(`p${num}-link`);
            //const photoEl = document.querySelector(`#p${num}-link`).parentElement.querySelector('img');
            if (titleEl) titleEl.textContent = project.name;
            if (descEl) descEl.textContent = project[descField] || "";
            if (linkEl) {
                linkEl.textContent = "Go to project";
                linkEl.href = project.url;
                linkEl.target = "_blank";
            }
            //if (photoEl && project.photo) photoEl.src = project.photo;
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}