import { Container, Graphics } from '../../lib/pixi'

import { IGraphicRenderer } from '..'

export class PixiGraphicRenderer implements IGraphicRenderer {

    private rendered: Array<symbol> = []

    constructor(
        private readonly container: Container,
    ) { }

    public render(
        graphics: Graphics,
        renderKey: symbol
    ):void {

        if (this.exists(renderKey)) {

            this.update(renderKey, graphics)

        } else {

            this.add(renderKey, graphics)

        }

    }

    private add(renderKey: symbol, graphics: Graphics): void {

        this.container.addChild(graphics)
        this.rendered.push(renderKey)
    }

    private update(renderKey: symbol, graphics: Graphics): void {

        this.destroy(renderKey)
        this.add(renderKey, graphics)

    }

    private destroy(renderKey: symbol): void {

        const index = this.indexOf(renderKey)

        this.container.removeChildAt(index).destroy()
        this.rendered.splice(index, 1)

    }

    private exists(renderKey: symbol): boolean {
        return this.indexOf(renderKey) !== -1
    }

    private indexOf(renderKey: symbol): number {
        return this.rendered.indexOf(renderKey)
    }

}

