// import {getDescription} from "scripts/helpers.js";
// getDescription = require("scripts/helpers.js");

const input = document.querySelector("#input");
const output = document.querySelector("#output");

/*
function getDescription(text) {    
    console.log(text); // write something in the BROWSER and see it in the console
    return text.substring(0,10);
}

input.addEventListener("input", (event) => {
    output.textContent = getDescription(event.currentTarget.value);
});
*/


// Same as above but use arrow
// getDescription = (text) => {console.log(text); return text.substring(0, 10);}

// or more simplified
// getDescription = (text) => text.substring(0, 10);

// or even more simplified
getDescription = text => text.substring(0, 10);

input.addEventListener("input", (event) => {
    output.textContent = getDescription(event.currentTarget.value);
});

let age = prompt("How old are you", 18);

let welcome = (age < 18) ?
  () => alert('Hi') :
  () => alert("Hello!");

welcome();

