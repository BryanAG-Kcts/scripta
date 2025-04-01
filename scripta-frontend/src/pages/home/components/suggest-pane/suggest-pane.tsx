import { IconShield } from '@tabler/icons-react'
import suggestPaneStyles from './styles.module.css'

export function SuggestPane() {
  return (
    <div className={suggestPaneStyles.pane}>
      <div className='flex flex-wrap justify-center text-center gap-3'>
        <IconShield stroke={1} />
        <p>Lista de correcciones</p>
      </div>
      <div className={suggestPaneStyles.suggestions} />
      <div className='flex flex-wrap gap-3'>
        <p>Correcciones: 0</p>
        <p>Sugerencias: 0</p>
      </div>
    </div>
  )
}
