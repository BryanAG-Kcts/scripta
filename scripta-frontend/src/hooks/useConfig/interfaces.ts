export interface UseConfig {
  config?: {
    state: boolean
    tone: string
    stateDictionary: boolean
    verbosity: string
  }
  pages: string[]
  words: string[]
  settingId?: string
  fetchConfig: (userId: string) => Promise<void>
  saveConfig: () => Promise<void>
  setConfig: (config: UseConfig['config']) => void
  setWords: (words: string[]) => void
  setPages: (pages: string[]) => void
}
