import React, { useContext, useState } from 'react';
import { CriaConta, inserirUsuario } from "../../infra/usuarios";
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CriarConta() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { autenticado } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleClick(event) {
    event.preventDefault();

    if (senha === confirmar) {
      try {
        let usuario = await CriaConta(email, senha);
        if (usuario.id) {
          alert(`Conta criada com sucesso! Id: ${usuario.id}`);
          const novoUsuario = {
            email: email,
            senha: senha,
            isAdmin: isAdmin,
            id: usuario.id
          }
          await inserirUsuario(novoUsuario);
          navegarClick();
        } else {
          alert(usuario.erro);
        }
      } catch (error) {
        console.error("Erro ao criar conta:", error);
        alert("Ocorreu um erro ao tentar criar a conta.");
      }
    } else {
      alert('As senhas não conferem');
    }
  }

  const navegarClick = () => {
    if (autenticado) {
        navigate('/conta');
    } else {
        navigate('/login');
    }
};


  return (
    <div className="flex items-center justify-center min-h-screen font-mono">
      <div className="flex w-[50%] h-[50%]">
        <div className="w-[50%] bg-slate-300 flex items-center justify-center flex-col gap-10">
          <p className="text-2xl font-bold text-slate-600">CRIE SUA CONTA</p>
          <p className="text-slate-600">Adicione um email e pense em uma boa senha!</p>
        </div>
        <div className="containerForm w-[50%] p-5">
          <form onSubmit={handleClick} className="flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="input"
              required
            />
            <label htmlFor="confirmar">Confirme a senha</label>
            <input
              type="password"
              id="confirmar"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              className="input"
              required
            />
            {autenticado &&
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isAdmin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="form-checkbox"
                />
                <label htmlFor="isAdmin" className="text-slate-600">Conta Administrador</label>
              </div>
            }
            <button
              type="submit"
              className="w-[100%] bg-slate-300 hover:bg-slate-400 hover:text-white border p-2 rounded-lg"
            >
              Criar
            </button>
          </form>
          <button
            onClick={navegarClick}
            className="w-[50%] mt-5 bg-slate-300 hover:bg-red-400 hover:text-white border p-2 rounded-lg"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
