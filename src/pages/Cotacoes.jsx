import { useContext, useEffect, useState } from "react";
import { listarCotacoes } from "../infra/cotacoes";
import { obterProduto } from "../infra/produtos";
import ListaCotacoes from "../components/cotacoes/ListaCotacoes";
import FormCotacao from "../components/cotacoes/FormCotacao";
import { AuthContext } from "../components/login/AuthContext";
import { listarRequisicoes } from "../infra/requisicoes";

export default function Cotacoes() {

    const [cotacoes, setCotacoes] = useState([]);
    const [requisicoes, setRequisicoes] = useState([]);
    const [idEditando, setIdEditando] = useState("");
    const { autenticado, email } = useContext(AuthContext);
    const [idRequisicao, setIdRequisicao] = useState(null);

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

    useEffect(() => {
        async function fetchData() {
            const novaListaRequisicoes = await listarRequisicoes();
            setRequisicoes(novaListaRequisicoes);
            console.log("listar requisicoes");

            const requisicaoId = novaListaRequisicoes.find(req => req.solicitante === email);
            if (requisicaoId) {
                setIdRequisicao(requisicaoId.id);
            }
        }

        fetchData();
    }, [idEditando, email]);

    const cotacoesFiltradas = cotacoes.filter(cotacao => cotacao.requisicao === idRequisicao);

    return (
        <div className="containerPai">
            <h2 className="titulo">Cotações</h2>
            <div className="flex justify-between">
                {autenticado &&
                    <div className="containerForm w-[70%]">
                        <FormCotacao idEditando={idEditando} setIdEditando={setIdEditando} />
                    </div>
                }
                <div className="containerLista w-[100%]">
                    <ListaCotacoes cotacoes={autenticado ? cotacoes : cotacoesFiltradas} setIdEditando={setIdEditando} />
                </div>
            </div>
        </div>
    );
}