import Swal from 'sweetalert2'

export async function authRegister(
  email: string,
  password: string,
  username: string
) {
  try {
    const response = await fetch('https://scripta-backend.vercel.app/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, username })
    })

    if (!response.ok) {
      Swal.fire({
        title: 'Error',
        text: 'Error al crear la cuenta',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        position: 'top',
        timer: 1500,
        showConfirmButton: false,
        theme: 'auto'
      })

      return false
    }

    return true
  } catch {
    return false
  }
}

export function passwordValidator(password: string, confirmPassword: string) {
  if (password !== confirmPassword) {
    Swal.fire({
      title: 'Error',
      text: 'Las contraseñas no coinciden',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      position: 'top',
      timer: 1500,
      showConfirmButton: false,
      theme: 'auto'
    })
  }

  return password === confirmPassword
}
