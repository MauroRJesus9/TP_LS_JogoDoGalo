import React, { useState } from "react";
import "./game-over-modal.css";

export default function GameOverModal(props) {
  const { gameover, ultimateWinner, handlePlayAgain, handleSair } = props;
  
  const [modalVisible, setModalVisible] = useState(true);

  const handlePlayAgainClick = () => {
    handlePlayAgain();
    setModalVisible(false);
  };

  const handleSairClick = () => {
    handleSair();
    setModalVisible(false);
  };

  if (!modalVisible) {
    return null;
  }

    return (
        <>
            {ultimateWinner === "Empate" ? 
                (
                    <div id="game-over-modal">
                        <span id="message">{"Empate"}</span>
                        <div>
                            <button id="playAgainBtn" onClick={handlePlayAgainClick}>Jogar Novamente</button>
                            <button id="leaveBtn" onClick={handleSairClick}>Sair</button>
                        </div>
                    </div>
                ) : (
                    <div id="game-over-modal">
                        <span id="message">{`Winner ${ultimateWinner}`}</span>
                        <div>
                            <button id="playAgainBtn" onClick={handlePlayAgainClick}>Jogar Novamente</button>
                            <button id="leaveBtn" onClick={handleSairClick}>Sair</button>
                        </div>
                    </div>
                )
            }
        </>

        
    );
}