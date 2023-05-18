import "./control-bar.css";

export default function ControlBar(props){

    const {timerX, timerO, activeTimer, handleSair} = props;

    return (
        <>
            <section id="control-bar">
                <dl className={activeTimer ? "list-item active" : "list-item"} > {/*concatenar com a cor do jogador*/}
                    <dt>Jogador X:</dt>
                    <dd id="playerTimer">{timerX}</dd>
                </dl>
                <dl className={!activeTimer ? "list-item active" : "list-item"}> {/*concatenar com a cor do jogador*/}
                    <dt>Jogador O:</dt>
                    <dd id="playerTimer">{timerO}</dd>
                </dl>
                <button id="leaveBtn" onClick={handleSair}>SAIR</button>
            </section>
        </>
    );
}