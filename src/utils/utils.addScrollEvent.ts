import { ScrollEvent } from '@src/interfaces/interface.scrollEvent'

let isMouseDown = false

export const addScrollEvent = (element: HTMLElement, handler: (event: ScrollEvent) => void): void => {
    element.onmousedown = (): void => {
        isMouseDown = true
    }

    element.onmouseup = (): void => {
        isMouseDown = false
    }

    element.onmousemove = (ev): void => {
        if (!isMouseDown) return

        handler(<ScrollEvent>ev)
    }
}
