const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const bestScoreElement = document.getElementById('best-score'); 

// Emoji font size
ctx.font = '30px Arial';

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 5,
    emoji: '🐭'
};

const cheese = {
    x: Math.random() * (canvas.width - 40) + 20,
    y: Math.random() * (canvas.height - 40) + 20,
    emoji: '🧀'
};

const cat = {
    x: Math.random() * (canvas.width - 40) + 20,
    y: Math.random() * (canvas.height - 40) + 20,
    speed: 2,
    active: false,
    timer: 0,
    emoji: '🐱',
    direction: { x: 0, y: 0 },
    angle: 0,
    circling: false
};

const house = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 57,
    emoji: '🏠'
};

let score = 0;
let gameOver = false;

let mousePosition = { x: mouse.x, y: mouse.y };

// Get "Best Score" from localStorage or set to 0
let bestScore = localStorage.getItem('bestScore') || 0;
bestScore = parseInt(bestScore, 10);
bestScoreElement.textContent = 'Best Score: ' + bestScore;

// Add mousemove event listener to update mouse position
canvas.addEventListener('mousemove', updateMousePosition);

function updateMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    mousePosition.x = e.clientX - rect.left;
    mousePosition.y = e.clientY - rect.top;
}

function updateMouse() {
    // Smooth mouse movement to cursor position
    let dx = mousePosition.x - mouse.x;
    let dy = mousePosition.y - mouse.y;
    let distance = Math.hypot(dx, dy);

    if (distance > mouse.speed) {
        mouse.x += (dx / distance) * mouse.speed;
        mouse.y += (dy / distance) * mouse.speed;
    } else {
        mouse.x = mousePosition.x;
        mouse.y = mousePosition.y;
    }
}

function spawnCat() {
    cat.active = true;
    cat.x = Math.random() * (canvas.width - 40) + 20;
    cat.y = Math.random() * (canvas.height - 40) + 20;
    cat.angle = Math.atan2(cat.y - house.y, cat.x - house.x); // Angle initial value
}

function updateCat() {
    if (cat.active) {
        let dx = mouse.x - cat.x;
        let dy = mouse.y - cat.y;
        let distanceToMouse = Math.hypot(dx, dy);

        if (isCatNearHouse()) {
            // Cat avoids house
            avoidHouse();
        } else if (isMouseInHouse()) {
            // Cat circles around the house
            cat.circling = true;
            circleAroundHouse();
        } else {
            // Cat chases the mouse
            cat.circling = false;
            if (distanceToMouse > 1) {
                cat.direction.x = (dx / distanceToMouse);
                cat.direction.y = (dy / distanceToMouse);
                cat.x += cat.direction.x * cat.speed;
                cat.y += cat.direction.y * cat.speed;
            }
        }

        // Check collision with the mouse if the mouse is not in the house
        if (!isMouseInHouse()) {
            if (distanceToMouse < 20) { // Collision check
                gameOver = true;

                // Best Score update
                if (score > bestScore) {
                    bestScore = score;
                    localStorage.setItem('bestScore', bestScore);
                    bestScoreElement.textContent = 'Best Score: ' + bestScore;
                }
            }
        }
    } else {
        cat.timer++;
        if (cat.timer > 300) { // Every ~5 secinds at 60 FPS
            spawnCat();
            cat.timer = 0;
        }
    }
}

function isMouseInHouse() {
    let dx = mouse.x - house.x;
    let dy = mouse.y - house.y;
    let distance = Math.hypot(dx, dy);

    return distance < house.size / 2;
}

function isCatNearHouse() {
    let dx = cat.x - house.x;
    let dy = cat.y - house.y;
    let distance = Math.hypot(dx, dy);

    return distance < (house.size / 2 + 20); // Extra space around the house
}

function avoidHouse() {
    // Calculate distance between the cat and the house
    let dx = cat.x - house.x;
    let dy = cat.y - house.y;
    let distance = Math.hypot(dx, dy);

    if (distance > 0) {
        // Push the cat away from the house
        cat.direction.x = (dx / distance);
        cat.direction.y = (dy / distance);
        cat.x += cat.direction.x * cat.speed;
        cat.y += cat.direction.y * cat.speed;
    } else {
        // Если кошка точно в центре домика, перемещаем ее случайно
        cat.x += (Math.random() - 0.5) * cat.speed * 2;
        cat.y += (Math.random() - 0.5) * cat.speed * 2;
    }
}

function circleAroundHouse() {
    // Радиус кружения кошки вокруг домика
    const radius = house.size;
    // Увеличиваем угол для движения по окружности
    cat.angle += 0.01; // Скорость кружения (можно настроить)
    // Обновляем позицию кошки по окружности вокруг домика
    cat.x = house.x + Math.cos(cat.angle) * (radius + 20); // +20 чтобы кошка не заходила на территорию домика
    cat.y = house.y + Math.sin(cat.angle) * (radius + 20);
}

function checkCheeseCollision() {
    let dx = mouse.x - cheese.x;
    let dy = mouse.y - cheese.y;
    let distance = Math.hypot(dx, dy);

    if (distance < 20) { // Проверка столкновения с сыром
        score++;
        scoreElement.textContent = 'Score: ' + score;
        cheese.x = Math.random() * (canvas.width - 40) + 20;
        cheese.y = Math.random() * (canvas.height - 40) + 20;
    }
}

function drawMouse() {
    ctx.fillText(mouse.emoji, mouse.x - 15, mouse.y + 15);
}

function drawCheese() {
    ctx.fillText(cheese.emoji, cheese.x - 15, cheese.y + 15);
}

function drawCat() {
    if (cat.active) {
        ctx.fillText(cat.emoji, cat.x - 15, cat.y + 15);
    }
}

function drawHouse() {
    ctx.fillText(house.emoji, house.x - 25, house.y + 25);
}

function drawGameOver() {
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '48px Arial';
        ctx.fillText('GAME OVER', canvas.width / 2 - 150, canvas.height / 2);

        ctx.font = '36px Arial';
        let text = 'Your Score: ' + score;
        let textWidth = ctx.measureText(text).width;
        ctx.fillText(text, (canvas.width - textWidth) / 2, canvas.height / 2 + 50);
        
        text = 'Best Score: ' + bestScore;
        textWidth = ctx.measureText(text).width;
        ctx.fillText(text, (canvas.width - textWidth) / 2, canvas.height / 2 + 90);
        
        ctx.font = '24px Arial';
        text = 'To restart, press R';
        textWidth = ctx.measureText(text).width;
        ctx.fillText(text, (canvas.width - textWidth) / 2, canvas.height / 2 + 130);
    }
}

// Добавляем возможность перезапуска игры
document.addEventListener('keydown', function(e) {
    if (gameOver && e.key.toLowerCase() === 'r') {
        restartGame();
    }
});

function restartGame() {
    // Сброс переменных игры
    score = 0;
    scoreElement.textContent = 'Score: ' + score;
    gameOver = false;

    // Сброс позиций объектов
    mouse.x = canvas.width / 2;
    mouse.y = canvas.height / 2;
    mousePosition.x = mouse.x;
    mousePosition.y = mouse.y;

    cat.active = false;
    cat.timer = 0;
    cat.x = Math.random() * (canvas.width - 40) + 20;
    cat.y = Math.random() * (canvas.height - 40) + 20;

    cheese.x = Math.random() * (canvas.width - 40) + 20;
    cheese.y = Math.random() * (canvas.height - 40) + 20;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHouse();
    drawCheese();
    drawMouse();
    drawCat();
    drawGameOver();
}

function update() {
    if (!gameOver) {
        updateMouse();
        updateCat();
        checkCheeseCollision();
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
