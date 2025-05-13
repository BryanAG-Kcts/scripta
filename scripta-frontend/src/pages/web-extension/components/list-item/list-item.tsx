import type { ReactNode } from 'react'
import checkItemStyles from '../check-item/styles.module.css'
import listItemStyles from './styles.module.css'

interface Props {
  label: string
  children: ReactNode
  options: string[]
  defaultValue: string
  saveItem: (item: string) => void
}
export function ListItem({
  children,
  label,
  options,
  defaultValue,
  saveItem
}: Props) {
  return (
    <div className={checkItemStyles.body}>
      <div>
        <div className={checkItemStyles.icon}>{children}</div>
        <p>{label}</p>
      </div>

      <select
        className={listItemStyles.select}
        onChange={e => saveItem(e.target.value)}
        defaultValue={defaultValue}
      >
        {options.map(value => (
          <option
            key={value}
            value={value}
          >
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}
