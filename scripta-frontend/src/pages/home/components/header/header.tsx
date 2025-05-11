import { useUser } from '@/hooks/useUser/useUser'
import { Link } from 'wouter'
import headerStyles from './styles.module.css'

export function Header() {
  const { user } = useUser()
  return (
    <header className={headerStyles.header}>
      <div>
        <span />
        <h1>Scripta</h1>
      </div>
      {user ? (
        <p>
          Bienvenido, <span>{user.name}</span>
        </p>
      ) : (
        <Link href='/login'>Registrarse o iniciar sesión</Link>
      )}
    </header>
  )
}
