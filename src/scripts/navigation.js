/* Scroll animation */
(() => {
    const navbar = document.getElementById('navigation');
    const scrollTransition = 80
    if (window.scrollY > scrollTransition) {
        navbar.classList.add('scrolled');
    }
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollTransition) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        closeNavMenu()
    })
})()

/* Select theme dark/light */
const html = document.documentElement;
const btn = document.getElementById('toggleTheme');
const icon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let theme = savedTheme || (prefersDark ? 'dark' : 'light');

applyTheme(theme, true);
btn.addEventListener('click', () => {
    const themesMap = { dark: 'light', light: 'dark' };
    theme = themesMap[theme];
    applyTheme(theme);
});

function applyTheme(theme='dark', init=false) {
    html.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    setIcon(theme, init);
}

function setIcon(theme, init) {
    const icon_sun = '<i class="bi bi-sun-fill"></i>'
    const icon_moon = '<i class="bi bi-moon-fill"></i>'
    const icon_showed = theme === 'dark' ? icon_moon : icon_sun;
    if(init) {
        icon.innerHTML = icon_showed
    } else {
        icon.classList.add('theme-icon-fade-out');
        setTimeout(() => {
            icon.innerHTML = icon_showed
            icon.classList.remove('theme-icon-fade-out');
            icon.classList.add('theme-icon-fade-in');
            setTimeout(() => icon.classList.remove('theme-icon-fade-in'), 300);
        }, 150);
    }
}

/* Close mobile navigation events */
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('bi-sun-fill') 
    || event.target.classList.contains('bi-moon-fill')) {
        return;    
    }
    closeNavMenu();
})

function closeNavMenu() {
    const menu = document.querySelector('.navbar-collapse');
    const btnCollapse = document.getElementById('navBtnCollapse')
    if(menu.classList.contains('show')){
        btnCollapse.click()
    }
}
