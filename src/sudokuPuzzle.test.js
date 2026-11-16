import { generateSolvedBoard } from "./sudokuGenerator.js";
import { createPuzzle } from "./sudokuPuzzle.js";
import { countSolutions } from "./sudokuSolver.js";

let successfulPuzzles = 0;
const removedCells = [30, 40, 50];
for (let i = 0; i < 20; i++) {
  const solution = generateSolvedBoard(9);

  for (let i = 0; i < removedCells.length; i++) {
    const puzzle = createPuzzle(solution, removedCells[i]);
    if (
      countSolutions(puzzle) === 1 &&
      puzzle.flat().filter((cell) => cell === null).length === removedCells[i]
    ) {
      successfulPuzzles++;
    }
  }
}
console.log("Onnistueet sudokut", successfulPuzzles, "/ 60");
