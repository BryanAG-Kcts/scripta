import { Switch } from '@/components/switch/switch'
import type { ReactNode } from 'react'
import configSwitchStyles from './styles.module.css'

interface Props {
  children: ReactNode
  title: string
  desc: string
  fnState: (newState: boolean) => void
  state: boolean
}

export function ConfigSwitch({ children, title, desc, fnState, state }: Props) {
  return (
    <div className={configSwitchStyles.configSwitch}>
      <span>{children}</span>
      <div>
        <div>
          <p className='text-lg font-semibold'>{title}</p>
          <p className='text-sm'>{desc}</p>
        </div>

        <Switch
          setState={fnState}
          state={state}
        />
      </div>
    </div>
  )
}
