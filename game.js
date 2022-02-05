// Array containing game instructions
var instructions = ["Move pieces with the arrow keys", "You win when you manage to order the image", "Below you can find what the image looks like when ordered correctly"];

// Array to save the movements that are made
var movement = [];

// Grid representation. Each number represent a piece.
// 9 is the empty position.
var grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

/* These two variables are used to save the position of the empty part. 
This position begins as the [2, 2]*/
var rowEmpty = 2;
var columnEmpty = 2;

/* This function must go through the set of instructions passed by parameter.
Each element of this array should be displayed in the list with id 'statement-list'. 
For that you must use the already implemented function showInstruccionInList().
You can see its implementation in the last part of this code. */
function showInstructions(instructions) {
	for (let i = 0; i < instructions.length; i++) {
		showInstructionsInList(instructions[i],"list-instructions");
	}

}
// /*  Function that adds the last address to the movement array
// and use updateLastMove to display it on screen * /
var lastMovement = function (direction) {  //where direction is an object.
	movement.push(direction);
	updateLastMove(lastMovement);
}
	


// /* This function will check if the Puzzle is in the winning position. 
function checkIfThereIsAWinner() {
	const winningGrid = [
		[1,2,3],
		[4,5,6],
		[7,8,9]
	];
	var IssameNumber = false;
	
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			
			if (grid[i][j] === winningGrid[i][j]) {
				IssameNumber = true;
			}
			else{
				return false
			}
		}
	}
	 true;
	 showWinnerPoster();
}

//  Displaying a sign that warns that you have won the game.
function showWinnerPoster() {
	alert("¡Contratulations! You have won the game");
	var ask = prompt("Would you like to play Again? \n1. Yes \n2. No")
	
	switch (ask) {
		case "1":
			mixPieces(30);
			break;
		case "2":		
			break;
		default:
		alert("That's not a valid question");
	}
}

/* Function that exchanges two positions in the grid.
*/
function exchangeGridPositions(rowPos1, columnPos1, rowPos2, columnPos2) {  
	 var aux = grid[rowPos1][columnPos1];                           
	 grid[rowPos1][columnPos1] = grid[rowPos2][columnPos2];
	 grid[rowPos2][columnPos2] = aux;
	 exchangeDOMPositions(grid[rowPos1][columnPos1], grid[rowPos2][columnPos2]);
}

function exchangeDOMPositions(num1, num2) {
	var filledPiece = document.getElementById("piece" + num1);
	var emptyPiece = document.getElementById("piece" + num2);
	var Parent = document.getElementById("game");
	var filledCloned = filledPiece.cloneNode(true);
	var emptyCloned = emptyPiece.cloneNode(true)
	Parent.replaceChild(filledCloned, emptyPiece);
	Parent.replaceChild(emptyCloned, filledPiece);
}

// Updates the position of the empty part.
function updateEmptyPosition(newRow, newColumn) {
	rowEmpty = newRow;
	columnEmpty =newColumn;
}


// To check if the position is within the grid.
function validPosition(newRow, newColumn) {
	if (newRow > 2 || newColumn > 2 || newRow < 0 || newColumn < 0 ) {
		return false;
	}
	else{
		return true;
	}
}

/* Movement of pieces, in this case the one that moves is White, exchanging its position with another element.
The directions are given by numbers that represent: Up (ArrowUp), Down (ArrowDown), Left (ArrowLeft), Right (ArrowRight) */
function moveInDirection(direction) {
  var newRowEmptyPiece;
  var newColumnEmptyPiece;

  // Move piece down, replacing it with the white one.
  if (direction === directionCodes.DOWN) {
    newRowEmptyPiece = rowEmpty + 1;
    newColumnEmptyPiece = columnEmpty;
  }
    
  // Move piece up, replacing it with the white one.
  else if (direction === directionCodes.UP) {
    newRowEmptyPiece = rowEmpty - 1;
    newColumnEmptyPiece = columnEmpty;
  }
    
  //  Move piece Right, replacing it with the white one.
  else if (direction === directionCodes.RIGHT) {
	  newColumnEmptyPiece = columnEmpty + 1;
	  newRowEmptyPiece = rowEmpty;
  }
    
  //  Move piece left, replacing it with the white one.
  else if (direction === directionCodes.LEFT) {
	  newColumnEmptyPiece = columnEmpty - 1;
	  newRowEmptyPiece = rowEmpty;
  }

  /* Then it is checked if the new position is valid, if it is, it is exchanged. */

    if (validPosition(newRowEmptyPiece, newColumnEmptyPiece)) {
        exchangeGridPositions(rowEmpty, columnEmpty, newRowEmptyPiece, newColumnEmptyPiece);
        updateEmptyPosition(newRowEmptyPiece, newColumnEmptyPiece);
		  updateLastMove(direction);
	}
}
/* directionCodes is an object that allows me to simplify the code */
var directionCodes = {
    LEFT: "ArrowLeft",
    UP: "ArrowUp",
    RIGHT: "ArrowRight",
    DOWN: "ArrowDown"
}

/* Function that performs the logical exchange (in the grid) and also update
the exchange on the screen (DOM). */
function swapPositions(row1, column1, row2, column2) {
  // Exchange positions on the grid.
  var piece1 = grid[row1][column1];
  var piece2 = grid[row2][column2];

  exchangeGridPositions(row1, column1, row2, column2);
  swapPositionsDOM('piece' + piece1, 'piece' + piece2);

}

/* Swapping positions of the DOM elements they represent the chips on the screen. */

function swapPositionsDOM(idPiece1, idPiece2) {
  // Swapping positions of the DOM
  var pieceElement1 = document.getElementById(idPiece1);
  var pieceElement2 = document.getElementById(idPiece2);

  var father = pieceElement1.parentNode;

  var cloneElement1 = pieceElement1.cloneNode(true);
  var cloneElement2 = pieceElement2.cloneNode(true);

  father.replaceChild(cloneElement1, pieceElement2);
  father.replaceChild(cloneElement2, pieceElement1);
}

/* Updates the visual representation of the last movement
on the screen, represented by an arrow. */
function updateLastMove(direction) {
  var lastMove = document.getElementById('arrow');
  switch (direction) {
    case directionCodes.UP:
      lastMove.textContent = '↑';
      break;
    case directionCodes.DOWN:
      lastMove.textContent = '↓';
      break;
    case directionCodes.RIGHT:
      lastMove.textContent = '→';
      break;
    case directionCodes.LEFT:
      lastMove.textContent = '←';
      break;
  }
}

/* This function allows you to add an instruction to the list with idList. A li element is dynamically created with the text
passed with parameter "idList" "instrucción". */
function showInstructionsInList(instruction, idList) {
  var ul = document.getElementById(idList);
  var li = document.createElement("li");
  li.textContent = instruction;
  ul.appendChild(li);
}

/* Function that mixes the pieces of the board a given amount of times.
A random position is calculated and moves in that direction. Thus
the whole board will be shuffled. */

function mixPieces(times) {
  if (times <= 0) {
    return;
  }
  var directions = [directionCodes.DOWN, directionCodes.UP,
      directionCodes.RIGHT, directionCodes.LEFT
    ];

  var direction = directions[Math.floor(Math.random() * directions.length)];
  moveInDirection(direction);

  setTimeout(function() {
      mixPieces(times - 1);
    }, 100);
}

/* captureKeys: This function captures the keys pressed by the user. Javascript
allows detect events, for example, when a key is pressed and on
based on that do something. */
function captureKeys() {
  document.body.onkeydown = (function(event) {
    if (event.key === directionCodes.DOWN ||
      event.key === directionCodes.UP ||
      event.key === directionCodes.RIGHT ||
      event.key === directionCodes.LEFT) {
      moveInDirection(event.key);

        var won = checkIfThereIsAWinner();
        if (won) {
          setTimeout(function() {
              showWinnerPoster();
              }, 500);
        }
      event.preventDefault();
    }
      
  })
}

/* The puzzle is started by mixing the pieces 30 times 
and executing the function so that the keys that are
press the user */
function start() {
    showInstructions(instructions);
    mixPieces(30);
    captureKeys(); 
}                

// We execute the start function.
start();
