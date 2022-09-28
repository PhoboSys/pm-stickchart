import { IRenderer, IGraphicStorage } from '..'
import { RenderingContext, DoneFunction } from '..'

import { Logger } from '../../infra'

import { Container, gsap } from '../../lib/pixi'
import { isFunction } from '../../lib/utils'

export abstract class BaseRenderer implements IRenderer {

    private local: { [key: string]: any } = {}
    private stateprefix: string = ''

    constructor(
        protected readonly storage: IGraphicStorage,
    ) { }

    protected get animations(): any { return { } }

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

    protected rebind(...path): void {
        this.stateprefix = (path || []).join('>')
    }

    protected clear(name?: string): void {

        if (name === undefined) {
            for (const key in this.local) {
                if (key.indexOf(this.stateprefix) === 0) {
                    this.clear(key.substr(this.stateprefix.length))
                }
            }
        } else {
            name = this.stateprefix + name
            if (name in this.local) {
                Logger.info('clear', name)
                const [g, state] = this.local[name]

                g.destroy()
                state.timeline?.kill()
                delete this.local[name]
            }
        }

    }

    protected get<T>(
        name: string,
        create: () => T,
        dependencies: any[] = []
    ): [T, any, any[]] {
        const bindname = this.stateprefix + name

        const stored = this.local[bindname]
        if (stored) {
            const [g, state, deps] = stored

            if (this.isEqual(deps, dependencies)) {

                state.new = false
                return [<T>g, state, dependencies]

            } else {

                this.clear(name)

            }
        }

        Logger.info('get new', bindname)
        this.local[bindname] = [create(), { new: true }, dependencies]

        return this.local[bindname]

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

    protected animate(
        name: string,
        animation: string,
        method: string = 'to',
    ): void {

        const config = this.animations[animation]
        if (!config) return

        const bindname = this.stateprefix + name
        const got = this.local[bindname]
        if (!got) return

        const [target, state] = got

        if (state.animation !== animation) {
            state.animation = animation

            if (config.clear) state.timeline?.clear()
            state.timeline = state.timeline || gsap.timeline()
            if (isFunction(state.timeline[method])) state.timeline[method](target, { ...config })
            else Logger.warn('amination method "%s" unknown', method)
        }

    }

    public abstract get rendererId(): symbol
    protected abstract update(context: RenderingContext, container: Container): Container
}
