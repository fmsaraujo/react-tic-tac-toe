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
    else {
        status = `Winner: ${result}`;
    }

    const rows = [];
    for (let i = 0; i < 3; i++) {
        const cols = [];

        for (let j = 0; j < 3; j++) {
            let squareIndex = i * 3 + j;
            cols.push(<Square key={squareIndex} value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} />);
        }

        rows.push(<div key={i} className="board-row">{cols}</div>);
    }

    return (
        <>
            <div className='status'>{status}</div>
            {rows}
        </>
    )
}

function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
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
            return squares[a];
        }
    }

    return null;
}