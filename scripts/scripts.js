document.write("<h2>Pushing JavaScript</h2></br>");              // выводим заголовок
document.write("Hello World!</br>");                             // выводим обычный текс


// Webpage lifespan
function lifeSite() {

  // "January", "February", "March", "April", "May", "June",   "July", "August", "September", "October", "November", "December"
  var start = new Date('December 1, 2021'); // Дата создания сайта
  var end = new Date();
  var life = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  // var suffix = new Array("день", "дня", "дней");
  var suffix = new Array("day", "days", "days");
  var keys = [2, 0, 1, 1, 1, 2];
  var mod = life % 100;
  var suffix_key = mod > 4 && mod < 20 ? 2 : keys[Math.min(mod%10, 5)];
    document.getElementById("life_site").innerHTML = life + " " + suffix[suffix_key];
}



function multiply(num1, num2) {
  let result = num1 * num2;
  return result;
}

/* Try running this in the console; then test with several arguments. For example:

multiply(4, 7);
multiply(20, 20);
multiply(0.5, 3);
*/

// Daily income
function dayRate(ratePerHour) {
    return 8 * ratePerHour;
  }

let age = 12;
let year = 2021;

// comment
console.log(age, year);

age = 23;
console.log(age);

/* const birthYear = 1920;
console.log(birthYear); */


/********************************************/

// STRINGS

console.log(' ');
console.log("STRINGS");

let email = 'mario@cart.co.uk';
console.log('String: ', email);

// string concatenation
let firsName = 'Joe';
let secondName = 'Mo';

let fullName = firsName + ' ' + secondName;

console.log(fullName);

// getting characters
console.log(fullName[0]);

// string length
console.log(fullName.length);

// string methodds
console.log(fullName.toUpperCase());
let result = fullName.toLowerCase();
console.log(result);

let index = email.indexOf('@');
console.log(`index of '@' in ${email}: `, index);

// common string methods
result = email.lastIndexOf('o');
console.log('LastIndexOf("o"): ', result);

result = email.slice(1, 11);
console.log('slice(1, 11): ', result);

result = email.substring(1, 11);
console.log('substing(1, 11): ', result);

result = email.substr(1, 11);                // old function
console.log('substr(1, 11): ', result);

result = email.replace('a', 'b');
console.log('replace a to b: ', result)


// NUMBERS

console.log(' ');
console.log("NUMBERS");

let radius = 10;
const p = 3.1415;

console.log(radius, p);

// math operators +, -, *, /, **, %

result = radius % 3;
console.log(result);

// circle area
result = p * radius**2;
console.log(result);

                        // order of operation B I D M A S
                        // Brackets ()        4 + (2*5) = 14
                        // Indices **         2**3 = 8
                        // Division /         20/4 = 5
                        // Multiplication *   2*3 = 6
                        // Addidion           2*2 + 4 = 8
                        // Substraction       (3 + 2) - 1 = 4

let likes = 10;
console.log(likes);

likes = likes + 1;
console.log(likes);

likes ++; //----->    likes = likes + 1;
console.log(likes);

likes += 10;
console.log(likes);

likes /= 2;
console.log(likes);

// Not a Number
console.log(5 / 'hello');

result = 'the blog has ' + likes + ' likes';
console.log(result);


// Tamplate strings
console.log(' ');
console.log('Tamplate strings');
const title = 'Best book';
const author = 'Mario';
likes = 300;

// concatenation way
result = 'The blog called ' + title + ' by ' + author + ' has ' + likes + ' likes';
console.log(result);

// template string way
result = `The blog called ${title} by ${author} has ${likes} likes.`;
console.log(result);

// creating html templates
let html = `
  <h2>${title}</h2>
  <p>By ${author}</p>
  <span>This article seen ${likes} times. </span>
  <br></br>
`;

console.log(html);
document.write("Book: ", html);

document.getElementById("blog").innerHTML = html;


// ARRAYS

console.log(' ');
console.log('ARRAYS');

let ninjas = ['shaun', 'ryu', 'chun-li'];
console.log(ninjas);        // => shaun ryu chun-li
console.log(ninjas[0]);     // => shaun

ninjas[1] = 'ken';
console.log("Ninjas: ", ninjas);        // => shaun ken chun-li


      

// .random
let random = ['shaun', 'crystal', 20, 30];
console.log('Random: ',random);                       // => shaun crystal 20 30

console.log('Length of random: ', random.length);     // => 4

// .join
result = ninjas.join('+');
console.log("Join method: ", result);                 // => shaun+ken+chun-li

// .index
console.log(ninjas);
result = ninjas.indexOf('chun-li');
console.log('The index of chun-li is: ', result);     // => 2
console.log("Ken is #", ninjas.indexOf('ken') + 1);   // => 2

//  .concat - array concatenation (adding one aray to another)
result = ninjas.concat(['ryu', 'boo']);
console.log(result);

//  .filter
const numbers = [1, 2, 3, 4];
const evenNumbers = numbers.filter((number) => { return number % 2 === 0 });
console.log(evenNumbers);

const characters = [
  {id: 1, name:"Ken the Ninja", age: 14},
  {id: 2, name:"Ben the Baby Ninja", age: 5},
  {id: 3, name:"Master Wooly", age: 100}
];

// get characters younger than 20, and assign them to the underTwenty constant
const underTwenty = characters.filter((character) => { return character.age < 20 });
console.log(underTwenty);

//  .each
underTwenty.forEach((arg) => {console.log(arg.id)});
underTwenty.forEach((arg) => {console.log(arg.name)});

// Print each element of the characters array
document.write("<span>..</span>");
characters.forEach((char) => document.write( `<p>${char.name} is ${char.age} years old </p>` ));

// Print each element yunger than 20, which stored in the underTwenty constant
document.write("<span>..</span>");
document.write("<p>Yonger than 20:</p>")
underTwenty.forEach((arg) => {document.write(`<p>- ${arg.name}</p>`)});

// .map - apply code to each element of an array
const numbs = [1, 2, 3, 4];
const doubledNumbers = numbs.map((number) => { return number * 2; });
console.log(doubledNumbers);

const names = [
  {firstName: "Kate", lastName: "Jones"},
	{firstName: "John", lastName: "Smith"},
	{firstName: "Dennis", lastName: "Williams"},
	{firstName: "David", lastName: "Black"}
];

const fullNames = names.map((name) => {
  return name.firstName + " " + name.lastName;
});

console.log(fullNames);


// for loop
const animals = ["dog", "cat", "sheep", "rabbit", "monkey", "tiger", "bear", "elephant"];

// Use the length property to replace the condition
for (let i = 0; i < animals.length; i++) {
  console.log(animals[i]);
}

// ARRAYS in OBJECTS
const charactrs = [
  {name: "Ken the Ninja", age: 14},
  {name: "Master Wooly", age: 100},
  {name: "Ben the Baby Ninja", age: 5},
];

for (let i = 0; i < charactrs.length; i++) {
  console.log("--------------------");  
  const character = charactrs[i];  
  console.log(`My name is ${character.name}`);  
  console.log(`I am ${character.age} years old`);  
  document.write("<span>...</span>")
  document.write(`<p>My name is ${character.name}</p>`);  
  document.write(`<p>I am ${character.age} years old</p>`);  

}