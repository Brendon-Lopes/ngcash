import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { Nav } from '../components'

export default function Home() {
  const [cookies] = useCookies(['token'])

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Home'

    const { token } = cookies

    if (token === undefined) {
      navigate('/login')
    }
  }, [cookies])

  return (
    <div>
      <Nav />
      <h1>Home</h1>
    </div>
  )
}
