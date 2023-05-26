import React, { useEffect, useState } from "react";
import Tabuleiro from "./components/tabuleiro";
import ControlBar from "./components/control-bar/control-bar.component";
import FormComponent from "./components/form/form.component";
import GameOverModal from "./components/game-over-modal/game-over-modal.component";
import "./App.css";

import { 
  PLAYER1,
  PLAYER2
} from "./constants/constants";

function App() {
  //gamemodes

  /****************************** 
   *    VARIÁVEIS E ESTADOS     *
   ******************************/

  let timerIdX = undefined;
  let timerIdY = undefined;
  
  //State que seleciona o timerAtivo
  const [activeTimer, setActiveTimer] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [ultimateWinner, setUltimateWinner] = useState("");

  //State que tem o Jogador que se encontra a jogar
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);

  //State do Jogador1
  //V2
  const [jogador1, setJogador1] = useState({name: "", timer: NaN, symbol: "X", numOfWins: 0});

  //State do Jogador2
  //V2
  const [jogador2, setJogador2] = useState({name: "", timer: NaN, symbol: "O", numOfWins: 0});

  //Estado do jogo (Começou ou nao começou)
  const [gamestart, setGameStart] = useState(false);
  const tabuleiros = [];

  /****************************** 
   *    VARIÁVEIS E ESTADOS     *
   ******************************/

  /****************************** 
   *    HANDLERS DOS ESTADOS    *
   ******************************/

  const handleGameStart = () => {
    if(gamestart){
      setGameStart((previousValue) => !previousValue);
      setJogador1({name: "", timer: NaN, symbol: "X", numOfWins: 0});
      setJogador2({name: "", timer: NaN, symbol: "O", numOfWins: 0});
      setCurrentPlayer(PLAYER1);
      setActiveTimer(1);
      setIsGameOver(false);
      setUltimateWinner("");
    }else{
      setGameStart(true);
    }
  }

  const handleCurrentPlayer = (value) => {
    setCurrentPlayer(value === PLAYER1 ? PLAYER2 : PLAYER1);
  }

  const handleJogador1MudarNome = (event) => {
    setJogador1((previousValue) => {
      return { ...previousValue, name: event.target.value };
    });
  };

  const handleJogador2MudarNome = (event) => {
    setJogador2((previousValue) => {
      return { ...previousValue, name: event.target.value };
    });
  };

  /****************************** 
   *          DEBUGGERS         *
   ******************************/
  //usar para verificar se os nomes estao a ser postos aleatoriamente no simbolo
  /*useEffect(() => { 
    console.log("jogador1: " + jogador1.nome);
    console.log("jogador2: " + jogador2.nome);
  }, [jogador1, jogador2]);*/

  /*useEffect(() => {
    console.log("Jogador1.numOfWins:", jogador1.numOfWins);
  }, [jogador1.numOfWins]);
  
  useEffect(() => {
    console.log("Jogador2.numOfWins:", jogador2.numOfWins);
  }, [jogador2.numOfWins]);*/

  /****************************** 
   *          DEBUGGERS         *
   ******************************/

  const scramblePlayersOrder = () => {

    if (Math.random() < 0.5) {
      setJogador1((previousValue) => ({ ...previousValue, name: jogador2.name }));
      setJogador2((previousValue) => ({ ...previousValue, name: jogador1.name }));
    } else {
      setJogador1((previousValue) => ({ ...previousValue }));
      setJogador2((previousValue) => ({ ...previousValue }));
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setGameStart(true);
    scramblePlayersOrder();
  };

  //temporizador
  const handleTemporizador = (event) => {
    const option = event.target.value;
    if (option === "timer30") {
      setJogador1((previousValue) =>{
        return { ...previousValue, timer: 5 };
      });
      setJogador2((previousValue) =>{
        return { ...previousValue, timer: 5 };
      });
    } else if (option === "timer1"){
      setJogador1((previousValue) =>{
        return { ...previousValue, timer: 60 };
      });
      setJogador2((previousValue) =>{
        return { ...previousValue, timer: 60 };
      });
    } else if (option === "timer2"){
      setJogador1((previousValue) =>{
        return { ...previousValue, timer: 120 };
      });
      setJogador2((previousValue) =>{
        return { ...previousValue, timer: 120 };
      });
    } else {
      setJogador1((previousValue) => {
        return { ...previousValue, timer: NaN };
      });
      setJogador2((previousValue) => {
        return { ...previousValue, timer: NaN };
      });
    }
  };

  //Funcao que determina o UltimateWinner consoante condiçoes (se o timmer chegou ao fim, se ganhou no tabuleiro total, etc...)
  const handleUltimateWinner = (gameTimer) => {
    if(gameTimer > 0){
      if(jogador1.numOfWins + jogador2.numOfWins === 9){
        setUltimateWinner(jogador1.numOfWins > jogador2.numOfWins ? jogador1.name : jogador2.name);
        setIsGameOver(true);
      }
    }else if(gameTimer === 0){
      setUltimateWinner(currentPlayer === jogador1.symbol ? jogador2.name : jogador1.name);
      setIsGameOver(true);
    }
  }

  //funcao que da update ao numero de Wins dos mini-boards(REVER PROCESSO)
  const handleNumOfWins = (miniBoardWinner) => {

    if(miniBoardWinner === jogador1.name){
      setJogador1((previousValue) => {
        return { ...previousValue, numOfWins: previousValue.numOfWins + 1 };
      });
    }else if(miniBoardWinner === jogador2.name){
      setJogador2((previousValue) => {
        return { ...previousValue, numOfWins: previousValue.numOfWins + 1 };
      });
    }
  }

  /****************************** 
   *    HANDLERS DOS ESTADOS    *
   ******************************/

  /****************************** 
   *       TIMER FUNCTIONS      *
   ******************************/

  /*useEffect(() => {
    if (gamestart) {
      let nextTimer;
      timerId = setInterval(() => {
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          return nextTimer >= 0 ? nextTimer : 0;
        });
        if (nextTimer === 0) {
          setIsGameOver(true);
          handleUltimateWinner(nextTimer); //funçao que retorna o winner consoante condições de desfecho do jogo
          //setWinner(currentPlayer === jogador1.symbol ? jogador2.name : jogador1.name);
          clearInterval(timerId);
        }
      }, 1000);
    }else if (isNaN(timer) || isGameOver) {
      setTimer("--"); // Definir como "--" quando o valor for NaN
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gamestart]);*/

  useEffect(() => {
    if(!isNaN(jogador1.timer) && currentPlayer === PLAYER1 && gamestart && !isGameOver){
      setActiveTimer(1);
      let nextTimer;
      timerIdX = setInterval(() => {
        setJogador1((previousValue) => {
          nextTimer = previousValue.timer - 1;
          return { ...previousValue, timer: nextTimer };
        });

        handleUltimateWinner(nextTimer);

        if (nextTimer === 0) {
          clearInterval(timerIdX);
        }
      }, 1000);
    }else if (isNaN(jogador1.timer) || isGameOver) {
      setJogador1((previousValue) => {
        return { ...previousValue, timer: 0 };
      });
    }else if(isNaN(jogador1.timer)){
      setActiveTimer(3);
    }

    return () => {
      if(timerIdX){
        clearInterval(timerIdX);
      }
    };
    
  }, [jogador1.timer, currentPlayer, gamestart]);

  useEffect(() => {
    if(!isNaN(jogador2.timer) && currentPlayer === PLAYER2 && gamestart && !isGameOver){
      setActiveTimer(2);
      let nextTimer;
      timerIdY = setInterval(() => {
        setJogador2((previousValue) => {
          nextTimer = previousValue.timer - 1;
          return { ...previousValue, timer: nextTimer };
        });

        handleUltimateWinner(nextTimer); //funçao que retorna o winner consoante condições de desfecho do jogo

        if (nextTimer === 0) {
          clearInterval(timerIdY);
        }
      }, 1000);
    }else if (isNaN(jogador2.timer) || isGameOver) {
      setJogador1((previousValue) => {
        return { ...previousValue, timer: 0 };
      });
    }else if(isNaN(jogador2.timer)){
      setActiveTimer(3);
    }

    return () => {
      if(timerIdY){
        clearInterval(timerIdY);
      }
    };
    
  }, [jogador2.timer, currentPlayer, gamestart]);

  /****************************** 
   *       TIMER FUNCTIONS      *
   ******************************/

  if (gamestart) {
    for (let i = 1; i <= 9; i++) {
      tabuleiros.push(
        <Tabuleiro 
          key={i} 
          id={i} 
          jogador1={jogador1} 
          jogador2={jogador2} 
          onSquareClick={handleCurrentPlayer} //adiçao do onSquareClick para receber o currentPlayer muda-lo depois no handleCurrentPlayer
          updateTabWins={handleNumOfWins}
        />
      );
    }

  }

  return (
    <>
      {!gamestart ? (
        <>
          <FormComponent
            handleJogador1MudarNome={handleJogador1MudarNome}
            handleJogador2MudarNome={handleJogador2MudarNome}
            handleSubmit={handleSubmit}
            jogador1={jogador1.name}
            jogador2={jogador2.name}
            handleTemporizador={handleTemporizador}
          />
        </>
      ) : (
        <>
          {/* TWO TIMERS VERSION */}
          <ControlBar 
            jogador1={jogador1}
            jogador2={jogador2}
            timerX={isNaN(jogador1.timer) ? "--" : jogador1.timer + "s"} 
            timerO={isNaN(jogador2.timer) ? "--" : jogador2.timer + "s"}
            activeTimer={activeTimer}
            handleSair={handleGameStart}
          />
          {/* ONE TIMER VERSION */}
          {/*<ControlBar 
            jogador1={jogador1}
            jogador2={jogador2}
            currentPlayer={currentPlayer}
            timer={isNaN(timer) ? "--" : timer + "s"}
            handleSair={handleGameStart}
          />*/}
          <div className="grid-container">{tabuleiros}</div>
          {isGameOver &&  <GameOverModal 
                            gameover={true} 
                            ultimateWinner={ultimateWinner} 
                            handleSair={handleGameStart}
                          />} {/* falta condiçao para quando ha um winner sem ser por tempo */}
        </>
      )}
    </>
  );
}

export default App;

