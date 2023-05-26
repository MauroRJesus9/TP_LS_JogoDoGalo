import React from "react";
import "./game-over-modal.css";

export default function GameOverModal(props){

    const { gameover, ultimateWinner, handleSair } = props;

    //const modalClassName = gameover ? "game-over-modal" : "hidden";

    return (
        <div id=/*{modalClassName}*/"game-over-modal">
            <span id="message">{`Winner ${ultimateWinner}`}</span>
            <div>
                <button id="playAgainBtn" onClick={console.log("Jogar Novamente")}>Jogar Novamente</button>
                <button id="leaveBtn" onClick={handleSair}>Sair</button>
            </div>
        </div>
    );
}