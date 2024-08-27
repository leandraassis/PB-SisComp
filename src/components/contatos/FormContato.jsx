import { useForm } from "react-hook-form";
import { regexEmail, regexNumerico } from "../../assets/Regex";
import { atualizarContato, deletarContato, inserirContato, obterContato } from "../../infra/contatos";
import { listarFornecedores } from "../../infra/fornecedores";
import { useEffect, useState } from "react";

export default function FormContato({ idEditando, setIdEditando }) {

    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const fornecedoresLista = await listarFornecedores();
            setFornecedores(fornecedoresLista);

            if (idEditando && !isSubmitted) {
                const contato = await obterContato(idEditando);
                setValue("nome", contato.nome);
                setValue("email", contato.email);
                setValue("telefone", contato.telefone);
                setValue("fornecedorId", contato.fornecedorId);
            } else {
                reset();
            }
        }

        fetchData();
    }, [idEditando]);

    async function submeterDados(dados) {
        if (idEditando) {
            await atualizarContato({ ...dados, id: idEditando });
            setIdEditando("");
        } else {
            let id = await inserirContato(dados);
            setIdEditando(id);
        }
        reset();
    }

    async function handleDeletar() {
        await deletarContato(idEditando);
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

                    <label htmlFor="email">Email</label>&nbsp;
                    <br />
                    <input className="inputForm" size={30} {...register("email", {
                        required: "Email é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 5 || "Email precisa ter no mínimo 5 caracteres",
                            maxLength: (value) => value.length <= 30 || "Email só pode ter, no máximo, 30 caracteres",
                            matchPattern: (value) => regexEmail.test(value) || "Email inválido",
                        },
                    })} />
                    <br />

                    <label htmlFor="telefone">Telefone</label>&nbsp;
                    <br />
                    <input className="inputForm" size={14} {...register("telefone", {
                        required: "Telefone é obrigatório",
                        validate: {
                            minLength: (value) => value.length >= 8 || "Telefone precisa ter no mínimo 8 números",
                            maxLength: (value) => value.length <= 14 || "Telefone só pode ter, no máximo, 14 números",
                            matchPattern: (value) => regexNumerico.test(value) || "Telefone aceita apenas números",
                        },
                    })} />
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
                {errors.email?.message && (
                    <div>{errors.email.message}</div>
                )}
                {errors.telefone?.message && (
                    <div>{errors.telefone.message}</div>
                )}
                {errors.fornecedorId?.message && (
                    <div>{errors.fornecedorId.message}</div>
                )}
            </div>
        </>
    );
}
