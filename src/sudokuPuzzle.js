export function createPuzzle(solution, cellsToRemove) {
    const puzzle = solution.map(row => [...row]);

    let nullCount = (board) =>
        board.flat().filter(cell => cell === null).length;

    while (nullCount(puzzle) < cellsToRemove) {
        const randomRow = Math.floor(Math.random() * solution.length);
        const randomCol = Math.floor(Math.random() * solution.length);

        puzzle[randomRow][randomCol] = null;
    }

    return puzzle;
}
