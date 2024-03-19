import React, { useState, useEffect, useCallback } from 'react';

const JogoDaVelha = () => {
  const [quadrados, setQuadrados] = useState(Array(9).fill(null));
  const [proximaJogadaX, setProximaJogadaX] = useState(true); // Flag para indicar se é a vez do jogador X
  const [vencedor, setVencedor] = useState(null);
  const [mensagem, setMensagem] = useState('Próxima jogada: X');

  const handleClick = useCallback((index) => {
    if (quadrados[index] || vencedor || !proximaJogadaX) {
      return;
    }
    const novosQuadrados = [...quadrados];
    novosQuadrados[index] = proximaJogadaX ? 'X' : 'O';
    setQuadrados(novosQuadrados);
    const winner = calculateWinner(novosQuadrados);
    if (winner) {
      setVencedor(winner);
    } else if (novosQuadrados.every((quadrado) => quadrado !== null)) {
      // Verifica se todos os quadrados estão preenchidos e não há vencedor
      setVencedor('Empate');
    } else {
      setProximaJogadaX(!proximaJogadaX); // Alterna para o próximo jogador apenas quando não há vencedor
    }
  }, [quadrados, vencedor, proximaJogadaX]);

  useEffect(() => {
    const jogadaMaquina = () => {
      if (!vencedor && !proximaJogadaX) { // Verifica se não há vencedor e é a vez da máquina
        const posicoesVazias = quadrados.reduce((acc, curr, index) => {
          if (curr === null) {
            acc.push(index);
          }
          return acc;
        }, []);
        const posicaoAleatoria = posicoesVazias[Math.floor(Math.random() * posicoesVazias.length)];
        const novosQuadrados = [...quadrados];
        novosQuadrados[posicaoAleatoria] = 'O'; // Assumindo que 'O' representa a jogada da máquina
        setQuadrados(novosQuadrados);
      }
    };
  
    jogadaMaquina(); // Executa a jogada da máquina em cada renderização
  
    // Verifica o vencedor após a jogada da máquina
    const winner = calculateWinner(quadrados);
    if (winner) {
      setVencedor(winner);
    } else if (quadrados.every((quadrado) => quadrado !== null)) {
      setVencedor('Empate');
    } else {
      setProximaJogadaX(true); // Se nenhum vencedor e não há empate, é a vez do jogador X
    }
  }, [quadrados, vencedor, proximaJogadaX]);
  

  useEffect(() => {
    if (vencedor) {
      setMensagem(vencedor === 'Empate' ? 'Empate' : `O vencedor é: ${vencedor}`);
    } else {
      setMensagem(`Próxima jogada: ${proximaJogadaX ? 'X' : 'O'}`);
    }
  }, [vencedor, proximaJogadaX]);

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
    setMensagem('Próxima jogada: X');
  };

  return (
    <div className="tabuleiro">
      <div className="mensagem">{mensagem}</div>
        {quadrados.map((quadrado, index) => (
          <button 
          key={index}
          className={`quadrado ${quadrado === 'X' ? 'x' : 'o'}`} // Adiciona a classe 'x' para o X e 'o' para o O 
          type="button" 
          onClick={() => 
          handleClick(index)}>
            {quadrado}
          </button>
        ))}
      {vencedor && (
        <button className="reiniciar" onClick={handleReset}>
          Reiniciar
        </button>
      )}
    </div>
  );
};
export default JogoDaVelha;
