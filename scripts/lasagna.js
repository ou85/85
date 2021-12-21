const PREPARATION_MINUTES_PER_LAYER = 2;
const EXPECTED_MINUTES_IN_OVEN = 40;        // The number of minutes it takes to prepare a single layer.
var numberOfLayers = 5;
var actualMinutesInOven = 22;

console.log(`Making lasagna`)

// Determines the number of minutes the lasagna still needs to remain in the
// oven to be properly prepared.
function remainingMinutesInOven(actualMinutesInOven) {
  return EXPECTED_MINUTES_IN_OVEN - actualMinutesInOven;
}
var remTime = remainingMinutesInOven(actualMinutesInOven);

// Given a number of layers, determines the total preparation time.
function preparationTimeInMinutes(numberOfLayers) {
  return  numberOfLayers * PREPARATION_MINUTES_PER_LAYER;
}
var prepTime = preparationTimeInMinutes(numberOfLayers);
console.log("Prepare ingridients", prepTime);

// Calculates the total working time. That is, the time to prepare all the layers
// of lasagna, and the time already spent in the oven.
function totalTimeInMinutes() {
  return actualMinutesInOven + prepTime;
}
var spendTime = totalTimeInMinutes();

document.write("<h3>Making lasagna</h3>");
document.write("<strong>Prepare ingridients: </strong>", prepTime);
document.write("<br/><strong>Time in oven: </strong>", actualMinutesInOven);
document.write("<br/><strong>Spended cooking time: </strong>", spendTime);
document.write("<br></br>");
console.log("Time in oven:", actualMinutesInOven);
console.log("Spended cooking time:", spendTime);
console.log("Time still need to cook:", remTime);
