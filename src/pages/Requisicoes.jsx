import { useEffect, useState } from "react";
import { listarRequisicoes } from "../infra/requisicoes";
import FormRequisicao from "../components/requisicoes/FormRequisicao";
import ListaRequisicoes from "../components/requisicoes/ListaRequisicoes";

export default function Requisicoes() {

    const [requisicoes, setRequisicoes] = useState([]);
    const [idEditando, setIdEditando] = useState("");

    useEffect(() => {
        async function fetchData() {
            const novaListaRequisicoes = await listarRequisicoes();
            setRequisicoes(novaListaRequisicoes);
            console.log("listar requisicoes");
        }

        fetchData();
    }, [idEditando]);

    return (
        <div className="containerPai">
            <h2 className="titulo">Requisições</h2>
            <div className="flex justify-between">
                <div className="containerForm">
                    <FormRequisicao idEditando={idEditando} setIdEditando={setIdEditando} />
                </div>
                <div className="containerLista">
                    <ListaRequisicoes requisicoes={requisicoes} setIdEditando={setIdEditando} />
                </div>
            </div>
        </div>
    );
}