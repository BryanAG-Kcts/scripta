import { caretEnd, debounce } from './debounce'
import { fusionRange } from './fusionRange'

export function highlightText(
  element: HTMLElement,
  positions: [number, number][]
) {
  const text = element.innerText || (element as HTMLTextAreaElement).value
  const pos = fusionRange(positions)

  let highlightedText = ''
  let lastIndex = 0

  for (const [start, end] of pos) {
    highlightedText += text.slice(lastIndex, start)
    highlightedText += `<span class="highlight">${text.slice(start, end)}</span>`
    lastIndex = end
  }

  highlightedText += text.slice(lastIndex)
  return highlightedText
}

export function cleanHighlight(element: HTMLElement) {
  const spans = element.querySelectorAll('span.highlight')
  for (const span of spans) {
    span.replaceWith(span.textContent ?? '')
  }
}

export function editableListener(
  element: HTMLElement,
  position: [number, number][]
) {
  const debouncedHighlight = debounce(() => {
    cleanHighlight(element)
    element.innerHTML = highlightText(element, position)
    caretEnd(element)
  }, 1000)

  element.addEventListener('input', debouncedHighlight)
}
