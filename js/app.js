import { initThemeToggle } from './theme.js';
import { initBurgerMenu } from './burger.js';
import { initLanguageDropdown } from './language.js';
import { initDragAndDrop } from './dragdrop.js';
import { initBackToTopButton } from './backtotop.js';

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initBurgerMenu();
    initLanguageDropdown();
    initDragAndDrop();
    initBackToTopButton();
});