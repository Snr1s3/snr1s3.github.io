document.addEventListener('DOMContentLoaded', () => {
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
      if (newTheme === 'dark') {
          themeIcon.src = 'img/icons/sun.png'; // Set icon for dark mode
      } else {
          themeIcon.src = 'img/icons/moon.svg'; // Set icon for light mode
      }
  });
});