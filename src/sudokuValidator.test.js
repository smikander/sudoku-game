import { describe, test, expect } from "vitest";
import { hasConflict } from "./sudokuValidator.js";

describe("Sudoku Validator", () => {
  test("detects a row conflict", () => {
    const board = [
      [1, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null]
    ];

    const conflict = hasConflict(board, 0, 1, 1);

    expect(conflict).toBe(true);
  });
  test("detects a column conflict", () => {
    const board = [
      [1, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null]
    ];

    const conflict = hasConflict(board, 1, 0, 1);

    expect(conflict).toBe(true);
  });
  test("detects a box conflict", () => {
    const board = [
      [1, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null]
    ];

    const conflict = hasConflict(board, 1, 2, 1);

    expect(conflict).toBe(true);
  });
  test("allows a valid placement", () => {
    const board = [
      [1, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null]
    ];

    const conflict = hasConflict(board, 1, 2, 2);

    expect(conflict).toBe(false);
  });
});