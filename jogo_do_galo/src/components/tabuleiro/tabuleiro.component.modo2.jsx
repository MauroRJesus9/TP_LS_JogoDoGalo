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
    handleActiveBoard, //ADD
    activeBoardIndex, //ADD
    jogador1,
    jogador2,
    currentPlayer,
    onSquareClick,
    updateTabWins,
    updateEmpates, //ADD
    incrementGamesPlayed,
    allowedBoards, //ADD
    handleAllowedBoards, //ADD
    handleBoardsWon, //ADD
    handleUltimateWinner //ADD
  } = props;
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [activeBoard, setActiveBoard] = useState(null);
  const [isAllowedBoard, setIsAllowedBoard] = useState(true); //ADD
  const [firstClick, setFirstClick] = useState(false); //ADD

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

    //setActiveBoard(squareIndex);
    //props.setEnabledBoards(squareIndex);
    
    //ADD
    if(allowedBoards.includes(squareIndex) && calculateWinner(current.squares, jogador1.name, jogador2.name) == null){
      setActiveBoard(squareIndex);
      props.setEnabledBoards(squareIndex);
      handleActiveBoard(squareIndex);
    }else{
      let indexSelectedByComputer = Math.floor(
       Math.random() * allowedBoards.length - 1
      );
      setActiveBoard(indexSelectedByComputer);
      props.setEnabledBoards(indexSelectedByComputer);
      handleActiveBoard(indexSelectedByComputer);
    }
    //ADD
    
  };

  const handleThisBoardAllowed = () => { //ADD
    setIsAllowedBoard(!isAllowedBoard);
  };

  const makeComputerMove = () => { //ADD
    const current = history[stepNumber];
    const squares = [...current.squares];
    // Encontra as células disponíveis (vazias)
    const emptyCells = [];
    squares.forEach((cell, index) => {
      if (cell === null) emptyCells.push(index);
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
    const newHistory = history.slice(0, stepNumber + 1);
    newHistory[stepNumber] = { squares };
    setHistory(newHistory);
    setXIsNext(!xIsNext);
    onSquareClick(squares[selectedCell]);
    props.setClickedBoard(true);

    //setActiveBoard(selectedCell);
    //props.setEnabledBoards(selectedCell);

    /*let indexSelectedByComputer = Math.floor(
      Math.random() * allowedBoards.length
    );

    handleActiveBoard(allowedBoards.includes(selectedCell) ? props.enabledBoards : allowedBoards[indexSelectedByComputer]);*/

    //ADD
    if(allowedBoards.includes(selectedCell)){
      setActiveBoard(selectedCell);
      props.setEnabledBoards(selectedCell);
      handleActiveBoard(selectedCell);
    }else{
      let indexSelectedByComputer = Math.floor(
        Math.random() * allowedBoards.length - 1
      );
      setActiveBoard(indexSelectedByComputer);
      props.setEnabledBoards(indexSelectedByComputer);
      handleActiveBoard(indexSelectedByComputer);
    }
    //ADD
    
  };

  useEffect(() => { //ADD
    let timerId = null;

    if (
      (currentPlayer === jogador1.symbol &&
        jogador1.name === "computador" &&
        props.id === props.enabledBoards &&
        allowedBoards.includes(props.id)) ||
      (currentPlayer === jogador2.symbol &&
        jogador2.name === "computador" &&
        props.id === props.enabledBoards &&
        allowedBoards.includes(props.id))
    ) {
      timerId = setTimeout(() => {
        makeComputerMove();
      }, 1000);
    } else if (
      (currentPlayer === jogador1.symbol &&
        jogador1.name === "computador" &&
        props.id === props.enabledBoards &&
        !allowedBoards.includes(props.id)) ||
      (currentPlayer === jogador2.symbol &&
        jogador2.name === "computador" &&
        props.id === props.enabledBoards &&
        !allowedBoards.includes(props.id))
    ) {
      timerId = setTimeout(() => {
        let indexSelectedByComputer = Math.floor(
          Math.random() * allowedBoards.length
        );
        handleActiveBoard(allowedBoards[indexSelectedByComputer]);

        console.log("Board not allowed: ", props.id);
      }, 1000);
    }

    return () => {
      // Limpa o timer quando o componente é desmontado ou quando o jogador não é mais o computador
      clearTimeout(timerId);
    };
  }, [
    currentPlayer,
    jogador1,
    jogador2,
    props.id,
    allowedBoards,
    props.enabledBoards
  ]);

  //useEffect necessario para quando o computador é o firstClick
  useEffect(() => { //ADD
    if (
      (currentPlayer === jogador1.symbol &&
        jogador1.name === "computador" &&
        jogador1.timer === 0) ||
      (currentPlayer === jogador2.symbol &&
        jogador2.name === "computador" &&
        jogador2.timer === 0)
    ) {
      let timer = currentPlayer === jogador1.symbol ? jogador1.timer : jogador2.timer;

      handleUltimateWinner(timer);
    }
  }, []);


  useEffect(() => { //ADD

    if (!firstClick &&
      (currentPlayer === jogador1.symbol &&
        jogador1.name === "computador" &&
        props.id === props.enabledBoards &&
        !allowedBoards.includes(props.id)) ||
      (currentPlayer === jogador2.symbol &&
        jogador2.name === "computador" &&
        props.id === props.enabledBoards &&
        !allowedBoards.includes(props.id))
    ) {
        makeComputerMove();
        setFirstClick(true);
    }
  }, [firstClick]);


  const current = history[stepNumber];
  const winner = calculateWinner(current.squares, jogador1.name, jogador2.name);

  //ADD
  useEffect(() => { //este useEffect serve para quando o timer do computador chegar a 0 ir para o handleUltimateWinner e apresentar o gameOverModal
    
    if((currentPlayer === jogador1.symbol &&
        jogador1.name === "computador" && jogador1.timer === 0) ||
      (currentPlayer === jogador2.symbol &&
        jogador2.name === "computador" && jogador2.timer === 0)){

          let timer = (currentPlayer === jogador1.symbol &&
                        jogador1.name === "computador") ? jogador1.timer : jogador2.timer;

          handleUltimateWinner(timer);
      } 
  }, []);

 /* useEffect(() => {
    if (winner === jogador1.name) updateTabWins(jogador1.name);
    else if (winner === jogador2.name) updateTabWins(jogador2.name);
  }, [winner, jogador1.name, jogador2.name, updateTabWins]);*/

  useEffect(() => { //ADD
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

  useEffect(() => { //ADD
    if(
      !isAllowedBoard
    ){
      handleAllowedBoards(props.id);
    }
  }, [isAllowedBoard]);

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
            onClick={ //ADD
              (currentPlayer === jogador1.symbol &&
                jogador1.name === "computador") ||
              (currentPlayer === jogador2.symbol &&
                jogador2.name === "computador")
            ? () => {} : handleClick}
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
