const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""]

  return {
    board,
  }
})()

const Player = (name, mark) => {
  let score = 0
  return Object.assign({}, { name, mark, score })
}

const game = (function () {
  /**
   * TODO: TODO: implement an available spots array in case I want to implement an AI player
   * TODO:
   */
  const { board } = Gameboard
  const player1 = Player("Jesse", "X")
  const player2 = Player("Comp", "O")

  const scrore = {
    X: 0,
    O: 0,
  }
  /* if game is still on */
  let isStillOn = true

  let currentPlayer = player1
  // DOM ELEMENTS
  const cells = document.querySelectorAll(".cell")
  const resetBtn = document.querySelector(".reset")
  const playAgainBtn = document.querySelector(".play-again")
  const scoreX = document.querySelector(".score-x")
  const scoreO = document.querySelector(".score-o")

  const resetBoard = () => {
    const newBoard = Gameboard.board.map((cell, index) => "")
    Gameboard.board = newBoard
    setBoard()
    updateScreen()
  }
  const isValidMove = () => {
    // check if clicked tile is occupied
  }

  const checkBoard = () => {
    const wonCells = []
    // horizontal checks
    if (board[0] && board[1] === board[0] && board[2] === board[0]) {
      console.log("We have a winner")
      wonCells.push([0, 1, 2])
    }
    if (board[3] && board[4] === board[3] && board[5] === board[3]) {
      console.log("We have a winner")
      wonCells.push([3, 4, 5])
    }
    if (board[6] && board[7] === board[6] && board[8] === board[6]) {
      console.log("We have a winner")
      wonCells.push([6, 7, 8])
    }
    // diagonal checks
    if (board[0] && board[4] === board[0] && board[8] === board[0]) {
      console.log("We have a winner")
      wonCells.push([0, 4, 8])
    }
    if (board[2] && board[4] === board[2] && board[6] === board[2]) {
      console.log("We have a winner")
      wonCells.push([2, 4, 6])
    }
    // vertical checks
    if (board[0] && board[3] === board[0] && board[6] === board[0]) {
      console.log("We have a winner")
      wonCells.push([0, 3, 6])
    }
    if (board[1] && board[4] === board[1] && board[7] === board[1]) {
      console.log("We have a winner")
      wonCells.push([1, 4, 7])
    }
    if (board[2] && board[5] === board[2] && board[8] === board[2]) {
      console.log("We have a winner")
      wonCells.push([2, 5, 8])
    }

    console.log(wonCells)
  }
  const handleClick = (evt) => {
    if (isStillOn) {
      console.log(`Cell ${Number(evt.currentTarget.index)} clicked`)
      Gameboard.board[evt.currentTarget.index] = currentPlayer.mark
      updateScreen()
      console.log(Gameboard.board)
      if (currentPlayer == player1) {
        currentPlayer = player2
      } else {
        currentPlayer = player1
      }
      checkBoard()
      evt.target.removeEventListener("click", handleClick)
    }
  }

  const setBoard = () => {
    cells.forEach((cell, index) => {
      cell.index = index
      cell.addEventListener("click", handleClick, false)
    })
  }
  /**
   * updateScreen - renders the game based on the state of be current board array
   */
  const updateScreen = () => {
    for (let i = 0; i < 9; i++) {
      if (Gameboard.board[i] === "X") {
        cells[i].innerHTML =
          '<span class="material-symbols-outlined"> close </span>'
      } else if (Gameboard.board[i] === "O") {
        cells[i].innerHTML =
          '<span class="material-symbols-outlined">radio_button_unchecked</span>'
      } else {
        cells[i].innerHTML = ""
      }
    }
  }
  playAgainBtn.onclick = () => {
    // Resets the game without resetting the scoreboard
    resetBoard()
  }
  resetBtn.onclick = () => {
    resetBoard()
    scrore.X = 0
    scrore.O = 0
  }
  // Resets the entire game including the scoreboard
  setBoard()
  updateScreen()
})()
