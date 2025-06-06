import type { feedBackText } from '@/hooks/useText/interfaces'
import { createTippy } from '@/utils/tippy'

function createMirror(element: HTMLElement) {
  const mirror = document.createElement('div')
  mirror.className = 'overlay-mirror'

  const style = window.getComputedStyle(element)
  for (const prop of [
    'font',
    'padding',
    'border',
    'lineHeight',
    'letterSpacing',
    'whiteSpace',
    'wordWrap',
    'boxSizing',
    'textAlign',
    'background'
  ] as const) {
    mirror.style[prop] = style[prop]
  }

  mirror.style.width = `${element.offsetWidth}px`
  mirror.style.height = `${element.offsetHeight}px`
  mirror.style.left = `${element.offsetLeft}px`
  mirror.style.top = `${element.offsetTop}px`

  element.classList.add('overlay-target')
  if (!element.parentElement) {
    return mirror
  }

  element.parentElement.style.position = 'relative'
  element.parentElement.appendChild(mirror)

  element.addEventListener('scroll', () => {
    mirror.scrollTop = element.scrollTop
    mirror.scrollLeft = element.scrollLeft
  })
  return mirror
}

function fusionRange(range: [number, number][]) {
  if (range.length === 0) {
    return []
  }

  range.sort((a, b) => a[0] - b[0])
  const result = [range[0]]

  for (let i = 1; i < range.length; i++) {
    const last = result[result.length - 1]
    const actual = range[i]

    if (actual[0] <= last[1]) {
      last[1] = Math.max(last[1], actual[1])
    } else {
      result.push(actual)
    }
  }

  return result
}

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

const debounce = (fn: () => void, delay: number) => {
  let timer: NodeJS.Timeout
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

function caretEnd(element: HTMLElement) {
  element.focus()

  const range = document.createRange()
  const selection = window.getSelection()

  range.selectNodeContents(element)
  range.collapse(false)

  selection?.removeAllRanges()
  selection?.addRange(range)
  element.focus()
}

async function fetchIa(tone: string, verbosity: string, text: string, words: string[]) {
  try {
    const response = await fetch(
      'https://scripta-backend.vercel.app/ia/consult',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tone,
          verbosity,
          text,
          words
        })
      }
    )
    const data = await response.json()
    return data
  } catch {
    return null
  }
}
chrome.runtime.onMessage.addListener(message => {
  if (message.data.pages.includes(window.location.href)) {
    return
  }

  const waitForInputs = setInterval(() => {
    const inputs = document.querySelectorAll(
      "textarea, input[type='text']"
    ) as NodeListOf<HTMLElement>

    if (inputs.length > 0) {
      const style = document.createElement('style')
      style.innerText = `
    .highlight {
  border-bottom: 1px solid red;
}

.red-underline {
  text-decoration: underline;
  text-decoration-color: red;
  text-decoration-thickness: 2px;
}

.overlay-mirror {
  position: absolute;
  color: transparent;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
  background: transparent !important;
}

.overlay-target {
  position: relative;
  caret-color: white;
  z-index: 1;
}
  .custom-tooltip {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 200px;
  overflow-y: scroll;
}

.custom-tooltip article {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--color-background-200);
  border-radius: 5px;
  padding: 10px;
}

.custom-tooltip article div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.custom-tooltip > div {
  display: flex;
  gap: 10px;
}

.custom-tooltip > div button {
  background: #6721a8;
  padding: 10px 15px;
  flex: 1;
  border-radius: 5px;
  transition: opacity 0.3s;
}

.custom-tooltip > div button:hover {
  opacity: 0.7;
}

.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:"";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}

    `

      document.head.appendChild(style)
      clearInterval(waitForInputs)

      for (const input of inputs) {
        const mirror = createMirror(input)
        const debounced = debounce(async () => {
          cleanHighlight(mirror)
          const data = (
            await fetchIa(
              message.data.config.tone,
              message.data.config.verbosity,
              (input as HTMLInputElement).value,
              message.data.words
            )
          ).output.errors as feedBackText[]

          createTippy(input, data)
          mirror.innerHTML = highlightText(
            input,
            data.map(e => e.position)
          )
        }, 1000)

        input.addEventListener('input', debounced)
      }
    }
  }, 500)
})
