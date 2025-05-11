import type { ReactNode } from 'react'
import configSelectStyles from './styles.module.css'

interface Props {
  children: ReactNode
  title: string
  desc: string
  list: string[]
  defaultValue: string
  saveItem: (list: string) => void
}
export function ConfigSelect({
  children,
  title,
  desc,
  list,
  saveItem,
  defaultValue
}: Props) {
  return (
    <div className={configSelectStyles.configSelect}>
      <span>{children}</span>
      <div>
        <div>
          <p className='text-lg font-semibold'>{title}</p>
          <p className='text-sm'>{desc}</p>
        </div>

        <select
          onChange={e => saveItem(e.target.value)}
          defaultValue={defaultValue}
        >
          {list.map((item, index) => (
            <option key={`${item + index}`}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
