import React from "react";
import "./control-bar.css";

export default function ControlBar(props) {
  const {
    jogador1,
    jogador2,
    timerX,
    timerO,
    activeTimer,
    handleSair,
    currentPlayer,
  } = props;

  return (
    <>
      <button id="leaveBtn" onClick={handleSair}>
            SAIR
        </button>
      <h1>ULTIMATE TIC-TAC-TOE</h1>
      <section id="control-bar">
        <dl
          className={
            activeTimer === 1 || currentPlayer === "X"
              ? "list-item activeB"
              : "list-item"
          }
        >
          {" "}
          {/*concatenar com a cor do jogador*/}
          <dt>{`${jogador1.name} ${jogador1.symbol}`}</dt>
          <dd id="playerTimer">{timerX}</dd>
        </dl>
        <dl
          className={
            activeTimer === 2 || currentPlayer == "O"
              ? "list-item activeR dist"
              : "list-item dist"
          }
        >
          {" "}
          {/*concatenar com a cor do jogador*/}
          <dt>{`${jogador2.name} ${jogador2.symbol}`}</dt>
          <dd id="playerTimer">{timerO}</dd>
        </dl>
      </section>
    </>
  );
}

// export default function ControlBar(props){

//     const { jogador1, jogador2, currentPlayer, timer, handleSair } = props;

//     return (
//         <>
//             <section id="control-bar">
//                 <dl className={currentPlayer === jogador1.symbol ? "list-item activeB" : "list-item activeR"} > {/*concatenar com a cor do jogador*/}
//                     <dt>{currentPlayer === jogador1.symbol ? jogador1.name : jogador2.name} {currentPlayer === jogador1.symbol ? jogador1.symbol : jogador2.symbol}</dt>
//                     <dd id="playerTimer">{timer}</dd>
//                 </dl>
//                 <button id="leaveBtn" onClick={handleSair}>SAIR</button>
//             </section>
//         </>
//     );
// }
