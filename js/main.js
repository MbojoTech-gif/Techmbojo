// Theme switching functionality
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    loadProjects();
    setupProjectFilters();
    
    // Reset scroll position on page load
    window.scrollTo(0, 0);
    
    // Add a small delay before initializing animations to ensure smooth page transition
    setTimeout(() => {
        if (typeof initScrollAnimations === 'function') {
            initScrollAnimations();
        }
    }, 100);
});

function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initialize theme
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        }
    });
}

async function loadProjects() {
    try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = ''; // Clear existing projects
        
        data.projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = project.id;
    card.dataset.tags = project.tags.join(',');
    
    card.innerHTML = `
        <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <div class="project-tools">
                ${project.tools.map(tool => `<span class="project-tool">${tool}</span>`).join('')}
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openProjectModal(project));
    return card;
}

function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryDescription = document.getElementById('category-description');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!filterButtons.length || !projectsGrid) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update category description
            if (categoryDescription) {
                categoryDescription.textContent = button.dataset.description;
                categoryDescription.style.opacity = '0';
                setTimeout(() => categoryDescription.style.opacity = '1', 50);
            }
            
            // Filter projects
            const filter = button.dataset.filter;
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                const tags = card.dataset.tags.split(',');
                if (filter === 'all' || tags.includes(filter)) {
                    card.style.display = '';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    const modalContent = `
        <img src="${project.thumbnail}" alt="${project.title}">
        <h2>${project.title}</h2>
        <p class="project-description">${project.description}</p>
        
        ${project.features ? `
            <div class="project-features">
                <h3>Key Features</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
        
        ${project.deliverables ? `
            <div class="project-deliverables">
                <h3>Deliverables</h3>
                <ul>
                    ${project.deliverables.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
        
        <div class="project-tools">
            <h3>Tools Used</h3>
            <div class="tools-list">
                ${project.tools.map(tool => `<span class="project-tool">${tool}</span>`).join('')}
            </div>
        </div>
        
        <div class="project-links">
            ${project.liveUrl ? `
                <a href="${project.liveUrl}" target="_blank" rel="noopener">
                    View Live Project
                </a>
            ` : ''}
            ${project.githubUrl ? `
                <a href="${project.githubUrl}" target="_blank" rel="noopener">
                    View Source Code
                </a>
            ` : ''}
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = modalContent;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}