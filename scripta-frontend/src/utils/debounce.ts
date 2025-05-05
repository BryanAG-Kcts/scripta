export const debounce = (fn: () => void, delay: number) => {
  let timer: NodeJS.Timeout
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

export function caretEnd(element: HTMLElement) {
  element.focus()

  const range = document.createRange()
  const selection = window.getSelection()

  range.selectNodeContents(element)
  range.collapse(false)

  selection?.removeAllRanges()
  selection?.addRange(range)
  element.focus()
}
