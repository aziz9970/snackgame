const container = document.getElementById('game-container');
const food = document.getElementById('food');
let snake = [{x: 0, y: 0}];
let direction = {x: 1, y: 0};
const step = 20; // Size of each step

document.addEventListener('keydown', changeDirection);
setInterval(moveSnake, 200);

function changeDirection(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction.y === 0) {
        direction = {x: 0, y: -1};
    } else if (key === 'ArrowDown' && direction.y === 0) {
        direction = {x: 0, y: 1};
    } else if (key === 'ArrowLeft' && direction.x === 0) {
        direction = {x: -1, y: 0};
    } else if (key === 'ArrowRight' && direction.x === 0) {
        direction = {x: 1, y: 0};
    }
}

function moveSnake() {
    const head = {x: snake[0].x + direction.x * step, y: snake[0].y + direction.y * step};

    // Check for collisions with the walls
    if (head.x < 0 || head.x >= container.clientWidth || head.y < 0 || head.y >= container.clientHeight) {
        alert("Game Over!");
        window.location.reload();
        return;
    }

    // Check for collisions with itself
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert("Game Over!");
            window.location.reload();
            return;
        }
    }

    snake.unshift(head);

    // Check if the snake has eaten the food
    if (head.x === parseInt(food.style.left) && head.y === parseInt(food.style.top)) {
        placeFood();
    } else {
        snake.pop();
    }

    drawSnake();
}

function drawSnake() {
    container.querySelectorAll('.snake').forEach(segment => segment.remove());
    snake.forEach(segment => {
        const segmentElement = document.createElement('div');
        segmentElement.style.left = `${segment.x}px`;
        segmentElement.style.top = `${segment.y}px`;
        segmentElement.classList.add('snake');
        container.appendChild(segmentElement);
    });
}

function placeFood() {
    const foodX = Math.floor(Math.random() * (container.clientWidth / step)) * step;
    const foodY = Math.floor(Math.random() * (container.clientHeight / step)) * step;
    food.style.left = `${foodX}px`;
    food.style.top = `${foodY}px`;
}

// Initial placement of food
placeFood();
