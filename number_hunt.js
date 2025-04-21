document.addEventListener('DOMContentLoaded', function() {
    let currentLevel = 1;
    let score = 0;
    let targetNumber = null; // Variable to hold the target number
    let timer; // Variable to hold the timer interval
    let timeRemaining; // Variable to hold the remaining time

    function setDifficulty() {
        const difficulty = document.getElementById('difficulty').value;
        switch (difficulty) {
            case 'easy':
                currentLevel = 5; // 5x5 grid
                break;
            case 'medium':
                currentLevel = 10; // 10x10 grid
                break;
            case 'hard':
                currentLevel = 20; // 20x20 grid
                break;
        }
    }
})
function startGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = ''; // Clear previous content
    timeRemaining = getTimeForDifficulty(); // Get time based on difficulty
    document.getElementById('time').innerText = timeRemaining; // Display initial time

    // Start the timer
    timer = setInterval(function() {
        timeRemaining--;
        document.getElementById('time').innerText = timeRemaining; // Update displayed time
        if (timeRemaining <= 0) {
            clearInterval(timer); // Stop the timer
            alert('TIME OVER! Your total score is: ' + score); // Notify the player with the score
            highlightTargetNumber(); // Highlight the target number
            startGame(); // Restart the game
        }
    }, 1000); // Update every second

    // Create a grid based on the current level
    const gridSize = currentLevel; // Level determines grid size
    const numbers = Array.from({ length: gridSize * gridSize }, (_, i) => i + 1); // Create an array of numbers
    shuffleArray(numbers); // Shuffle the numbers for random arrangement

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const numberElement = document.createElement('div');
            numberElement.innerText = numbers[row * gridSize + col]; // Fill grid with shuffled numbers
            numberElement.classList.add('number');
            numberElement.onclick = function() {
                if (numberElement.innerText == targetNumber) {
                    // Update score and level display
                    score += currentLevel * 10;
                    document.getElementById('score').innerText = 'Score: ' + score;
                    gameArea.removeChild(numberElement); // Remove the number when found
                    if (gameArea.children.length === 0) {
                        clearInterval(timer); // Stop the timer
                        startGame(); // Restart the game for the next level
                    } else {
                        setNewTarget(numbers); // Set a new target number
                    }
                } else {
                    alert('Try again! Find the number: ' + targetNumber);
                }
            };
            gameArea.appendChild(numberElement);
        }
    }

    setNewTarget(numbers); // Set the initial target number
}

function getTimeForDifficulty() {
    const difficulty = document.getElementById('difficulty').value;
    switch (difficulty) {
        case 'easy':
            return 30; // 30 seconds
        case 'medium':
            return 30; // 30 seconds
        case 'hard':
            return 30; // 30 seconds
    }
}
function setNewTarget(numbers) {
    targetNumber = numbers[Math.floor(Math.random() * numbers.length)]; // Randomly select a target number
    document.getElementById('target-number').innerText = 'Find the number: ' + targetNumber; // Display the target number
}

function highlightTargetNumber() {
    const targetElements = document.querySelectorAll('.number');
    targetElements.forEach(element => {
        if (element.innerText == targetNumber) {
            element.style.backgroundColor = 'red'; // Highlight the target number
        }
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Start the game when the start button is clicked
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button'); // Get the stop button

