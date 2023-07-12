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
const photoGrid = document.getElementById("photo-grid");
let imageIndexes = [];
let amountOfPicures = 140; // <============== Amount of pictures in folder "Pictures"

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeRandomImage() {
  const cells = photoGrid.querySelectorAll(".cell");
  const randomIndex = getRandomInt(0, cells.length - 1);
  const cell = cells[randomIndex];
  const image = cell.querySelector("img");
  const randomImageIndex = checkDouble(); //getRandomInt(1, amountOfPicures);
  const imageUrl = `Pictures/${randomImageIndex}.jpg`;
  image.setAttribute("src", imageUrl);
}

// Check if random picture exists
function checkDouble() {
  const randomImageIndex = getRandomInt(1, amountOfPicures);

  imageIndexes.includes(randomImageIndex)
    ? console.log("Image already in use: " + randomImageIndex)
    : imageIndexes.push(randomImageIndex);

  imageIndexes.length == 50 ? (imageIndexes = []) : null;

  console.log("Array: " + imageIndexes);
  console.log("Image: " + imageIndexes[imageIndexes.length - 1]);

  return randomImageIndex;
}

setInterval(changeRandomImage, getRandomInt(5000, 10000));

// Load initial images
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  const link = document.createElement("a");
  const image = document.createElement("img");
  const randomImageIndex = checkDouble(); //getRandomInt(1, amountOfPicures);
  const imageUrl = `Pictures/${randomImageIndex}.jpg`;
  image.setAttribute("src", imageUrl);
  link.setAttribute("href", imageUrl);
  // Random picture link
  // link.setAttribute("href", "https://picsum.photos/2560/1600");

  link.appendChild(image);
  cell.appendChild(link);
  photoGrid.appendChild(cell);
}
