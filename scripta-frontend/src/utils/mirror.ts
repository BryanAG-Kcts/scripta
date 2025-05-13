export function createMirror(element: HTMLElement) {
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

  // const debounced = debounce(async () => {
  //   cleanHighlight(mirror)
  //   console.log(await fetchIa('acádemico', 'alta', 'Hola como estas'))
  //   mirror.innerHTML = highlightText(element)
  // }, 1000)

  // element.addEventListener('input', () => {
  //   debounced()
  // })

  element.addEventListener('scroll', () => {
    mirror.scrollTop = element.scrollTop
    mirror.scrollLeft = element.scrollLeft
  })
  return mirror

  // setInterval(() => {
  //   mirror.innerHTML = highlightText(element)
  // }, 200)
}

export function deleteMirror() {
  const mirrors = document.querySelectorAll('.overlay-mirror')
  for (const mirror of mirrors) {
    mirror.remove()
  }
}
