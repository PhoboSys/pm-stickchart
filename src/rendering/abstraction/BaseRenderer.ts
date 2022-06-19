import { IRenderer, IGraphicStorage } from '..'
import { RenderingContext, DoneFunction } from '..'

import { Logger } from '@infra'

import { Container } from '@lib/pixi'

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
            Logger.info('clear', name)
            const [g, state] = this.local[name]

            g.destroy()
            state.timeline?.kill()
            delete this.local[name]
        }

    }

    private isEqual(deps1: any[], deps2: any[]): boolean {

        if (deps1.length !== deps2.length) return false

        for (const idx in deps1) {
            const dep1 = deps1[idx]
            const dep2 = deps2[idx]

            if (dep1 !== dep2) return false
        }

        return true
    }

    protected get<T>(
        name: string,
        create: () => T,
        dependencies: any[] = []
    ): [T, any] {

        const stored = this.local[name]
        if (stored) {
            const [g, state, deps] = stored

            if (this.isEqual(deps, dependencies)) {

                state.new = false

                return [<T>g, state]

            } else {
                this.clear(name)
            }
        }

        Logger.info('get new', name)
        this.local[name] = [create(), { new: true }, dependencies]

        return this.local[name]

    }

    public abstract get rendererId(): symbol
    protected abstract update(context: RenderingContext, container: Container): Container
}
