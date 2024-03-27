import React from 'react';
// config react router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// components
import NavBar from './components/NavBar';
// pages
import JogoDaVelha from './pages/JogaDaVelha/JogoDaVelha';
import NovaPagina from './pages/NovaPagina/NovaPagina';
import Home from './pages/Home/Home';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Velha" element={<JogoDaVelha />} />
          <Route path="/nova" element={<NovaPagina />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;