import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import ReactModal from 'react-modal';
import { atualizarUsuarios, listarUsuarios } from '../../infra/usuarios';

ReactModal.setAppElement('#root');

export default function ListaUsuarios() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function carregarUsuarios() {
            const usuarios = await listarUsuarios();
            const usuariosFiltrados = usuarios.filter(usuario => !usuario.isAdmin);
            setUsuarios(usuariosFiltrados);
        }
        carregarUsuarios();
    }, [usuarios]);


    const colunas = [
        {
            name: "E-mail",
            selector: row => row.email,
            sortable: true,
        },
        {
            name: "Status",
            cell: row => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        checked={row.blocked}
                        onChange={() => handleToggleBloqueio(row)}
                    />
                    <span style={{ marginLeft: '8px' }}>
                        {row.blocked ? 'BLOQUEADO' : 'LIBERADO'}
                    </span>
                </div>
            ),
        },
    ];

    async function handleToggleBloqueio(usuario) {
        const usuarioAtualizado = {
            ...usuario,
            blocked: !usuario.blocked,
        };

        try {
            await atualizarUsuarios(usuarioAtualizado); 
            console.log(`Usuário ${usuarioAtualizado.blocked? 'bloqueado' : 'liberado'} com sucesso!`);
        } catch (error) {
            console.error("Erro ao atualizar o status do usuário:", error);
        }
    }

    const opcoes = { rowsPerPageText: 'Linhas por página', rangeSeparatorText: 'de', noRowsPerPage: true };

    return (
        <div>
            <button className="mb-5 border rounded-lg bg-slate-300 p-2 font-bold" onClick={() => setModalIsOpen(true)}>Abrir Lista de Usuários</button>

            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Lista de Usuários"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '30%',
                        height: '50%',
                        padding: 0
                    },
                }}
            >
                <div className="bg-slate-500 w-[100%] h-[12%] border flex justify-center items-center">
                    <h2 className='font-bold text-[20px]'>Lista de Usuários</h2>
                </div>

                <DataTable
                    columns={colunas}
                    data={usuarios}
                    pagination
                    paginationPerPage={10}
                    responsive
                    striped
                    paginationComponentOptions={opcoes}
                    defaultSortFieldId={1}
                />
                <button
                    className="bg-slate-500 w-full h-[12%] border absolute bottom-0 flex justify-center items-center font-bold"
                    onClick={() => setModalIsOpen(false)}
                >
                    Fechar
                </button>
            </ReactModal>
        </div>
    );
}
