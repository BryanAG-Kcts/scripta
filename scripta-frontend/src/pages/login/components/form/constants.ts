import Swal from 'sweetalert2'

export async function authLogin(email: string, password: string) {
  try {
    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
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

    return [true, await response.json()]
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
