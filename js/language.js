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
            updateProjects2(lang)
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

        // Check if we're on the projects page
        const projectsContainer = document.getElementById('projects-container');
        
        if (projectsContainer) {
            // Projects page - create cards for all projects
            projectsContainer.innerHTML = ''; // Clear existing content
            
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                projectCard.innerHTML = `
                    <h3>${project.name}</h3>
                    ${project.image ? `<img src="${project.image}" alt="${project.name}">` : ''}
                    <p>${project[descField] || project.desc_en || ''}</p>
                    <div class="project-tech">
                        ${project.technologies ? project.technologies.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('') : ''}
                    </div>
                    <div class="project-links">
                        <a href="${project.url}" class="project-link" target="_blank">GitHub</a>
                        ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank">Live Demo</a>` : ''}
                    </div>
                `;
                
                projectsContainer.appendChild(projectCard);
            });
 } else {
            console.log('Projects container not found, checking for home page...');
            // Home page - update projects section
            const projectsSection = document.getElementById('projects-scroll');
            
            if (projectsSection) {
                console.log('Home projects section found');
                // Get first 8 projects to ensure scrolling
                const selectedProjects = projects.slice(0, 8);
                
                // Clear existing content
                projectsSection.innerHTML = '';
                
                // Create project items
                selectedProjects.forEach(project => {
                    const projectItem = document.createElement('div');
                    projectItem.className = 'project-item';
                    
                    const projectName = project.name || 'Unnamed Project';
                    const projectDesc = project[descField] || project.desc_en || 'No description available';
                    const projectUrl = project.url || project.html_url || '#';
                    
                    projectItem.innerHTML = `
                        <h3><a id="scrollProjects" href="${projectUrl}" target="_blank">${projectName}</a></h3>
                        <p>${projectDesc}</p>
                    `;
                    
                    projectsSection.appendChild(projectItem);
                });
            } else {
                console.log('No projects section found on home page');
            }
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        
        // Show fallback content if JSON fails
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            projectsContainer.innerHTML = '<p>Error loading projects. Please check the console for details.</p>';
        }
    }
}