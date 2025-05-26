document.addEventListener('DOMContentLoaded', function() {
    const indigoColors = [
        '#131925', '#0e1b40', '#1A3338', '#1F0954', 
        '#240952', '#2b0071', '#2C106A', '#2d2643', 
        '#2F314E', '#32127A', '#330099', '#36285B', 
        '#382080', '#38417E', '#393e4f', '#3e285c', 
        '#3F0FB7', '#35586C', '#264348', '#00416A',
        '#002395', '#006CA9', '#4A128E', '#4C367E', 
        '#4A4067', '#4A556B', '#4B0082', '#4C3957', 
        '#4C5E87', '#4E6172', '#4f4352', '#485479', 
        '#484D6D', '#695A78', '#6D5ACF', '#6F00EE', 
        '#6f00fe', '#6F00FF', '#726EFF', '#7B00FF',
        '#8686AF', '#8A2BE2', '#9457eb', '#da70d6', 
        '#9683EC', '#9892B1'
    ];

    const randomDiv = document.getElementById('random');
    randomDiv.innerHTML = '';
    randomDiv.style.display = 'grid';
    randomDiv.style.gridTemplateColumns = 'repeat(5, 2rem)';
    randomDiv.style.gridTemplateRows = 'repeat(5, 2rem)';
    randomDiv.style.width = '10rem';
    randomDiv.style.height = '10rem';
    randomDiv.style.overflow = 'hidden';
    randomDiv.style.gap = '0';

    const boxSize = 5; // rem
    const cols = 5;
    const rows = 5;
    const boxes = [];

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const box = document.createElement('div');
            box.style.width = box.style.height = boxSize + 'rem';
            box.style.background = indigoColors[Math.floor(Math.random() * indigoColors.length)];
            box.style.transition = 'background 5.3s';
            randomDiv.appendChild(box);
            boxes.push(box);
        }
    }

    setInterval(() => {
        for (let i = 0; i < boxes.length; i++) {
            if (Math.random() < 0.25) {
                boxes[i].style.background = indigoColors[Math.floor(Math.random() * indigoColors.length)];
            }
        }
    }, 120);
});