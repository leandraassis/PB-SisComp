import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { listarProdutos } from "../../infra/produtos";

export default function ListaCotacoes({ cotacoes = [], setIdEditando }) {
    const [produtos, setProdutos] = useState([]);
    const [cotacoesFiltradas, setCotacoesFiltradas] = useState(cotacoes);
    const { register, handleSubmit } = useForm();
    
    useEffect(() => {
        async function fetchData() {
            const produtosLista = await listarProdutos();
            setProdutos(produtosLista);
        }
        fetchData();
    }, []);

    useEffect(() => {
        setCotacoesFiltradas(cotacoes);
    }, [cotacoes]);

    const filtrarCotacoes = (data) => {
        const produtoNome = data.produtoNome?.toLowerCase() || "";
        let filtradas = cotacoes;
        if (produtoNome) {
            filtradas = filtradas.filter(cotacao => cotacao.produtoNome?.toLowerCase().includes(produtoNome));
        }
        setCotacoesFiltradas(filtradas);
    };

    const colunas = [
        {
            name: "Requisição",
            selector: row => row.requisicaoSolicitante,
            sortable: true,
        },
        {
            name: "Produto",
            selector: row => row.produtoNome,
        },
        {
            name: "Preço",
            selector: row => row.preco,
        },
        {
            name: "FornecedorId",
            selector: row => row.fornecedorId,
        },
        {
            name: "Data",
            selector: row => row.data,
        },
    ];

    const opcoes = { rowsPerPageText: 'Linhas por página', rangeSeparatorText: 'de', noRowsPerPage: true };

    async function handleChange({ selectedRows }) {
        const id = selectedRows[0]?.id;
        if (id) {
            setIdEditando(id);
        } else {
            setIdEditando("");
        }
    }

    return (
        <>
            <form className="m-3" onSubmit={handleSubmit(filtrarCotacoes)}>
                <label className="text-lg font-bold mt-5" htmlFor="produtoNome">Filtrar por Produto: </label>
                <input className="inputForm w-[40%]"
                    type="text"
                    {...register("produtoNome")}
                    placeholder="Digite o nome do produto"
                />
                <input className="botoes m-0 ml-3" type="submit" value="Filtrar" />
            </form>

            <DataTable
                columns={colunas}
                data={cotacoesFiltradas}
                pagination
                paginationPerPage={5}
                responsive
                striped
                paginationComponentOptions={opcoes}
                defaultSortFieldId={1}
                selectableRows
                selectableRowsHighlight
                selectableRowsSingle
                onSelectedRowsChange={handleChange}
            />
        </>
    );
}
