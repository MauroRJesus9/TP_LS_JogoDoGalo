import React, { useEffect, useState } from "react";
import Board2 from "../board/board.component.modo2";

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

  if (isBoardFull === true) {
    return "empate";
  }

  return null;
}

function TabuleiroModo2(props) {
  const {
    jogador1,
    jogador2,
    currentPlayer,
    onSquareClick,
    updateTabWins,
    incrementGamesPlayed,
  } = props;
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [firstClick, setFirstClick] = useState(false);
  const [activeBoard, setActiveBoard] = useState(null);

  const handleClick = (boardIndex, squareIndex) => {
    const current = history[stepNumber];
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[squareIndex]) {
      return;
    }

    squares[squareIndex] = currentPlayer;
    const newHistory = history.slice(0, stepNumber + 1);
    newHistory[stepNumber] = { squares };
    setHistory(newHistory);
    setXIsNext(!xIsNext);
    onSquareClick(squares[squareIndex]);
    props.setClickedBoard(true);
    if (!firstClick) {
      incrementGamesPlayed();
      setFirstClick(true);
    }

    setActiveBoard(squareIndex);
    props.setEnabledBoards(squareIndex);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares, jogador1.name, jogador2.name);

  useEffect(() => {
    if (winner === jogador1.name) updateTabWins(jogador1.name);
    else if (winner === jogador2.name) updateTabWins(jogador2.name);
  }, [winner, jogador1.name, jogador2.name, updateTabWins]);

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
        {history.map((step, index) => (
          <Board2
            key={`board-${index}`}
            squares={step.squares}
            boardindex={props.id}
            onClick={handleClick}
            winner={winner}
            jogador1={jogador1.name}
            jogador2={jogador2.name}
            activeBoard={activeBoard === index}
            disabled={
              props.clickedBoard
                ? Number(props.enabledBoards) !== Number(props.id)
                : false
            }
            enabledBoards={props.enabledBoards}
            setActiveBoard={setActiveBoard}
          />
        ))}
      </div>
      {/*<div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
        </div>*/}
    </div>
  );
}

export default TabuleiroModo2;
