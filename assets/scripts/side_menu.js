function initializeSideMenu() {
  const sideMenuHTML = `
  <div>
    <header style="width: 250px;">
      <a
      href="#"
      onclick="return confirm('We are the Brass Co. Ltd. The best ever company!')"
      >
         Brass Co. Ltd
     </a>
    </header>
    <div>
      <ul class="nav">
        <li class="nav-link menuWrapper">
          <a href="../../../pages/clocks/analog-clock/analog_clock.html" class="nav-link">
            analog clock
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/experiments/ellipsis/index.html" class="nav-link">
            elipsis
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/experiments/indexmoz/index.html" class="nav-link">
            indexmoz
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/experiments/javascript-array-table/index.html" class="nav-link">
            jsarray | table
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/experiments/react/react-babel.html" class="nav-link">
            react babel
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/experiments/react/react.html" class="nav-link">
            react
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/galleries/shifting-tiles/index.html" class="nav-link">
            shifting tiles
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/galleries/web-gallery/index.html" class="nav-link">
            tiles
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/clocks/time/index.html" class="nav-link">
            time
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/experiments/weather/index.html" class="nav-link">
            weather
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/experiments/menus/gradient-side-menu.html" class="nav-link">
            side menu with gradient
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/experiments/login-demos/login.html" class="nav-link">
            login
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/experiments/login-demos/fire-login.html" class="nav-link">
            fire login
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/experiments/login-demos/calm-login.html" class="nav-link">
            calm login
          </a>
        </li>
        <li class="nav-link menuWrapper">
          <a href="../../../pages/galleries/image-carousel/index.html" class="nav-link">
            image carousel
          </a>
        </li>
      </ul>
      <div style="height: 10px"></div>
    </div>
  </div>
 `;
const menuFooterContent = `
    <footer>
      <div class="dropdown py-2 border-top">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDarkDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            alt="^..^"
            src="../../../assets/images/firefox-icon.png"
            width="32"
            height="32"
            class="rounded-circle me-2"
          />

          <span style="padding-left: 10px">
            The Best User Ever
          </span>
        </a>
        <ul
          class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
          aria-labelledby="navbarDarkDropdownMenuLink"
        >
          <li><a class="dropdown-item" href="#">
            Profile
          </a></li>
          <li><a class="dropdown-item" href="#">
            Help
          </a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#">
            Logout
          </a></li>
        </ul>
      </div>
    </footer>
`;

 document.getElementById('menu-body').innerHTML = sideMenuHTML;
 document.getElementById('menu-footer').innerHTML = menuFooterContent;

}

initializeSideMenu();