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

const initialState = {
  squares: Array(9).fill(null),
};

function Tabuleiro(props) {
  const {
    handleActiveBoard,
    activeBoardIndex,
    jogador1,
    jogador2,
    currentPlayer,
    onSquareClick,
    updateTabWins,
    updateEmpates,
    incrementGamesPlayed,
    allowedBoards,
    handleAllowedBoards,
    handleBoardsWon,
    handleUltimateWinner,
    isBoardFull,
  } = props; //add onSquareClick como props para poder receber o jogador atual
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAllowedBoard, setIsAllowedBoard] = useState(true);

  const resetBoard = () => {
    setHistory([initialState]);
    setStepNumber(0);
  };

  useEffect(() => {
    if (props.resetBoard) {
      resetBoard();
    }
  }, [props.resetBoard]);


  /*********************************
   *       COMPUTER FUNCTIONS      *
   *********************************/
  
  const makeComputerMove = () => {
    const current = history.slice(0, stepNumber + 1);
    const currentBoard = current[current.length - 1];
    const squares = [...currentBoard.squares];
  
    // Encontra as células disponíveis (vazias)
    const emptyCells = [];
    squares.forEach((cell, index) => {
      if(cell === null)
        emptyCells.push(index);
    });
  
    if (emptyCells.length === 0) {
      // O tabuleiro está cheio, não há mais movimentos possíveis
      return;
    }
  
    // Escolhe uma célula aleatória das células disponíveis
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const selectedCell = emptyCells[randomIndex];
    if (calculateWinner(squares) || squares[selectedCell]) {
      return;
    }
  
    // Faz o movimento para o jogador computador
    squares[selectedCell] = currentPlayer;
  
    setHistory([...history, { squares }]);
    setStepNumber(history.length);
    setXIsNext(!xIsNext);

    onSquareClick(squares[selectedCell]); //manda o currentPlayer para o App.js -> ativa o timer do outro jogador e muda o jogador, entao meter o value no square n funciona com onCLick
    
    let indexSelectedByComputer = Math.floor(Math.random() * allowedBoards.length);
    //handleActiveBoard(indexSelectedByComputer);
    handleActiveBoard(allowedBoards[indexSelectedByComputer]);
  };

  useEffect(() => {
    let timerId = null;

    if (
      currentPlayer === jogador1.symbol &&
      jogador1.name === "computador" &&
      props.id === activeBoardIndex &&
      allowedBoards.includes(props.id)
    ) {
      timerId = setTimeout(() => {
        makeComputerMove();
      }, 1000);

    } else if (
      currentPlayer === jogador2.symbol &&
      jogador2.name === "computador" &&
      props.id === activeBoardIndex &&
      allowedBoards.includes(props.id)
    ) {
      timerId = setTimeout(() => {
        makeComputerMove();
      }, 1000);

    }else if(
      currentPlayer === jogador1.symbol &&
      jogador1.name === "computador" &&
      props.id === activeBoardIndex &&
      !allowedBoards.includes(props.id)
    ){
      timerId = setTimeout(() => {
        let indexSelectedByComputer = Math.floor(Math.random() * allowedBoards.length);
        handleActiveBoard(allowedBoards[indexSelectedByComputer]);

        console.log("Board not allowed: ", props.id);
        console.log("Boards: ", allowedBoards);
      }, 1000);
    }else if(
      currentPlayer === jogador2.symbol &&
      jogador2.name === "computador" &&
      props.id === activeBoardIndex &&
      !allowedBoards.includes(props.id)
    ){
      timerId = setTimeout(() => {
        let indexSelectedByComputer = Math.floor(Math.random() * allowedBoards.length);
        handleActiveBoard(allowedBoards[indexSelectedByComputer]);

        console.log("Board not allowed: ", props.id);
        console.log("Boards: ", allowedBoards);
      }, 1000);
    }

    return () => {
      // Limpa o timer quando o componente é desmontado ou quando o jogador não é mais o computador
      clearTimeout(timerId);
    };
  }, [currentPlayer, jogador1, jogador2, props.id, allowedBoards, activeBoardIndex]);

  useEffect(() => {
    if(
      !isAllowedBoard
    ){
      handleAllowedBoards(props.id);
    }
  }, [isAllowedBoard]);

  useEffect(() => { //este useEffect serve para quando o timer do computador chegar a 0 ir para o handleUltimateWinner e apresentar o gameOverModal
    
    if((currentPlayer === jogador1.symbol &&
        jogador1.name === "computador" && jogador1.timer === 0) ||
      (currentPlayer === jogador2.symbol &&
        jogador2.name === "computador" && jogador2.timer === 0)){

          let timer = (currentPlayer === jogador1.symbol &&
                        jogador1.name === "computador") ? jogador1.timer : jogador2.timer;

          console.log(timer);
          handleUltimateWinner(timer);

        
      } 
  }, [currentPlayer, jogador1, jogador2, jogador1.timer, jogador2.timer]);

  /*********************************
   *       COMPUTER FUNCTIONS      *
   *********************************/

  const handleClick = (i) => {
    const current = history.slice(0, stepNumber + 1);
    const currentBoard = current[current.length - 1];
    const squares = [...currentBoard.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    //squares[i] = xIsNext ? "X" : "O";
    squares[i] = currentPlayer;

    setHistory([...current, { squares }]);
    setStepNumber(current.length);
    setXIsNext(!xIsNext);

    onSquareClick(squares[i]); //enviar ao onSquareClick o jogador atual
  };

  const handleThisBoardAllowed = () => {
    setIsAllowedBoard(!isAllowedBoard);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares, jogador1.name, jogador2.name); //retorna o nome do jogador

  useEffect(() => {
    if (winner === jogador1.name) {
      updateTabWins(jogador1.name);
      handleThisBoardAllowed();
      handleBoardsWon(jogador1.name, props.id);
      incrementGamesPlayed(); //incrementar o numOfGamesPlayed
    }
    else if (winner === jogador2.name){
      updateTabWins(jogador2.name);
      handleThisBoardAllowed();
      handleBoardsWon(jogador2.name, props.id);
      incrementGamesPlayed(); //incrementar o numOfGamesPlayed
    } else if (winner === "empate"){
      updateEmpates();
      incrementGamesPlayed(); //incrementar o numOfGamesPlayed
    }
  }, [winner, jogador1.name, jogador2.name]);

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
          //metodo impedir que o jogador click na vez do computador jogar
          onClick={
            (currentPlayer === jogador1.symbol &&
              jogador1.name === "computador") ||
            (currentPlayer === jogador2.symbol &&
              jogador2.name === "computador")
            ? () => {} : handleClick}
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
