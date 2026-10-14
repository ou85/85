# 85

Коллекция небольших статических сайтов, интерактивных страниц и экспериментов.
Опубликованная версия: <https://ou85.github.io/85/>.

## Структура

```text
.
├── index.html                 # главная страница и встроенные JavaScript-примеры
├── pages/
│   ├── clocks/
│   │   ├── analog-clock/
│   │   ├── digital-clock/
│   │   ├── flip-clock/
│   │   └── time/
│   ├── galleries/
│   │   ├── basic-image-carousel/
│   │   ├── image-carousel/
│   │   ├── shifting-tiles/     # галерея с переключением изображений
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
│   ├── images/                 # общие изображения
│   ├── scripts/                # общие скрипты и меню
│   └── styles/                 # общие стили и CSS-библиотеки
├── shiftingtiles.html         # переход со старого URL
├── webgallery/                # старый URL webgallery/webgallery.html
├── image_carousel_basic/      # старый URL базовой карусели
└── tmp/todo.md                # согласованный план реорганизации
```

Каждый проект хранит собственные страницы, стили, скрипты и данные рядом друг с другом. Общие ресурсы собраны в `assets/`. Встроенные скрипты `index.html` оставлены на месте.

## Просмотр локально

Из корневой папки запустите простой HTTP-сервер:

```sh
python3 -m http.server 8000
```

Затем откройте <http://localhost:8000/>. Сервер нужен, в частности, для страниц, которые загружают JSON-файлы через `fetch`.

## Навигация и старые адреса

Главная страница строит основное боковое меню из `assets/scripts/menu.js`. Старые URL перенесённых страниц сохранены в виде небольших HTML-переходников; новые страницы находятся в `pages/`.

Некоторые эксперименты используют внешние CDN, шрифты или сервисы. Для них требуется подключение к интернету. Отдельные демо могут зависеть от доступности этих внешних ресурсов.
