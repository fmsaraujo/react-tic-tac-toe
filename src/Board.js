export default function Board({ xIsNext, squares, onPlay }) {
    const handleClick = (i) => {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";

        onPlay(nextSquares);
    }

    const result = calculateWinner(squares);
    let status;
    if (!result) {
        status = `Next player: ${xIsNext ? "X" : "O"}`;
    }
    else if (result.winner) {
        status = `Winner: ${result.winner}`;
    }
    else if (result.draw) {
        status = `It's a draw!`;
    }

    var rowSquares = (rowIndex) => [...Array(3).keys()]
        .map(i => {
            var squareIndex = rowIndex * 3 + i;
            const isHighlighted = result && result.winner && result.winningSquares.indexOf(squareIndex) != -1;
            return <Square key={squareIndex} value={squares[squareIndex]} isHighlighted={isHighlighted} onSquareClick={() => handleClick(squareIndex)} />;
        });

    var rows = [...Array(3).keys()]
        .map(i => (
            <div key={i} className="board-row">{rowSquares(i)}</div>
        ));

    return (
        <>
            <div className='status'>{status}</div>
            {rows}
        </>
    )
}

function Square({ value, isHighlighted, onSquareClick }) {
    return (
        <button className={`square ${isHighlighted ? "highlighted" : ""}`} onClick={onSquareClick}>
            {value}
        </button>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                winningSquares: [a, b, c]
            };
        }
    }

    if (squares.every(s => s !== null)) {
        return {
            draw: true
        };
    }

    return null;
}