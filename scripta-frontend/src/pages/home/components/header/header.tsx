import headerStyles from './styles.module.css'

export function Header() {
  return (
    <header className={headerStyles.header}>
      <div>
        <span />
        <h1>Scripta</h1>
      </div>

      <a href='/'>Registrarse o iniciar sesión</a>
    </header>
  )
}
