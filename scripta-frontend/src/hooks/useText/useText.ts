import { create } from 'zustand'
import type { feedBackText, UseText } from './interfaces'

export const useText = create<UseText>(set => ({
  feedBack: [],
  setFeedBack: (feedBack: feedBackText[]) => set({ feedBack })
}))
