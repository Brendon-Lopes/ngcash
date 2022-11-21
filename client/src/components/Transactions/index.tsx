import { ITransaction } from '../../interfaces'
import {
  transformCurrency,
  transformDate,
  dataGridColOptions,
} from '../../utils'
import { DataGrid, GridRowsProp } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface IProps {
  transactions: ITransaction[]
}

export default function Transactions({ transactions }: IProps) {
  const [rows, setRows] = useState<GridRowsProp>([])

  useEffect(() => {
    const mappedRows = transactions.map((transaction) => ({
      id: transaction.date,
      col1: transaction.type,
      col2: `${transaction.type === 'cash-out' ? '-' : ''}${transformCurrency(
        transaction.debitedValue
      )}`,
      col3: `@${transaction.relation}`,
      col4: transformDate(transaction.date),
    }))

    setRows(mappedRows)
  }, [transactions])

  return (
    <div>
      <h3>Transações</h3>

      <section>
        <input type="date" />
      </section>

      <div className="w-full">
        <DataGrid
          rows={rows}
          columns={dataGridColOptions}
          autoHeight
          disableColumnFilter
          isRowSelectable={() => false}
        />
      </div>
    </div>
  )
}
