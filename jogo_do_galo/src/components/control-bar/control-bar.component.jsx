import React from "react";
import "./control-bar.css";

export default function ControlBar(props){

    const { jogador1, jogador2, timerX, timerO, activeTimer, handleSair } = props;

    return (
        <>
            <section id="control-bar">
                <dl className={activeTimer === 1 ? "list-item activeB" : "list-item"} > {/*concatenar com a cor do jogador*/}
                    <dt>{jogador1.name} {jogador1.symbol}</dt>
                    <dd id="playerTimer">{timerX}</dd>
                </dl>
                <dl className={activeTimer === 2 ? "list-item activeR" : "list-item"}> {/*concatenar com a cor do jogador*/}
                    <dt>{/*Jogador O: */} {jogador2.name} {jogador2.symbol}</dt>
                    <dd id="playerTimer">{timerO}</dd>
                </dl>
                <button id="leaveBtn" onClick={handleSair}>SAIR</button>
            </section>
        </>
    );
}