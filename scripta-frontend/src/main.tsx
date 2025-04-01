import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, Switch } from 'wouter'
import { Home } from './pages/home/home'
import { Login } from './pages/login/login'
import { Register } from './pages/register/register'
import { WebExtension } from './pages/web-extension/web-extension'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Switch>
      <Route
        path='/popup'
        component={WebExtension}
      />

      <Route
        path='/'
        component={Home}
      />

      <Route
        path='/register'
        component={Register}
      />

      <Route
        path='/login'
        component={Login}
      />

      <Route>404: No such page!</Route>
    </Switch>
  </StrictMode>
)
