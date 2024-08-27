import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from "../../infra/firebase";

//impede os usuários de acessarem as rotas sem estarem logados
const RotaProtegida = ({ children }) => {
  const [autenticado, setAutenticado] = useState(false);
  const [carregamento, setCarregamento] = useState(true);
  const paginaAtual = useLocation();

  useEffect(() => {
    const monitoraAutenticacao = auth.onAuthStateChanged((user) => {//metodo do fire que monitora o estado da autenticação do usuario em tempo real
      setAutenticado(!!user);
      setCarregamento(false);
    });

    return () => monitoraAutenticacao();
  }, []);

  if (carregamento) {
    return <div>Autenticação em andamento...</div>;
  }

  return autenticado ? children : <Navigate to="/login" state={{ from: paginaAtual }} />;
};

export default RotaProtegida;
