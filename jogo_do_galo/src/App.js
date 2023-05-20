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

/*import {
  Tabuleiro, 
  ControlBar,
  FormComponent,
  GameOverModal
} from "./components";*/

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
  const [winner, setWinner] = useState("");

  //State que tem o Jogador que se encontra a jogar
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);

  //State do Jogador1
  //V1
  /*const [jogador1, setJogador1] = useState("");
  const [jogador1Timer, setJogador1Timer] = useState(0);*/

  //State do Jogador2
  //V1
  /*const [jogador2, setJogador2] = useState("");
  const [jogador2Timer, setJogador2Timer] = useState(0);*/

  //State do Jogador1
  //V2
  const [jogador1, setJogador1] = useState({nome: "", timer: NaN, numWins: 0});

  //State do Jogador2
  //V2
  const [jogador2, setJogador2] = useState({nome: "", timer: NaN, numWins: 0});

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
      setJogador1({nome: "", timer: NaN, numWins: 0});
      setJogador2({nome: "", timer: NaN, numWins: 0});
      setCurrentPlayer(PLAYER1);
      setActiveTimer(1);
      setIsGameOver(false);
      setWinner("");
    }else{
      setGameStart(true);
    }
  }

  const handleCurrentPlayer = (value) => {
    setCurrentPlayer(value === PLAYER1 ? PLAYER2 : PLAYER1);
  }

  const handleJogador1MudarNome = (event) => {

    /*if (Math.random() < 0.5) {
      setJogador1((previousValue) => {
        return { ...previousValue, nome: event.target.value };
      });
    } else {
      setJogador2((previousValue) => {
        return { ...previousValue, nome: event.target.value };
      });
    }*/
    //setJogador1(event.target.value);
    setJogador1((previousValue) => {
      return { ...previousValue, nome: event.target.value };
    });
  };

  const handleJogador2MudarNome = (event) => {
    //setJogador2(event.target.value);
    setJogador2((previousValue) => {
      return { ...previousValue, nome: event.target.value };
    });
  };

  //usar para verificar se os nomes estao a ser postos aleatoriamente no simbolo
 /* useEffect(() => { 
    console.log("jogador1: " + jogador1.nome);
    console.log("jogador2: " + jogador2.nome);
  }, [jogador1, jogador2]);*/

  const scramblePlayersOrder = () => {

    if (Math.random() < 0.5) {
      setJogador1((previousValue) => ({ ...previousValue, nome: jogador2.nome }));
      setJogador2((previousValue) => ({ ...previousValue, nome: jogador1.nome }));
    } else {
      setJogador1((previousValue) => ({ ...previousValue }));
      setJogador2((previousValue) => ({ ...previousValue }));
    }
  }

  //calculo do winner final
  const handleWinsUpdate = (winner) => {
    //console.log("Winner " + winner);
    /*if(winner === "X")
      setJogador1((previousValue) => {
        return { ...previousValue, numWins: previousValue.numWins + 1};
      });
    else
      setJogador2((previousValue) => {
        return { ...previousValue, numWins: previousValue.numWins + 1};
      });*/
  }
  //calculo do winner final

  //Resetar os estados todos quando se sai
  /*const handleSair = () => {
    //setGameStart(false);
    handleGameStart();
    setJogador1("", NaN);
    setJogador2("", NaN);
    setCurrentPlayer(PLAYER1);
    setActiveTimer(1);
    setIsGameOver(false);
    setWinner("");
  };*/

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

  /****************************** 
   *    HANDLERS DOS ESTADOS    *
   ******************************/

  /****************************** 
   *       TIMER FUNCTIONS       *
   ******************************/

  useEffect(() => {
    if(!isNaN(jogador1.timer) && currentPlayer === PLAYER1 && gamestart && !isGameOver){
      setActiveTimer(1);
      let nextTimer;
      timerIdX = setInterval(() => {
        setJogador1((previousValue) => {
          nextTimer = previousValue.timer - 1;
          return { ...previousValue, timer: nextTimer };
        });

        if (nextTimer === 0) {
          setIsGameOver(true);
          setWinner(jogador2.nome);
          clearInterval(timerIdX);
        }
        //console.log("1 -> " +jogador1.numWins);
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

        if (nextTimer === 0) {
          setIsGameOver(true);
          setWinner(jogador1.nome);
          clearInterval(timerIdY);
        }
        //console.log("2 -> " + jogador2.numWins);
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
    //console.log("Temporizador jogador1:", jogador1.timer);
    //console.log("Temporizador jogador2:", jogador2.timer);
    for (let i = 1; i <= 9; i++) {
      tabuleiros.push(
        <Tabuleiro 
          key={i} 
          id={i} 
          jogador1={jogador1.nome} 
          jogador2={jogador2.nome} 
          jogador1Wins={jogador1.numWins}
          jogador2Wins={jogador2.numWins}
          onSquareClick={handleCurrentPlayer} //adiçao do onSquareClick para receber o currentPlayer muda-lo depois no handleCurrentPlayer
          onWin={handleWinsUpdate}
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
            jogador1={jogador1.nome}
            jogador2={jogador2.nome}
            handleTemporizador={handleTemporizador}
          />
        </>
      ) : (
        <>
          <ControlBar 
            /*timerX={jogador1Timer} 
            timerO={jogador2Timer}*/
            timerX={isNaN(jogador1.timer) ? "--" : jogador1.timer + "s"} 
            timerO={isNaN(jogador2.timer) ? "--" : jogador2.timer + "s"}
            activeTimer={activeTimer}
            handleSair={handleGameStart}
          />
          <div className="grid-container">{tabuleiros}</div>
          {isGameOver &&  <GameOverModal 
                            gameover={true} 
                            winner={winner} 
                            handleSair={handleGameStart}
                          />} {/* falta condiçao para quando ha um winner sem ser por tempo */}
        </>
      )}
    </>
  );
}

export default App;

