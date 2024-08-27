import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { atualizarProduto, deletarProduto, inserirProduto, obterProduto } from "../../infra/produtos";


export default function FormProduto({ idEditando, setIdEditando }) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            if (idEditando && !isSubmitted) {
                const produto = await obterProduto(idEditando);
                setValue("nome", produto.nome);
                setValue("categoria", produto.categoria);
                setValue("descricao", produto.descricao);
                setValue("validade", produto.validade);
            } else {
                reset();
            }
        }

        fetchData();
    }, [idEditando]);

    async function submeterDados(dados) {
        if (idEditando) {
            await atualizarProduto({ ...dados, id: idEditando });
            setIdEditando("");
        } else {
            let id = await inserirProduto(dados);
            setIdEditando(id);
        }
        reset();
    }

    async function handleDeletar() {
        await deletarProduto(idEditando);
        setIdEditando("");
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit(submeterDados)}>
                    <label htmlFor="nome">Nome</label>&nbsp;
                    <br />
                    <input className="inputForm" size={50} {...register("nome", {
                        required: "Nome é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Nome precisa ter no mínimo 5 caracteres",
                            maxLength: (value) => value.length <= 50 || "Nome só pode ter, no máximo, 50 caracteres",
                        },
                    })} />
                    <br />

                    <label htmlFor="categoria">Categoria</label>&nbsp;
                    <br />
                    <input className="inputForm" size={30} {...register("categoria", {
                        required: "Categoria é obrigatória",
                        validate: {
                            minLength: (value) => value.length >= 3 || "Categoria precisa ter no mínimo 3 caracteres",
                            maxLength: (value) => value.length <= 30 || "Categoria só pode ter, no máximo, 30 caracteres",
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

                    <label htmlFor="validade">Validade</label>&nbsp;
                    <br />
                    <input className="inputForm" type="date" {...register("validade", {
                        required: "Data de validade é obrigatória",
                    })} />
                    <br />

                    <input className="botoes" type="submit" value="Salvar" />
                    {idEditando && (
                        <input className="botoes" type="button" value="Deletar" onClick={handleDeletar} />
                    )}
                </form>
            </div>
            <div className="errorsContainer">
                {errors.nome?.message && (
                    <div>{errors.nome.message}</div>
                )}
                {errors.categoria?.message && (
                    <div>{errors.categoria.message}</div>
                )}
                {errors.descricao?.message && (
                    <div>{errors.descricao.message}</div>
                )}
                {errors.validade?.message && (
                    <div>{errors.validade.message}</div>
                )}
            </div>
        </>
    );
}