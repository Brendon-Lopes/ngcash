import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as userServices from '../services/userServices'
import { useCookies } from 'react-cookie'
import { loginValidation } from '../validations'

export default function Login() {
  const [error, setError] = useState(false)

  const [cookies, setCookie] = useCookies(['token'])

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: loginValidation })

  const handleLogin = async (data: any) => {
    const { username, password } = data

    try {
      const response = await userServices.login(username, password)

      setCookie('token', response.token, { path: '/' })
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  useEffect(() => {
    document.title = 'Login'

    const token = cookies.token

    if (token !== undefined) {
      navigate('/')
    }
  }, [cookies])

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <label htmlFor="username">
          Username
          <input type="text" {...register('username')} />
        </label>

        {errors?.username?.message !== undefined && (
          <p className="text-red-600">{errors.username.message as string}</p>
        )}

        <label htmlFor="password">
          Password
          <input type="password" {...register('password')} />
        </label>

        {errors?.password?.message !== undefined && (
          <p className="text-red-600">{errors.password.message as string}</p>
        )}

        {error && <p className="text-red-600">Email ou senha inválidos</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
