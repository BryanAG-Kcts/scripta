import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { WebExtension } from './pages/web-extension/web-extension'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <WebExtension />
  </StrictMode>
)
