import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, Switch, Router } from 'wouter'
import { Home } from './pages/home/home'
import { Login } from './pages/login/login'
import { Register } from './pages/register/register'
import { Config } from './pages/config/config'
import 'tippy.js/dist/tippy.css'
import './utils/tippy.css'
import { NotFound } from './pages/not-found/not-found'
import { useHashLocation } from 'wouter/use-hash-location'
// import { WebExtension } from './pages/web-extension/web-extension'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Router hook={useHashLocation}>
      <Switch>
        {/* <Route
          path='/'
          component={WebExtension}
        /> */}

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

        <Route
          path='/config'
          component={Config}
        />

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </StrictMode>
)
