import { useState, useEffect } from 'react';
import './SudokuBoard.css';
import { generateSolvedBoard } from '../sudokuGenerator';
import { createPuzzle } from '../sudokuPuzzle';
import { checkSolution, hasConflict } from '../sudokuValidator';
import { countSolutions } from '../sudokuSolver';

function createGame(size, difficulty) {
    const solution = generateSolvedBoard(size);
    const difficultyLevels = {
        easy: 0.35, // 35% of the cells will be removed
        medium: 0.5, // 50% of the cells will be removed    
        hard: 0.6 // 60% of the cells will be removed
    };
    const cellsToRemove = Math.floor(size * size * difficultyLevels[difficulty]);
    const puzzle = createPuzzle(solution, cellsToRemove);

    return { solution, puzzle };
}
function SudokuBoard() {
    const [gridSize, setGridSize] = useState(9);
    const [difficulty, setDifficulty] = useState('medium');
    const [game, setGame] = useState(() => createGame(gridSize, difficulty));
    const [board, setBoard] = useState(game.puzzle);
    const [selectedCell, setSelectedCell] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [feedbackType, setFeedbackType] = useState(null); // New state for feedback type
    const [seconds, setSeconds] = useState(0);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    const [isGameComplete, setIsGameComplete] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    function startNewGame(size, selectedDifficulty) {
        setFeedback(''); // Clear feedback when starting a new game
        setFeedbackType(null); // Clear feedback type when starting a new game
        const { solution, puzzle } = createGame(size, selectedDifficulty);
        setGridSize(size);
        setDifficulty(selectedDifficulty);
        setGame({ solution, puzzle });
        setBoard(puzzle);
        setSelectedCell(null); // Deselect any selected cell when starting a new game
        setSeconds(0); // Restart timer
        setIsGameComplete(false);
        setIsPaused(false);
    }
    useEffect(() => {
        if (isGameComplete || isPaused) return;

        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isGameComplete, isPaused]);

    return (
        <>
            <div className="grid-size-selector">
                <button className={gridSize === 6 ? 'active' : ''} onClick={() => startNewGame(6, difficulty)}>
                    6x6
                </button>
                <button className={gridSize === 9 ? 'active' : ''} onClick={() => startNewGame(9, difficulty)}>
                    9x9
                </button>
            </div>
            <div className="difficulty-selector">
                <button className={difficulty === 'easy' ? 'active' : ''} onClick={() => {
                    startNewGame(gridSize, 'easy');

                }}>
                    Easy
                </button>
                <button className={difficulty === 'medium' ? 'active' : ''} onClick={() => {
                    startNewGame(gridSize, 'medium');
                }}>
                    Medium
                </button>
                <button className={difficulty === 'hard' ? 'active' : ''} onClick={() => {
                    startNewGame(gridSize, 'hard');
                }}>
                    Hard
                </button>
            </div>
            <p>Time: {formattedTime}</p><button
                className='pause-button'
                onClick={() => setIsPaused(prev => !prev)}
                disabled={isGameComplete}
            >
                {isPaused ? "Resume" : "Pause"}
            </button>

            <div className='board-container'>
                <div className={`sudoku-board ${isPaused ? 'paused' : ''}`}
                    style={{ '--grid-size': gridSize }}>
                    {board.map((row, rowIndex) => (
                        row.map((cell, colIndex) => {
                            const cellClass = game.puzzle[rowIndex][colIndex] !== null ? 'pre-filled' : cell !== null ? 'filled' : 'empty';
                            const conflict = cell !== null &&
                                hasConflict(board, rowIndex, colIndex, cell);
                            const boxRows = gridSize / 3;
                            const boxCols = 3;

                            const borderRight =
                                (colIndex + 1) % boxCols === 0 &&
                                colIndex !== gridSize - 1;

                            const borderBottom =
                                (rowIndex + 1) % boxRows === 0 &&
                                rowIndex !== gridSize - 1;

                            return (
                                <div className={`sudoku-cell ${cellClass} ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? (cell !== null ? 'selected-filled' : 'selected') : ''} ${borderRight ? 'box-border-right' : ''} ${borderBottom ? 'box-border-bottom' : ''} ${conflict ? 'conflict' : ''}`} key={`${rowIndex}-${colIndex}`} onClick={() => {
                                    if (game.puzzle[rowIndex][colIndex] === null) {
                                        setSelectedCell({ row: rowIndex, col: colIndex });
                                    }
                                }}>
                                    {cell}
                                </div>
                            );
                        })
                    ))
                    }
                </div >
                {isPaused && (
                    <div className='pause-overlay'>
                        <p>Game paused</p>
                    </div>
                )}
            </div>

            <div className={`number-pad number-pad-${gridSize} ${isPaused ? 'paused' : ''}`}>
                {Array.from({ length: gridSize }, (_, i) => i + 1).map((number) => (
                    <button key={number} onClick={() => {
                        if (!isGameComplete && selectedCell && game.puzzle[selectedCell.row][selectedCell.col] === null) {
                            const newBoard = board.map(row => [...row]);
                            newBoard[selectedCell.row][selectedCell.col] = number;
                            setBoard(newBoard);
                            setSelectedCell(null); // Deselect the cell after placing a number
                            setFeedback(''); // Clear feedback when placing a number
                            setFeedbackType(null); // Clear feedback type when placing a number

                            if (checkSolution(newBoard, game.solution)) {
                                setFeedback(`Congratulations! You solved the puzzle in ${formattedTime}!`);
                                setFeedbackType('success'); // Set feedback type to success
                                setIsGameComplete(true);
                            }
                        }
                    }}>
                        {number}
                    </button>
                ))}
                <button className="delete-number" onClick={() => {
                    if (selectedCell && game.puzzle[selectedCell.row][selectedCell.col] === null) {
                        const newBoard = board.map(row => [...row]);
                        newBoard[selectedCell.row][selectedCell.col] = null;
                        setBoard(newBoard);
                        setSelectedCell(null); //
                        setFeedback(''); // Clear feedback when deleting a number
                        setFeedbackType(null); // Clear feedback type when deleting a number
                    }
                }}>
                    Del
                </button>

            </div>
            <div className={`game-actions ${isPaused ? 'paused' : ''}`}>
                <button className="reset-board" onClick={() => {
                    const newBoard = game.puzzle.map(row => [...row]);
                    setFeedback(''); // Clear feedback when resetting the board
                    setFeedbackType(null); // Clear feedback type when resetting the board
                    setBoard(newBoard);
                    setSelectedCell(null); // Deselect the cell after resetting 
                }}
                disabled={isGameComplete}>
                    Reset
                </button>
            </div>
            <p className={`feedback ${feedbackType}`}>{feedback}</p>
        </>
    );
}

export default SudokuBoard;
