import React, { useState } from "react";
import "../form/form.css"
import tabIMG from "../../imgs/tab.jpeg";
import pcICO from "../../imgs/pc.png";
import handICO from "../../imgs/handshake.png";

const FormComponent = ({
  handleJogador1MudarNome,
  handleJogador2MudarNome,
  handleSubmit,
  jogador1,
  jogador2,
}) => {
  const [formAtivo, setFormAtivo] = useState(false);

  const escolhe2Jogadores = () => {
    const iJ2 = document.getElementById("inputJogador2");
    setFormAtivo(true);
    iJ2.disabled = false;
  };

  const escolheComputador = () => {
    const iJ2 = document.getElementById("inputJogador2");
    iJ2.disabled = true;
    iJ2.value = "";
    setFormAtivo(true);
  };

  return (
    <>
      {/* MODOS DE JOGO */}
      <div className="header">
        <h1>ULTIMATE TIC-TAC-TOE</h1>
        <h2>Escolher modo de jogo</h2>
      </div>
      <div className="gamemodes">
        <img
          src={tabIMG}
          id="tabuleiro"
          alt="tabuleiro"
        />
        <div className="btn-container">
          <button
            className="btn"
            id="btn-gm-computador"
            onClick={escolheComputador}
          >
            <div className="btn-content">
              <img
              src={pcICO}
                alt="Imagem Computador"
                className="btn-img"
              />
              <div className="btn-text">
                <span className="btn-title">Computador</span>
                <span className="btn-subtitle">Desafia o computador</span>
              </div>
            </div>
          </button>
          <button
            className="btn"
            id="btn-gm-2jogadores"
            onClick={escolhe2Jogadores}
          >
            <div className="btn-content">
              <img
                src={handICO}
                alt="Imagem Computador"
                className="btn-img"
              />
              <div className="btn-text">
                <span className="btn-title">2 Jogadores</span>
                <span className="btn-subtitle">Desafia um amigo</span>
              </div>
            </div>
          </button>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div id="formulario">
                <label>
                  Jogador 1
                  <input
                    type="text"
                    id="inputJogador1"
                    placeholder="Nome"
                    disabled={!formAtivo}
                    required
                    value={jogador1}
                    onChange={handleJogador1MudarNome}
                  />
                </label>
                <label>
                  Jogador 2
                  <input
                    type="text"
                    id="inputJogador2"
                    placeholder="Nome"
                    disabled
                    required
                    value={jogador2}
                    onChange={handleJogador2MudarNome}
                  />
                </label>
                <br />
                <label id="temporizador">
                  Temporizador
                  <select
                    defaultValue=""
                    name="temporizador"
                    id="temporizador-select"
                    disabled={!formAtivo}
                  >
                    <option value="">Desligado</option>
                    <option value="">30 Segundos</option>
                    <option value="">1 Minuto</option>
                    <option value="">2 Minutos</option>
                  </select>
                </label>
                <label id="mini-tabuleiro">
                  Tabuleiro
                  <select
                    defaultValue=""
                    name="temporizador"
                    id="tabuleiro-select"
                    disabled={!formAtivo}
                  >
                    <option value="">Livre</option>
                    <option value="">Adversário escolhe mini tabuleiro</option>
                  </select>
                </label>
              </div>
              <button
                className="btn"
                id="btn-jogar"
                disabled={!formAtivo}
                type="submit"
              >
                <div className="btn-content">
                  <div className="btn-text">
                    <span className="btn-title">Jogar</span>
                  </div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormComponent;
