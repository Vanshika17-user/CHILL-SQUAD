let randomNumber;
let attempts = 0;

// Fetch the random number from the server
fetch('http://127.0.0.1:5001/start_game')
    .then(response => response.json())
    .then(data => {
        randomNumber = data.number;

        // Enable the guessing game only after the number is fetched
        document.getElementById('submit-sudoku').addEventListener('click', function() {
            const userGuess = parseInt(document.getElementById('guess').value);
            attempts++;

            if (userGuess < randomNumber) {
                document.getElementById('result').innerText = 'Too low! Try again.';
            } else if (userGuess > randomNumber) {
                document.getElementById('result').innerText = 'Too high! Try again.';
            } else {
                document.getElementById('result').innerText = `Correct! You guessed it in ${attempts} attempts.`;
            }
        });
    })
    .catch(error => {
        console.error('Error fetching number:', error);
        document.getElementById('result').innerText = 'Error connecting to the server.';
    });
