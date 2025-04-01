import globalStyles from '@/index.module.css'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import { useState } from 'react'
import passwordInputStyles from './styles.module.css'
interface Props {
  placeholder: string
  name: string
}
export function PasswordInput({ name, placeholder }: Props) {
  const [inputVisible, setInputVisible] = useState(false)
  const Icon = inputVisible ? IconEye : IconEyeClosed
  const inputType = inputVisible ? 'text' : 'password'

  function toggleInputVisibility() {
    setInputVisible(!inputVisible)
  }

  return (
    <div className={passwordInputStyles.passwordInput}>
      <input
        className={globalStyles.textInput}
        type={inputType}
        placeholder={placeholder}
        name={name}
      />

      <button
        type='button'
        onClick={toggleInputVisibility}
      >
        <Icon stroke={1} />
      </button>
    </div>
  )
}
