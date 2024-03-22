import React, { useEffect, useState } from 'react';
import './NovaPagina.css';

const NovaPagina = () => {
  const [keysPressed, setKeysPressed] = useState({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      setKeysPressed((prevKeysPressed) => ({
        ...prevKeysPressed,
        [event.keyCode]: true,
      }));
    };

    const handleKeyUp = (event) => {
      setKeysPressed((prevKeysPressed) => ({
        ...prevKeysPressed,
        [event.keyCode]: false,
      }));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const quadrado = document.getElementById('caixa');
    const bolinha = quadrado.querySelector('.bolinha');

    if (!quadrado || !bolinha) return;

    const bolinhaStyle = getComputedStyle(bolinha);
    let bolinhaLeft = parseInt(bolinhaStyle.left);
    let bolinhaTop = parseInt(bolinhaStyle.top);
    const limite = 669;
    const limiteT = 31;
    let deltaX = 0;
    let deltaY = 0;

    const moveBolinha = () => {
      if (keysPressed[37] && bolinhaLeft > limiteT) {
        deltaX = -1;
      } else if (keysPressed[39] && bolinhaLeft < limite) {
        deltaX = 1;
      } else {
        deltaX = 0;
      }

      if (keysPressed[38] && bolinhaTop > limiteT) {
        deltaY = -1;
      } else if (keysPressed[40] && bolinhaTop < limite) {
        deltaY = 1;
      } else {
        deltaY = 0;
      }

      bolinhaLeft += deltaX;
      bolinhaTop += deltaY;

      bolinha.style.left = bolinhaLeft + 'px';
      bolinha.style.top = bolinhaTop + 'px';

      requestAnimationFrame(moveBolinha);
    };

    moveBolinha();

    return () => cancelAnimationFrame(moveBolinha);
  }, [keysPressed]);

  return (
    <div className="container">
      <div className="caixa" id="caixa">
        <div className="bolinha"></div>
      </div>
    </div>
  );
};

export default NovaPagina;
