const mainContainer = document.querySelector(".main-container");
const keyboardContainer = document.querySelector('.keyboard-container')
let currentBoxIndex = 0;
const hiddenWord = ["Q", "U", "A", "R", "T"];
const hiddenWordString = hiddenWord.join('').toLowerCase(); // Fix how hiddenWordString is joined
const totalBoxes = 30;
let index = 19;


const quertyLetters = "qwertyuiopasdfghjklzxcvbnm";
const letterBank = quertyLetters.split('');
let rowIndex = 0;
const boxesArray = [];

//creating Letters

function createLetters() {
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Delete']
  ];

  rows.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('keyboard-row');

    row.forEach(letter => {
      const letterDiv = document.createElement('div');
      letterDiv.textContent = letter.toUpperCase();
      letterDiv.classList.add('letter');
      letterDiv.setAttribute('data-key', letter.toLowerCase());
      if (letter === 'Enter' || letter === 'Delete') {
        letterDiv.classList.add('special-key', "small-text");
      }
      rowDiv.appendChild(letterDiv);
    });

    keyboardContainer.appendChild(rowDiv);
  });
}

createLetters();


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
  if (keyPressed !== "Backspace" && quertyLetters.includes(keyPressed) && currentBoxIndex < currentRow.length) {
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


    currentRow.forEach(box =>{
      box.classList.remove('grey-border')
      box.style.border = 'none';
    })
}

// Function to validate the guess after API check
function validateGuess(guess, hiddenWordCopy) {
  for (let i = 0; i < guess.length; i++) {
    setTimeout(() => {
      const currentLetter = guess[i];
      let status = '';
      
      if (currentLetter === hiddenWord[i].toLowerCase()) {
        currentRow[i].classList.add('correct');
        status = 'correct';
        hiddenWordCopy[i] = null;
      } else if (hiddenWordCopy.includes(currentLetter) && currentLetter !== hiddenWord[i]) {
        currentRow[i].classList.add('yellow');
        status = 'yellow';
        
        hiddenWordCopy[hiddenWordCopy.indexOf(currentLetter)] = null;
      } else {
        currentRow[i].classList.add('incorrect');
        status = 'incorrect';
      }

      updateKeyboard(currentLetter, status);
    }, i * 380);
  }

 
  function updateKeyboard(letter, status) {
    const keyboardKey = document.querySelector(`.letter[data-key="${letter.toLowerCase()}"]`);
    
    if (keyboardKey) {
      // Remove all status classes
      keyboardKey.classList.remove('key-correct', 'key-yellow', 'key-incorrect');
      
      // Add the new status class
      if (status === 'correct') {
        keyboardKey.classList.add('key-correct');
      } else if (status === 'yellow' && !keyboardKey.classList.contains('key-correct')) {
        keyboardKey.classList.add('key-yellow');
      } else if (status === 'incorrect' && !keyboardKey.classList.contains('key-correct') && !keyboardKey.classList.contains('key-yellow')) {
        keyboardKey.classList.add('key-incorrect');
      }
    }
  }

  // Check if the word guessed is correct
  if (guess === hiddenWordString) {
    console.log("You Win!!");
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
  }, guess.length * 380 + 500); 
}




