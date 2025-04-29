import { PasswordInput } from '@/components/password-input/password-input'
import globalStyles from '@/index.module.css'
import type { FormEvent } from 'react'
import Swal from 'sweetalert2'
import { useLocation } from 'wouter'
import { passwordValidator } from './constants'
import formStyles from './styles.module.css'

export function Form() {
  const [, setLocation] = useLocation()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const { password, passwordConfirmation, username, userEmail } =
      Object.fromEntries(formData) as {
        password: string
        passwordConfirmation: string
        username: string
        userEmail: string
      }

    if (passwordValidator(password, passwordConfirmation)) {
      return
    }

    Swal.fire({
      title: 'Éxito',
      text: 'Cuenta creada con éxito',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      theme: 'auto'
    })

    setLocation('/login')
  }

  return (
    <div className={formStyles.form}>
      <p>Regístrate</p>
      <form onSubmit={handleSubmit}>
        <input
          className={globalStyles.textInput}
          type='email'
          placeholder='Correo de usuario'
          name='userEmail'
        />
        <input
          className={globalStyles.textInput}
          type='text'
          placeholder='Nombre de usuario'
          name='username'
        />

        <PasswordInput
          name='password'
          placeholder='Contraseña'
        />

        <PasswordInput
          name='passwordConfirmation'
          placeholder='Confirmar contraseña'
        />

        <button
          type='submit'
          className={globalStyles.formButton}
        >
          Crear cuenta
        </button>
      </form>
    </div>
  )
}
