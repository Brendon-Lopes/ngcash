import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { Nav, NewTransaction, Transactions } from '../components'
import { ITransaction } from '../interfaces'
import { transactionServices, userServices } from '../services'

export default function Home() {
  const [cookies] = useCookies(['token'])

  const [balance, setBalance] = useState('')

  const [transactions, setTransactions] = useState<ITransaction[]>([])

  const [triggerTransfer, setTriggerTransfer] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Home'

    if (cookies.token === undefined) {
      navigate('/login')
    } else {
      userServices
        .getBalance(cookies.token)
        .then((balance) => {
          setBalance(balance)
        })
        .catch((err) => console.log(err))

      transactionServices
        .getTransactions(cookies.token)
        .then((transactions) => {
          setTransactions(transactions)
        })
        .catch((err) => console.log(err))
    }
  }, [cookies, triggerTransfer])

  return (
    <div>
      <Nav balance={balance} />
      <NewTransaction
        balance={balance}
        triggerTransfer={triggerTransfer}
        setTriggerTransfer={setTriggerTransfer}
      />
      <Transactions transactions={transactions} />
    </div>
  )
}
