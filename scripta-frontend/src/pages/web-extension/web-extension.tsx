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

export function WebExtension() {
  return (
    <div>
      <header className={webExtensionStyles.header}>
        <div>
          <span />
          <p>Scripta</p>
        </div>

        <IconSettings stroke={1} />
      </header>

      <main className={webExtensionStyles.main}>
        <div>
          <p>Configuración para el sitio web actual</p>
          <CheckItem label='Activar Scripta'>
            <IconCopyCheck stroke={1} />
          </CheckItem>
        </div>
        <div>
          <p>Configuración para todos los sitios web</p>

          <ListItem
            label='Tono preferido'
            options={[
              {
                label: 'Formal',
                value: 'formal'
              }
            ]}
          >
            <IconSpeakerphone stroke={1} />
          </ListItem>
          <ListItem
            label='Verbosidad de retroalimentación'
            options={[
              {
                label: 'Detallado',
                value: 'detailed'
              }
            ]}
          >
            <IconMessage2Question stroke={1} />
          </ListItem>

          <CheckItem label='Activar diccionario personal'>
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
        </div>
      </main>
    </div>
  )
}
