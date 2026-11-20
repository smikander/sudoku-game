import { describe, test, expect } from "vitest";
import { generateSolvedBoard } from "./sudokuGenerator.js";
import { createPuzzle } from "./sudokuPuzzle.js";
import { countSolutions } from "./sudokuSolver.js";
import { hasConflict } from "./sudokuValidator.js";

describe("Sudoku Puzzle", () => {
  test("creates a puzzle with empty cells", () => {
    const solution = generateSolvedBoard(6);

    // Pyydetään poistamaan 10 numeroa.
    const puzzle = createPuzzle(solution, 10);

    // Lasketaan tyhjät ruudut.
    const emptyCells = puzzle
      .flat()
      .filter(cell => cell === null);

    expect(emptyCells.length).toBe(10);
  });
  test("createPuzzle does not modify the original solution", () => {
    const solution = generateSolvedBoard(6);

    // Otetaan alkuperäisestä ratkaisusta kopio.
    const originalSolution = solution.map(row => [...row]);

    // Luodaan tehtävä poistamalla 10 numeroa.
    createPuzzle(solution, 10);

    // Tarkistetaan, että alkuperäinen ratkaisu
    // on edelleen samanlainen kuin ennen funktion kutsua.
    expect(solution).toEqual(originalSolution);
  });
  test("generated 6x6 puzzle has exactly one solution", () => {
    const solution = generateSolvedBoard(6);

    // Luodaan tehtävä poistamalla 10 numeroa.
    const puzzle = createPuzzle(solution, 10);

    // countSolutions käyttää backtracking-algoritmia
    // mahdollisten ratkaisujen laskemiseen.
    const solutionCount = countSolutions(puzzle);

    // Sudokulla pitää olla täsmälleen yksi ratkaisu.
    expect(solutionCount).toBe(1);
  });
  test("generated 9x9 puzzle has exactly one solution", () => {
    const solution = generateSolvedBoard(9);

    // Luodaan tehtävä poistamalla 22 numeroa.
    const puzzle = createPuzzle(solution, 22);

    // countSolutions käyttää backtracking-algoritmia
    // mahdollisten ratkaisujen laskemiseen.
    const solutionCount = countSolutions(puzzle);

    // Sudokulla pitää olla täsmälleen yksi ratkaisu.
    expect(solutionCount).toBe(1);
  });
});


