import { useForm } from "react-hook-form";
import { regexNumerico } from "../../assets/Regex";
import { useEffect } from "react";
import { atualizarFornecedor, deletarFornecedor, inserirFornecedor, obterFornecedor } from "../../infra/fornecedores";

export default function FormFornecedor({ idEditando, setIdEditando, fornecedoresAtualizados }) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            if (idEditando && !isSubmitted) {
                const fornecedor = await obterFornecedor(idEditando);
                setValue("nome", fornecedor.nome);
                setValue("endereco", fornecedor.endereco);
                setValue("cnpj", fornecedor.cnpj);
            } else {
                reset();
            }
        }

        fetchData();
    }, [idEditando]);

    async function submeterDados(dados) {
        if (idEditando) {
            await atualizarFornecedor({ ...dados, id: idEditando });
        } else {
            let id = await inserirFornecedor(dados);
            setIdEditando(id);
        }
        setIdEditando("");
        reset();
        fornecedoresAtualizados();
    }

    async function handleDeletar() {
        await deletarFornecedor(idEditando);
        fornecedoresAtualizados();
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

                    <label htmlFor="endereco">Endereco</label>&nbsp;
                    <br />
                    <input className="inputForm" size={30} {...register("endereco", {
                        required: "Endereco é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Endereco precisa ter no mínimo 5 caracteres",
                            maxLength: (value) => value.length <= 30 || "Endereco só pode ter, no máximo, 50 caracteres",
                        },
                    })} />
                    <br />

                    <label htmlFor="cnpj">CNPJ</label>&nbsp;
                    <br />
                    <input className="inputForm" size={14} {...register("cnpj", {
                        required: "CNPJ é obrigatório",
                        validate: {
                            exactLength: value => value.length === 14 || "CNPJ precisa ter 14 dígitos",
                            matchPattern: (value) => regexNumerico.test(value) || "CNPJ aceita apenas números",
                        },
                    })} />
                    <br />
                    <input className="botoes" type="submit" value={idEditando ? "Atualizar" : "Salvar"} />
                    {idEditando && (
                        <input className="botoes" type="button" value="Deletar" onClick={handleDeletar} />
                    )}
                </form>
            </div>
            <div className="errorsContainer">
                {errors.nome?.message && (
                    <div>{errors.nome.message}</div>
                )}
                {errors.endereco?.message && (
                    <div>{errors.endereco.message}</div>
                )}
                {errors.cnpj?.message && (
                    <div>{errors.cnpj.message}</div>
                )}
            </div>
        </>
    );
}