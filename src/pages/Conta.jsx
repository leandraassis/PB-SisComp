import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/login/AuthContext';
import ListaUsuarios from '../components/usuarios/ListaUsuarios';

export default function Conta() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const { autenticado, logout } = useContext(AuthContext);

    useEffect(() => {
        setEmail(localStorage.getItem('email') || '');
        setSenha(localStorage.getItem('senha') || '');
    }, []);

    return (
        <div className="w-[30%] m-auto mt-52 border">
            <h2 className="titulo">Conta</h2>
            <div className="flex flex-col justify-center items-center">
                <br />
                <p className='font-bold'>Email logado:</p>
                <p>{email} </p>
                <br />
                {autenticado &&
                    <>
                        <button
                            onClick={() => navigate('/criarConta')}
                            className="mb-5 border rounded-lg bg-slate-300 p-2 font-bold"
                        >
                            Criar Conta
                        </button>
                        <div>
                            <ListaUsuarios />
                        </div>
                    </>
                }
                <button
                    onClick={logout}
                    className="mb-5 border rounded-lg bg-red-300 p-2 font-bold"
                >
                    Desconectar
                </button>
            </div>
        </div>
    );
}
