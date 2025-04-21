document.addEventListener('DOMContentLoaded', function() {
    const questionDisplay = document.getElementById('math-question');
    const resultDisplay = document.getElementById('math-result');

    // Function to generate a random math question
    function generateMathQuestion() {
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        const operation = Math.floor(Math.random() * 4); // Randomly select an operation
        let question;
        let answer;

        switch (operation) {
            case 0: // Addition
                question = `What is ${num1} + ${num2}?`;
                answer = num1 + num2;
                break;
            case 1: // Subtraction
                question = `What is ${num1} - ${num2}?`;
                answer = num1 - num2;
                break;
            case 2: // Multiplication
                question = `What is ${num1} * ${num2}?`;
                answer = num1 * num2;
                break;
            case 3: // Division
                // Ensure no division by zero
                if (num2 === 0) num2 = 1;
                question = `What is ${num1} / ${num2}?`;
                answer = num1 / num2;
                break;
        }

        questionDisplay.innerText = question;
        return answer; // Return the correct answer
    }

    let correctAnswer = generateMathQuestion();

    document.getElementById('submit-math').addEventListener('click', function() {
        const userAnswer = parseFloat(document.getElementById('math-answer').value);
        if (userAnswer === correctAnswer) {
            resultDisplay.innerText = 'Correct! Well done!';
        } else {
            resultDisplay.innerText = 'Incorrect. Try again!';
        }
        // Generate a new question
        correctAnswer = generateMathQuestion();
    });
});

