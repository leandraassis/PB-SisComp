import { useEffect, useState } from "react";
import { listarProdutos } from "../infra/produtos";
import FormProduto from "../components/produtos/FormProduto";
import ListaProdutos from "../components/produtos/ListaProdutos";


export default function Produtos() {

    const [produtos, setProdutos] = useState([]);
    const [idEditando, setIdEditando] = useState("");

    useEffect(() => {
        async function fetchData() {
            const novaListaProdutos = await listarProdutos();
            setProdutos(novaListaProdutos);
            console.log("listar produtos");
        }

        fetchData();
    }, [idEditando]);

    return (
        <div className="containerPai">
            <h2 className="titulo">Produtos</h2>
            <div className="flex justify-between">
                <div className="containerForm">
                    <FormProduto idEditando={idEditando} setIdEditando={setIdEditando} />
                </div>
                <div className="containerLista">
                    <ListaProdutos produtos={produtos} setIdEditando={setIdEditando} />
                </div>
            </div>
        </div>
    );
}