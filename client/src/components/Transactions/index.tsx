import { ITransaction } from '../../interfaces'
import {
  transformCurrency,
  transformDate,
  dataGridColOptions,
} from '../../utils'
import { DataGrid, GridRowsProp } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { transactionServices } from '../../services'
import { useCookies } from 'react-cookie'
import { validateTransactionsFilter } from '../../validations'

interface IProps {
  transactions: ITransaction[]
  setTransactions: (transactions: ITransaction[]) => void
}

export default function Transactions({
  transactions,
  setTransactions,
}: IProps) {
  const [rows, setRows] = useState<GridRowsProp>([])

  const [cookies] = useCookies(['token'])

  const { register, handleSubmit } = useForm()

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

  const handleFilterTransactions = (data: any) => {
    const { startDate, endDate, type } = data

    const validate = validateTransactionsFilter({ startDate, endDate, type })

    if (!validate) return

    try {
      transactionServices
        .getFilteredTransactions(cookies.token, { startDate, endDate, type })
        .then((transactions) => setTransactions(transactions))
    } catch (error) {}
  }

  return (
    <div>
      <h3>Transações</h3>

      <form onSubmit={handleSubmit(handleFilterTransactions)}>
        <input type="date" {...register('startDate')} />

        <input type="date" {...register('endDate')} />

        <select {...register('type')}>
          <option value="all">Todos</option>
          <option value="cash-in">Cash-in</option>
          <option value="cash-out">Cash-out</option>
        </select>

        <button type="submit">Aplicar filtro</button>
      </form>

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
