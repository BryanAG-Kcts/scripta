import { useState, type ReactNode } from 'react'
import configSwitchStyles from './styles.module.css'
import { IconChevronCompactRight } from '@tabler/icons-react'
import { WordListManager } from '../wordList/wordList'

interface Props {
  children: ReactNode
  title: string
  desc: string
  list: string[]
  saveList: (list: string[]) => void
}

export function ConfigList({ children, title, desc, list, saveList }: Props) {
  const [showList, setShowList] = useState(false)
  const [wordList, setWordList] = useState(list)

  return (
    <div>
      <div className={configSwitchStyles.configList}>
        <span>{children}</span>
        <div>
          <div>
            <p className='text-lg font-semibold'>{title}</p>
            <p className='text-sm'>{desc}</p>
          </div>

          <button
            type='button'
            onClick={() => {
              setShowList(!showList)
              saveList(wordList)
            }}
          >
            <IconChevronCompactRight stroke={1} />
          </button>
        </div>
      </div>

      {showList && (
        <div className='mt-4'>
          <WordListManager
            list={wordList}
            onChange={setWordList}
          />
        </div>
      )}
    </div>
  )
}
