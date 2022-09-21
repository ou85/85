let tmonth = new Array(
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
);

let monthNum = new Array(
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
);

function GetClock() {
  let d = new Date();
  let nmonth = d.getMonth(),
    ndate = d.getDate(),
    nyear = d.getYear();

  if (nyear < 1000) nyear += 1900;

  let nhour = d.getHours(),
    nmin = d.getMinutes(),
    nsec = d.getSeconds();

  if (nmin <= 9) nmin = "0" + nmin;

  if (ndate <= 9) ndate = "0" + ndate;

  if (nsec <= 9) nsec = "0" + nsec;
}

// TIME

function clockTimer() {
  let date = new Date();
  let time = [date.getHours(), date.getMinutes()];
  let dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let days = date.getDay();

  if (time[0] < 10) {
    time[0] = "0" + time[0];
  }
  if (time[1] < 10) {
    time[1] = "0" + time[1];
  }

  let current_time = [time[0], time[1]].join(":");
  let clock = document.getElementById("clock");
  let day = document.getElementById("dayOfWeek");

  clock.innerHTML = current_time;
  day.innerHTML = dayOfWeek[days];

  setTimeout("clockTimer()", 1000);
}

window.onload = function () {
  GetClock();
  setInterval(GetClock, 1000);
  clockTimer();
  lifeSite(); // Calling lifeSite function from scripts/scripts.js
};
