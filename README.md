# 85

A collection of small static websites, interactive pages, and experiments.
Published version: <https://ou85.github.io/85/>.

## Structure

```text
.
├── index.html                 # home page and inline JavaScript examples
├── scripts/                   # external scripts used by the home page
├── tools/
│   └── check_links.py         # local link and resource checker
├── pages/
│   ├── clocks/
│   │   ├── analog-clock/
│   │   ├── digital-clock/
│   │   ├── flip-clock/
│   │   └── time/
│   ├── galleries/
│   │   ├── basic-image-carousel/
│   │   ├── image-carousel/
│   │   ├── shifting-tiles/     # gallery with image transitions
│   │   └── web-gallery/
│   └── experiments/
│       ├── art-of-mixing/
│       ├── cat-and-mouse/
│       ├── colours/
│       ├── ellipsis/
│       ├── indigo/
│       ├── indexmoz/
│       ├── javascript-array-table/
│       ├── login-demos/
│       ├── menus/
│       ├── pi-dynamic-square/
│       ├── random-text/
│       ├── react/
│       ├── t-free-techno/
│       ├── ultimate-ride/
│       └── weather/
├── assets/
│   ├── images/
│   │   └── gallery/            # 146 shared WebP images
│   ├── scripts/                # shared libraries and the demo side-menu script
│   └── styles/                 # shared styles, fonts, and CSS libraries
└── tmp/todo.md                 # project reorganization task reference
```

Each project keeps its own pages, styles, and scripts together. Shared resources and libraries live in `assets/`. The home page's external scripts are in `scripts/`; its inline scripts remain in `index.html`.

## Run locally

From the repository root, start a simple HTTP server:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. A server is required for pages that load JSON files with `fetch`.

## Check local links

Run the local link checker from the repository root:

```sh
python3 tools/check_links.py
```

It checks local HTML links and resources, page anchors, CSS imports and `url(...)` references, and static links in JavaScript. It also checks numbered image ranges declared by the gallery scripts. External URLs and other paths assembled dynamically at runtime are not checked.

## Navigation and legacy URLs

The home page builds its main side menu from `scripts/menu.js`. Legacy HTML redirect pages have been removed, and menu links point directly to pages under `pages/`.

Some experiments use external CDNs, fonts, or services and require an internet connection. Their availability may depend on those external providers.
