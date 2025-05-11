import { useState } from 'react'
import {
  IconTrash,
  IconEdit,
  IconPlus,
  IconCheck,
  IconX
} from '@tabler/icons-react'
import wordListStyles from './styles.module.css'

interface WordListManagerProps {
  list: string[]
  onChange: (newList: string[]) => void
}

export function WordListManager({ list, onChange }: WordListManagerProps) {
  const [newWord, setNewWord] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editedWord, setEditedWord] = useState('')

  const addWord = () => {
    if (newWord.trim() && !list.includes(newWord.trim())) {
      onChange([...list, newWord.trim()])
      setNewWord('')
    }
  }

  const deleteWord = (index: number) => {
    const updated = list.filter((_, i) => i !== index)
    onChange(updated)
  }

  const startEdit = (index: number) => {
    setEditingIndex(index)
    setEditedWord(list[index])
  }

  const confirmEdit = () => {
    if (editedWord.trim()) {
      const updated = [...list]

      if (editingIndex != null) {
        updated[editingIndex] = editedWord.trim()
        onChange(updated)
        setEditingIndex(null)
      }
    }
  }

  return (
    <div className={`p-4 rounded-lg space-y-2 ${wordListStyles.border}`}>
      <div className='flex gap-2'>
        <input
          type='text'
          className={`px-2 py-1 rounded flex-1 ${wordListStyles.border} outline-none`}
          value={newWord}
          onChange={e => setNewWord(e.target.value)}
          placeholder='Nueva palabra'
        />
        <button
          onClick={addWord}
          className={`text-white px-2 rounded cursor-pointer ${wordListStyles.bg}`}
          type='button'
        >
          <IconPlus size={18} />
        </button>
      </div>

      <ul className='space-y-1'>
        {list.map((word, index) => (
          <li
            key={`${word + index}`}
            className='flex items-center justify-between'
          >
            {editingIndex === index ? (
              <div className='flex gap-2 items-center'>
                <input
                  type='text'
                  className='border px-2 py-1 rounded cursor-pointer outline-none'
                  value={editedWord}
                  onChange={e => setEditedWord(e.target.value)}
                />
                <button
                  onClick={confirmEdit}
                  type='button'
                  className='cursor-pointer'
                >
                  <IconCheck size={18} />
                </button>
                <button
                  type='button'
                  className='cursor-pointer'
                  onClick={() => setEditingIndex(null)}
                >
                  <IconX size={18} />
                </button>
              </div>
            ) : (
              <>
                <span>{word}</span>
                <div className='flex gap-2'>
                  <button
                    type='button'
                    className='cursor-pointer'
                    onClick={() => startEdit(index)}
                  >
                    <IconEdit size={18} />
                  </button>
                  <button
                    type='button'
                    className='cursor-pointer'
                    onClick={() => deleteWord(index)}
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
