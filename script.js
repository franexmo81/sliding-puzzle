//----- VARIABLES DECLARATION -----//

// All available cells in ordered status
const cells = ["cellA","cellB","cellC","cellD","cellE","cellF","cellG","cellH","cellI"];

// Cells in initial unordered status. Then they will be shuffled by shufflePuzzle
let movedCells = ["cellF", "cellG", "cellE", "cellA", "cellC", "cellB", "cellH", "cellD", "cellI"]

// All available positions in ordered status.
const positions = ["pos11","pos12","pos13","pos21","pos22","pos23","pos31","pos32","pos33"];

// Empty cell
const emptyPositionId = cells[2];

// Array containing the cells that are able to move (above, below, on left, on right of the empty cell)
// undefined if the cell does not exist
let ableToMoveIds =[];


//----- INSTRUCTIONS -----//

// On load:
findCellsAbleToMove();
shufflePuzzle();
rearrangeCells();


//----- FUNCTIONS DECLARATION -----//

// Finds all the cells that are able to move Up, Down, Left or Right and stores them in the ableToMoveIds array
function findCellsAbleToMove() {
  let emptyPositionClass = positions[movedCells.indexOf(emptyPositionId)];
  let emptyPosition = parseInt(emptyPositionClass.substring(3, 6));

  ableToMoveIds = [
    ableToLeftId = findCellAtDistance(emptyPosition, 1),
    ableToUpId = findCellAtDistance(emptyPosition, 10),
    ableToRightId = findCellAtDistance(emptyPosition, -1),
    ableToDownId = findCellAtDistance(emptyPosition, -10)
  ];
}

// Finds a specific cell at a "distance".
// Distance = +- 10 finds cells above/below
// Distance = +-1 finds cells on left/right
function findCellAtDistance(cellPosition, distance) {
  positionClassToFind = "pos" + (cellPosition + distance);
  return movedCells[positions.indexOf(positionClassToFind)];
}

// Shuffles the puzzle
function shufflePuzzle() {

  let i = 1000; while (i--) {
    let number = Math.floor(Math.random() * 3)
    moveByCode(number, false);    
  }

}

// Rearranges the cells according to the movedCells array
function rearrangeCells() {

  for (let i = 0; i < cells.length; i++) {
    document.getElementById(movedCells[i]).classList.remove(document.getElementById(movedCells[i]).classList[2]);
    document.getElementById(movedCells[i]).classList.add(positions[i]);
  }

}

// Checks if input (clicked) cell can be moved and passes it to move function
function move_click(clicked_id) {
  if (ableToMoveIds.includes(clicked_id)) {
    move(clicked_id, true);
  }
}

// When arrow keys are pressed it calls moveByCode
document.addEventListener('keydown', function(event){

    event = event || window.event;
    var keycode = event.charCode || event.keyCode;

    if (37 <= keycode && keycode <= 40) {
      moveByCode (keycode-37, true);
    }

});

// Receives a code and checks that the corresponding cell is able to move.
// Codes: 0 means move left. 1 Up. 2 Right. 3 Down
// Also, it pases whether the puzzle has to be checked or not
function moveByCode (code, checkOrNot) {
  if (ableToMoveIds[code]!=undefined){
    move(ableToMoveIds[code], checkOrNot);
  }
}

// Swaps the input cellId and the emptyId in the movedPositions array
// It can call checkPuzzle depending on checkOrNot value
// Also calls rearrangeCells and findCellsAbleToMove
function move(cellId, checkOrNot) {
  let indexA = movedCells.indexOf(cellId);
  let indexB = movedCells.indexOf(emptyPositionId);
  movedCells[indexA] = emptyPositionId;
  movedCells[indexB] = cellId;
  rearrangeCells();
  if (checkOrNot){
    checkPuzzle ();
  }
  findCellsAbleToMove();
}

// Checks if the puzzle has been solved
function checkPuzzle() {
  let solved = true;

  for (let i = 0; i < movedCells.length; i++) {

    if (movedCells[i]!=cells[i]){
      i = movedCells.length;
      solved = false;      
     }

  }
  if (solved){
    setTimeout(congratulations, 500);
  }
}

// Alerts the user that the puzzle has been solved  
function congratulations () {
  alert("Congratulations! You have solved the puzzle!\n¡Enhorabuena! Has resuelto el puzzle");  
}