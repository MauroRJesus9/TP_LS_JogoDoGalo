import React from "react";

export default function Square2(props) {
  const pickPlayerColor = props.value === "X" ? "blue" : "red";
  //const buttonClassName = props.disabled ? (props.winner === props.jogador1 ?  "square disabledB" : "square disabledR") : "square"; //class que torna o background da cor do winner
  const buttonClassName = props.disabled
    ? props.winner === props.jogador1
      ? "square disabledB"
      : props.winner === "empate" || props.winner === null
      ? "square disabledD"
      : "square disabledR"
    : "square";

  return (
    <button
      className={buttonClassName}
      onClick={() => props.onClick()}
      disabled={props.disabled}
    >
      {" "}
      {/* changed */}
      <span style={{ color: pickPlayerColor, fontWeight: "bold" }}>
        {" "}
        {/* MUDANÇA PROVISORIA -> melhorar a maneira de colorir o conteudo sem ser in-line Style */}
        {props.value}
      </span>
    </button>
  );
}
