import { LowWave } from '@/components/waves/waves'
import { Link } from 'wouter'
import { Form } from './components/form/form'
import { Header } from './components/header/header'
import registerStyles from './styles.module.css'

export function Register() {
  return (
    <div className={registerStyles.register}>
      <Header />

      <main className={registerStyles.registerMain}>
        <article>
          <h1>Crea tu cuenta</h1>
          <h2>
            <b>Escribe mejor, comunica mejor:</b> Haz que cada palabra cuente
          </h2>
          <p>
            Crea tu cuenta para guardar tu información en <span>Scripta</span>
          </p>
          <p>
            ¿Ya tienes cuenta?{' '}
            <span className='underline'>
              <Link href='/login'>Inicia sesión aquí</Link>
            </span>
          </p>
        </article>

        <Form />
      </main>
      <LowWave />
    </div>
  )
}
