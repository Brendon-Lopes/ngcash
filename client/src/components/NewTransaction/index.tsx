import { useForm } from 'react-hook-form'
import { transactionServices } from '../../services'
import { useCookies } from 'react-cookie'
import { transactionValidation } from '../../validations/transactionValidation'

export default function NewTransaction(props: {
  balance: string
  setTriggerTransfer: Function
  triggerTransfer: boolean
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: transactionValidation,
  })

  const [cookies] = useCookies(['token'])

  const handleNewTransaction = async (data: any) => {
    const { value, creditedAccountUsername } = data

    if (value > parseFloat(props.balance)) {
      alert('Saldo insuficiente')
      return
    }

    try {
      await transactionServices.newTransaction(
        cookies.token,
        value,
        creditedAccountUsername
      )

      props.setTriggerTransfer(!props.triggerTransfer)

      alert('Transação realizada com sucesso!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h3>Realizar transferência</h3>
      <form onSubmit={handleSubmit(handleNewTransaction)}>
        <label htmlFor="creditedAccountUsername">
          <input
            type="text"
            placeholder="username"
            {...register('creditedAccountUsername')}
          />
        </label>

        {errors?.creditedAccountUsername?.message !== undefined && (
          <p className="text-red-600">
            {errors.creditedAccountUsername.message as string}
          </p>
        )}

        <label htmlFor="value">
          <input
            type="number"
            step=".01"
            placeholder="valor"
            {...register('value')}
          />
        </label>

        {errors?.value?.message !== undefined && (
          <p className="text-red-600">{errors.value.message as string}</p>
        )}

        <button type="submit">Transferir</button>
      </form>
    </div>
  )
}
