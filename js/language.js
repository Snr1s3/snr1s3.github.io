// ====== Global Variables ======
let originalProjectsData = [];

// ====== Language Management ======
export function initLanguageDropdown() {
    const languageSelect = document.getElementById('language-select');
    const currentLang = localStorage.getItem('lang') || 'en';

    // Set initial language
    languageSelect.value = currentLang;
    document.documentElement.setAttribute('data-lang', currentLang);
    loadContent(currentLang);

    // Handle language changes
    languageSelect.addEventListener('change', (event) => {
        const newLang = event.target.value;
        document.documentElement.setAttribute('data-lang', newLang);
        localStorage.setItem('lang', newLang);
        loadContent(newLang);
    });
}

// ====== Content Loading ======
function loadContent(lang) {
    // Determine path based on current page
    const isProjectsPage = window.location.pathname.includes('projects.html');
    const textPath = isProjectsPage ? '../json/text.json' : './json/text.json';
    
    fetch(textPath)
        .then(response => response.json())
        .then(data => {
            updateTextContent(data[lang]);
            updateProjects(lang);
        })
        .catch(error => console.error('Error loading content:', error));
}

// ====== Text Content Updates ======
function updateTextContent(content) {
    // Helper function to safely update element text
    const updateElement = (id, text) => {
        const element = document.getElementById(id);
        if (element && text) element.textContent = text;
    };

    // Update all text elements
    updateElement('About', content.header?.about);
    updateElement('Skills', content.header?.skills);
    updateElement('Projects', content.header?.projects);
    updateElement('Experiencia', content.header?.experience);
    updateElement('Settings', content.header?.settings);
    updateElement('Body-About', content.about?.body);
    updateElement('skills', content.skills?.my_skills);
    updateElement('learning', content.skills?.learning);
    updateElement('Name', content.hero?.name);
    updateElement('Subtitle', content.hero?.subtitle);
    updateElement('Project', content.hero?.projects);
    updateElement('Position', content.experience?.position);
    updateElement('Where', content.experience?.where);
    updateElement('Tasks', content.experience?.tasks);
}

// ====== Projects Management ======
async function updateProjects(lang) {
    try {
        const isProjectsPage = window.location.pathname.includes('projects.html');
        const jsonPath = isProjectsPage ? '../json/projects.json' : './json/projects.json';
        const textPath= '../json/projects2.json';
        const response = await fetch(jsonPath);
        const projects = await response.json();
        originalProjectsData = projects;
        fetch(textPath)
        .then(response => response.json())
        .then(data => {
            changeLanguage(data[lang]);
        })
        .catch(error => console.error('Error loading content:', error));
        const descField = `desc_${lang === 'cat' ? 'cat' : lang === 'es' ? 'esp' : 'en'}`;

        // Render projects based on page type
        const projectsContainer = document.getElementById('projects-container');
        const projectsSection = document.getElementById('projects-scroll');
        
        if (projectsContainer) {
            renderProjects(projects, descField);
        } else if (projectsSection) {
            renderHomeProjects(projects.slice(0, 8), descField);
        }
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}
function changeLanguage(content){
    const updateElement = (id, text) => {
        const element = document.getElementById(id);
        if (element && text) element.textContent = text;
    };

    updateElement('Tittle', content.title);
    updateElement('Filter', content.filter);
    updateElement('All', content.all);
    updateElement('Prog', content.prog);
    updateElement('Topics', content.topics);
}
function renderProjects(projects, descField) {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    projects.forEach(project => {
        const card = createProjectCard(project, descField);
        container.appendChild(card);
    });
}

function renderHomeProjects(projects, descField) {
    const section = document.getElementById('projects-scroll');
    if (!section) return;
    
    section.innerHTML = '';
    
    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'project-item';
        item.innerHTML = `
            <h3><a class="scroll-projects" href="${project.url}" target="_blank">${project.name}</a></h3>
            <p class="project-description">${project[descField] || project.desc_en || ''}</p>
        `;
        section.appendChild(item);
    });
}

function createProjectCard(project, descField) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const languages = getTopLanguages(project.languages);
    
    card.innerHTML = `
        <h3>${project.name}</h3>
        ${project.image ? `<img src="${project.image}" alt="${project.name}">` : ''}
        <p class="project-description">${project[descField] || project.desc_en || ''}</p>
        ${createTopicTags(project.topics)}
        ${createLanguageTags(languages)}
        <div class="project-links">
            <a href="${project.url}" class="project-link" target="_blank">GitHub</a>
        </div>
    `;
    
    return card;
}

function getTopLanguages(languages) {
    if (!languages || Object.keys(languages).length === 0) return [];
    
    return Object.entries(languages)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
}

function createTopicTags(topics) {
    if (!topics || topics.length === 0) return '';
    
    return `<div class="topics">
        ${topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
    </div>`;
}

function createLanguageTags(languages) {
    if (languages.length === 0) return '';
    
    const totalBytes = languages.reduce((sum, [,bytes]) => sum + bytes, 0);
    
    return `<div class="languages">
        ${languages.map(([lang, bytes]) => {
            const percentage = Math.round((bytes / totalBytes) * 100);
            return `<span class="language-tag" data-lang="${lang.toLowerCase()}" title="${lang}: ${percentage}%">
                <span class="lang-dot"></span>
                ${lang}
                <span class="lang-percentage">${percentage}%</span>
            </span>`;
        }).join('')}
    </div>`;
}

// ====== Filter System ======
export function initProjectFilters() {
    const elements = {
        filterType: document.getElementById('filter-type'),
        filterOptionsContainer: document.getElementById('filter-options-container'),
        filterOptions: document.getElementById('filter-options'),
        clearFilter: document.getElementById('clear-filter')
    };

    if (!elements.filterType || !elements.filterOptions) return;

    // Filter type change handler
    elements.filterType.addEventListener('change', (e) => {
        const selectedType = e.target.value;
        
        if (selectedType === 'all') {
            hideFilterOptions(elements);
            showAllProjects();
        } else {
            showFilterOptions(elements);
            populateFilterOptions(selectedType);
        }
    });

    // Filter value change handler
    elements.filterOptions.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const filterType = elements.filterType.value;
        
        if (selectedValue) {
            elements.clearFilter.style.display = 'block';
            filterProjects(filterType, selectedValue);
        } else {
            elements.clearFilter.style.display = 'none';
            showAllProjects();
        }
    });

    // Clear filter handler
    elements.clearFilter.addEventListener('click', () => {
        elements.filterType.value = 'all';
        hideFilterOptions(elements);
        showAllProjects();
    });
}

function hideFilterOptions(elements) {
    elements.filterOptionsContainer.style.display = 'none';
    elements.clearFilter.style.display = 'none';
}

function showFilterOptions(elements) {
    elements.filterOptionsContainer.style.display = 'block';
}

function populateFilterOptions(filterType) {
    const filterOptions = document.getElementById('filter-options');
    const options = new Set();
    
    originalProjectsData.forEach(project => {
        if (filterType === 'language' && project.languages) {
            Object.keys(project.languages).forEach(lang => options.add(lang));
        } else if (filterType === 'topic' && project.topics) {
            project.topics.forEach(topic => options.add(topic));
        }
    });
    
    filterOptions.innerHTML = '<option value="">Select...</option>';
    Array.from(options).sort().forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        filterOptions.appendChild(optionElement);
    });
}

function filterProjects(filterType, filterValue) {
    const currentLang = localStorage.getItem('lang') || 'en';
    const descField = `desc_${currentLang === 'cat' ? 'cat' : currentLang === 'es' ? 'esp' : 'en'}`;
    
    const filteredProjects = originalProjectsData.filter(project => {
        if (filterType === 'language') {
            return project.languages && 
                   Object.keys(project.languages).some(lang => 
                       lang.toLowerCase() === filterValue.toLowerCase()
                   );
        } else if (filterType === 'topic') {
            return project.topics && 
                   project.topics.some(topic => 
                       topic.toLowerCase() === filterValue.toLowerCase()
                   );
        }
        return false;
    });
    
    renderProjects(filteredProjects, descField);
}

function showAllProjects() {
    const currentLang = localStorage.getItem('lang') || 'en';
    const descField = `desc_${currentLang === 'cat' ? 'cat' : currentLang === 'es' ? 'esp' : 'en'}`;
    
    renderProjects(originalProjectsData, descField);
}