import { useEffect, useState } from "react";
import FormContato from "../components/contatos/FormContato";
import ListaContatos from "../components/contatos/ListaContatos";
import { listarContatos } from "../infra/contatos";
import { obterFornecedor } from "../infra/fornecedores";

export default function Contatos() {

    const [contatos, setContatos] = useState([]);
    const [idEditando, setIdEditando] = useState("");

    //o nome do fornecedor não estava aparecendo, apenas o ID, essa função pega o nome do fornecedor baseado em seu ID e atualiza a lista de contatos
    useEffect(() => {
        async function fetchData() {
            const novaListaContatos = await listarContatos();
            const contatosCompletos = await Promise.all( //Promise.all --> esperar todas as promessas dentro desse array serem resolvidas. É necessário pq o obterFornecedor(q é uma funcao async) é chamado varias vezes
                novaListaContatos.map(async (contato) => {
                    const fornecedor = await obterFornecedor(contato.fornecedorId);
                    return { ...contato, fornecedorNome: fornecedor.nome };
                })
            );
            setContatos(contatosCompletos);
            console.log("listar contatos");
        }
        fetchData();
    }, [idEditando]);

    return (
        <div className="containerPai">
            <h2 className="titulo">Contatos</h2>
            <div className="flex justify-between">
                <div className="containerForm">
                    <FormContato idEditando={idEditando} setIdEditando={setIdEditando} />
                </div>
                <div className="containerLista">
                    <ListaContatos contatos={contatos} setIdEditando={setIdEditando} />
                </div>
            </div>
        </div>
    );
}