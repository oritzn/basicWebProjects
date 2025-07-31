const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
] //mögliche gewinn Optionen 

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById("board")
const winningMessageTextElement = document.querySelector("[data-winning-message-text")
const winningMessageElement = document.getElementById("winningMessage")
const restartButton = document.getElementById("restartButton")
let circleTurn

startGame() // ausruf der Start Game funcion am beginn

restartButton.addEventListener("click", startGame) // start game function ausführen beim clicken des Buttons

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove("show")
}


function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS // aktuelle klasse (bestimmt ob kreuz oder kreis gelegt wird) wird auf currentclass abgeschrieben
    placeMark(cell, currentClass)
    if (checkWin(currentClass)){
        endGame(false)
    }else if (isDraw()){
        endGame(true)
    }else{
    swapTurn();
    setBoardHoverClass()
    }
}

function endGame(draw){
    if (draw){
        winningMessageTextElement.innerText = "Draw"
    }else{
        winningMessageTextElement.innerText = `${circleTurn ? "O´s" : "X´s"} Wins`
    }
    winningMessageElement.classList.add("show")
}

function isDraw(){
    return [...cellElements].every(cell => { //checken ob alle felder voll sind wenn ja dann draw
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurn(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn){
        board.classList.add(CIRCLE_CLASS)
    } else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) { // es wird überprüft ob bei den gewinnmöglichkeiten eine dabei ist wo alle die gleiche klasse haben dann win für diejenige klasse
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return cellElements[index].classList.contains(currentClass)
      })
    })
  }