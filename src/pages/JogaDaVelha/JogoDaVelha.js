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
        setTimeout(() => {
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
        }, 1000); // Atraso de 1 segundo (1000 milissegundos) antes da jogada da máquina
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
      setMensagem(proximaJogadaX ? 'Próxima jogada: X' : 'Aguarde a jogada da máquina...');
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
  }

  const handleReset = () => {
    setQuadrados(Array(9).fill(null))
    setProximaJogadaX(true)
    setVencedor(null)
    setMensagem('Próxima jogada: X')
  }

  return (
    // div pai 
    <div 
      className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen flex justify-center items-center'>
    <div 
      className="bg-cyan-100 grid grid-cols-3 grid-rows-3 gap-4 border-black relative"
      style={{ bottom: '50px' }}>
      {/* caixa de mensagem  */}
    <div 
      className="absolute left-1/2 transform -translate-x-1/2 mb-10 text-lg font-bold text-center bg-white bg-opacity-80 p-2 border-double border-2 border-azure" style={{ width: '200px', height: '10%', top:"-50px" }}>
      {mensagem}
    </div>
      {/* marcador de quadrado  */}
      {quadrados.map((quadrado, index) => (
    <button 
      key={index}
      className={`w-32 h-32 border border-black border-4 flex justify-center items-center text-3xl cursor-pointer ${quadrado === 'X' ? 'text-blue-500' : 'text-red-500'}`}
      type="button" 
      onClick={() => handleClick(index)}
      >
      {quadrado}
    </button>))}
      {/* botão de reiniciar  */}
      {vencedor && (
    <div 
      className="absolute left-1/2 transform -translate-x-1/2 mb-10"
      style={{bottom:"-100px"}}>
    <button
      onClick={handleReset} 
      className="px-5 py-4 text-base bg-red-600 text-white rounded-md border-none cursor-pointer transition-colors duration-300 hover:bg-green-600" 
      style={{ height: '10%', top:"450px" }} >
      Reiniciar
    </button>
    </div>)}
    </div>
    </div>
  )
}
export default JogoDaVelha;   
        
    