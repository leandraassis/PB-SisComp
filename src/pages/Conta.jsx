import React, { useContext, useEffect, useState } from 'react';
import { DeslogarUsuario } from '../infra/usuarios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/login/AuthContext';

export default function Conta() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const { autenticado } = useContext(AuthContext);

    useEffect(() => {
        setEmail(localStorage.getItem('email') || '');
        setSenha(localStorage.getItem('senha') || '');
    }, []);

    const handleLogout = () => {
        DeslogarUsuario();
        localStorage.removeItem('email');
        localStorage.removeItem('senha');
        setEmail('');
        setSenha('');
    };

    return (
        <div className="w-[30%] m-auto mt-52 border">
            <h2 className="titulo">Conta</h2>
            <div className="flex flex-col justify-center items-center">
                <br />
                <p>-- avatar --</p>
                <br />
                <p className='font-bold'>Email logado:</p>
                <p>{email} </p>
                <br />
                <button
                    onClick={handleLogout}
                    className="mb-5 border rounded-lg bg-red-300 p-2 font-bold"
                >
                    Desconectar
                </button>
                {autenticado &&
                    <button
                    onClick={() => navigate('/criarConta')}
                    className="mb-5 border rounded-lg bg-slate-300 p-2 font-bold"
                >
                    Criar Conta
                </button>
                }
            </div>
        </div>
    );
}
