import { describe, test, expect } from "vitest";
import { generateSolvedBoard } from "./sudokuGenerator.js";

describe("Sudoku Generator", () => {
  test("generates a 9x9 Sudoku board", () => {
    const board = generateSolvedBoard(9);

    expect(board.length).toBe(9);
  });
  test("every row has 9 columns", () => {
    const board = generateSolvedBoard(9);

    board.forEach(row => {
      expect(row.length).toBe(9);
    });
  });
  test("generates a 6x6 Sudoku board", () => {
    const board = generateSolvedBoard(6);

    expect(board.length).toBe(6);
  });
  test("every row has 6 columns", () => {
    const board = generateSolvedBoard(6);

    board.forEach(row => {
      expect(row.length).toBe(6);
    });
  });
  test("every row contains unique numbers in 9x9 sudoku", () => {
    const board = generateSolvedBoard(9);

    board.forEach(row => {
      const uniqueNumbers = new Set(row);

      expect(uniqueNumbers.size).toBe(9);
    });
  });
  test("every row contains unique numbers in 6x6 sudoku", () => {
    const board = generateSolvedBoard(6);

    board.forEach(row => {
      const uniqueNumbers = new Set(row);

      expect(uniqueNumbers.size).toBe(6);
    });
  });
  test("every column contains unique numbers in 9x9 sudoku", () => {
    const board = generateSolvedBoard(9);

    for (let col = 0; col < 9; col++) {
      const column = board.map(row => row[col]);
      const uniqueNumbers = new Set(column);

      expect(uniqueNumbers.size).toBe(9);
    }
  });
  test("every column contains unique numbers in 6x6 sudoku", () => {
    const board = generateSolvedBoard(6);

    for (let col = 0; col < 6; col++) {
      const column = board.map(row => row[col]);
      const uniqueNumbers = new Set(column);

      expect(uniqueNumbers.size).toBe(6);
    }
  });
  test("every 3x3 box contains unique numbers", () => {
    const board = generateSolvedBoard(9);

    for (let startRow = 0; startRow < 9; startRow += 3) {
      for (let startCol = 0; startCol < 9; startCol += 3) {

        const numbers = [];

        for (let row = startRow; row < startRow + 3; row++) {
          for (let col = startCol; col < startCol + 3; col++) {
            numbers.push(board[row][col]);
          }
        }

        const uniqueNumbers = new Set(numbers);

        expect(uniqueNumbers.size).toBe(9);
      }
    }
  });
  test("every 2x3 box contains unique numbers", () => {
    const board = generateSolvedBoard(6);

    for (let startRow = 0; startRow < 6; startRow += 2) {
      for (let startCol = 0; startCol < 6; startCol += 3) {

        const numbers = [];

        for (let row = startRow; row < startRow + 2; row++) {
          for (let col = startCol; col < startCol + 3; col++) {
            numbers.push(board[row][col]);
          }
        }

        const uniqueNumbers = new Set(numbers);

        expect(uniqueNumbers.size).toBe(6);
      }
    }
  });

  test("every row contains numbers from 1 to 9", () => {
    const board = generateSolvedBoard(9);

    const expectedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    board.forEach(row => {
      const sortedRow = [...row].sort((a, b) => a - b);

      expect(sortedRow).toEqual(expectedNumbers);
    });
  });
  test("every row contains numbers from 1 to 6", () => {
    const board = generateSolvedBoard(6);

    const expectedNumbers = [1, 2, 3, 4, 5, 6];

    board.forEach(row => {
      const sortedRow = [...row].sort((a, b) => a - b);

      expect(sortedRow).toEqual(expectedNumbers);
    });
  });
});
