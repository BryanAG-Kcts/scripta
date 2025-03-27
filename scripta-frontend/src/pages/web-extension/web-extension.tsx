import { IconBook2, IconCopyCheck, IconSettings } from '@tabler/icons-react'
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
          <CheckItem label='Activar diccionario personal'>
            <IconBook2 stroke={1} />
          </CheckItem>

          <ListItem
            label='w'
            options={[
              {
                label: 'xd',
                value: 'a'
              }
            ]}
          >
            <IconBook2 stroke={1} />
          </ListItem>
        </div>
      </main>
    </div>
  )
}
