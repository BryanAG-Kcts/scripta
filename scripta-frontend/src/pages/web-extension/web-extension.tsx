import {
  IconBook2,
  IconCopyCheck,
  IconExternalLink,
  IconMessage2Question,
  IconSettings,
  IconSpeakerphone
} from '@tabler/icons-react'
import { CheckItem } from './components/check-item/check-item'
import { ListItem } from './components/list-item/list-item'
import webExtensionStyles from './styles.module.css'
import { useConfig } from '@/hooks/useConfig/useConfig'
import { type FormEvent, useEffect, useState } from 'react'
import { Link } from 'wouter'
import { useUser } from '@/hooks/useUser/useUser'
import globalStyles from '@/index.module.css'
import formStyles from '../login/components/form/styles.module.css'
import { PasswordInput } from '@/components/password-input/password-input'
import type { User } from '@/hooks/useUser/interfaces'
import { authLogin } from '../login/components/form/constants'
import { createMirror, deleteMirror } from '@/utils/mirror'
import { debounce } from '@/utils/debounce'
import { cleanHighlight, highlightText } from '@/utils/highlightText'
import { fetchIa } from '@/utils/fetchIa'
import type { feedBackText } from '@/hooks/useText/interfaces'
import { useText } from '@/hooks/useText/useText'

export function WebExtension() {
  const { fetchConfig, setConfig, saveConfig, config } = useConfig()
  const { setUser, user } = useUser()
  const { setFeedBack } = useText()
  const [a, setA] = useState(0)

  useEffect(() => {
    ;(async () => {
      const user = JSON.parse(window.localStorage.getItem('user') || 'null')

      if (user) {
        setUser(user)
        await fetchConfig(`${user.id}`)
      }
    })()
  }, [fetchConfig, setUser])

  useEffect(() => {
    ;(async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      })

      chrome.runtime.sendMessage({
        action: 'enviarAlContentScript',
        tabId: tab.id,
        data: config
      })
    })()
  }, [config])

  useEffect(() => {
    const events: EventListener[] = []
    ;(async () => {
      if (!config) {
        return
      }

      const inputs = document.querySelectorAll(
        "textarea, input[type='text']"
      ) as NodeListOf<HTMLElement>

      setA(inputs.length)

      for (const input of inputs) {
        const mirror = createMirror(input)
        const debounced = debounce(async () => {
          cleanHighlight(mirror)
          const data = (
            await fetchIa(
              config.tone,
              config.verbosity,
              (input as HTMLInputElement).value
            )
          ).output.errors as feedBackText[]

          setFeedBack(data)
          mirror.innerHTML = highlightText(
            input,
            data.map(e => e.position)
          )
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
  }, [config, setFeedBack])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const { password, email } = Object.fromEntries(formData) as {
      password: string
      email: string
    }

    const [status, user] = await authLogin(email, password)
    if (!(status && user)) {
      return
    }

    setUser(user as User)
    localStorage.setItem('user', JSON.stringify(user))
  }

  if (!(user && config)) {
    return (
      <form
        onSubmit={handleSubmit}
        className={`${formStyles.form} min-w-md`}
      >
        <p>Autentícate</p>

        <input
          className={globalStyles.textInput}
          type='email'
          placeholder='Correo electrónico'
          name='email'
        />
        <PasswordInput
          name='password'
          placeholder='Contraseña'
        />

        <button
          type='submit'
          className={globalStyles.formButton}
        >
          Inicia sesión
        </button>
      </form>
    )
  }

  return (
    <div className='min-w-md'>
      <header className={webExtensionStyles.header}>
        <div>
          <span />
          <p>Scripta</p>
        </div>

        <Link href='config'>
          <IconSettings stroke={1} />
        </Link>
      </header>

      <main className={webExtensionStyles.main}>
        <div>
          <p>Configuración para el sitio web actual</p>
          <CheckItem
            label='Activar Scripta'
            state={config.state}
            setState={newState => {
              const newConfig = { ...config, state: newState }
              setConfig(newConfig)
            }}
          >
            <IconCopyCheck stroke={1} />
          </CheckItem>
        </div>
        <div>
          <p>Configuración para todos los sitios web</p>

          <ListItem
            label='Tono preferido'
            options={['informal', 'académico', 'formal']}
            defaultValue={config.tone}
            saveItem={newItem => {
              const newConfig = { ...config, tone: newItem }
              setConfig(newConfig)
            }}
          >
            <IconSpeakerphone stroke={1} />
          </ListItem>
          <ListItem
            label='Verbosidad de retroalimentación'
            options={['baja', 'media', 'alta']}
            defaultValue={config.verbosity}
            saveItem={newItem => {
              const newConfig = { ...config, verbosity: newItem }
              setConfig(newConfig)
            }}
          >
            <IconMessage2Question stroke={1} />
          </ListItem>

          <CheckItem
            label='Activar diccionario personal'
            state={config.stateDictionary}
            setState={newState => {
              const newConfig = { ...config, stateDictionary: newState }
              setConfig(newConfig)
            }}
          >
            <IconBook2 stroke={1} />
          </CheckItem>
        </div>

        <div>
          <a
            href='/'
            className={webExtensionStyles.externalEditor}
          >
            <p>Abrir editor en linea</p>
            <IconExternalLink stroke={1} />
          </a>

          <button
            type='button'
            className={globalStyles.formButton}
            onClick={saveConfig}
          >
            Guardar configuración
          </button>
        </div>
      </main>

      {a}
    </div>
  )
}
