import React, { useState } from 'react';

const JogoDaVelha = () => {
  const [quadrados, setQuadrados] = useState(Array(9).fill(null))
  const [proximaJogadaX, setProximaJogadaX] = useState(true) // Flag para indicar se é a vez do jogador X
  const [vencedor, setVencedor] = useState(null)

  const handleClick = (index) => {
    if (quadrados[index] || vencedor) {
      return;
    }
    const novosQuadrados = [...quadrados];
    novosQuadrados[index] = proximaJogadaX ? 'O' : 'X';
    setQuadrados(novosQuadrados);
    setProximaJogadaX(!proximaJogadaX);
    const winner = calculateWinner(novosQuadrados);
    if (winner) {
      setVencedor(winner);
    } else if (novosQuadrados.every((quadrado) => quadrado !== null)) {
      // Verifica se todos os quadrados estão preenchidos e não há vencedor
      setVencedor('Empate');
    }
  };

  const calculateWinner = (quadrados) => {
    // Array contendo todas as combinações possíveis de vitória
    const linhasVitoria = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    // Verifica todas as combinações de vitória
    for (let i = 0; i < linhasVitoria.length; i++) {
      const [a, b, c] = linhasVitoria[i];
      if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
        // Retorna o símbolo do vencedor se uma combinação de vitória for encontrada
        return quadrados[a];
      }
    }
  
    // Se nenhuma combinação de vitória for encontrada e ainda houver quadrados vazios, o jogo continua
    if (quadrados.some((quadrado) => quadrado === null)) {
      return null;
    }
  };

  const handleReset = () => {
    setQuadrados(Array(9).fill(null));
    setProximaJogadaX(true);
    setVencedor(null);
  };

  return (
    <div className="tabuleiro">
        {quadrados.map((quadrado, index) => (
          <button 
          key={index}
          className="quadrado" 
          type="button" 
          onClick={() => 
          handleClick(index)}>
            {quadrado}
          </button>
        ))}
      {vencedor && (
        <div className="resultado">
          {vencedor === 'Empate' ? 'Empate' : `O vencedor é: ${vencedor}`}
        </div>
      )}
      {vencedor && (
        <button className="reiniciar" onClick={handleReset}>
          Reiniciar
        </button>
      )}
    </div>

  );
};

export default JogoDaVelha;
