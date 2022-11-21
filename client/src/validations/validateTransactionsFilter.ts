import { ITransactionFilterOptions } from '../interfaces'

const validateTransactionsFilter = ({
  startDate,
  endDate,
  type,
}: ITransactionFilterOptions): boolean => {
  if (
    (startDate !== '' && endDate === '') ||
    (startDate === '' && endDate !== '')
  ) {
    alert(
      'Para filtrar por data, é necessário preencher os dois campos (Data inicial e Data final)'
    )
    return false
  }

  return true
}

export default validateTransactionsFilter
