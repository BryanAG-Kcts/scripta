import { LowWave } from '@/components/waves/waves'
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
          <p>Crea tu cuenta para guardar tu información en Scripta</p>
        </article>

        <Form />
      </main>
      <LowWave />
    </div>
  )
}
