import { LowWave, MediumWave } from '../../components/waves/waves'
import { Editor } from './components/editor/editor'
import { Header } from './components/header/header'
import homeStyles from './styles.module.css'

export function Home() {
  return (
    <>
      <section>
        <Header />
        <main className={homeStyles.main}>
          <div className='flex flex-col gap-2'>
            <h2>Tu asistente de escritura inteligente</h2>
            <p>
              Tu asistente de escritura inteligente. Mejora tu escritura con
              precisión y estilo. Ya sea que busques un estilo formal, elegante
              o casual, te ayudamos a comunicarte con impacto y profesionalismo
            </p>
          </div>

          <Editor />
        </main>
      </section>

      <span className={homeStyles.bg} />
      <picture className={homeStyles.picture}>
        <MediumWave />
        <LowWave />
      </picture>
    </>
  )
}
