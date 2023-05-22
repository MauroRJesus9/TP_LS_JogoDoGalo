import React, { useState } from "react";

function Square(props) {

  const pickPlayerColor = props.value === "X" ? "blue" : "red";
  /* let buttonStyle =
    props.value === "X"
      ? "btn-x"
      : props.value === "O"
      ? "square o"
      : "square"; */
  return (
    /*<button className={"square"} onClick={props.onClick}> 
      {props.value}
    </button>*/
    <button className="square" onClick={() => props.onClick()}> {/* changed */} {/* MUDANÇA PROVISORIA -> melhorar a maneira de colorir o conteudo sem ser in-line Style */}
      <span style={{color: pickPlayerColor, fontWeight: "bold"}}>
        {props.value}
      </span>
    </button>
  );
}

function Board(props) {
  function renderSquare(i) {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function calculateWinner(squares, jogador1, jogador2) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] === "X" ? jogador1 : jogador2;
    }
  }
  return null;
}

function Tabuleiro(props) {
  const { jogador1, jogador2, onSquareClick } = props; //add onSquareClick como props para poder receber o jogador atual
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const current = history.slice(0, stepNumber + 1);
    const currentBoard = current[current.length - 1];
    const squares = [...currentBoard.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory([...current, { squares }]);
    setStepNumber(current.length);
    setXIsNext(!xIsNext);

    onSquareClick(squares[i]); //enviar ao onSquareClick o jogador atual
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares, jogador1, jogador2);

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (history.length === 10) {
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? jogador1 : jogador2}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Tabuleiro;

