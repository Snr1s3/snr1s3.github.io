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
    const experience = document.getElementById('Experiencia');
    if (experience) experience.textContent = content.header.experience;
    const settings = document.getElementById('Settings');
    if (settings) settings.textContent = content.header.settings;


    const body_about = document.getElementById("Body-About");
    if (body_about) body_about.textContent = content.about.body

    
    const my_skills = document.getElementById("skills");
    if (my_skills) my_skills.textContent = content.skills.my_skills
    const learning = document.getElementById("learning");
    if (learning) learning.textContent = content.skills.learning

    const name = document.getElementById('Name');
    if (name) name.textContent = content.hero.name;
    const subtitle = document.getElementById('Subtitle');
    if (subtitle) subtitle.textContent = content.hero.subtitle;
    const project = document.getElementById('Project');
    if (project) project.textContent = content.hero.projects;

    const position = document.getElementById('Position');
    if (position) position.textContent = content.experience.position;
    const where = document.getElementById('Where');
    if (where) where.textContent = content.experience.where;
    const tasks = document.getElementById('Tasks');
    if (tasks) tasks.textContent = content.experience.tasks;
}

async function updateProjects(lang) {
    try {
        const response = await fetch('../json/projects.json');
        const projects = await response.json();
        const descField = {
            en: "desc_en",
            cat: "desc_cat",
            es: "desc_esp"
        }[lang] || "desc_en";
        const shuffled = projects.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        selected.forEach((project, idx) => {
            const num = idx + 1;
            const titleEl = document.getElementById(`p${num}`);
            const descEl = document.getElementById(`p${num}-desc`);
            const linkEl = document.getElementById(`p${num}-link`);
            if (titleEl) titleEl.textContent = project.name;
            if (descEl) descEl.textContent = project[descField] || "";
            if (linkEl) {
                linkEl.textContent = "Go to project";
                linkEl.href = project.url;
                linkEl.target = "_blank";
            }
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}