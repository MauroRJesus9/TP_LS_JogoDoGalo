import React from "react";
import Square from "../square/square.component";
import "../../App.css";

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
