import React from 'react';
// config react router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// components
import NavBar from './components/NavBar';
// pages
import JogoDaVelha from './pages/JogaDaVelha/JogoDaVelha';
import NovaPagina from './pages/NovaPagina/NovaPagina';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/JogoDaVelha" element={<JogoDaVelha />} />
          <Route path="/GameBall" element={<NovaPagina />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;