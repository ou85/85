const menuItems = [
    { label: 'analog clock',            link: './pages/analog_clock/analog_clock.html' },
    { label: 'weather',                 link: 'weather.html' },
    { label: 'elipsis',                 link: 'ellipsis.html' },
    { label: 'time',                    link: 'time.html' },
    { label: 'flip',                    link: './pages/flip_clock/flip_clock.html' },
    { label: 'indexmoz',                link: 'indexmoz.html' },
    { label: 'jsarray | table',         link: 'jsarray-in-table.html' },
    { label: 'react babel',             link: 'react_babel.html' },
    { label: 'randoms',                 link: 'randoms/random_chars.html' },
    { label: 'colours',                 link: './pages/colours/colours.html' },
    { label: 'indigo',                  link: './pages/indigo/indigo.html' },
    { label: 'react',                   link: 'react.html' },
    { label: 'tiles',                   link: 'webgallery/webgallery.html' },
    { label: 'shifting tiles',          link: 'shiftingtiles.html' },
    { label: 'image carousel',          link: 'image_carousel.html' },
    { label: 'side menu no gradient',   link: 'sidemenu.html' },
    { label: 'mixing typfaces',         link: './pages/art_of_mixing/typefaces.html' },
    { label: 'cat and mouse',           link: 'cat_and_mouse.html' },
    { label: 't free techno',           link: './pages/t_free_techno/tfree.html' },
    { label: 'calm login',              link: 'login_calm.html' },
    { label: 'fire login',              link: 'login_fire.html' },
    { label: 'login',                   link: 'login.html' }
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