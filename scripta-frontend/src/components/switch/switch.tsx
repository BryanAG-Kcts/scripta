import switchStyles from './styles.module.css'

interface Props {
  state: boolean
  setState: (state: boolean) => void
}
export function Switch({ setState, state }: Props) {
  function handleSwitch() {
    setState(!state)
  }

  return (
    <label className={switchStyles.switchContainer}>
      <div className={switchStyles.switch}>
        <span className={switchStyles.option} />
        <span className='opacity-0' />
      </div>
      <input
        type='checkbox'
        checked={state}
        onChange={handleSwitch}
      />
    </label>
  )
}
