
const mainContainer = document.querySelector(".main-container");
let currentBoxIndex = 0;
const hiddenWord = ["P","A","R","T","Y"];
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
                
                currentBox.classList.add('black-border');
                currentBoxIndex++;
         
            
            }
   
 
   
         if(keyPressed === "Backspace" && currentBoxIndex > 0){   
           
           
            currentBoxIndex--;
           const previousBox = currentRow[currentBoxIndex];
           previousBox.textContent = "";
           previousBox.classList.remove('black-border');
           
         }
   

   
        if(keyPressed === "Enter"){
          checkGuess();
          
        }
  
   })

function checkGuess(){
  const guess = Array.from(currentRow).map(box=> box.textContent.trim().toLowerCase());

  
for(let i = 0; i < guess.length; i++){
  setTimeout(() => {
    if (guess[i] === hiddenWord[i].toLowerCase()) {
      currentRow[i].classList.add('correct');   // Apply correct animation with delay
    } else {
      currentRow[i].classList.add('incorrect'); // Apply incorrect animation with delay
    }
  }, i * 500);
}
setTimeout(() => {
  rowIndex++;
  if (rowIndex < rows.length) {
    currentRow = rows[rowIndex]; // Update currentRow to the next row
    currentBoxIndex = 0;         // Reset currentBoxIndex for the next row
  } else {
    console.log("No more rows available");
  }
}, guess.length * 500); 
}
   
  
   













