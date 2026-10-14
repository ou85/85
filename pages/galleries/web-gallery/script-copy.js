
// Set up clock
function updateClock() {
  const clockElement = document.getElementById("clock");
  const day = document.getElementById("dayOfWeek");
  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    // weekday: "short",
  });
  let days = now.getDay();
  clockElement.innerText = timeString;
  day.innerHTML = dayOfWeek[days];
}

setInterval(updateClock, 1000);

// Set up photo grid

function getNumberOfFiles() {
  console.log("Counter for pictures is loaded");
  const folderPath = "/webgallery/Pictures";
  let fileCount = 0;

  fetch(folderPath)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(html, "text/html");
      const fileList = htmlDoc.querySelectorAll("a[href]");
      fileList.forEach((fileLink) => {
        const fileName = fileLink.getAttribute("href").split("/").pop();
        if (
          fileName.endsWith(".jpg") ||
          fileName.endsWith(".jpeg") ||
          fileName.endsWith(".png")
        ) {
          fileCount++;
        }
      });
      console.log(`Number of files in "Pictures" folder is: ${fileCount}`);
      return fileCount;
    })
    .catch((error) => console.error(error));
}

function fadeIn(element) {
  let opacity = 0;
  element.style.display = "block";
  element.style.opacity = opacity;
  const fadeEffect = setInterval(() => {
    if (opacity < 1) {
      opacity += 0.2;
      element.style.opacity = opacity;
    } else {
      clearInterval(fadeEffect);
    }
  }, 1000 / 10);
}

getNumberOfFiles();

let amountOfPicures = 140; // <========================= Amount of pictures in folder "Pictures"

const photoGrid = document.getElementById("photo-grid");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeRandomImage() {
  const cells = photoGrid.querySelectorAll(".cell");
  const randomIndex = getRandomInt(0, cells.length - 1);
  const cell = cells[randomIndex];
  const image = cell.querySelector("img");
  const randomImageIndex = getRandomInt(1, amountOfPicures);
  const imageUrl = `Pictures/${randomImageIndex}.jpg`;
  image.setAttribute("src", imageUrl);
  // Fade out current image
  // fadeIn(image);
}

setInterval(changeRandomImage, getRandomInt(5000, 10000));

// Load initial images
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  const link = document.createElement("a");
  const image = document.createElement("img");
  const randomImageIndex = getRandomInt(1, amountOfPicures);
  const imageUrl = `Pictures/${randomImageIndex}.jpg`;
  image.setAttribute("src", imageUrl); 
  link.setAttribute("href", imageUrl);
  // Random picture link
  // link.setAttribute("href", "https://picsum.photos/2560/1600");

  link.appendChild(image);
  cell.appendChild(link);
  photoGrid.appendChild(cell);
  
}
