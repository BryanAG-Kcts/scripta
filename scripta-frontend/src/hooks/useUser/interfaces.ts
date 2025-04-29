export interface User {
  id: number
  name: string
  email: string
  password: string
}

export interface UserStore {
  user: User | null
  setUser: (user: User) => void
}
