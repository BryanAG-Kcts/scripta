import { create } from 'zustand'
import type { UserStore } from './interfaces'

export const useUser = create<UserStore>(set => ({
  user: null,
  setUser: user => set({ user })
}))
