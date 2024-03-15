import React from 'react';
import '/home/junior/jogo-da-velha/new-game/src/Tabuleiro.css'; // Importando os estilos CSS do tabuleiro

const Tabuleiro = () => {
  return (
    <div className="tabuleiro">
      <div className="linha">
        <div className="quadrado"></div>
        <div className="quadrado"></div>
        <div className="quadrado"></div>
      </div>
      <div className="linha">
        <div className="quadrado"></div>
        <div className="quadrado"></div>
        <div className="quadrado"></div>
      </div>
      <div className="linha">
        <div className="quadrado"></div>
        <div className="quadrado"></div>
        <div className="quadrado"></div>
      </div>
    </div>
  );
};

export default Tabuleiro;
