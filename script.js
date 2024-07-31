const icons = [
    '🍎', '🍌', '🍒', '🍇', '🍉', '🍍', '🥭', '🍑', '🍓', '🍅'
];

let score = 0;
let misses = 0;
let timeElapsed = 0;
let gameInterval;
let iconInterval;
let timerInterval;
let isPaused = false;
const scoreDisplay = document.getElementById('score');
const missesDisplay = document.getElementById('misses');
const timerDisplay = document.getElementById('timer');
const exampleIcon = document.getElementById('example-icon');
const iconBar = document.getElementById('icon-bar');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const restartButton = document.getElementById('restart-button');
let exampleIconChar = '';

startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);
restartButton.addEventListener('click', restartGame);

function setRandomExampleIcon() {
    exampleIconChar = icons[Math.floor(Math.random() * icons.length)];
    exampleIcon.innerText = exampleIconChar;
}

function createIconElement(char) {
    const iconElement = document.createElement('div');
    iconElement.className = 'icon';
    iconElement.innerText = char;
    iconElement.style.left = '600px';
    iconElement.onclick = () => {
        if (iconElement.classList.contains('clicked')) {
            return;
        }
        iconElement.classList.add('clicked');
        if (char === exampleIconChar) {
            score++;
        } else {
            score--;
        }
        scoreDisplay.innerText = `Score: ${score}`;
    };
    return iconElement;
}

function scrollIcons() {
    const iconElements = document.querySelectorAll('.icon');
    iconElements.forEach(icon => {
        let left = parseInt(icon.style.left);
        if (left <= -80) {
            if (icon.innerText === exampleIconChar && !icon.classList.contains('clicked')) {
                misses++;
                missesDisplay.innerText = `Misses: ${misses}`;
            }
            icon.remove();
        } else {
            icon.style.left = `${left - 5}px`;
        }
    });
}

function addNewIcon() {
    const iconElements = document.querySelectorAll('.icon');
    const lastIcon = iconElements[iconElements.length - 1];
    if (!lastIcon || parseInt(lastIcon.style.left) <= 520) {
        const randomIconChar = icons[Math.floor(Math.random() * icons.length)];
        const newIcon = createIconElement(randomIconChar);
        iconBar.appendChild(newIcon);
    }
}

function startGame() {
    score = 0;
    misses = 0;
    timeElapsed = 0;
    isPaused = false;
    scoreDisplay.innerText = `Score: ${score}`;
    missesDisplay.innerText = `Misses: ${misses}`;
    timerDisplay.innerText = `Time: ${timeElapsed}s`;
    setRandomExampleIcon();
    clearInterval(gameInterval);
    clearInterval(iconInterval);
    clearInterval(timerInterval);
    gameInterval = setInterval(scrollIcons, 100);
    iconInterval = setInterval(addNewIcon, 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

function pauseGame() {
    if (isPaused) {
        gameInterval = setInterval(scrollIcons, 100);
        iconInterval = setInterval(addNewIcon, 1000);
        timerInterval = setInterval(updateTimer, 1000);
        pauseButton.innerText = 'Pause Game';
    } else {
        clearInterval(gameInterval);
        clearInterval(iconInterval);
        clearInterval(timerInterval);
        pauseButton.innerText = 'Resume Game';
    }
    isPaused = !isPaused;
}

function restartGame() {
    clearInterval(gameInterval);
    clearInterval(iconInterval);
    clearInterval(timerInterval);
    iconBar.innerHTML = '';
    startGame();
}

function updateTimer() {
    timeElapsed++;
    timerDisplay.innerText = `Time: ${timeElapsed}s`;
}
