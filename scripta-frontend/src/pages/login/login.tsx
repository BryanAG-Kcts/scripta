import { LowWave } from '@/components/waves/waves'
import { Header } from '../register/components/header/header'
import registerStyles from '../register/styles.module.css'
import { Form } from './components/form/form'
import loginStyles from './styles.module.css'

export function Login() {
  return (
    <div className={registerStyles.register}>
      <Header />
      <main className={registerStyles.registerMain}>
        <article>
          <h1>Inicia sesión</h1>
          <h2>
            <b>Escribe mejor, comunica mejor:</b> Haz que cada palabra cuente
          </h2>
          <p>
            Si no tienes una cuenta registrada puedes
            <a
              className={loginStyles.anchor}
              href='/'
            >
              {' '}
              registrarte aquí
            </a>
          </p>
        </article>

        <Form />
      </main>
      <LowWave />
    </div>
  )
}
