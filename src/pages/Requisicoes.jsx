import { useContext, useEffect, useState } from "react";
import { listarRequisicoes } from "../infra/requisicoes";
import FormRequisicao from "../components/requisicoes/FormRequisicao";
import ListaRequisicoes from "../components/requisicoes/ListaRequisicoes";
import { AuthContext } from "../components/login/AuthContext";

export default function Requisicoes() {
    const [requisicoes, setRequisicoes] = useState([]);
    const [idEditando, setIdEditando] = useState("");
    const { autenticado, email } = useContext(AuthContext);

    const carregarRequisicoes = async () => {
        const novaListaRequisicoes = await listarRequisicoes();
        setRequisicoes(novaListaRequisicoes);
        console.log("listar requisicoes");
    };

    useEffect(() => {
        carregarRequisicoes();
    }, []); 

    const requisicoesListaFinal = !autenticado
        ? requisicoes.filter(req => req.solicitante === email)
        : requisicoes;

    return (
        <div className="containerPai">
            <h2 className="titulo">Requisições</h2>
            <div className="flex justify-between">
                <div className="containerForm">
                    <FormRequisicao
                        idEditando={idEditando}
                        setIdEditando={setIdEditando}
                        requisicoesAtualizadas={carregarRequisicoes}
                    />
                </div>
                <div className="containerLista">
                    <ListaRequisicoes requisicoes={requisicoesListaFinal} setIdEditando={setIdEditando} />
                </div>
            </div>
        </div>
    );
}
