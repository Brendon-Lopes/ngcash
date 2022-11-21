import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { Nav, NewTransaction } from '../components'
import { userServices } from '../services'

export default function Home() {
  const [cookies] = useCookies(['token'])

  const [balance, setBalance] = useState('')

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
    </div>
  )
}
