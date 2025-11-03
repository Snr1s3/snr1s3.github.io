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
            updateProjects(lang);
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

// Store original projects data globally
let originalProjectsData = [];

async function updateProjects(lang) {
    try {
        const response = await fetch('../json/projects.json');
        const projects = await response.json();
        originalProjectsData = projects; // Store original data
        
        const descField = {
            en: "desc_en",
            cat: "desc_cat",
            es: "desc_esp"
        }[lang] || "desc_en";

        // Check if we're on the projects page
        const projectsContainer = document.getElementById('projects-container');
        
        if (projectsContainer) {
            // Projects page - create cards for all projects
            renderProjects(projects, descField);
        } else {
            // Home page logic remains the same
            console.log('Projects container not found, checking for home page...');
            const projectsSection = document.getElementById('projects-scroll');
            
            if (projectsSection) {
                console.log('Home projects section found');
                const selectedProjects = projects.slice(0, 8);
                
                projectsSection.innerHTML = '';
                
                selectedProjects.forEach(project => {
                    const projectItem = document.createElement('div');
                    projectItem.className = 'project-item';
                    
                    const projectName = project.name || 'Unnamed Project';
                    const projectDesc = project[descField] || project.desc_en || 'No description available';
                    const projectUrl = project.url || project.html_url || '#';
                    
                    projectItem.innerHTML = `
                        <h3><a class="scroll-projects" href="${projectUrl}" target="_blank">${projectName}</a></h3>
                        <p class="project-description">${projectDesc}</p>
                    `;
                    
                    projectsSection.appendChild(projectItem);
                });
            } else {
                console.log('No projects section found on home page');
            }
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            projectsContainer.innerHTML = '<p>Error loading projects. Please check the console for details.</p>';
        }
    }
}

// New function to render projects
function renderProjects(projects, descField) {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = ''; // Clear existing content
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Sort languages by bytes (most used first)
        const sortedLanguages = project.languages && Object.keys(project.languages).length > 0 
            ? Object.entries(project.languages)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10)
            : [];
        
        projectCard.innerHTML = `
            <h3>${project.name}</h3>
            ${project.image ? `<img src="${project.image}" alt="${project.name}">` : ''}
            <p class="project-description">${project[descField] || project.desc_en || ''}</p>
            <div class="topics">
                ${project.topics && project.topics.length > 0 ? 
                    project.topics.map(topic => 
                        `<span class="topic-tag">${topic}</span>`
                    ).join('') : ''
                }
            </div>
            <div class="languages">
                ${sortedLanguages.map(([lang, bytes]) => {
                    const percentage = project.languages ? 
                        Math.round((bytes / Object.values(project.languages).reduce((a, b) => a + b, 0)) * 100) : 0;
                    return `<span class="language-tag" data-lang="${lang.toLowerCase()}" title="${lang}: ${percentage}%">
                        <span class="lang-dot"></span>
                        ${lang}
                        <span class="lang-percentage">${percentage}%</span>
                    </span>`;
                }).join('')}
            </div>
            <div class="project-links">
                <a href="${project.url}" class="project-link" target="_blank">GitHub</a>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

export function initProjectFilters() {
    const filterType = document.getElementById('filter-type');
    const filterOptionsContainer = document.getElementById('filter-options-container');
    const filterOptions = document.getElementById('filter-options');
    const clearFilter = document.getElementById('clear-filter');

    if (!filterType || !filterOptions) return;

    filterType.addEventListener('change', (e) => {
        const selectedType = e.target.value;
        
        if (selectedType === 'all') {
            filterOptionsContainer.style.display = 'none';
            clearFilter.style.display = 'none';
            showAllProjects();
        } else {
            filterOptionsContainer.style.display = 'block';
            populateFilterOptions(selectedType);
        }
    });

    filterOptions.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const filterType = document.getElementById('filter-type').value;
        
        if (selectedValue) {
            clearFilter.style.display = 'block';
            filterProjects(filterType, selectedValue);
        } else {
            clearFilter.style.display = 'none';
            showAllProjects();
        }
    });

    clearFilter.addEventListener('click', () => {
        filterType.value = 'all';
        filterOptionsContainer.style.display = 'none';
        clearFilter.style.display = 'none';
        showAllProjects();
    });
}

function populateFilterOptions(filterType) {
    const filterOptions = document.getElementById('filter-options');
    let options = new Set();
    
    // Use original data to populate filter options
    originalProjectsData.forEach(project => {
        if (filterType === 'language') {
            if (project.languages && Object.keys(project.languages).length > 0) {
                Object.keys(project.languages).forEach(lang => {
                    options.add(lang);
                });
            }
        } else if (filterType === 'topic') {
            if (project.topics && project.topics.length > 0) {
                project.topics.forEach(topic => {
                    options.add(topic);
                });
            }
        }
    });
    
    // Clear and populate options
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
    const descField = {
        en: "desc_en",
        cat: "desc_cat",
        es: "desc_esp"
    }[currentLang] || "desc_en";
    
    // Filter the original data
    const filteredProjects = originalProjectsData.filter(project => {
        if (filterType === 'language') {
            // Check if project has languages and if any match the filter
            if (project.languages && Object.keys(project.languages).length > 0) {
                return Object.keys(project.languages).some(lang => 
                    lang.toLowerCase() === filterValue.toLowerCase()
                );
            }
            return false; // Hide projects without languages
        } else if (filterType === 'topic') {
            // Check if project has topics and if any match exactly (100%)
            if (project.topics && project.topics.length > 0) {
                return project.topics.some(topic => 
                    topic.toLowerCase() === filterValue.toLowerCase()
                );
            }
            return false; // Hide projects without topics
        }
        return true;
    });
    
    // Re-render with filtered projects
    renderProjects(filteredProjects, descField);
}

function showAllProjects() {
    const currentLang = localStorage.getItem('lang') || 'en';
    const descField = {
        en: "desc_en",
        cat: "desc_cat",
        es: "desc_esp"
    }[currentLang] || "desc_en";
    
    // Re-render with all original projects
    renderProjects(originalProjectsData, descField);
}