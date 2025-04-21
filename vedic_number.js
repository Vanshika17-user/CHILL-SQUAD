document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculate');
    const resultDisplay = document.getElementById('result');

    calculateButton.addEventListener('click', function() {
        const numbersInput = document.getElementById('numbers').value;
        const numbers = numbersInput.split(',').map(Number);
        const result = numbers.reduce((acc, num) => acc + num, 0); // Example: sum of numbers in it
        resultDisplay.textContent = 'Result: ' + result;
    });
