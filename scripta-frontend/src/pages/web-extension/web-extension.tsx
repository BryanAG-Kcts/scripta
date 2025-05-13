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
import { useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { useUser } from '@/hooks/useUser/useUser'
import Swal from 'sweetalert2'
import globalStyles from '@/index.module.css'

export function WebExtension() {
  const { fetchConfig, config, setConfig, saveConfig } = useConfig()
  const [, setLocation] = useLocation()
  const { setUser, user } = useUser()

  useEffect(() => {
    ;(async () => {
      const user = JSON.parse(window.localStorage.getItem('user') || 'null')

      if (user) {
        setUser(user)
        await fetchConfig(`${user.id}`)
        return
      }

      await Swal.fire({
        title: 'Error',
        text: 'No se pudo cargar la configuración',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        theme: 'dark'
      })

      if (user) {
        setLocation('/login')
      }
    })()
  }, [fetchConfig, setLocation, setUser])

  if (!(user && config)) {
    return <></>
  }

  return (
    <div>
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
    </div>
  )
}
