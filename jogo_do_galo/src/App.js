import React, { useEffect, useState } from "react";
//import Tabuleiro from "./components/tabuleiro";
import Tabuleiro from "./components/tabuleiro/tabuleiro.component";
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

  //State que tem o Jogador que se encontra a jogar
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);

  //State do Jogador1
  //V2
  const [jogador1, setJogador1] = useState(
    {name: "",
     timer: NaN,
     symbol: "X",
     numOfWins: 0
    });

  //State do Jogador2
  //V2
  const [jogador2, setJogador2] = useState(
    {name: "", 
     timer: NaN,
     symbol: "O",
     numOfWins: 0
    });

  //Estado do jogo (Começou ou nao começou)
  const [gamestart, setGameStart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [ultimateWinner, setUltimateWinner] = useState("");
  const [numOfGamesPlayed, setNumOfGamesPlayed] = useState(0);
  const tabuleiros = [];

  /****************************** 
   *    VARIÁVEIS E ESTADOS     *
   ******************************/

  /****************************** 
   *    HANDLERS DOS ESTADOS    *
   ******************************/

  const handleGameStart = () => { //full states reset
    if(gamestart){
      setGameStart((previousValue) => !previousValue);
      setJogador1({name: "", timer: NaN, symbol: "X", numOfWins: 0});
      setJogador2({name: "", timer: NaN, symbol: "O", numOfWins: 0});
      setCurrentPlayer(PLAYER1);
      setActiveTimer(1);
      setIsGameOver(false);
      setUltimateWinner("");
      setNumOfGamesPlayed(0);
    }else{
      setGameStart(true);
    }
  }

  const handlePlayAgain = () => {
    setJogador1((previousValue) => { //reset timer e numOfWins
      return { ...previousValue, timer: NaN, numOfWins: 0};
    });
    setJogador2((previousValue) => {
      return { ...previousValue, timer: NaN, numOfWins: 0 };
    });
    setCurrentPlayer(PLAYER1);
    setActiveTimer(1);
    setIsGameOver(false);
    setUltimateWinner("");
    setGameStart(true);
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
      if(numOfGamesPlayed === 9){ //nao existir 3 em linha no ultimate board entao o vencedor é o que tem mais mini-board wins
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

  const handleNumOfGamesPlayed = () => {
    setNumOfGamesPlayed((previousValue) => {
      return previousValue + 1;
    })
  }

  /****************************** 
   *    HANDLERS DOS ESTADOS    *
   ******************************/

  /****************************** 
   *       TIMER FUNCTIONS      *
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

        handleUltimateWinner(nextTimer);

        if (nextTimer === 0) {
          clearInterval(timerIdX);
        }
      }, 1000);
    }else if(isNaN(jogador1.timer)){
      setActiveTimer(3);
    }

    return () => { //clean-up function so that everytime da run effect runs it cleans what was done before and re-renders the new result
      if(timerIdX){
        clearInterval(timerIdX);
      }
    };
    
  }, [jogador1.timer, currentPlayer, gamestart]); //sao necessarias as dependecias por causa do if, se o valor de um state estiver a ser alterado atraves do previousValue nao necessita da dependencia

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
    }else if(isNaN(jogador2.timer)){
      setActiveTimer(3);
    }

    return () => {
      if(timerIdY){
        clearInterval(timerIdY);
      }
    };
    
  }, [jogador2.timer, currentPlayer, gamestart]);

  //para quando o timer for NaN
  useEffect(() => {
    if(isNaN(jogador1.timer) && isNaN(jogador2.timer) && numOfGamesPlayed === 9){
     //nao existir 3 em linha no ultimate board entao o vencedor é o que tem mais mini-board wins
      setUltimateWinner(jogador1.numOfWins > jogador2.numOfWins ? jogador1.name : jogador2.name);
      setIsGameOver(true);
    }
  }, [jogador1.timer, jogador2.timer, jogador1.numOfWins, jogador2.numOfWins]);

  /****************************** 
   *       TIMER FUNCTIONS      *
   ******************************/

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

  useEffect(() => {
    console.log("numOfGamesPlayed = ", numOfGamesPlayed);
  }, [numOfGamesPlayed]);

  /****************************** 
   *          DEBUGGERS         *
   ******************************/


  if (gamestart) {
    const arrayAux = Array(9).fill(null);

    arrayAux.map((_, index) => //como estao todos preenchidos com null nao convem iterar com o index pq como o valor null e o mesmo em todos pode haver duplicacao de keys
    tabuleiros.push(
      <Tabuleiro
        key={index}
        id={index}
        jogador1={jogador1}
        jogador2={jogador2}
        currentPlayer={currentPlayer}
        /*jogador1={currentPlayer === PLAYER1 ? jogador2 : jogador1}
        jogador2={currentPlayer === PLAYER2 ? jogador1 : jogador2}*/
        onSquareClick={handleCurrentPlayer}
        updateTabWins={handleNumOfWins}
        incrementGamesPlayed={handleNumOfGamesPlayed}
      />
    )
  );
    /*for (let i = 1; i <= 9; i++) {
      tabuleiros.push(
        <Tabuleiro 
          key={i} 
          id={i} 
          jogador1={jogador1} 
          jogador2={jogador2} 
          onSquareClick={handleCurrentPlayer} //adiçao do onSquareClick para receber o currentPlayer muda-lo depois no handleCurrentPlayer
          updateTabWins={handleNumOfWins}
          incrementGamesPlayed={handleNumOfGamesPlayed}
        />
      );
    }*/

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
          <div className="grid-container">{tabuleiros}</div>
          {isGameOver &&  <GameOverModal 
                            gameover={true} 
                            ultimateWinner={ultimateWinner}
                            handlePlayAgain={handlePlayAgain} 
                            handleSair={handleGameStart}
                          />} {/* falta condiçao para quando ha um winner sem ser por tempo */}
        </>
      )}
    </>
  );
}

export default App;

