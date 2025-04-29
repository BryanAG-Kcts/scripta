import { CreateMLCEngine } from '@mlc-ai/web-llm'
import { IconCopy, IconTrash } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import editorStyles from './styles.module.css'

export function Editor() {
  const [textareaValue, setTextareaValue] = useState('')

  useEffect(() => {
    async function main() {
      const initProgressCallback = initProgress => {
        console.log(initProgress)
      }
      const selectedModel = 'Llama-3.2-1B-Instruct-q4f16_1-MLC'

      const engine = await CreateMLCEngine(
        selectedModel,
        { initProgressCallback: initProgressCallback } // engineConfig
      )
    }
    main()
  }, [])

  function handleCopyText() {
    navigator.clipboard.writeText(textareaValue)
    alert('Texto copiado al portapapeles')
  }

  function handleDeleteText() {
    setTextareaValue('')
    alert('Texto eliminado')
  }

  function textareaWordCount() {
    const rawWords = textareaValue.split(' ')
    return rawWords[rawWords.length - 1] === ''
      ? rawWords.length - 1
      : rawWords.length
  }

  return (
    <section className={editorStyles.editor}>
      <div className='flex items-center justify-end gap-7'>
        <button
          type='button'
          className='flex items-center gap-2 text-center cursor-pointer'
          onClick={handleCopyText}
        >
          <IconCopy stroke={1} />
          <p>Copiar texto</p>
        </button>

        <button
          type='button'
          className='flex items-center gap-2 text-center cursor-pointer'
          onClick={handleDeleteText}
        >
          <IconTrash stroke={1} />
          <p>Eliminar todo</p>
        </button>
      </div>
      <textarea
        value={textareaValue}
        onChange={e => setTextareaValue(e.target.value)}
      />
      <div className='flex gap-4'>
        <p>Conteo de palabras: {textareaWordCount()}</p>
        <p>Conteo de caracteres: {textareaValue.length}</p>
      </div>
    </section>
  )
}
