window.onload = function() {
    setInterval(function() {    
  
      // London
      var current = new Date();
      var gap = -9;
      var mL = current.getMinutes();
      document.getElementById("m").innerHTML = (mL < 10 ? '0' : '') + mL;         
      var hL = current.getHours();
      current.setHours(hL + gap);
      document.getElementById("London").innerHTML = (current.getHours() < 10 ? '0' : '') + current.getHours();
  
      // Las Vegas
      current = new Date();
      gap = -17;
      var mv = current.getMinutes();
      document.getElementById("mv").innerHTML = (mv < 10 ? '0' : '') + mv;          
      var hv = current.getHours();
      current.setHours(hv + gap);
      document.getElementById("hv").innerHTML = (current.getHours() < 10 ? '0' : '') + current.getHours();
  
      // Local Time 
      // Seconds
      // var seconds = new Date().getSeconds();
      // document.getElementById("seconds").innerHTML = (seconds < 10 ? '0' : '') + seconds;    
      var minutes = new Date().getMinutes();      // Minutes
      document.getElementById("minutes").innerHTML = (minutes < 10 ? '0' : '') + minutes;    
      var hours = new Date().getHours();          // Hours
      document.getElementById("hours").innerHTML = (hours < 10 ? '0' : '') + hours;
    }, 1000);
  }
  
 
   var current = new Date();
   var ny = new Date() - (840 * 60 * 1000); 
  
   console.log(current);
   console.log(ny.toString()); 
  
   var weekday = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"); 
   var gap = 17;                        // Las Vegas
   var hours = current.getHours();
   var wkd = current.getDay(); 
   document.getElementById("current").innerHTML = current.getFullYear()  + "." + 
                                               current.getMonth() + "." + (
                                               current.getDate() < 10 ? '0' : '') + 
                                               current.getDate() + ", " +
                                               weekday[wkd]; 
   current.setHours(hours - gap); 
   wkd = current.getDay();  
   document.getElementById("lasv").innerHTML = current.getFullYear()  + "." + 
                                               current.getMonth() + "." + (
                                               current.getDate() < 10 ? '0' : '') + 
                                               current.getDate() + ", " +
                                               weekday[wkd];
   gap = -9;                        // London   
   current.setHours(hours - gap);                                         
   wkd = current.getDay();  
   document.getElementById("london").innerHTML = current.getFullYear()  + "." + 
                                               current.getMonth() + "." + (
                                               current.getDate() < 10 ? '0' : '') + 
                                               current.getDate() + ", " +
                                               weekday[wkd];