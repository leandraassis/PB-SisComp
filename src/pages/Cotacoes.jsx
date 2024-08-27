import { useEffect, useState } from "react";
import { listarCotacoes } from "../infra/cotacoes";
import { obterProduto } from "../infra/produtos";
import ListaCotacoes from "../components/cotacoes/ListaCotacoes";
import FormCotacao from "../components/cotacoes/FormCotacao";

export default function Cotacoes() {

    const [cotacoes, setCotacoes] = useState([]);
    const [idEditando, setIdEditando] = useState("");

    useEffect(() => {
        async function fetchData() {
            const novaListaCotacoes = await listarCotacoes();
            const cotacoesCompletas = await Promise.all(
                novaListaCotacoes.map(async (cotacao) => {
                    const produto = await obterProduto(cotacao.produtoId);
                    return { ...cotacao, produtoNome: produto.nome };
                })
            );
            setCotacoes(cotacoesCompletas);
            console.log("listar cotacoes");
        }
        fetchData();
    }, [idEditando]);

    return (
        <div className="containerPai">
            <h2 className="titulo">Cotações</h2>
            <div className="flex justify-between">
                <div className="containerForm">
                    <FormCotacao idEditando={idEditando} setIdEditando={setIdEditando} />
                </div>
                <div className="containerLista">
                    <ListaCotacoes cotacoes={cotacoes} setIdEditando={setIdEditando} />
                </div>
            </div>
        </div>
    );
}