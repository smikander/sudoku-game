export function checkSolution(board, solution) {
    return board.every((row, rowIndex) =>
        row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
    );
}             