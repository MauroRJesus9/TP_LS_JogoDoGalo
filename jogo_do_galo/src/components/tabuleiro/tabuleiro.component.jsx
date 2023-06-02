import React, { useEffect, useState } from "react";
import Board from "../board/board.component";

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

  let isBoardFull = true;

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] === "X" ? jogador1 : jogador2;
    }
  }

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      isBoardFull = false; // Se houver alguma posição vazia, o tabuleiro não está completamente preenchido
      break;
    }
  }

  if (isBoardFull == true) {
    return "empate";
  }

  return null;
}

function Tabuleiro(props) {
  const {
    jogador1,
    jogador2,
    onSquareClick,
    updateTabWins,
    incrementGamesPlayed,
    currentPlayer,
  } = props; //add onSquareClick como props para poder receber o jogador atual
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(currentPlayer == "X" ? true : false);
  const [firstClick, setFirstClick] = useState(false);

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

    if (!firstClick) {
      incrementGamesPlayed();
      setFirstClick(true);
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares, jogador1.name, jogador2.name); //retorna o nome do jogador

  //duvida? porque que tive que usar o useEffect
  useEffect(() => {
    if (winner === jogador1.name) updateTabWins(jogador1.name);
    else if (winner === jogador2.name) updateTabWins(jogador2.name);
  }, [winner, jogador1.name, jogador2.name]);
  //duvida? porque que tive que usar o useEffect

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
    status = `Next player: ${xIsNext ? jogador1.name : jogador2.name}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
          winner={winner}
          jogador1={jogador1.name}
          jogador2={jogador2.name}
        />
      </div>
      {/*<div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
        </div>*/}
    </div>
  );
}

export default Tabuleiro;
