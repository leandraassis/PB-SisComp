import React, { createContext, useState, useEffect } from 'react';
import { listarUsuarios } from '../../infra/usuarios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const carregarAutenticacao = async () => {
      const armzndEmail = localStorage.getItem('email');
      const armzndSenha = localStorage.getItem('senha');
      if (armzndEmail && armzndSenha) {
        setEmail(armzndEmail);
        setSenha(armzndSenha);
        const listaUsuario = await listarUsuarios();
        const usuario = listaUsuario.find(
          usuario => usuario.email === armzndEmail && usuario.senha === armzndSenha
        );
        setAutenticado(usuario ? usuario.isAdmin : false);
      }
    };

    carregarAutenticacao();
  }, []);

  const login = async (email, senha) => {
    const listaUsuario = await listarUsuarios();
    const usuario = listaUsuario.find(
      usuario => usuario.email === email && usuario.senha === senha
    );
    if (usuario) {
      localStorage.setItem('email', email);
      localStorage.setItem('senha', senha);
      setEmail(email);
      setSenha(senha);
      setAutenticado(usuario.isAdmin);
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('senha');
    setEmail('');
    setSenha('');
    setAutenticado(false);
  };

  return (
    <AuthContext.Provider value={{ email, senha, autenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
