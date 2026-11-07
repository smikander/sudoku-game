function shuffleNumbers(numbers) {
    const shuffled = [...numbers];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

export function generateSolvedBoard(gridSize) {
    const size = gridSize;
    let numbers = Array.from({ length: size }, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    //console.log("Grid size:", gridSize);
    numbers = shuffleNumbers(numbers); // Shuffle the numbers

    // Create board initialized with null values
    const board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
    const boxRows = gridSize / 3;// Number of rows in each box
    const boxCols = 3; // Number of columns in each box

    for (let i = 0; i < size; i++) {
        const offset =
            Math.floor(i / boxRows) +
            (i % boxRows) * boxCols; // Calculate the offset based on the row index
        const row = numbers.map((_, index) => {
            return numbers[(index + offset) % numbers.length];
        });
        board[i] = row;
    }

    // Shuffle the rows within each box to add more randomness

    for (let i = 0; i < gridSize; i += boxRows) {
        const rows = board.slice(i, i + boxRows);
        const shuffledRows = shuffleNumbers(rows);

        for (let j = 0; j < boxRows; j++) {
            board[i + j] = shuffledRows[j];
        }
    }

    // Shuffle the columns within each box to add more randomness
    for (let i = 0; i < gridSize; i += boxCols) {
        const col1 = i + Math.floor(Math.random() * boxCols);
        const col2 = i + Math.floor(Math.random() * boxCols);
        console.log(`Swapping columns ${col1} and ${col2}`);
        for (let j = 0; j < gridSize; j++) {
            [board[j][col1], board[j][col2]] = [board[j][col2], board[j][col1]];
        }
    }

    const isValidRow = (row) => new Set(row).size === gridSize;
    const isValidColumn = (board, colIndex) => {
        const column = board.map(row => row[colIndex]);
        return new Set(column).size === gridSize;
    };
    const isValidBox = (board, startRow, startCol) => {
        const box = [];
        for (let i = startRow; i < startRow + boxRows; i++) {
            for (let j = startCol; j < startCol + boxCols; j++) {
                box.push(board[i][j]);
            }
        }
        return new Set(box).size === gridSize;
    };
    let isBoardValid = board.every(row => isValidRow(row)) &&
        board.every((_, colIndex) => isValidColumn(board, colIndex));

    for (let startRow = 0; startRow < gridSize; startRow += boxRows) {
        for (let startCol = 0; startCol < gridSize; startCol += boxCols) {
            if (!isValidBox(board, startRow, startCol)) {
                isBoardValid = false;
            }
        }
    }
    console.log("Is the generated board valid?", isBoardValid);
    return board;
}
