import { useUser } from '@/hooks/useUser/useUser'
import { Link } from 'wouter'
import headerStyles from './styles.module.css'
import { useEffect } from 'react'

export function Header() {
  const { user, setUser } = useUser()

  useEffect(() => {
    if (!user) {
      const user = JSON.parse(localStorage.getItem('user') || 'null')
      console.log(user)
      setUser(user)
    }
  }, [setUser, user])

  return (
    <header className={headerStyles.header}>
      <div>
        <span />
        <h1>Scripta</h1>
      </div>
      {user ? (
        <p>
          Bienvenido,{' '}
          <Link href='/config'>
            <span>{user.name}</span>
          </Link>
        </p>
      ) : (
        <Link href='/login'>Registrarse o iniciar sesión</Link>
      )}
    </header>
  )
}
