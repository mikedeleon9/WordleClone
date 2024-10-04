const mainContainer = document.querySelector(".main-container");
const keyboardContainer = document.querySelector('.keyboard-container')
let currentBoxIndex = 0;
const hiddenWord = ["P", "A", "R", "T", "Y"];
const hiddenWordString = hiddenWord.join('').toLowerCase(); // Fix how hiddenWordString is joined
const totalBoxes = 30;
const letters = 'abcdefghijklmnopqrstuvwxyz';
const quertyLetters = "qwertyuiopasdfghjklzxcvbnm";
const letterBank = letters.split('');
let rowIndex = 0;
const boxesArray = [];

// Creating all 30 boxes
for (let x = 0; x < totalBoxes; x++) {
  const box = document.createElement('div');
  box.className = "box";
  mainContainer.appendChild(box);
}

// Declaring the box divs I just created
const boxes = document.querySelectorAll('.box');

// Adding each box to the boxesArray
boxes.forEach(box => {
  boxesArray.push(box);
  box.classList.add('box');
});

// Declaring rows and dividing boxesArray into rows
const rows = [];
const itemsPerRow = 5;
for (let i = 0; i < boxesArray.length; i += itemsPerRow) {
  rows.push(boxesArray.slice(i, i + itemsPerRow));
}

// Declaring the current row
let currentRow = rows[rowIndex];

// Adding Event Listener to check for keypresses
document.addEventListener('keydown', function(event) {
  const keyPressed = event.key;
  const currentBox = currentRow[currentBoxIndex];

  // Only accept valid letters and prevent going beyond the row's length
  if (keyPressed !== "Backspace" && letters.includes(keyPressed) && currentBoxIndex < currentRow.length) {
    currentBox.textContent = keyPressed.toUpperCase();
    currentBox.classList.add('grey-border', 'zoom-animation');
    currentBoxIndex++;
  }

  // Handle Backspace functionality
  if (keyPressed === "Backspace" && currentBoxIndex > 0) {
    currentBoxIndex--;
    const currentBox = currentRow[currentBoxIndex];
    currentBox.textContent = "";
    currentBox.classList.remove('zoom-animation', 'grey-border');
  }

  // Handle Enter key functionality
  if (keyPressed === "Enter") {
   
    checkGuess();
    
  }
});

// Function that checks what the user enters when they press the Enter key
function checkGuess() {
  const guess = Array.from(currentRow).map(box => box.textContent.trim().toLowerCase()).join(''); // Ensure guess is a string
  const hiddenWordCopy = [...hiddenWord.map(letter => letter.toLowerCase())];

  // Call the dictionary API to check if the guessed word is valid
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
    .then(response => {
      if (!response.ok) {
        currentRow.forEach(box => box.classList.add('shake'))

          // Remove the shake class after the animation ends
      setTimeout(() => {
        currentRow.forEach(box => box.classList.remove('shake'));
      },200); // Duration of the shake animation + some buffer time
        return;
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        validateGuess(guess, hiddenWordCopy);
      }
    })
    .catch(error => {
      console.error("Error fetching from API", error);
    });
}

// Function to validate the guess after API check
function validateGuess(guess, hiddenWordCopy) {
  for (let i = 0; i < guess.length; i++) {
    setTimeout(() => {
      if (guess[i] === hiddenWord[i].toLowerCase()) {
        currentRow[i].classList.add('correct'); // Correct letter
        hiddenWordCopy[i] = null; // Mark as used
      } else if (hiddenWordCopy.includes(guess[i])) {
        currentRow[i].classList.add('yellow'); // Correct letter, wrong position
        hiddenWordCopy[hiddenWordCopy.indexOf(guess[i])] = null;
      } else {
        currentRow[i].classList.add('incorrect'); // Incorrect letter
      }
    }, i * 330);
  }

  // Check if the word guessed is correct
  if (guess === hiddenWordString) {
    console.log("You Win!");
  }

  // Move to the next row after the validation finishes
  setTimeout(() => {
    rowIndex++;
    if (rowIndex < rows.length) {
      currentRow = rows[rowIndex]; // Update currentRow to the next row
      currentBoxIndex = 0; // Reset currentBoxIndex for the next row
    } else {
      console.log("No more rows available");
    }
  }, guess.length * 330 + 500); 
}



//creating Letters

letterBank.forEach(letter => {
 const letterBankDiv = document.createElement('div');
  letterBankDiv.textContent = letter.toUpperCase();
  letterBankDiv.classList.add('letter');
  keyboardContainer.appendChild(letterBankDiv)
})
