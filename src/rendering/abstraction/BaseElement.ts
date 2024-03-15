import { Logger } from '@infra'

import { gsap } from '@lib/pixi'
import { isFunction, isEmpty } from '@lib/utils'

export abstract class BaseElement {

    private local: { [key: string]: any } = {}

    private stateprefix = ''

    protected get animations(): any { return { } }

    protected rebind(...path): void {
        this.stateprefix = !isEmpty(path) ? path.join('>') + '>' : ''
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
                const [item, state] = this.local[name]

                item?.destroy?.()
                state?.timeline?.kill?.()
                delete this.local[name]
            }
        }

    }

    protected read(
        name: string,
    ): [any, any, any[]] {
        const bindname = this.stateprefix + name
        const got = this.local[bindname]

        return got || []
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

                return [<T>g, state, deps]

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
        vars: object = {},
    ): void {

        const config = this.animations[animation]
        if (!config) return

        const got = this.read(name)
        if (isEmpty(got)) return

        const [target, state] = got

        if (state.animation !== animation) {
            state.animation = animation

            if (config.clear) state.timeline?.clear()
            state.timeline = state.timeline || gsap.timeline()

            let method = 'to'
            if (state.new && config.new) method = config.new
            const { clear, new: newConfig, ...pixiConfig } = config
            if (isFunction(state.timeline[method])) state.timeline[method](target, { ...pixiConfig, ...vars })
            else Logger.warn('amination method "%s" unknown', method)
        }

    }
}
