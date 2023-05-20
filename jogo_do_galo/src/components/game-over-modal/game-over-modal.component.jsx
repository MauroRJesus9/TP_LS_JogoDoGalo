import React from "react";
import "./game-over-modal.css";

export default function GameOverModal(props){

    const { gameover, winner, handleSair } = props;

    //const modalClassName = gameover ? "game-over-modal" : "hidden";

    return (
        <div id=/*{modalClassName}*/"game-over-modal">
            <span id="message">Winner </span>
            <span id="message">{winner}</span>
            <button onClick={handleSair}>Sair</button>
        </div>
    );
}