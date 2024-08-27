import DataTable from 'react-data-table-component';

export default function ListaRequisicoes({ requisicoes = [], setIdEditando }) {
    const colunas = [
        {
            name: "Solicitante",
            selector: row => row.solicitante,
            sortable: true,
        },
        {
            name: "Produto",
            selector: row => row.produto,
            sortable: true,
        },
        {
            name: "Descrição",
            selector: row => row.descricao,
        },
        {
            name: "Status",
            selector: row => row.status,
        },
    ];

    const opcoes = { rowsPerPageText: 'Linhas por página', rangeSeparatorText: 'de', noRowsPerPage: true };

    function handleChange({ selectedRows }) {
        console.log(selectedRows[0]?.id);
    }

    async function handleChange({ selectedRows }) {
        const id = selectedRows[0]?.id;
        if (id) {
            setIdEditando(id);
        } else {
            setIdEditando("");
        }
    }

    return (
        <DataTable
            columns={colunas}
            data={requisicoes}
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
    );
}