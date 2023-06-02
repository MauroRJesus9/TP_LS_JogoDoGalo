import React from "react";
import Square from "../square/square.component";
import "../../App.css";

/*function Board(props) {
  function renderSquare(i) {

    return <Square  value={props.squares[i]} 
                    onClick={() => props.onClick(i)}  
                    disabled={props.winner !== null}
                    winner={props.winner}
                    jogador1={props.jogador1} 
                    jogador2={props.jogador2}
                    />;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}*/

export default function Board(props) {
    const renderBoard = () => {
      const boardRows = [0, 1, 2];
      const boardCols = [0, 1, 2];
  
      return boardRows.map((row) => (
        <div key={row} className="board-row">
          {boardCols.map((col) => {
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                value={props.squares[index]}
                onClick={() => props.onClick(index)}
                disabled={props.winner !== null}
                winner={props.winner}
                jogador1={props.jogador1}
                jogador2={props.jogador2}
              />
            );
          })}
        </div>
      ));
    };

    
    return <div>{renderBoard()}</div>;
  }