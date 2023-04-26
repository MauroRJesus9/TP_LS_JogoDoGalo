import React, { useState } from "react";
import Tabuleiro from "./componentes/tabuleiro";
import "./App.css";

function App() {
  const [jogador1, setJogador1] = useState("");
  const [jogador2, setJogador2] = useState("");
  const [gamestart, setGameStart] = useState(false);

  const handleJogador1MudarNome = (event) => {
    setJogador1(event.target.value);
  };

  const handleJogador2MudarNome = (event) => {
    setJogador2(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log("Nome jogador 1: ", jogador1);
    //console.log("Nome jogador 2: ", jogador2);
    setGameStart(true);
    // do something with the player names, like pass them to a game component
  };

  return (
    <>
      {!gamestart ? (
        <>
          <h4>Bem vindo ao jogo do galo</h4>
          <form onSubmit={handleSubmit}>
            <label>
              Nome jogador 1:
              <input
                type="text"
                value={jogador1}
                onChange={handleJogador1MudarNome}
              />
            </label>
            <br />
            <label>
              Nome jogador 2:
              <input
                type="text"
                value={jogador2}
                onChange={handleJogador2MudarNome}
              />
            </label>
            <br />
            <button type="submit">Começar jogo</button>
          </form>
        </>
      ) : (
        <>
          <Tabuleiro jogador1={jogador1} jogador2={jogador2} />
        </>
      )}
    </>
  );
}

export default App;
