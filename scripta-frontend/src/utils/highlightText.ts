import { caretEnd, debounce } from './debounce'

export function highlightText(element: HTMLElement) {
  const text = element.innerText || (element as HTMLTextAreaElement).value
  const words = text.split(' ')
  const highlightedText = words
    .map(word => {
      if (word.length > 4) {
        return `<span class="highlight">${word}</span>`
      }
      return word
    })
    .join(' ')

  return highlightedText
}

export function cleanHighlight(element: HTMLElement) {
  const spans = element.querySelectorAll('span.highlight')
  for (const span of spans) {
    span.replaceWith(span.textContent ?? '')
  }
}

export function editableListener(element: HTMLElement) {
  const debouncedHighlight = debounce(() => {
    cleanHighlight(element)
    element.innerHTML = highlightText(element)
    caretEnd(element)
  }, 1000)

  element.addEventListener('input', debouncedHighlight)
}
