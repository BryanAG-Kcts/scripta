import type { User } from '@/hooks/useUser/interfaces'
import Swal from 'sweetalert2'

export async function authLogin(email: string, password: string) {
  try {
    const response = await fetch(
      'https://scripta-backend.vercel.app/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }
    )

    const rawUser = (await response.json()).data
    return [
      true,
      {
        id: rawUser.id,
        email: rawUser.email,
        name: rawUser.name,
        password: rawUser.password
      }
    ] as [boolean, User]
  } catch {
    Swal.fire({
      title: 'Error',
      text: 'Error al login la cuenta',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      position: 'top',
      timer: 1500,
      showConfirmButton: false,
      theme: 'auto'
    })

    return [false]
  }
}
