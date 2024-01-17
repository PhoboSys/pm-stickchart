import { IRenderer, IGraphicStorage } from '@rendering'
import { RenderingContext, DoneFunction } from '@rendering'

import cfg from '@config'

import { Logger } from '@infra'

import { Container } from '@lib/pixi'

import { BaseElement } from './BaseElement'

export abstract class BaseRenderer extends BaseElement implements IRenderer {

    constructor(
        protected readonly storage: IGraphicStorage
    ) {
        super()
    }

    public render(
        context: RenderingContext,
        done: DoneFunction,
    ): void {

        const start = Date.now()

        const container = this.storage.get(this.rendererId)
        const newcontainer = this.update(context, container)
        if (newcontainer !== container) {
            this.storage.set(this.rendererId, newcontainer)
            this.rebind()
            this.clear()
        }

        const took = Date.now() - start
        if (took > cfg.performance.renderMs) Logger.warn('[Violation] Render took ' + took + 'ms', this.rendererId)

        done()
    }

    public abstract get rendererId(): symbol
    protected abstract update(context: RenderingContext, container: Container): Container
}
