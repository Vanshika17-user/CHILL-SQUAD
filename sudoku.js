let solutionGrid = [];
let currentGrid = [];

function generateSudoku(difficulty = 'easy') {
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillGrid(grid);
    solutionGrid = grid.map(row => row.slice()); // Deep copy for solution
    removeNumbers(grid, difficulty);
    currentGrid = grid.map(row => row.slice());
    return grid;
}

function fillGrid(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                const numbers = shuffleArray([...Array(9).keys()].map(n => n + 1));
                for (const num of numbers) {
                    if (isSafe(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (fillGrid(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isSafe(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) {
            return false;
        }
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (grid[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displaySudoku(grid) {
    const sudokuBoard = document.getElementById('sudoku-board');
    sudokuBoard.innerHTML = '';
    grid.forEach((row, rIndex) => {
        row.forEach((num, cIndex) => {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.className = 'sudoku-cell';
            cell.maxLength = 1;
            cell.value = num !== 0 ? num : '';
            if (num !== 0) {
                cell.disabled = true;
                cell.style.backgroundColor = '#e9ecef';
            }
            cell.addEventListener('input', function() {
                if (!/^[1-9]$/.test(this.value)) {
                    this.value = '';
                }
            });
            sudokuBoard.appendChild(cell);
        });
    });
}

function removeNumbers(grid, difficulty) {
    const cellsToRemove = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 40 : 50;
    let count = 0;
    while (count < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (grid[row][col] !== 0) {
            grid[row][col] = 0;
            count++;
        }
    }
}

function provideHint() {
    const sudokuBoard = document.getElementById('sudoku-board');
    const inputs = sudokuBoard.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            const row = Math.floor(i / 9);
            const col = i % 9;
            inputs[i].value = solutionGrid[row][col];
            inputs[i].disabled = true;
            inputs[i].style.backgroundColor = '#d4edda'; // light green for hint
            break;
        }
    }
}

function validateSudoku() {
    const sudokuBoard = document.getElementById('sudoku-board');
    const inputs = sudokuBoard.querySelectorAll('input');
    let isValid = true;
    for (let i = 0; i < inputs.length; i++) {
        const val = inputs[i].value;
        const row = Math.floor(i / 9);
        const col = i % 9;
        if (val === '' || parseInt(val) !== solutionGrid[row][col]) {
            isValid = false;
            inputs[i].style.backgroundColor = '#f8d7da'; // light red for error
        } else {
            inputs[i].style.backgroundColor = '';
        }
    }
    return isValid;
}

function resetSudoku() {
    displaySudoku(currentGrid);
    document.getElementById('sudoku-result').textContent = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const difficultySelect = document.getElementById('difficulty');
    let sudokuGrid = generateSudoku(difficultySelect.value);
    displaySudoku(sudokuGrid);

    difficultySelect.addEventListener('change', () => {
        sudokuGrid = generateSudoku(difficultySelect.value);
        displaySudoku(sudokuGrid);
        document.getElementById('sudoku-result').textContent = '';
    });

    document.getElementById('hint-button').addEventListener('click', () => {
        provideHint();
    });

    document.getElementById('submit-sudoku').addEventListener('click', () => {
        const result = document.getElementById('sudoku-result');
        if (validateSudoku()) {
            result.style.color = '#28a745'; // green
            result.textContent = 'Congratulations! You solved the Sudoku!';
        } else {
            result.style.color = '#d9534f'; // red
            result.textContent = 'There are errors in your solution. Please try again.';
        }
    });

    document.getElementById('reset-sudoku').addEventListener('click', () => {
        resetSudoku();
    });
});