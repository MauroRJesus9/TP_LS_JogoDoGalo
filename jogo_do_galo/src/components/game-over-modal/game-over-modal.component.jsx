import React from "react";
import "./game-over-modal.css";

export default function GameOverModal(props){

    const { gameover, ultimateWinner, handlePlayAgain, handleSair } = props;

    return (
        <div id="game-over-modal">
            <span id="message">{`Winner ${ultimateWinner}`}</span>
            <div>
                <button id="playAgainBtn" onClick={handlePlayAgain}>Jogar Novamente</button>
                <button id="leaveBtn" onClick={handleSair}>Sair</button>
            </div>
        </div>
    );
}