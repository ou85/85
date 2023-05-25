// Note: This assumes that all of your images are named "imgX.jpg" where X is a number from 0 to 999,
// and that they are all located in the "Pictures" folder in the same directory as your HTML file.
// If your file names or folder structure is different,
// you will need to modify the JavaScript code accordingly.

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

// Note that this function assumes that you have already authenticated the user and loaded the Google Drive API client library.
// The function uses the gapi.client.drive.files.list() method to list all JPEG image files in the "Pictures" folder and returns the number of files.
// The number is then printed to the console using console.log().

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

let pics = getNumberOfFiles();
console.log(pics); // Output should be: 130
let amountOfPicures = 131; // <========================= Amount of pictures in folder "Pictures"
pics != undefined || null ? (amountOfPicures = pics) : (amountOfPicures = 131);
// const amountOfPicures = 130; // <========================= Amount of pictures in folder "Pictures"
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
}

function handleDivUpdate() {
  // Start the fade-out effect
  div.style.opacity = 1;
  let fadeEffect = setInterval(function () {
    if (!div.style.opacity) {
      div.style.opacity = 1;
    }
    if (div.style.opacity < 0.1) {
      clearInterval(fadeEffect);
      div.style.display = "none";
    } else {
      div.style.opacity -= 0.1;
    }
  }, 1000 / 10);
}

setInterval(changeRandomImage, getRandomInt(5000, 10000));

// Load initial images
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  const image = document.createElement("img");
  const randomImageIndex = getRandomInt(1, amountOfPicures);
  const imageUrl = `Pictures/${randomImageIndex}.jpg`;
  image.setAttribute("src", imageUrl);

  cell.appendChild(image);
  photoGrid.appendChild(cell);
}
