import { describe, test, expect } from "vitest";
import { countSolutions } from "./sudokuSolver.js";

describe("Sudoku Solver", () => {
  test("detects multiple solutions", () => {

    const board = Array.from(
      { length: 6 },
      () => Array(6).fill(null)
    );

    const solutionCount = countSolutions(board, 2);

    expect(solutionCount).toBe(2);
  });
  test("returns zero when puzzle has no solution", () => {
    const board = [
      [null, 2, 3, 4, 5, 6],
      [1, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null]
    ];

    const solutionCount = countSolutions(board);

    expect(solutionCount).toBe(0);
  });
});
