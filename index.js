
const mainContainer = document.querySelector(".main-container");
const keyboardContainer = document.querySelector('.keyboard-container')
let currentBoxIndex = 0;
const hiddenWord = ["P","A","R","T","Y"];
const hiddenWordString = hiddenWord.join().toLowerCase();
const totalBoxes = 30;
const letters = 'abcdefghijklmnopqrstuvwxyz';
const splitLetters = letters.split(',');
let rowIndex = 0;
const boxesArray = [];


//Creating all 30 boxes
for(x = 0; x < totalBoxes; x++){
  const boxes = document.createElement('div');
  boxes.className = "box";
  mainContainer.appendChild(boxes)
}

//Declaring the box div I just created
const boxes = document.querySelectorAll('.box');
  
//Adding each box to the boxesArray which I will need to separate them later into rows
boxes.forEach(box => {
  boxesArray.push(box);
  box.classList.add('box')
})

//Declaring rows variable and how many rows there will be so I can divide the boxesArray later on 
const rows = [];
const itemsPerRow = 5;


//Looping through the boxes array 5 items at a time so I can get 6 rows (30/5)
for(let i = 0; i < boxesArray.length; i += itemsPerRow){
  rows.push(boxesArray.slice(i, i + itemsPerRow))
}

//Declaring the current row so I can keep track
let currentRow = rows[rowIndex];


//Adding Event Listener to check for keypresses
 document.addEventListener('keydown',function(event) {
    const keyPressed = event.key;
    const currentBox = currentRow[currentBoxIndex];
   
   
//This if statement excludes any key that is not a letter and makes sure that the currentIndex is not bigger than the row itself to avoid conflicts   
if(keyPressed !== "Backspace" && letters.includes(keyPressed) && currentBoxIndex < currentRow.length){

                currentBox.textContent = keyPressed.toUpperCase();
                currentBox.classList.add('grey-border');
                
                currentBox.classList.remove('zoom-animation');
               
                currentBox.classList.add('zoom-animation');
                currentBoxIndex++;
                    
            }
   
 
  //This if statement checks if the key pressed is backspace, if it is it deletes the text content and jumps to the previous box
if(keyPressed === "Backspace" && currentBoxIndex > 0){   
           
           
          currentBoxIndex--;
           const currentBox = currentRow[currentBoxIndex];
           currentBox.textContent = "";
           currentBox.classList.remove('zoom-animation')
           currentBox.classList.remove('grey-border');
           
         }
   

   
        if(keyPressed === "Enter"){
          checkGuess();
          
        }
  
   })

   //This is the function that checks what the user enters when they press the Enter key
function checkGuess(){
  const guess = Array.from(currentRow).map(box=> box.textContent.trim().toLowerCase());
  const hiddenWordCopy = [...hiddenWord.map(letter => letter.toLowerCase())];
  let allCorrect;
  const guessWord = guess.toString();
  

//A loop that goes through the user's guess and compares each letter to the hidden word, if it finds a match it adds the correct class and marks it as used  
for(let i = 0; i < guess.length; i++){
  setTimeout(() => {
    if (guess[i] === hiddenWord[i].toLowerCase()) {
      currentRow[i].classList.add('correct');   // Apply correct animation with delay
      hiddenWordCopy[i] = null; // Mark as used
      
    } 

  
    //If the loop doesn't find a correct match it then looks at each guessed letter and checks if the hiddenword array includes any of the letters, if it does it marks them yellow
    else if(hiddenWordCopy.includes(guess[i])){
      currentRow[i].classList.add('yellow');
      hiddenWordCopy[hiddenWordCopy.indexOf(guess[i])] = null; 
    }

    //If there is no match at all, it marks the letter gray
    else {
      currentRow[i].classList.add('incorrect'); // Apply incorrect animation with delay
      allCorrect = false;
      
    }
  }, i * 450);


  
}

if(guessWord === hiddenWordString){
  console.log("You Win!")
}

setTimeout(() => {
  rowIndex++;
  if (rowIndex < rows.length) {
    currentRow = rows[rowIndex]; // Update currentRow to the next row
    currentBoxIndex = 0;         // Reset currentBoxIndex for the next row
  } else {
    console.log("No more rows available");
  }
}, guess.length * 350 + 500); 

}
   

  
   













