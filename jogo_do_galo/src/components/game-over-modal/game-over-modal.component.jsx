import React from "react";
import "./game-over-modal.css";

export default function GameOverModal(props){

    const { gameover, ultimateWinner, handleSair } = props;

    //const modalClassName = gameover ? "game-over-modal" : "hidden";

    return (
        <div id=/*{modalClassName}*/"game-over-modal">
            <span id="message">Winner </span>
            <span id="message">{ultimateWinner}</span>
            <button onClick={handleSair}>Sair</button>
        </div>
    );
}