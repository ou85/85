// Changing h1 tag in html
// var myHeading = document.querySelector('h1');
// myHeading.textContent = 'Hello world!'

// Alert by clicking on <h1>
/* document.querySelector('h1').onclick = function() {
  alert('Ouch! Stop poking me!');
} */

var myImage = document.querySelector('img');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/firefox-icon.png') {
      myImage.setAttribute ('src','images/firefox2.png');
    } else {
      myImage.setAttribute ('src','images/firefox-icon.png');
    }
}

var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function setUserName() {
    var myName = prompt('Please enter your name.');        
    if(!myName) {
       setUserName();
    }  else {     
       localStorage.setItem('name', myName);
       myHeading.textContent = 'Mozilla is cool, ' + myName;
    }
}

if(!localStorage.getItem('name')) {
    setUserName();
  } else {
    var storedName = localStorage.getItem('name');
    myHeading.textContent = 'Mozilla is cool, ' + storedName;
}

myButton.onclick = function() {
    setUserName();
}