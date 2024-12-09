function updateTime() {
    const now = new Date();
   
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
   
    const date = now.toLocaleDateString('en-GB');
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
 
    updateFlip('.flip-section:nth-child(1)', hours);
    updateFlip('.flip-section:nth-child(2)', minutes);
  
    document.querySelector('.date').textContent = date;
    document.querySelector('.day').textContent = day;
  }
  
  function updateFlip(sectionSelector, newTime) {
    const section = document.querySelector(sectionSelector);
    const topNumber = section.querySelector('.top');
    const bottomNumber = section.querySelector('.bottom');
  
    if (topNumber.textContent !== newTime) {
      topNumber.textContent = newTime;
      bottomNumber.textContent = newTime;
      section.classList.add('flip');
  
      setTimeout(() => {
        section.classList.remove('flip');
      }, 600);
    }
  }

  setInterval(updateTime, 1000);
  updateTime();
  