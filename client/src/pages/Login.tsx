import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function Login() {
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleLogin = async (data: any) => {}

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="username">
          Username
          <input type="string" />
        </label>

        <label htmlFor="password">
          Password
          <input type="password" />
        </label>

        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
