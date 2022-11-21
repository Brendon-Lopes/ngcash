import LogoNgcash from '../../assets/logo-ngcash.svg'
import { NavLink } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { jwt, transformCurrency } from '../../utils'
import { useEffect, useState } from 'react'
import { userServices } from '../../services'

export default function Nav() {
  const [cookies, , removeCookie] = useCookies(['token'])

  const [balance, setBalance] = useState('')

  const handleLogout = () => {
    removeCookie('token', { path: '/' })
  }

  const getUsername = () => {
    const { token } = cookies

    if (token !== undefined) {
      const { username } = jwt.decodeToken(token)

      return username
    }
  }

  useEffect(() => {
    if (cookies.token !== undefined) {
      userServices
        .getBalance(cookies.token)
        .then((balance) => setBalance(balance))
        .catch((err) => console.log(err))
    }
  }, [cookies])

  if (cookies.token !== undefined) {
    return (
      <nav className="flex items-center justify-cente py-3 px-8 shadow-m bg-gray-800">
        <div className="flex items-center gap-8">
          <img src={LogoNgcash} alt="Logo NGCash" className="h-10" />
          <p className="text-white">Olá, {getUsername()}</p>
          <p className="text-white">Saldo: {transformCurrency(balance)}</p>
          <button
            onClick={handleLogout}
            className="bg-slate-100 py-1 px-4 rounded"
          >
            Sair
          </button>
        </div>
      </nav>
    )
  }

  return (
    <nav className="flex items-center justify-cente py-3 px-8 shadow-m bg-gray-800">
      <div className="flex items-center gap-8">
        <img src={LogoNgcash} alt="Logo NGCash" className="h-10" />
        <NavLink to="/login" className="text-white">
          Login
        </NavLink>
        <NavLink to="/cadastro" className="text-white">
          Criar conta
        </NavLink>
      </div>
    </nav>
  )
}
