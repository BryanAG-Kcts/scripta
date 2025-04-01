import { PasswordInput } from '@/components/password-input/password-input'
import globalStyles from '@/index.module.css'
import formStyles from './styles.module.css'

export function Form() {
  return (
    <div className={formStyles.form}>
      <p>Regístrate</p>
      <form>
        <input
          className={globalStyles.textInput}
          type='email'
          placeholder='Correo de usuario'
        />
        <input
          className={globalStyles.textInput}
          type='text'
          placeholder='Nombre de usuario'
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
