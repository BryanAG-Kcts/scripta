import { IconShield } from '@tabler/icons-react'
import suggestPaneStyles from './styles.module.css'
import { useText } from '@/hooks/useText/useText'

export function SuggestPane() {
  const { feedBack } = useText()

  return (
    <div className={suggestPaneStyles.pane}>
      <div className='flex flex-wrap justify-center text-center gap-3'>
        <IconShield stroke={1} />
        <p>Lista de correcciones</p>
      </div>
      <div className={suggestPaneStyles.suggestions}>
        {feedBack.map(item => (
          <div
            className='custom-tooltip'
            key={item.explanation}
          >
            <p className='m-2.5 mb-0 text-[var(--color-primary-200)]'>{item.category}</p>
            <article>
              <div>
                <p className='font-semibold'>Tu error:</p>
                <p>{item.data}</p>
              </div>

              <div>
                <p className='font-semibold'>Explicación</p>
                <p>{item.explanation}</p>
              </div>

              <div>
                <p className='font-semibold'>¿Puedes preguntarte?</p>
                <p>{item.question}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
      <div className='flex flex-wrap gap-3'>
        <p>Correcciones: 0</p>
      </div>
    </div>
  )
}
