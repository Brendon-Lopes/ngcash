import { useForm } from 'react-hook-form'
import { userServices } from '../services'
import { registerValidation } from '../validations'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [cookies, setCookie] = useCookies(['token'])

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: registerValidation })

  const handleRegister = async (data: any) => {
    const { username, password } = data

    try {
      const response = await userServices.register(username, password)

      setCookie('token', response.token, { path: '/' })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    document.title = 'Cadastro'

    if (cookies.token !== undefined) {
      navigate('/')
    }
  }, [cookies])

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit(handleRegister)}>
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

        <button type="submit">Criar conta</button>
      </form>
    </div>
  )
}
