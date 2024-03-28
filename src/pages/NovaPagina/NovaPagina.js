import React, { useCallback, useEffect, useState } from 'react';

const NovaPagina = () => {
  const [bolinhas, setBolinhas] = useState([]);
  const [bolinhaPosition, setBolinhaPosition] = useState({ left: 320, top: 315 });
  const [pressedKeys, setPressedKeys] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [chuvaBolinhasIntervalId, setChuvaBolinhasIntervalId] = useState(null);
  const [removeBolinhasIntervalId, setRemoveBolinhasIntervalId] = useState(null);
  const [moveBolinhaIntervalId, setMoveBolinhaIntervalId] = useState(null);
  const [restartGame, setRestartGame] = useState(false);
  const [startGame, setStartGame] = useState(false)
  
  useEffect(() => {
    if (startGame) {
      const addBolinha = () => {
        if (!gameOver) {
          const novaBolinha = {
            left: Math.random() * 673,
            top: 10,
          };
          setBolinhas((prevBolinhas) => [...prevBolinhas, novaBolinha]);
        }
      };
    
      const intervalId = setInterval(addBolinha, 1000);
      
      return () => clearInterval(intervalId);
    }
  }, [startGame, gameOver]);
  // efeito para as bolinhas cair e remover quando chegar no final 
  useEffect(() => {
    const chuvaBolinhas = () => {
      if (!gameOver) {
        setBolinhas((prevBolinhas) =>
          prevBolinhas.map((bolinha) => ({
            ...bolinha,
            top: bolinha.top + 5,
          }))
        );
      }
    };
  
    const moveIntervalId = setInterval(chuvaBolinhas, 50);
    setChuvaBolinhasIntervalId(moveIntervalId);
  
    const removeBolinhas = () => {
      setBolinhas((prevBolinhas) => prevBolinhas.filter((bolinha) => bolinha.top <= 666));
    };
  
    const removeIntervalId = setInterval(removeBolinhas, 100);
    setRemoveBolinhasIntervalId(removeIntervalId);
  
    return () => {
      clearInterval(moveIntervalId);
      clearInterval(removeIntervalId);
    };
  }, [gameOver]);
  
  useEffect(() => {
    const moveBolinha = () => {
      const { left, top } = bolinhaPosition;
      const step = 10;
      let newLeft = left;
      let newTop = top;

      if (pressedKeys.includes(37)) {
        newLeft = Math.max(0, left - step);
      }
      if (pressedKeys.includes(38)) {
        newTop = Math.max(0, top - step);
      }
      if (pressedKeys.includes(39)) {
        newLeft = Math.min(640 - 10, left + step);
      }
      if (pressedKeys.includes(40)) {
        newTop = Math.min(640 - 10, top + step);
      }

      setBolinhaPosition({ left: newLeft, top: newTop });
    };

    const moveIntervalId = setInterval(moveBolinha, 30);
    setMoveBolinhaIntervalId(moveIntervalId);

    return () => clearInterval(moveIntervalId);
  }, [pressedKeys, bolinhaPosition]);

  const handleKeyDown = useCallback((event) => {
    // Verifica se a tecla pressionada é uma das teclas de seta (para cima ou para baixo)
    if ([38, 40].includes(event.keyCode)) {
      event.preventDefault(); // Impede o comportamento padrão (rolagem da página)
    }
  
    if (!pressedKeys.includes(event.keyCode)) {
      setPressedKeys((prevPressedKeys) => [...prevPressedKeys, event.keyCode]);
    }
  }, [pressedKeys]);

  const handleKeyUp = useCallback((event) => {
    setPressedKeys((prevPressedKeys) => prevPressedKeys.filter((keyCode) => keyCode !== event.keyCode));
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    // Verifica colisões entre a bolinha movida e as bolinhas existentes
    const checkCollision = () => {
      const bolinhaMovidaX = bolinhaPosition.left + 30; // Centro da bolinha movida
      const bolinhaMovidaY = bolinhaPosition.top + 30; // Centro da bolinha movida
      const raioBolinhaMovida = 30; // Raio da bolinha que se move
  
      bolinhas.forEach((bolinha) => {
        const bolinhaX = bolinha.left + 10; // Centro da bolinha que cai
        const bolinhaY = bolinha.top + 10; // Centro da bolinha que cai
        const raioBolinha = 10; // Raio da bolinha que cai
  
        // Calcula a distância entre os centros das bolinhas
        const distancia = Math.sqrt((bolinhaMovidaX - bolinhaX) ** 2 + (bolinhaMovidaY - bolinhaY) ** 2)
        // Verifica se houve colisão comparando as distâncias com os raios das bolinhas
        if (distancia < raioBolinhaMovida + raioBolinha) {
          setGameOver(true);
        }
      });
    };
  
    checkCollision();

  }, [bolinhaPosition, bolinhas]);
  // Função para reiniciar o jogo
  const handleRestart = () => {
    setBolinhas([]); // Limpa o estado das bolinhas
    setBolinhaPosition({ left: 320, top: 315 });
    setPressedKeys([]);
    setGameOver(false);
    setRestartGame(true); // Sinaliza que o jogo está sendo reiniciado
  }

  useEffect(() => {
    if (restartGame) {    
      // Reinicia o jogo aqui, por exemplo, reiniciando os intervalos
      const intervalId = setInterval(() => {
        if (!gameOver) {
          const novaBolinha = {
            left: Math.random() * 685,
            top: 15,
          };
          setBolinhas((prevBolinhas) => [...prevBolinhas, novaBolinha]);
        }
      }, 1000);
      // Limpa o intervalo quando o componente é desmontado ou o jogo reiniciado
      return () => clearInterval(intervalId);
    }
    setRestartGame(false); // Resetar o estado de reinício após reiniciar o jogo
  }, [restartGame, gameOver])

  const handleStart = () => {
    setBolinhas([]); // Limpa o estado das bolinhas
    setBolinhaPosition({ left: 320, top: 315 });
    setPressedKeys([]);
    setGameOver(false);
    setStartGame(true); // Sinaliza que o jogo está sendo iniciado
  }
  useEffect(() => {
    if (startGame) {    
      // Reinicia o jogo aqui, por exemplo, reiniciando os intervalos
      const intervalId = setInterval(() => {
        if (!gameOver) {
          const novaBolinha = {
            left: Math.random() * 687,
            top: 15,
          };
          setBolinhas((prevBolinhas) => [...prevBolinhas, novaBolinha]);
        }
      }, 1000);
      // Limpa o intervalo quando o componente é desmontado ou o jogo reiniciado
      return () => clearInterval(intervalId);
    }
    setStartGame(false); // Resetar o estado de reinício após reiniciar o jogo
  }, [gameOver, restartGame, chuvaBolinhasIntervalId, removeBolinhasIntervalId, moveBolinhaIntervalId, startGame])

// logica para parar de aparecer bolinhas após intervalos
  useEffect(() => {
    if (gameOver) {
      clearInterval(chuvaBolinhasIntervalId);
      clearInterval(removeBolinhasIntervalId);
      clearInterval(moveBolinhaIntervalId);
    }
  }, [gameOver, restartGame, chuvaBolinhasIntervalId, removeBolinhasIntervalId, moveBolinhaIntervalId]);

  return (
    //div pai que abraça todos os componentes
<div className="h-screen overflow-auto bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center">
    {/* div da caixa do jogo */}
    <div className="box-border w-700 h-700 relative m-10 p-4 border-4 border-black" style={{ bottom: '50px' }}>
      {bolinhas.map((bolinha, index) => (
    <div // div da bolinha que cai
          key={index} 
          className="w-5 h-5 bg-teal-200 rounded-full absolute"
          style={{ left: bolinha.left, top: bolinha.top }}>
    </div>
      ))}
      {/* div da bolinha que se move */}
    <div
        className="w-6 h-6 bg-blue-500 rounded-full absolute"
        style={{ left: bolinhaPosition.left + 'px', top: bolinhaPosition.top + 'px' }}>
    </div>
      {/* Exibir "GameOver" se o jogo acabou */}
      {gameOver && 
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-black text-center">
        GameOver
    </div>}
    </div>
    {/* botão de reiniciar */}
    {gameOver &&
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10">
      <button
        onClick={handleRestart}
        className="px-5 py-4 text-base bg-red-600 text-white rounded-md border-none cursor-pointer transition-colors duration-300 hover:bg-green-600">
        Reiniciar
      </button>
    </div>}
    {/* botão de satart */}
    {!startGame &&
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 mb-10">
      <button
        onClick={handleStart}
        className="px-5 py-4 text-base bg-red-600 text-white rounded-md border-none cursor-pointer transition-colors duration-300 hover:bg-green-600">
        Start
      </button>
    </div>}
</div>    
  );
};

export default NovaPagina
