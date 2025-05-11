import type { ReactNode } from 'react'
import checkItemStyles from '../check-item/styles.module.css'
import listItemStyles from './styles.module.css'

interface Props {
  label: string
  children: ReactNode
  options: {
    value: string
    label: string
  }[]
}
export function ListItem({ children, label, options }: Props) {
  return (
    <div className={checkItemStyles.body}>
      <div>
        <div className={checkItemStyles.icon}>{children}</div>
        <p>{label}</p>
      </div>

      <select className={listItemStyles.select}>
        {options.map(({ value, label }) => (
          <option
            key={value}
            value={value}
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
