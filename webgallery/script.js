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
  const folderPath = "/webgallery/Pictures";
  let fileCount = 0;

  return fetch(folderPath)
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
      return fileCount;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

getNumberOfFiles()
  .then((pics) => {
    console.log("Amount of pics: " + pics);

    let amountOfPicures = pics;
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
      // const randomImageIndex = getRandomInt(1, 135);
      const imageUrl = `Pictures/${randomImageIndex}.jpg`;
      image.setAttribute("src", imageUrl);
    }

    setInterval(changeRandomImage, getRandomInt(5000, 10000));

    // Load initial images
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const image = document.createElement("img");
      const randomImageIndex = getRandomInt(1, amountOfPicures);
      // const randomImageIndex = getRandomInt(1, 135);
      const imageUrl = `Pictures/${randomImageIndex}.jpg`;
      image.setAttribute("src", imageUrl);

      cell.appendChild(image);
      photoGrid.appendChild(cell);
    }

});