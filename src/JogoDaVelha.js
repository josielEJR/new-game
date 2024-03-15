import React from 'react';
import './Tabuleiro.css';

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
