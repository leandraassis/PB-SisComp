import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { LogarUsuario } from '../../infra/usuarios';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleClick(event) {
    event.preventDefault();
    try {
      let usuario = await LogarUsuario(email, senha);
      if (usuario.id) {
        const loginSucedido = await login(email, senha); 
        if (loginSucedido) {
          alert(`Login efetuado com sucesso! Id: ${usuario.id}`);
          navigate('/', { replace: true });
        } else {
          alert("Sua conta foi bloqueada, você perdeu o acesso.");
        }
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
        className="input w-[35%]"
      />
      <label htmlFor="senha">Senha</label>
      <input
        type="password"
        id="senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="input w-[35%]"
      />
      <br />
      <button
        onClick={handleClick}
        className="w-[35%] bg-slate-300 hover:bg-slate-400 hover:text-white border p-2 rounded-lg"
      >
        Conectar
      </button>
      <button className="mt-5 font-bold text-slate-500" onClick={() => navigate('/criarConta', { replace: true })}>Criar conta</button>
    </div>
  );
}