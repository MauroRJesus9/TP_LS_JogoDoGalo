import React, { useState } from "react";
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

export default App;
