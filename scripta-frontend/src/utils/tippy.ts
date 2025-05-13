import type { feedBackText } from '@/hooks/useText/interfaces'
import tippy, { type Instance } from 'tippy.js'

export function createTippy(element: HTMLElement, data: feedBackText[]) {
  tippy(element, {
    allowHTML: true,
    interactive: true,
    appendTo: document.body,
    onCreate: instance => {
      instance.setContent(createTippyContent(instance, data, 0))
    }
  })
}

function createTippyContent(
  instance: Instance,
  data: feedBackText[],
  index: number
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

        <!--
        <div>
          <p>¿Puedes preguntarte?</p>
          <p>${item.question}</p>
        </div>
        !-->
        
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

function updateTippy(instance: Instance, index: number, data: feedBackText[]) {
  instance.setContent(createTippyContent(instance, data, index))
}

function nextTippy(instance: Instance, index: number, data: feedBackText[]) {
  const newIndex = index >= data.length - 1 ? 0 : index + 1
  updateTippy(instance, newIndex, data)
}

function prevTippy(instance: Instance, index: number, data: feedBackText[]) {
  const newIndex = index === 0 ? data.length - 1 : index - 1
  updateTippy(instance, newIndex, data)
}
