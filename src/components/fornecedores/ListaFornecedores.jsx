import DataTable from 'react-data-table-component';

export default function ListaFornecedores({ fornecedores = [], setIdEditando }) {
    const colunas = [
        {
            name: "Nome",
            selector: row => row.nome,
            sortable: true,
        },
        {
            name: "Endereço",
            selector: row => row.endereco,
        },
        {
            name: "CNPJ",
            selector: row => row.cnpj,
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
            data={fornecedores}
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