import React, { useCallback, useEffect, useState } from 'react';
import './NovaPagina.css';

const NovaPagina = () => {
  const [bolinhas, setBolinhas] = useState([]);
  const [bolinhaPosition, setBolinhaPosition] = useState({ left: 320, top: 315});
  const [pressedKeys, setPressedKeys] = useState([]);

  useEffect(() => {
    const addBolinha = () => {
      const novaBolinha = {
        left: Math.random() * 690,
        top: 10,
      };
      setBolinhas((prevBolinhas) => [...prevBolinhas, novaBolinha]);
    };

    const interval = setInterval(addBolinha, 1000);

    const moveBolinhas = () => {
      setBolinhas((prevBolinhas) =>
        prevBolinhas.map((bolinha) => ({
          ...bolinha,
          top: bolinha.top + 5,
        }))
      );
    };

    const moveInterval = setInterval(moveBolinhas, 50);

    const removeBolinhas = () => {
      setBolinhas((prevBolinhas) => prevBolinhas.filter((bolinha) => bolinha.top <= 675));
    };

    const removeInterval = setInterval(removeBolinhas, 100);

    return () => {
      clearInterval(interval);
      clearInterval(moveInterval);
      clearInterval(removeInterval);
    };
  }, []);

  useEffect(() =>  {
    const moveBolinha = () => {
      const { left, top } = bolinhaPosition;
      const step = 5;
      let newLeft = left;
      let newTop = top;

      if (pressedKeys.includes(37)) { // Seta para a esquerda
        newLeft = Math.max(0, left - step);
      }
      if (pressedKeys.includes(38)) { // Seta para cima
        newTop = Math.max(0, top - step);
      }
      if (pressedKeys.includes(39)) { // Seta para a direita
        newLeft = Math.min(640, left + step);
      }
      if (pressedKeys.includes(40)) { // Seta para baixo
        newTop = Math.min(640, top + step);
      }

      setBolinhaPosition({ left: newLeft, top: newTop });
    };

    const moveInterval = setInterval(moveBolinha, 50);

    return () => clearInterval(moveInterval);
  }, [pressedKeys, bolinhaPosition]);

  const handleKeyDown = useCallback((event) => {
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

  return (
    <div className="container">
      <div className="caixa" id="caixa">
        {bolinhas.map((bolinha, index) => (
          <div
            key={index}
            className="bolinha"
            style={{ left: bolinha.left, top: bolinha.top }}
          ></div>
        ))}
        <div className="bolinha-movida" style={{ left: bolinhaPosition.left + 'px', top: bolinhaPosition.top + 'px' }}></div>
      </div>
    </div>
  );
};

export default NovaPagina;
