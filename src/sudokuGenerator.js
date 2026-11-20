
import { shuffleArray } from "./shuffleArray.js";
import { hasConflict } from "./sudokuValidator.js";

export function generateSolvedBoard(gridSize) {
    
    const board = Array.from(
        { length: gridSize },
        () => Array(gridSize).fill(null)
    );

    const numbers = Array.from(
        { length: gridSize },
        (_, i) => i + 1
    );

    function fillBoard() {

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {

                if (board[row][col] !== null) {
                    continue;
                }

                const shuffledNumbers = shuffleArray(numbers);

                for (const number of shuffledNumbers) {

                    if (!hasConflict(board, row, col, number)) {

                        board[row][col] = number;

                        if (fillBoard()) {
                            return true;
                        }

                        board[row][col] = null;
                    }
                }

                return false;
            }
        }

        return true;
    }

    const success = fillBoard();

    if (!success) {
        throw new Error("Sudoku-ruudukon generointi epäonnistui.");
    }

    return board;
}
