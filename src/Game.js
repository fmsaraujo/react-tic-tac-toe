import { useState } from "react";
import Board from "./Board";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [isAscendingHistory, setIsAscendingHistory] = useState(false);
    const [currentMove, setCurrentMove] = useState(0);

    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 == 0;

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    let moves = history.map((squares, move) => {
        let description;

        if (move == currentMove) {
            return (
                <li key={move}>
                    You are at move #{move}
                </li>
            )
        }

        if (move == 0) {
            description = 'Go to game start';
        }
        else {
            description = `Go to move #${move}`;
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    if (isAscendingHistory === false) {
        moves = moves.reverse();
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
                <button onClick={() => setIsAscendingHistory(!isAscendingHistory)}>Toggle Sort</button>
            </div>
        </div>
    );
}