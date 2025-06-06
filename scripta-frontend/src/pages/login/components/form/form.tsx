import { PasswordInput } from '@/components/password-input/password-input'
import { useUser } from '@/hooks/useUser/useUser'
import globalStyles from '@/index.module.css'
import type { FormEvent } from 'react'
import { useLocation } from 'wouter'
import { authLogin } from './constants'
import formStyles from './styles.module.css'
import type { User } from '@/hooks/useUser/interfaces'

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

    const [status, user] = await authLogin(email, password)
    if (!(status && user)) {
      return
    }

    setUser(user as User)
    localStorage.setItem('user', JSON.stringify(user))
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
