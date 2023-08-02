const Gameboard = (function () {
	const board = ['O', 'X', 'O', '', 'X', 'O', 'X', 'O', 'X'];
	const resetBoard = () => {
		const newBoard = board.map((cell, index) => '');
		Gameboard.board = newBoard;
		console.log(newBoard);
	};
	const checkWin = (board) => {
		// code to check rows, columns and diagonals for wins
	};
	return {
		board,
		resetBoard,
	};
})();

const Player = (name, mark) => {
	let score = 0;
	return Object.assign({}, { name, mark, score });
};

// DOM ELEMENTS
const cells = document.querySelectorAll('.cell');

// cells.forEach((cell, index) => {
// 	cell.onclick = () => console.log(`Cell number ${index} clicked`);
// });

/**
 * displayBoard - renders the game based on the state of be current board array
 */
const displayBoard = () => {
	for (let i = 0; i < 9; i++) {
		if (Gameboard.board[i] === 'X') {
			cells[i].innerHTML =
				'<span class="material-symbols-outlined"> close </span>';
		} else if (Gameboard.board[i] === 'O') {
			cells[i].innerHTML =
				'<span class="material-symbols-outlined">radio_button_unchecked</span>';
		} else {
			cells[i].innerHTML = '';
		}
	}
};

displayBoard();
cells.forEach((cell, index) => {
	cell.addEventListener('click', () => {
		console.log(`Cell ${Number(index + 1)} clicked`);
	});
});
