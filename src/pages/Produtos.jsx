import { useEffect, useState } from "react";
import { listarProdutos } from "../infra/produtos";
import FormProduto from "../components/produtos/FormProduto";
import ListaProdutos from "../components/produtos/ListaProdutos";


export default function Produtos() {

    const [produtos, setProdutos] = useState([]);
    const [idEditando, setIdEditando] = useState("");

    const carregarProdutos = async () => {
        const novaListaProdutos = await listarProdutos();
            setProdutos(novaListaProdutos);
            console.log("listar produtos");
    };

    useEffect(() => {
        carregarProdutos();
    }, []); 

    return (
        <div className="containerPai">
            <h2 className="titulo">Produtos</h2>
            <div className="flex justify-between">
                <div className="containerForm">
                    <FormProduto idEditando={idEditando} setIdEditando={setIdEditando} produtosAtualizados={carregarProdutos}/>
                </div>
                <div className="containerLista">
                    <ListaProdutos produtos={produtos} setIdEditando={setIdEditando} />
                </div>
            </div>
        </div>
    );
}