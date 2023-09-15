const Gameboard = (function () {
  const board = ['', '', '', '', '', '', '', '', '']

  return {
    board,
  }
})()

const Player = (name, mark) => {
  return Object.assign({}, { name, mark })
}

const game = (function () {
  /**
   * TODO: TODO: implement an available spots array in case I want to implement an AI player
   * TODO: Implement AI player
   */
  let { board } = Gameboard
  const player1 = Player('Player 1', 'X')
  const player2 = Player('Player 2', 'O')
  const gameInfo = {
    gameState: '',
    winner: '',
    wonCells: [],
    scores: {
      x: 0,
      o: 0,
    },
  }
  /* if game is still on */
  let isStillOn = true
  let availableSpots = []
  let currentPlayer = player1
  // DOM ELEMENTS
  const cells = document.querySelectorAll('.cell')
  const resetBtn = document.querySelector('.reset')
  const playAgainBtn = document.querySelector('.play-again')
  const scoreX = document.querySelector('.score-x')
  const scoreO = document.querySelector('.score-o')
  const gameAnouncement = document.querySelector('.game_announcement')
  const overlay = document.querySelector('.overlay')
  const playBtn = document.querySelector('.play-btn')
  const playerOneInput = document.querySelector('.player-1-input')
  const playerTwoInput = document.querySelector('.player-2-input')
  function resetBoard() {
    // const newBoard = Gameboard.board.map((cell, index) => `${index}`)
    isStillOn = true
    board = board.map((cell) => '')
    console.log(board)
    availableSpots = getAvailableSpots()
    // gameInfo.scores = {
    //   X: 0,
    //   Y: 0,
    // }
    gameInfo.gameState = null
    gameInfo.winner = null
    setBoard()
    updateScreen()
  }

  const checkBoard = () => {
    // const wonCells = []
    // horizontal checks
    if (board[0] && board[1] === board[0] && board[2] === board[0]) {
      gameInfo.winner = board[0]
      gameInfo.gameState = 'won'
      gameInfo.wonCells.push([0, 1, 2])
      isStillOn = false
    }
    if (board[3] && board[4] === board[3] && board[5] === board[3]) {
      gameInfo.winner = board[3]
      gameInfo.gameState = 'won'
      gameInfo.wonCells.push([3, 4, 5])
      isStillOn = false
    }
    if (board[6] && board[7] === board[6] && board[8] === board[6]) {
      gameInfo.winner = board[6]
      gameInfo.gameState = 'won'
      gameInfo.wonCells.push([6, 7, 8])
      isStillOn = false
    }
    // diagonal checks
    if (board[0] && board[4] === board[0] && board[8] === board[0]) {
      gameInfo.winner = board[0]
      gameInfo.gameState = 'won'
      gameInfo.wonCells.push([0, 4, 8])
      isStillOn = false
    }
    if (board[2] && board[4] === board[2] && board[6] === board[2]) {
      gameInfo.winner = board[2]
      gameInfo.gameState = 'won'
      gameInfo.wonCells.push([2, 4, 6])
      isStillOn = false
    }
    // vertical checks
    if (board[0] && board[3] === board[0] && board[6] === board[0]) {
      gameInfo.winner = board[0]
      gameInfo.gameState = 'won'
      gameInfo.wonCells.push([0, 3, 6])
      isStillOn = false
    }
    if (board[1] && board[4] === board[1] && board[7] === board[1]) {
      gameInfo.winner = board[1]
      gameInfo.gameState = 'won'
      gameInfo.wonCells.push([1, 4, 7])
      isStillOn = false
    }
    if (board[2] && board[5] === board[2] && board[8] === board[2]) {
      gameInfo.winner = board[2]
      gameInfo.gameState = 'won'
      gameInfo.wonCells.push([2, 5, 8])
      isStillOn = false
    }

    if (gameInfo.gameState == 'won') {
      console.log('we have a WINNER')
      console.log(gameInfo.wonCells)
    }
    // TODO: Check for tie
    availableSpots = getAvailableSpots()
    console.log(availableSpots)
    if (availableSpots.length == 0 && isStillOn) {
      isStillOn = false
      gameInfo.gameState = 'tie'
      console.log(`It's a tie`)
    }
    updateScore(gameInfo)
    declareWinner(gameInfo)
  }
  function getAvailableSpots() {
    // console.log(board)
    let spots = []
    for (let i in board) {
      if (board[i] === '') {
        spots.push(i)
      }
    }
    return spots
  }

  function declareWinner({ gameState, winner, wonCells }) {
    if (gameState === 'tie') {
      gameAnouncement.classList.add('active')
      overlay.classList.add('active')
      setTimeout(() => {
        overlay.classList.remove('active')
        gameAnouncement.classList.remove('active')
      }, 2000)
      gameAnouncement.innerHTML = `<h1>It's a Tie</h1>`
    } else if (gameState == 'won') {
      gameAnouncement.classList.add('active')
      overlay.classList.add('active')
      gameAnouncement.innerHTML = `<h1>${winner} wins</h1>`
      setTimeout(() => {
        overlay.classList.remove('active')
        gameAnouncement.classList.remove('active')
      }, 2000)
    }
  }

  function updateScore({ winner, scores }) {
    if (winner == 'X') {
      scores.x++
    }
    if (winner == 'O') {
      scores.o++
    }
    scoreX.textContent = `X : ${scores.x}`
    scoreO.textContent = `O : ${scores.o}`
  }
  const handleClick = (evt) => {
    if (isStillOn) {
      // console.log(`Cell ${Number(evt.currentTarget.index)} clicked`)
      board[evt.currentTarget.index] = currentPlayer.mark
      updateScreen()
      // console.log(board)
      if (currentPlayer == player1) {
        currentPlayer = player2
      } else {
        currentPlayer = player1
      }
      checkBoard()
      evt.target.removeEventListener('click', handleClick)
    }
  }

  const setBoard = () => {
    cells.forEach((cell, index) => {
      cell.index = index
      cell.addEventListener('click', handleClick)
    })
  }
  /**
   * updateScreen - renders the game based on the state of be current board array
   */
  const updateScreen = () => {
    for (let i = 0; i < 9; i++) {
      if (board[i] === 'X') {
        cells[i].textContent = 'X'
      } else if (board[i] === 'O') {
        cells[i].textContent = 'O'
      } else {
        cells[i].innerHTML = ''
      }
    }
  }
  playAgainBtn.onclick = () => {
    // Resets the game without resetting the scoreboard
    resetBoard()
  }
  resetBtn.onclick = () => {
    document.querySelector('.game-options').classList.add('active')
    resetBoard()
    gameInfo.scores.x = 0
    gameInfo.scores.o = 0
    updateScore(gameInfo)
  }
  playBtn.onclick = () => {
    if (playerOneInput.value) {
      player1.name = playerOneInput.value
      console.log(player1.name)
    } else {
      player1.name = 'Player 1'
    }
    if (playerTwoInput.value) {
      player2.name = playerTwoInput.value
      console.log(player2.name)
    } else {
      player2.name = 'Player 2'
    }

    document.querySelector('.game-options').classList.remove('active')
    // reset input value
    playerOneInput.value = ''
    playerTwoInput.value = ''
  }
  // Resets the entire game including the scoreboard
  setBoard()
  // updateScreen()
})()
