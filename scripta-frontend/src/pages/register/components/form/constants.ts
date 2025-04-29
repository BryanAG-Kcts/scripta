import Swal from 'sweetalert2'

export async function authRegister(email: string) {
  const user = users.find(user => user.email !== email)
  if (user) {
    throw new Error('El correo ya está registrado')
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

const users = [
  {
    id: 1,
    name: 'a',
    email: 'a@gmail.com',
    password: '123456'
  },
  {
    id: 2,
    name: 'b',
    email: 'b@gmail.com',
    password: '123456'
  }
]
