import {
  IconCopyCheck,
  IconMessage,
  IconNotebook,
  IconNotebookOff,
  IconSpeakerphone,
  IconStar
} from '@tabler/icons-react'
import { ConfigSwitch } from './components/config-switch/config-switch'
import configStyles from './styles.module.css'
import { useConfig } from '@/hooks/useConfig/useConfig'
import { useEffect } from 'react'
import { useUser } from '@/hooks/useUser/useUser'
import Swal from 'sweetalert2'
import { useLocation } from 'wouter'
import { ConfigList } from './components/config-list/config-list'
import { ConfigSelect } from './components/config-select/config-select'
import globalStyles from '@/index.module.css'

export function Config() {
  const {
    fetchConfig,
    config,
    setConfig,
    words,
    setWords,
    pages,
    setPages,
    saveConfig
  } = useConfig()
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

      setLocation('/login')
    })()
  }, [fetchConfig, setLocation, setUser])

  if (!(user && config)) {
    return <></>
  }

  return (
    <div className={configStyles.config}>
      <section>
        <h1>Configuración</h1>

        <div>
          <h2>Configuración global</h2>
          <ConfigSwitch
            title='Activar Scripta'
            desc='Activar o desactivar Scripta para todas las páginas'
            fnState={newState => {
              const newConfig = { ...config, state: newState }
              setConfig(newConfig)
            }}
            state={config.state}
          >
            <IconCopyCheck stroke={1} />
          </ConfigSwitch>

          <ConfigList
            title='Páginas activas'
            desc='Activar o desactivar Scripta para páginas especificas'
            list={pages}
            saveList={setPages}
          >
            <IconStar stroke={1} />
          </ConfigList>

          <ConfigSelect
            title='Tono preferido'
            desc='Elige el tono preferido en el que quieres expresarte'
            list={['informal', 'académico', 'formal']}
            defaultValue={config.tone}
            saveItem={newItem => {
              const newConfig = { ...config, tone: newItem }
              setConfig(newConfig)
            }}
          >
            <IconSpeakerphone stroke={1} />
          </ConfigSelect>

          <ConfigSelect
            title='Verbosidad'
            desc='Elige la cantidad de texto a mostrar para cada explicación'
            list={['baja', 'media', 'alta']}
            defaultValue={config.verbosity}
            saveItem={newItem => {
              const newConfig = { ...config, verbosity: newItem }
              setConfig(newConfig)
            }}
          >
            <IconMessage stroke={1} />
          </ConfigSelect>
        </div>

        <div>
          <h2>Diccionario personal</h2>
          <ConfigSwitch
            title='Activar diccionario personal'
            desc='Activar o desactivar tu diccionario personal para dominios específicos'
            fnState={newState => {
              const newConfig = { ...config, stateDictionary: newState }
              setConfig(newConfig)
            }}
            state={config.stateDictionary}
          >
            <IconNotebookOff stroke={1} />
          </ConfigSwitch>

          <ConfigList
            title='Diccionario personal'
            desc='Agrega palabras a tu diccionario personal'
            list={words}
            saveList={setWords}
          >
            <IconNotebook stroke={1} />
          </ConfigList>
        </div>
      </section>

      <button
        type='button'
        className={globalStyles.formButton}
        onClick={saveConfig}
      >
        Guardar configuración
      </button>
    </div>
  )
}
