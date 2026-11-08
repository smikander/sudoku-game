export function checkSolution(board, solution) {
    return board.every((row, rowIndex) =>
        row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
    );
}

export function hasConflict(board, row, col, number) {
    // Check row
    const rowConflict = board[row].some((value, index) => {
        return value === number && index !== col;
    });
    const colConflict = board.some((currentRow, rowIndex) => {
        return currentRow[col] === number && rowIndex !== row;
    });

    if (rowConflict || colConflict) {
        return true;
    }

    const gridSize = board.length;
    const boxRows = gridSize / 3;
    const boxCols = 3;

    const boxStartRow = Math.floor(row / boxRows) * boxRows;
    const boxStartCol = Math.floor(col / boxCols) * boxCols;

    for (let r = boxStartRow; r < boxStartRow + boxRows; r++) {
        for (let c = boxStartCol; c < boxStartCol + boxCols; c++) {
            if (
                board[r][c] === number &&
                (r !== row || c !== col)
            ) {
                return true;
            }
        }
    }
    return false;
}
