import React, { useContext } from 'react';
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
import Conta from './pages/Conta';
import Requisicoes from './pages/Requisicoes';
import Login from './components/login/Login';
import RotaProtegida from './components/login/RotaProtegida';

//por enquanto, a conta ADM será chumbada no código
const ADM = {
  email: "primeiroADM@gmail.com",
  senha: "adm123",
  isADM: true
};

function App() {
  const { autenticado } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={email === ADM.email && senha === ADM.senha ? <Layout /> : <LayoutColaborador />}>
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
