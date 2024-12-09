console.clear();

function CountdownTracker(value) {
  var el = document.createElement('span');

  el.className = 'flip-clock__piece';
  el.innerHTML = '<b class="flip-clock__card card">' +
    '<b class="card__top"></b>' +
    '<b class="card__bottom"></b>' +
    '<b class="card__back"><b class="card__bottom"></b></b></b>';

  this.el = el;

  var top = el.querySelector('.card__top'),
      bottom = el.querySelector('.card__bottom'),
      back = el.querySelector('.card__back'),
      backBottom = el.querySelector('.card__back .card__bottom');

  this.update = function(val) {
    val = ('0' + val).slice(-2);
    if (val !== this.currentValue) {
      if (this.currentValue >= 0) {
        back.setAttribute('data-value', this.currentValue);
        bottom.setAttribute('data-value', this.currentValue);
      }
      this.currentValue = val;
      top.innerText = this.currentValue;
      backBottom.setAttribute('data-value', this.currentValue);

      this.el.classList.remove('flip');
      void this.el.offsetWidth;
      this.el.classList.add('flip');
    }
  }

  this.update(value);
}

function getTimeRemaining(endtime) {
  Date.parse(endtime) - Date.parse(new Date());
}

function getTime() {
  var t = new Date();
  return {
    'Total': t,
    'H': t.getHours() % 24,
    'M': t.getMinutes(),
    'S': t.getSeconds() % 60,
  
  };
}

function Clock(callback) {
  new Date(Date.parse());
  var updateFn = getTime;

  this.el = document.createElement('div');
  this.el.className = 'flip-clock';

  var trackers = {},
      t = updateFn(),
      key, timeinterval;

  for ( key in t ){
    if ( key === 'Total' ) { continue; }
    trackers[key] = new CountdownTracker(key, t[key]);
    this.el.appendChild(trackers[key].el);
  }

  var i = 0;
  function updateClock() {
    timeinterval = requestAnimationFrame(updateClock);
    
    // throttle so it's not constantly updating the time.
    if ( i++ % 10 ) { return; }
    
    var t = updateFn();
    if ( t.Total < 0 ) {
      cancelAnimationFrame(timeinterval);
      for ( key in trackers ){
        trackers[key].update( 0 );
      }
      callback();
      return;
    }
    
    for ( key in trackers ){
      trackers[key].update( t[key] );
    }
  }

  setTimeout(updateClock,500);
}

var deadline = new Date(Date.parse(new Date()) + 12 * 24 * 60 * 60 * 1000);
var c = new Clock();
document.body.appendChild(c.el);

// Hide seconds on page load
document.addEventListener('DOMContentLoaded', function() {
  var seconds = document.querySelector('.flip-clock__piece:nth-child(3)');
  if (seconds) {
    seconds.style.display = 'none';
  }
});

// Toggle seconds visibility
document.getElementById('toggle-seconds').addEventListener('click', function() {
  var seconds = document.querySelector('.flip-clock__piece:nth-child(3)');
  if (seconds) {
    seconds.style.display = seconds.style.display === 'none' ? 'inline-block' : 'none';
  }
});