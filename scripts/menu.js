const menuItems = [
    { label: 'analog clock',            link: './pages/clocks/analog-clock/analog_clock.html' },
    { label: 'digital clock',           link: './pages/clocks/digital-clock/digital_clock.html' },
    { label: 'weather',                 link: './pages/experiments/weather/index.html' },
    { label: 'ellipsis',                 link: './pages/experiments/ellipsis/index.html' },
    { label: 'time',                    link: './pages/clocks/time/index.html' },
    { label: 'flip',                    link: './pages/clocks/flip-clock/flip_clock.html' },
    { label: 'indexmoz',                link: './pages/experiments/indexmoz/index.html' },
    { label: 'ultimate ride',           link: './pages/experiments/ultimate-ride/ultimate-ride.html?quality=low' },
    { label: 'pi dynamic square',       link: './pages/experiments/pi-dynamic-square/pi_dynamic_square.html' },
    { label: 'jsarray | table',         link: './pages/experiments/javascript-array-table/index.html' },
    { label: 'react babel',             link: './pages/experiments/react/react-babel.html' },
    { label: 'randoms',                 link: 'pages/experiments/random-text/random_chars.html' },
    { label: 'colours',                 link: './pages/experiments/colours/colours.html' },
    { label: 'indigo',                  link: './pages/experiments/indigo/indigo.html' },
    { label: 'react',                   link: './pages/experiments/react/react.html' },
    { label: 'tiles',                   link: 'pages/galleries/web-gallery/index.html' },
    { label: 'shifting tiles',          link: 'pages/galleries/shifting-tiles/index.html' },
    { label: 'image carousel',          link: 'pages/galleries/image-carousel/index.html' },
    { label: 'side menu no gradient',   link: './pages/experiments/menus/side-menu.html' },
    { label: 'typeface mixing',         link: './pages/experiments/art-of-mixing/typefaces.html' },
    { label: 'cat and mouse',           link: './pages/experiments/cat-and-mouse/index.html' },
    { label: 't free techno',           link: './pages/experiments/t-free-techno/index.html' },
    { label: 'calm login',              link: './pages/experiments/login-demos/calm-login.html' },
    { label: 'fire login',              link: './pages/experiments/login-demos/fire-login.html' },
    { label: 'login',                   link: './pages/experiments/login-demos/login.html' }
];

function generateSideMenu() {
    const menuContainer = document.getElementById('side-menu');

    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('nav-link', 'menuWrapper');

        const bullet = document.createElement('span');
        bullet.textContent = '• ';

        const a = document.createElement('a');
        a.href = item.link;
        a.classList.add('nav-link');
        a.textContent = item.label;

        li.appendChild(bullet);
        li.appendChild(a);

        menuContainer.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', generateSideMenu);