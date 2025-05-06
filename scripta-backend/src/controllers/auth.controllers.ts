import type { Request, Response } from 'express'
import { UserModel } from '../models/users.model'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const userModel = new UserModel()

  try {
    const user = await userModel.findByEmail(email)
    console.log(user)
    if (!user) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' })
      return
    }

    const passwordValid = await userModel.verifyPassword(
      password,
      user.password
    )
    if (!passwordValid) {
      res.status(401).json({ success: false, message: 'Contraseña incorrecta' })
      return
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body
  const userModel = new UserModel()

  try {
    const newUser = await userModel.createUser(email, username, password)
    if (!newUser) {
      res
        .status(404)
        .json({ success: false, message: 'No se ha podido crear el usuario' })
      return
    }

    res.status(200).json({
      success: true,
      msg : "El usuario y su configuración han sido creados con exito"
    })
  } catch (error) {
    console.error('Register error:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' })
  }
}
