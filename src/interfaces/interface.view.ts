import { Viewport } from '../core/core.viewport'

export interface IView<T> {
    readonly viewport: Viewport

    readonly state: T

    render(): void
}
