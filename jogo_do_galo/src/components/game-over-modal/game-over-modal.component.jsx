import React, { useState } from "react";
import "./game-over-modal.css";
import trofeu from "../../imgs/trofeu.png";
import empate from "../../imgs/empate.jpg";

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
                        <img src={empate} alt="" className="trofeu" />
                        <div>
                            <button id="playAgainBtn" onClick={handlePlayAgainClick}>Jogar Novamente</button>
                            <button className="teste" id="" onClick={handleSairClick}>Sair</button>
                        </div>
                    </div>
                ) : (
                    <div id="game-over-modal">
                        <span id="message">{`Winner ${ultimateWinner}`}</span>
                        <img src={trofeu} alt="" className="trofeu" />
                        <div>
                            <button id="playAgainBtn" onClick={handlePlayAgainClick}>Jogar Novamente</button>
                            <button className="teste" id="" onClick={handleSairClick}>Sair</button>
                        </div>
                    </div>
                )
            }
        </>

        
    );
}