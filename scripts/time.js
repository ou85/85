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
  
      // New York
      current = new Date();
      gap = -14;
      var nm = current.getMinutes();
      document.getElementById("nym").innerHTML = (nm < 10 ? '0' : '') + nm;          
      var nyh = current.getHours();
      current.setHours(nyh + gap);
      document.getElementById("nyh").innerHTML = (current.getHours() < 10 ? '0' : '') + current.getHours();


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
   
   var ny = new Date() - (840 * 60 * 1000); 
   var current = new Date();

   console.log(current);
   console.log(ny.toString());   
     
   const hours = current.getHours();
   const mnth = current.getMonth() + 1;
   var wkd = current.getDay(); 
   var weekday = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"); 
   // Local. Tokyo
   document.getElementById("current").innerHTML = current.getFullYear()  + "." + 
                                               mnth + "." + (
                                               current.getDate() < 10 ? '0' : '') + 
                                               current.getDate() + ", " +
                                               weekday[wkd]; 
   // Las Vegas
   var gap = 17;
   current = new Date();                                           
   current.setHours(hours - gap); 
   wkd = current.getDay();  
   document.getElementById("lasv").innerHTML = current.getFullYear()  + "." + 
                                               mnth + "." + (
                                               current.getDate() < 10 ? '0' : '') + 
                                               current.getDate() + ", " +
                                               weekday[wkd];
   // London                                               
   gap = -9; 
   current = new Date(); 
   current.setHours(hours - gap);                                         
   wkd = current.getDay();  
   document.getElementById("london").innerHTML = current.getFullYear()  + "." + 
                                               mnth + "." + (
                                               current.getDate() < 10 ? '0' : '') + 
                                               current.getDate() + ", " +
                                               weekday[wkd];
   // New York 
   gap = 14;
   current = new Date();  
   current.setHours(hours - gap);                                         
   wkd = current.getDay();  
   document.getElementById("ny").innerHTML = current.getFullYear()  + "." + 
                                               mnth + "." + (
                                               current.getDate() < 10 ? '0' : '') + 
                                               current.getDate() + ", " +
                                               weekday[wkd];