import { useEffect, useState } from "react";
import FormContato from "../components/contatos/FormContato";
import ListaContatos from "../components/contatos/ListaContatos";
import { listarContatos } from "../infra/contatos";
import { obterFornecedor } from "../infra/fornecedores";

export default function Contatos() {

    const [contatos, setContatos] = useState([]);
    const [idEditando, setIdEditando] = useState("");

    
    const carregarContatos = async () => {
        const novaListaContatos = await listarContatos();
            const contatosCompletos = await Promise.all(
                novaListaContatos.map(async (contato) => {
                    const fornecedor = await obterFornecedor(contato.fornecedorId);
                    return { ...contato, fornecedorNome: fornecedor.nome };
                })
            );
            setContatos(contatosCompletos);
            console.log("listar contatos");
    };

    useEffect(() => {
        carregarContatos();
    }, []); 



    return (
        <div className="containerPai">
            <h2 className="titulo">Contatos</h2>
            <div className="flex justify-between">
                <div className="containerForm">
                    <FormContato idEditando={idEditando} setIdEditando={setIdEditando} contatosAtualizados={carregarContatos} />
                </div>
                <div className="containerLista">
                    <ListaContatos contatos={contatos} setIdEditando={setIdEditando} />
                </div>
            </div>
        </div>
    );
}