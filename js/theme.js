export function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('bIcon');
    const currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark theme

    document.documentElement.setAttribute('data-theme', currentTheme);
    themeIcon.src = currentTheme === 'dark' ? '../img/icons/sun.png' : '../img/icons/moon.svg';

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.src = newTheme === 'dark' ? '../img/icons/sun.svg' : '../img/icons/moon.svg';
    });
}