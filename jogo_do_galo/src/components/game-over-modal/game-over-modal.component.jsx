import React from "react";
import "./game-over-modal.css";

export default function GameOverModal(props){

    const { gameover, ultimateWinner, handleSair } = props;

    //const modalClassName = gameover ? "game-over-modal" : "hidden";

    return (
        <div id=/*{modalClassName}*/"game-over-modal">
            <span id="message">{`Winner ${ultimateWinner}`}</span>
            <button onClick={console.log("Jogar Novamente")}>Jogar Novamente</button>
            <button onClick={handleSair}>Sair</button>
        </div>
    );
}