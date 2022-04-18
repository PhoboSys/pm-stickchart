import { ScrollEvent } from './utils.scrollEvent'

const isMouseDown = false
let mouseDownEvent: MouseEvent | null = null

export const addScrollEvent = (element: HTMLElement, handler: (EmittedEvent) => void): void => {
    element.onmousedown = (ev: MouseEvent): void => {
        mouseDownEvent = ev
    }

    element.onmouseup = (): void => {
        mouseDownEvent = null
    }

    element.onmouseleave = (): void => {
        mouseDownEvent = null
    }

    element.onmousemove = (ev): void => {
        if (mouseDownEvent === null) return

        const scrollEvent = new ScrollEvent(
            mouseDownEvent!.clientX,
            mouseDownEvent!.clientY,
            ev!.clientX,
            ev!.clientX
        )

        handler(scrollEvent)
    }
}
