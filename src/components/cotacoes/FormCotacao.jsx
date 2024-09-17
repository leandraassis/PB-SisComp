import { useForm } from "react-hook-form";
import { atualizarCotacao, deletarCotacao, inserirCotacao, obterCotacao } from "../../infra/cotacoes";
import { listarProdutos } from "../../infra/produtos";
import { listarFornecedores } from "../../infra/fornecedores";
import { atualizarRequisicao, listarRequisicoes, obterRequisicao } from "../../infra/requisicoes";
import { useEffect, useState } from "react";

export default function FormContato({ idEditando, setIdEditando }) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    const [requisicoes, setRequisicoes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const requisicoesLista = await listarRequisicoes();
            const requisicoesFiltradas = requisicoesLista.filter(requisicao => {
                return requisicao.cotacoes.length < 3;
            });
            setRequisicoes(requisicoesFiltradas);
            const fornecedoresLista = await listarFornecedores();
            setFornecedores(fornecedoresLista);

            const produtosLista = await listarProdutos();
            setProdutos(produtosLista);

            if (idEditando && !isSubmitted) {
                const cotacao = await obterCotacao(idEditando);
                setValue("requisicaoId", cotacao.requisicaoId);
                setValue("data", cotacao.data);
                setValue("preco", cotacao.preco);
                setValue("produtoId", cotacao.produtoId);
                setValue("fornecedorId", cotacao.fornecedorId);
            } else {
                reset();
            }
        }

        fetchData();
    }, [idEditando]);

    async function cotarRequisicoes(cotacaoId) {
        const cotacaoAtual = await obterCotacao(cotacaoId);
        const requisicaoId = cotacaoAtual.requisicao;
        const requisicaoAtual = await obterRequisicao(requisicaoId);
    
        const cotacoes = requisicaoAtual.cotacoes;
        cotacoes.push(cotacaoAtual);
    
        let requisicaoComId = {
            ...requisicaoAtual,
            cotacoes,
            id: requisicaoId
        };
    
        if (cotacoes.length > 0 && cotacoes.length <= 2) {
            requisicaoComId = {
                ...requisicaoComId,
                status: "EM COTAÇÃO"
            };
        } else if (cotacoes.length >= 3) {
            requisicaoComId = {
                ...requisicaoComId,
                status: "COTADO"
            };
        }
        await atualizarRequisicao(requisicaoComId);
    }
    
    async function submeterDados(dados) {
        try {
            if (idEditando) {
                await atualizarCotacao({ ...dados, id: idEditando });
                setIdEditando("");
            } else {
                let id = await inserirCotacao(dados);
                setIdEditando(id);
                await cotarRequisicoes(id);
            }
            reset();
        } catch (error) {
            console.error('Erro ao submeter dados:', error);
        }
    }


    async function handleDeletar() {
        await deletarCotacao(idEditando);
        setIdEditando("");
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit(submeterDados)}>

                    <label htmlFor="requisicao">Requisição</label>&nbsp;
                    <br />
                    <select className="seletor" {...register("requisicao", {
                        required: "Requisicao é obrigatório",
                    })}>
                        <option value="">Selecione uma requisicao</option>
                        {requisicoes.map(requisicao => (
                            <option key={requisicao.id} value={requisicao.id}>
                                {requisicao.solicitante}
                            </option>
                        ))}
                    </select>

                    <br />

                    <label htmlFor="produtoId">Produto</label>&nbsp;
                    <br />
                    <select className="seletor" {...register("produtoId", {
                        required: "Produto é obrigatório",
                    })}>
                        <option value="">Selecione um produto</option>
                        {produtos.map(produto => (
                            <option key={produto.id} value={produto.id}>
                                {produto.nome}
                            </option>
                        ))}
                    </select>

                    <br />

                    <label htmlFor="fornecedorId">Fornecedor</label>&nbsp;
                    <br />
                    <select className="seletor" {...register("fornecedorId", {
                        required: "Fornecedor é obrigatório",
                    })}>
                        <option value="">Selecione um fornecedor</option>
                        {fornecedores.map(fornecedor => (
                            <option key={fornecedor.id} value={fornecedor.id}>
                                {fornecedor.nome}
                            </option>
                        ))}
                    </select>
                    <br />

                    <label htmlFor="preco">Preço</label>&nbsp;
                    <br />
                    <input className="inputForm" type="number" step="0.01" {...register("preco", {
                        required: "Preço é obrigatório",
                        min: {
                            value: 0.01,
                            message: "O preço deve ser maior que zero",
                        }
                    })} />

                    <br />

                    <label htmlFor="data">Data</label>&nbsp;
                    <br />
                    <input className="inputForm" type="date" {...register("data", {
                        required: "Data é obrigatória",
                    })} />
                    <br />
                    <input className="botoes" type="submit" value="Salvar" />
                    {idEditando && (
                        <input className="botoes" type="button" value="Deletar" onClick={handleDeletar} />
                    )}
                </form>
            </div>
            <div className="errorsContainer">
                {errors.produtoId?.message && (
                    <div>{errors.produtoId.message}</div>
                )}
                {errors.preco?.message && (
                    <div>{errors.preco.message}</div>
                )}
                {errors.data?.message && (
                    <div>{errors.data.message}</div>
                )}
            </div>
        </>
    );
}
