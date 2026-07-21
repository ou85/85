const clockMarkup = `
    <main class="clock-container">
        <div class="top-info">
            <div class="weather">
                <section class="ajax-section">
                    <div class="cities"></div>
                </section>
            </div>

            <div class="date-day">
                <div class="date">--.--.----</div>
                <div class="day">--</div>
            </div>
        </div>

        <div class="flip-clock">
            ${createFlipSection("hours")}
            ${createFlipSection("minutes")}
        </div>

        <div class="wcontainer">
            <div class="bottom-banner">
                <section class="ajax-section">
                    <div class="cities"></div>
                </section>

                <form>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search for a city"
                    >

                    <button
                        type="submit"
                        class="search-button"
                        aria-label="Search"
                    >
                        <i class="fas fa-search"></i>
                    </button>

                    <span class="msg"></span>
                </form>
            </div>
        </div>
    </main>
`;

document.body.insertAdjacentHTML("beforeend", clockMarkup);

const clockSections = {
    hours: document.querySelector('[data-unit="hours"]'),
    minutes: document.querySelector('[data-unit="minutes"]')
};

const dateElement = document.querySelector(".date");
const dayElement = document.querySelector(".day");

function createFlipSection(unit) {
    return `
        <div class="flip-section" data-unit="${unit}">
            <div class="flip-half static-top">
                <span class="flip-value">00</span>
            </div>

            <div class="flip-half static-bottom">
                <span class="flip-value">00</span>
            </div>

            <div class="flip-half top-flap">
                <span class="flip-value">00</span>
            </div>

            <div class="flip-half bottom-flap">
                <span class="flip-value">00</span>
            </div>
        </div>
    `;
}

function updateTime(animate = true) {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    updateFlip(clockSections.hours, hours, animate);
    updateFlip(clockSections.minutes, minutes, animate);

    dateElement.textContent = now.toLocaleDateString("en-GB");

    dayElement.textContent = now.toLocaleDateString("en-US", {
        weekday: "long"
    });
}

function updateFlip(section, newValue, animate = true) {
    const currentValue = section.dataset.value;

    const staticTop = section.querySelector(".static-top .flip-value");
    const staticBottom = section.querySelector(".static-bottom .flip-value");
    const topFlap = section.querySelector(".top-flap .flip-value");
    const bottomFlap = section.querySelector(".bottom-flap .flip-value");

    if (!currentValue || !animate) {
        staticTop.textContent = newValue;
        staticBottom.textContent = newValue;
        topFlap.textContent = newValue;
        bottomFlap.textContent = newValue;

        section.dataset.value = newValue;
        return;
    }

    if (currentValue === newValue) {
        return;
    }

    staticTop.textContent = newValue;
    staticBottom.textContent = currentValue;

    topFlap.textContent = currentValue;
    bottomFlap.textContent = newValue;

    section.classList.remove("flipping");

    void section.offsetWidth;

    section.classList.add("flipping");

    const bottomFlapElement = section.querySelector(".bottom-flap");

    bottomFlapElement.addEventListener(
        "animationend",
        () => {
            staticTop.textContent = newValue;
            staticBottom.textContent = newValue;
            topFlap.textContent = newValue;
            bottomFlap.textContent = newValue;

            section.dataset.value = newValue;
            section.classList.remove("flipping");
        },
        { once: true }
    );
}

updateTime(false);

setInterval(() => {
    updateTime(true);
}, 1000);