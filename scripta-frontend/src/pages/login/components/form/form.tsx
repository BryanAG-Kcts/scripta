import { PasswordInput } from '@/components/password-input/password-input'
import { useUser } from '@/hooks/useUser/useUser'
import globalStyles from '@/index.module.css'
import type { FormEvent } from 'react'
import { useLocation } from 'wouter'
import formStyles from './styles.module.css'

export function Form() {
  const [, setLocation] = useLocation()
  const { setUser } = useUser()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setUser({
      id: 1,
      name: 'John Doe',
      email: 'XXXXXXXXXXXXXXXXX',
      password: 'XXXXXXXXXXXXXXXXX'
    })

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
