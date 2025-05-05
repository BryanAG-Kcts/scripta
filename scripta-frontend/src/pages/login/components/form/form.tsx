import { PasswordInput } from '@/components/password-input/password-input'
import { useUser } from '@/hooks/useUser/useUser'
import globalStyles from '@/index.module.css'
import type { FormEvent } from 'react'
import { useLocation } from 'wouter'
import { authLogin } from './constants'
import formStyles from './styles.module.css'

export function Form() {
  const [, setLocation] = useLocation()
  const { setUser } = useUser()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const { password, email } = Object.fromEntries(formData) as {
      password: string
      email: string
    }

    const data = await authLogin(email, password)
    if (!data[0]) {
      return
    }

    setUser(data[1])
    setLocation('/')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={formStyles.form}
    >
      <p>Autentícate</p>

      <input
        className={globalStyles.textInput}
        type='email'
        placeholder='Correo electrónico'
        name='email'
      />
      <PasswordInput
        name='password'
        placeholder='Contraseña'
      />

      <button
        type='submit'
        className={globalStyles.formButton}
      >
        Inicia sesión
      </button>
    </form>
  )
}
