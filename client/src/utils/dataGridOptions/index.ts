import { GridColDef } from '@mui/x-data-grid'

const dataGridColOptions: GridColDef[] = [
  {
    field: 'col1',
    headerName: 'Tipo',
    width: 150,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'col2',
    headerName: 'Valor',
    width: 150,
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
  },
  {
    field: 'col3',
    headerName: 'De/Para',
    width: 150,
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
  },
  {
    field: 'col4',
    headerName: 'Data',
    width: 150,
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
  },
]

export default dataGridColOptions
