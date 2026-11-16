import { hasConflict } from "./sudokuValidator.js";
import { generateSolvedBoard } from "./sudokuGenerator.js";

function findEmptyCell(board) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === null) {
                return { row, col };
            }
        }
    }

    return null;
}

function isValidPlacement(board, row, col, number) {
    return !hasConflict(board, row, col, number);
}

export function countSolutions(board, limit = 2) {
    let solutions = 0;
    const emptyCell = findEmptyCell(board);

    if (emptyCell === null) {
        return 1;
    }

    const { row, col } = emptyCell;

    for (let number = 1; number <= board.length; number++) {
        if (isValidPlacement(board, row, col, number)) {
            board[row][col] = number;

            solutions += countSolutions(board, limit - solutions);

            board[row][col] = null;

            if (solutions >= limit) {
                return solutions;
            }
        }
    }

    return solutions;
}
const emptyBoard = Array.from(
    { length: 6 },
    () => Array(6).fill(null)
);

//console.log("Ratkaisujen määrä:", countSolutions(emptyBoard));