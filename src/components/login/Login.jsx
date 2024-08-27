import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogarUsuario } from '../../infra/usuarios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleClick(event) {
    event.preventDefault();
    localStorage.setItem('email', email);
    localStorage.setItem('senha', senha);

    try {
      let usuario = await LogarUsuario(email, senha);
      if (usuario.id) {
        alert(`Login efetuado com sucesso! Id: ${usuario.id}`);
        navigate('/', { replace: true }); // redireciona pra page principal depois do login
      } else {
        alert(usuario.erro);
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      alert("Ocorreu um erro ao tentar fazer login.");
    }
  }

  return (
    <div className="w-[50%] m-auto mt-52 flex flex-col items-center justify-center p-5 border rounded-lg shadow-lg">
      <h1 className='font-bold text-slate-500 text-xl'>CONECTE-SE</h1>
      <br />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <label htmlFor="senha">Senha</label>
      <input
        type="password"
        id="senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="input"
      />
      <br />
      <button
        onClick={handleClick}
        className="w-[30%] bg-slate-300 hover:bg-slate-400 hover:text-white border p-2 rounded-lg"
      >
        Conectar
      </button>
    </div>
  );
}
