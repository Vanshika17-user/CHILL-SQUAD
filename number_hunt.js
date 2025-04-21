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