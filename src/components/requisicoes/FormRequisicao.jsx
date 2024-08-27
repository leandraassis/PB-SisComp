import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { atualizarRequisicao, deletarRequisicao, inserirRequisicao, obterRequisicao } from "../../infra/requisicoes";


export default function FormRequisicao({ idEditando, setIdEditando }) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            if (idEditando && !isSubmitted) {
                const requisicao = await obterRequisicao(idEditando);
                setValue("solicitante", requisicao.solicitante);
                setValue("produto", requisicao.produto);
                setValue("descricao", requisicao.observacoes);
                setValue("status", requisicao.status);
            } else {
                reset();
            }
        }

        fetchData();
    }, [idEditando]);

    async function submeterDados(dados) {
        if (idEditando) {
            await atualizarRequisicao({ ...dados, id: idEditando });
            setIdEditando("");
        } else {
            let id = await inserirRequisicao({ ...dados, status: "Aberta" });
            setIdEditando(id);
        }
        reset();
    }

    async function handleDeletar() {
        await deletarRequisicao(idEditando);
        setIdEditando("");
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <label htmlFor="solicitante">Solicitante</label>&nbsp;
                    <br />
                    <input className="inputForm" size={50} {...register("solicitante", {
                        required: "Solicitante é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Solicitante precisa ter no mínimo 5 caracteres",
                            maxLength: (value) => value.length <= 50 || "Solicitante só pode ter, no máximo, 50 caracteres",
                        },
                    })} />
                    <br />

                    <label htmlFor="produto">Produto</label>&nbsp;
                    <br />
                    <input className="inputForm" size={30} {...register("produto", {
                        required: "Produto é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 3 || "Produto precisa ter no mínimo 3 caracteres",
                            maxLength: (value) => value.length <= 30 || "Produto só pode ter, no máximo, 30 caracteres",
                        },
                    })} />
                    <br />

                    <label htmlFor="descricao">Descrição</label>&nbsp;
                    <br />
                    <textarea className="inputForm resize-none h-[10vh]" rows={4} cols={10} {...register("descricao", {
                        required: "Descrição é obrigatória",
                        validate: {
                            minLength: (value) => value.length >= 10 || "Descrição precisa ter no mínimo 10 caracteres",
                            maxLength: (value) => value.length <= 500 || "Descrição só pode ter, no máximo, 100 caracteres",
                        },
                    })} />

                    <br />
                    
                    <input className="botoes" type="submit" value="Salvar" />
                    {idEditando && (
                        <input className="botoes" type="button" value="Deletar" onClick={handleDeletar} />
                    )}
                </form>
            </div>
            <div className="errorsContainer">
                {errors.solicitante?.message && (
                    <div>{errors.solicitante.message}</div>
                )}
                {errors.produto?.message && (
                    <div>{errors.produto.message}</div>
                )}
                {errors.descricao?.message && (
                    <div>{errors.descricao.message}</div>
                )}
            </div>
        </>
    );
}