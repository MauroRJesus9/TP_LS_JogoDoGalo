/*import React, { useState } from "react";
import Tabuleiro from "./componentes/tabuleiro";
import ControlBar from "./componentes/control-bar/control-bar.component";
import FormComponent from "./componentes/form/form.component";
import "./App.css";

function App() {
  const [gamestart, setGameStart] = useState(false);
  const [jogador1, setJogador1] = useState("");
  const [jogador2, setJogador2] = useState("");
  const tabuleiros = [];

  const handleJogador1MudarNome = (event) => {
    setJogador1(event.target.value);
  };

  const handleJogador2MudarNome = (event) => {
    setJogador2(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setGameStart(true);
  };

  const handleSair = () => {
    setGameStart(false);
  };

  if (gamestart) {
    for (let i = 1; i <= 9; i++) {
      tabuleiros.push(
        <Tabuleiro key={i} id={i} jogador1={jogador1} jogador2={jogador2} />
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
            jogador1={jogador1}
            jogador2={jogador2}
          />
        </>
      ) : (
        <>
          <ControlBar handleSair={handleSair}/>
          <div className="grid-container">{tabuleiros}</div>
        </>
      )}
    </>
  );
}

export default App;*/

import React, { useEffect, useState } from "react";
import Tabuleiro from "./componentes/tabuleiro";
import ControlBar from "./componentes/control-bar/control-bar.component";
import FormComponent from "./componentes/form/form.component";
import "./App.css";

import { 
  MAXTIMER,
  PLAYER1,
  PLAYER2
} from "./constants/constants";

function App() {
  //gamemodes

  let timerIdX = undefined;
  let timerIdY = undefined;
  
  const [activeTimer, setActiveTimer] = useState(true);

  //

  const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);

  const [jogador1, setJogador1] = useState("");
  const [jogador1Timer, setJogador1Timer] = useState(MAXTIMER);

  const [jogador2, setJogador2] = useState("");
  const [jogador2Timer, setJogador2Timer] = useState(MAXTIMER);

  const [gamestart, setGameStart] = useState(false);
  const tabuleiros = [];

  const handleCurrentPlayer = (value) => {
    setCurrentPlayer(value === PLAYER1 ? PLAYER2 : PLAYER1);
  }

  const handleJogador1MudarNome = (event) => {
    setJogador1(event.target.value);
  };

  const handleJogador2MudarNome = (event) => {
    setJogador2(event.target.value);
  };

  const handleSair = () => {
    setGameStart(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log("Nome jogador 1: ", jogador1);
    //console.log("Nome jogador 2: ", jogador2);
    setGameStart(true);
    // do something with the player names, like pass them to a game component
  };
  if (gamestart) {
    for (let i = 1; i <= 9; i++) {
      tabuleiros.push(
        <Tabuleiro 
          key={i} 
          id={i} 
          jogador1={jogador1} 
          jogador2={jogador2} 
          onSquareClick={handleCurrentPlayer} //adiçao do onSquareClick para receber o currentPlayer muda-lo depois no handleCurrentPlayer
        />
      );
    }

  }

  useEffect(() => {
    if(currentPlayer === PLAYER1 && gamestart){
      setActiveTimer(true);
      let nextTimer;
      timerIdX = setInterval(() => {
        setJogador1Timer((previousValue) => {
          nextTimer = previousValue - 1;
          return nextTimer;
        });

      }, 1000);
    }/*else if(jogador1Timer !== MAXTIMER){
      setJogador1Timer(MAXTIMER);
    }*/
    return () => {
      if(timerIdX){
        clearInterval(timerIdX);
      }
    };
    
  }, [currentPlayer, gamestart]);

  useEffect(() => {
    if(currentPlayer === PLAYER2 && gamestart){
      setActiveTimer(false);
      let nextTimer;
      timerIdY = setInterval(() => {
        setJogador2Timer((previousValue) => {
          nextTimer = previousValue - 1;
          return nextTimer;
        });

        if (nextTimer === 0) {
          setGameStart(false);
        }

      }, 1000);
    }/*else if(jogador2Timer !== MAXTIMER){
      setJogador1Timer(MAXTIMER);
    }*/
    return () => {
      if(timerIdY){
        clearInterval(timerIdY);
      }
    };
    
  }, [currentPlayer, gamestart]);

  return (
    <>
      {!gamestart ? (
        <>
          <FormComponent
            handleJogador1MudarNome={handleJogador1MudarNome}
            handleJogador2MudarNome={handleJogador2MudarNome}
            handleSubmit={handleSubmit}
            jogador1={jogador1}
            jogador2={jogador2}
          />
        </>
      ) : (
        <>
          <ControlBar 
            timerX={jogador1Timer} 
            timerO={jogador2Timer}
            activeTimer={activeTimer}
            handleSair={handleSair}
          />
          <div className="grid-container">{tabuleiros}</div>
        </>
      )}
    </>
  );
}

export default App;

