
const mainContainer = document.querySelector(".main-container");
let currentBoxIndex = 0;
const hiddenWord = ["P","A","R","T","Y"];
const hiddenWordString = hiddenWord.toString().toLowerCase();
const totalBoxes = 30;
const letters = 'abcdefghijklmnopqrstuvwxyz';
const splitLetters = letters.split(',');
let rowIndex = 0;
const boxesArray = [];

for(x = 0; x < totalBoxes; x++){
  const boxes = document.createElement('div');
  boxes.className = "box";
   

  mainContainer.appendChild(boxes)
}

const boxes = document.querySelectorAll('.box');
  



boxes.forEach(box => {
  boxesArray.push(box);
  box.classList.add('box')
})

const rows = [];
const itemsPerRow = 5;


for(let i = 0; i < boxesArray.length; i += itemsPerRow){
  rows.push(boxesArray.slice(i, i + itemsPerRow))
}

let currentRow = rows[rowIndex];



 document.addEventListener('keydown',function(event) {
       const keyPressed = event.key;
       const currentBox = currentRow[currentBoxIndex];
   
   
   
       if(keyPressed !== "Backspace" && letters.includes(keyPressed) && currentBoxIndex < currentRow.length){

                currentBox.textContent = keyPressed.toUpperCase();
                currentBox.classList.add('grey-border');
                
                currentBox.classList.remove('zoom-animation');
               
                currentBox.classList.add('zoom-animation');
                currentBoxIndex++;
         
            
            }
   
 
   
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

function checkGuess(){
  const guess = Array.from(currentRow).map(box=> box.textContent.trim().toLowerCase());
  const hiddenWordCopy = [...hiddenWord]
  let allCorrect;
  const guessWord = guess.toString();
  

  
for(let i = 0; i < guess.length; i++){
  setTimeout(() => {
    if (guess[i] === hiddenWord[i].toLowerCase()) {
      currentRow[i].classList.add('correct');   // Apply correct animation with delay
      hiddenWordCopy[i] = null; // Mark as used
      
    } 
    else if(hiddenWordCopy.includes(guess[i])){
      
      currentRow[i].classList.add('yellow');
      hiddenWordCopy[hiddenWordCopy.indexOf(guess[i])] = null;

    }
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
   
  
   













