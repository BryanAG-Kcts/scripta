import { createMirror, deleteMirror } from '@/utils/mirror'
import { IconCopy, IconTrash } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import editorStyles from './styles.module.css'
import { useText } from '@/hooks/useText/useText'
import { useConfig } from '@/hooks/useConfig/useConfig'
import { debounce } from '@/utils/debounce'
import { cleanHighlight, highlightText } from '@/utils/highlightText'
import { fetchIa } from '@/utils/fetchIa'
import { useUser } from '@/hooks/useUser/useUser'
import { useLocation } from 'wouter'
import type { User } from '@/hooks/useUser/interfaces'
import type { feedBackText } from '@/hooks/useText/interfaces'

export function Editor() {
  const [textareaValue, setTextareaValue] = useState('')
  const { setFeedBack } = useText()
  const { config, fetchConfig, setConfig, words } = useConfig()
  const { user, setUser } = useUser()
  const [, r] = useLocation()
  const [del, setDel] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const events: EventListener[] = []
    ;(async () => {
      const iUser: User | null =
        user || JSON.parse(window.localStorage.getItem('user') || 'null')

      if (iUser) {
        setUser(iUser)
        if (!config) {
          await fetchConfig(`${iUser.id}`)
          return
        }
      } else if (!config) {
        setConfig({
          state: true,
          stateDictionary: true,
          tone: 'informal',
          verbosity: 'media'
        })
        return
      }

      const inputs = document.querySelectorAll(
        "textarea, input[type='text']"
      ) as NodeListOf<HTMLElement>

      for (const input of inputs) {
        const mirror = createMirror(input)
        const debounced = debounce(async () => {
          cleanHighlight(mirror)

          if ((input as HTMLInputElement).value === '') {
            setFeedBack([])
          } else {
            const data = (
              await fetchIa(
                config.tone,
                config.verbosity,
                (input as HTMLInputElement).value,
                words
              )
            ).output.errors as feedBackText[]

            // const data: feedBackText[] = [
            //   {
            //     category: 'a',
            //     data: 'as',
            //     explanation: 'a',
            //     position: [0, 10],
            //     question: 'a'
            //   }
            // ]

            setFeedBack(data)
            mirror.innerHTML = highlightText(
              input,
              data.map(e => e.position)
            )
          }
        }, 1000)

        events.push(debounced)
        input.addEventListener('input', debounced)
      }
    })()

    return () => {
      deleteMirror()
      for (const event of events) {
        document.removeEventListener('input', event)
      }
      events.length = 0
    }
  }, [
    config,
    user,
    r,
    setUser,
    fetchConfig,
    setFeedBack,
    del,
    setConfig,
    words
  ])

  function handleCopyText() {
    navigator.clipboard.writeText(textareaValue)
    Swal.fire({
      title: 'Texto copiado al portapapeles',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      theme: 'auto'
    })
  }

  async function handleDeleteText() {
    const confirm = await Swal.fire({
      title: '¿Estás seguro de eliminar el texto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      theme: 'auto'
    })

    if (!confirm.isConfirmed) {
      return
    }

    setTextareaValue('')
    deleteMirror()
    setDel(!del)
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
