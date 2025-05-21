import { create } from 'zustand'
import type { UseConfig } from './interfaces'
import Swal from 'sweetalert2'

export const useConfig = create<UseConfig>((set, get) => ({
  config: undefined,
  pages: [],
  words: [],
  settingId: undefined,
  fetchConfig: async (userId: string) => {
    try {
      const response = await fetch(
        `https://scripta-backend.vercel.app/config/${userId}`
      )
      const { data } = await response.json()
      set({
        config: data.config,
        pages: data.pages,
        words: data.dictionary,
        settingId: data.idSetting
      })
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo cargar la configuración',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  },
  saveConfig: async () => {
    const { config, pages, words, settingId } = get()
    const response = await Promise.all([
      fetch('https://scripta-backend.vercel.app/config/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          settingId,
          ...config
        })
      }),
      fetch('https://scripta-backend.vercel.app/config/update-pages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          settingId,
          arrayDomains: pages
        })
      }),
      fetch('https://scripta-backend.vercel.app/config/update-dictionary', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          settingId,
          dictionary: words
        })
      })
    ])

    if (response.every(res => res.ok)) {
      Swal.fire({
        title: 'Éxito',
        text: 'Configuración guardada',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo guardar la configuración',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  },
  setConfig: config => {
    set({ config })
  },
  setWords: words => {
    set({ words })
  },
  setPages: pages => {
    set({ pages })
  }
}))
