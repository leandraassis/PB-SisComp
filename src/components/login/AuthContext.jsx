import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const ADM = {
  email: "primeiroadm@gmail.com",
  senha: "adm123",
};

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const armzndEmail = localStorage.getItem('email');
    const armzndSenha = localStorage.getItem('senha');
    if (armzndEmail && armzndSenha) {
      setEmail(armzndEmail);
      setSenha(armzndSenha);
      setAutenticado(armzndEmail === ADM.email && armzndSenha === ADM.senha);
    }
  }, []);

  const login = (email, senha) => {
    localStorage.setItem('email', email);
    localStorage.setItem('senha', senha);
    setEmail(email);
    setSenha(senha);
    setAutenticado(email === ADM.email && senha === ADM.senha);
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
