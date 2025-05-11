import tippy, { type Instance } from 'tippy.js'

interface TooltipData {
  category: string
  data: string
  question: string
  explanation: string
  position: [number, number]
}

const defaultData: TooltipData[] = [
  {
    category: '1',
    data: '1',
    question: '1',
    explanation: '1',
    position: [0, 0]
  },
  {
    category: '2',
    data: '2',
    question: '2',
    explanation: '2',
    position: [0, 0]
  },
  {
    category: '3',
    data: '3',
    question: '3',
    explanation: '3',
    position: [0, 0]
  }
]

export function createTippy(element: HTMLElement) {
  tippy(element, {
    allowHTML: true,
    interactive: true,
    appendTo: document.body,
    onCreate: instance => {
      instance.setContent(createTippyContent(instance, defaultData))
    }
  })
}

function createTippyContent(
  instance: Instance,
  data: TooltipData[],
  index = 0
) {
  const item = data[index]
  const content = /*html*/ `
    <p>${item.category}</p>
    <article>
        <div>
          <p>Tu error</p>
          <p>${item.data}</p>
        </div>

        <div>
          <p>Explicación</p>
          <p>${item.explanation}</p>
        </div>

        <div>
          <p>¿Puedes preguntarte?</p>
          <p>${item.question}</p>
        </div>
    </article>

    <div>
        <button class="cursor-pointer btn1">Anterior</button>
        <button class="cursor-pointer btn2">Siguiente</button>
    </div>
  `

  const div = document.createElement('div')
  div.classList.add('custom-tooltip')
  div.innerHTML = content

  div.querySelector('.btn1')?.addEventListener('click', () => {
    prevTippy(instance, index, data)
  })
  div.querySelector('.btn2')?.addEventListener('click', () => {
    nextTippy(instance, index, data)
  })

  return div
}

function updateTippy(instance: Instance, index: number) {
  instance.setContent(createTippyContent(instance, defaultData, index))
}

function nextTippy(instance: Instance, index: number, data: TooltipData[]) {
  const newIndex = index >= data.length - 1 ? 0 : index + 1
  updateTippy(instance, newIndex)
}

function prevTippy(instance: Instance, index: number, data: TooltipData[]) {
  const newIndex = index === 0 ? data.length - 1 : index - 1
  updateTippy(instance, newIndex)
}
