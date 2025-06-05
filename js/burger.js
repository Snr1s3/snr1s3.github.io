export function initBurgerMenu() {
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.navigation');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}