import { PasswordInput } from '@/components/password-input/password-input'
import globalStyles from '@/index.module.css'
import formStyles from './styles.module.css'

export function Form() {
  return (
    <form className={formStyles.form}>
      <p>Autentícate</p>

      <input
        className={globalStyles.textInput}
        type='text'
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
