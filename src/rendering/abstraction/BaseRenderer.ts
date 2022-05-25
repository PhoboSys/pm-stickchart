import { IRenderer, IGraphicStorage } from '..'
import { RenderingContext, DoneFunction } from '..'

import { Logger } from '../../infra'

import { Container } from '../../lib/pixi'
import { ERenderMode } from '../../enums/ERenderMode'

export abstract class BaseRenderer implements IRenderer {

    private _local: { [key: string]: any } = {}

    private _renderMode?: ERenderMode

    constructor(
        protected readonly storage: IGraphicStorage,
    ) { }

    public render(
        context: RenderingContext,
        done: DoneFunction,
    ): void {

        const container = this.storage.get(this.rendererId)
        const newcontainer = this._update(context, container)
        if (newcontainer !== container) {
            this.storage.set(this.rendererId, newcontainer)
            this._local = {}
        }

        this._renderMode = context.renderMode

        done()
    }

    private _update(context: RenderingContext, container: Container): Container {
        const hasModeChanged = this._renderMode?.isEqual(context.renderMode)
        if (hasModeChanged) this.onSetRenderMod?.(context, container)

        return context.renderMode.when({
            MOBILE: () => {

                if (hasModeChanged) {
                    this.onSetMobileRenderMod?.(context, container)
                }

                return this.updateMobile?.(context, container) ?? this.update(context, container)
            },
            NORMAL: () => {
                if (hasModeChanged) {
                    this.onSetNormalRenderMod?.(context, container)
                }

                return this.update(context, container)
            },
        })
    }

    protected clear(name?: string): void {

        if (name === undefined) {
            for (const key in this._local) this.clear(key)
        } else if (name in this._local) {
            Logger.info('clear', name)
            const [g, state] = this._local[name]

            g.destroy()
            state.timeline?.kill()
            delete this._local[name]
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

        const stored = this._local[name]
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
        this._local[name] = [create(), { new: true }, dependencies]

        return this._local[name]

    }

    public abstract get rendererId(): symbol

    protected onSetMobileRenderMod?(context: RenderingContext, container: Container): void
    protected onSetNormalRenderMod?(context: RenderingContext, container: Container): void
    protected onSetRenderMod?(context: RenderingContext, container: Container): void

    protected abstract update(context: RenderingContext, container: Container): Container
    protected updateMobile?(context: RenderingContext, container: Container): Container
}
