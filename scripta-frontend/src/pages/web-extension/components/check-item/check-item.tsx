import type { ReactNode } from 'react'
import { Switch } from '../../../../components/switch/switch'
import checkItemStyles from './styles.module.css'

interface Props {
  label: string
  children: ReactNode
  state: boolean
  setState: (state: boolean) => void
}
export function CheckItem({ children, label, state, setState }: Props) {
  return (
    <div className={checkItemStyles.body}>
      <div>
        <div className={checkItemStyles.icon}>{children}</div>
        <p>{label}</p>
      </div>

      <Switch
        state={state}
        setState={setState}
      />
    </div>
  )
}
