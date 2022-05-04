import { IRenderer, IGraphicStorage } from '..'
import { RenderingContext, DoneFunction } from '..'

import { Container } from '../../lib/pixi'

export abstract class BaseRenderer implements IRenderer {

    private local: { [key: string]: any } = {}

    constructor(
        protected readonly storage: IGraphicStorage,
    ) { }

    public render(
        context: RenderingContext,
        done: DoneFunction,
    ): void {

        const container = this.storage.get(this.rendererId)
        const newcontainer = this.update(context, container)
        if (newcontainer !== container) {
            this.storage.set(this.rendererId, newcontainer)
            this.local = {}
        }

        done()
    }

    protected clear(name?: string): void {

        if (name === undefined) {
            for (const key in this.local) this.clear(key)
        } else if (name in this.local) {
            const [g, state] = this.local[name]

            g.destroy()
            delete this.local[name]
        }

    }

    protected get<T>(name: string, init: () => T): [T, any] {

        const stored = this.local[name]
        if (stored) {
            const [g, state] = stored

            state.new = false

            return [<T>g, state]
        }

        this.local[name] = [init(), { new: true }]

        return this.local[name]

    }

    public abstract get rendererId(): symbol
    protected abstract update(context: RenderingContext, container: Container): Container
}
