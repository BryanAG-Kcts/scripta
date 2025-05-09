import { createMirror, deleteMirror } from '@/utils/mirror'
import { IconCopy, IconTrash } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import editorStyles from './styles.module.css'

export function Editor() {
  const [textareaValue, setTextareaValue] = useState('')

  useEffect(() => {
    document
      .querySelectorAll("textarea, input[type='text']")
      .forEach(createMirror as () => void)

    return () => {
      deleteMirror()
    }
  }, [])

  function handleCopyText() {
    navigator.clipboard.writeText(textareaValue)
    Swal.fire({
      title: 'Texto copiado al portapapeles',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    })
  }

  async function handleDeleteText() {
    const confirm = await Swal.fire({
      title: '¿Estás seguro de eliminar el texto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    })

    if (!confirm.isConfirmed) {
      return
    }

    setTextareaValue('')
    deleteMirror()
    document
      .querySelectorAll("textarea, input[type='text']")
      .forEach(createMirror as () => void)
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
        onChange={e => {
          setTextareaValue(e.target.value)
        }}
      />
      <div className='flex gap-4'>
        <p>Conteo de palabras: {textareaWordCount()}</p>
        <p>Conteo de caracteres: {textareaValue.length}</p>
      </div>
    </section>
  )
}
