import { useEffect, useState } from "react";
import ListaFornecedores from "../components/fornecedores/ListaFornecedores";
import FormFornecedor from "../components/fornecedores/FormFornecedor";
import { listarFornecedores } from "../infra/fornecedores";

export default function Fornecedores() {

    const [fornecedores, setFornecedores] = useState([]);
    const [idEditando, setIdEditando] = useState("");

    useEffect(() => {
        async function fetchData() {
            const novaListaFornecedores = await listarFornecedores();
            setFornecedores(novaListaFornecedores);
            console.log("listar fornecedores");
        }

        fetchData();
    }, [idEditando]);

    return (
        <div className="containerPai">
            <h2 className="titulo">Fornecedores</h2>
            <div className="flex justify-between">
                <div className="containerForm">
                    <FormFornecedor idEditando={idEditando} setIdEditando={setIdEditando} />
                </div>
                <div className="containerLista">
                    <ListaFornecedores fornecedores={fornecedores} setIdEditando={setIdEditando} />
                </div>
            </div>
        </div>
    );
}