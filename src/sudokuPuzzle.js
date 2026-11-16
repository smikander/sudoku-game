import { countSolutions } from "./sudokuSolver.js";
import { shuffleArray } from "./shuffleArray.js";
import { generateSolvedBoard } from "./sudokuGenerator.js";

export function createPuzzle(solution, cellsToRemove) {
  const puzzle = solution.map((row) => [...row]);

  let nullCount = (board) =>
    board.flat().filter((cell) => cell === null).length;

  const positions = [];

  for (let row = 0; row < solution.length; row++) {
    for (let col = 0; col < solution.length; col++) {
      positions.push({ row, col });
    }
  }
  const shuffledPositions = shuffleArray(positions);

  for (const pos of shuffledPositions) {
    if (nullCount(puzzle) >= cellsToRemove) {
      break;
    }
    const { row, col } = pos;
    const originalValue = puzzle[row][col];
    puzzle[row][col] = null;
    if (countSolutions(puzzle) > 1) {
      puzzle[row][col] = originalValue;
    }
  }
  return puzzle;
}
