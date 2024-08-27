import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import LayoutColaborador from './pages/LayoutColaborador';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Fornecedores from './pages/Fornecedores';
import Contatos from './pages/Contatos';
import Produtos from './pages/Produtos';
import Cotacoes from './pages/Cotacoes';
import NotFound from './pages/NotFound';
import Requisicoes from './pages/Requisicoes';
import LoginPage from './pages/Login';
import Conta from './pages/Conta';
import RotaProtegida from './components/login/RotaProtegida';

//por enquanto, a conta ADM será chumbada no código
function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    setEmail(localStorage.getItem('email') || '');
    setSenha(localStorage.getItem('senha') || '');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={email === "primeiroADM@gmail.com" && senha === "adm123" ? <Layout /> : <LayoutColaborador />}>
          <Route path='/' element={
            <RotaProtegida>
              <Home />
            </RotaProtegida>
          } />
          <Route path='conta' element={
            <RotaProtegida>
              <Conta />
            </RotaProtegida>
          } />
          <Route path='fornecedores' element={
            <RotaProtegida>
              <Fornecedores />
            </RotaProtegida>
          } />
          <Route path='contatos' element={
            <RotaProtegida>
              <Contatos />
            </RotaProtegida>
          } />
          <Route path='produtos' element={
            <RotaProtegida>
              <Produtos />
            </RotaProtegida>
          } />
          <Route path='cotacoes' element={
            <RotaProtegida>
              <Cotacoes />
            </RotaProtegida>
          } />
          <Route path='requisicoes' element={
            <RotaProtegida>
              <Requisicoes />
            </RotaProtegida>
          } />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
