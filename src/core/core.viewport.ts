import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'

export class Viewport {
    private renderedKeys: string[] = []

    constructor(
        private container: Container,
    ) { }

    public render(graphics: Graphics, renderKey: string): void {
        const index = this.findGraphicIndex(renderKey)

        if (index === -1) {
            return this.renderNew(graphics, renderKey)
        }

        this.rerenderExisted(graphics, index)
    }

    private renderNew(graphics: Graphics, renderKey: string): void {
        this.container.addChild(graphics)

        this.renderedKeys.push(renderKey)
    }

    private rerenderExisted(graphics: Graphics, renderIndex: number): void {
        const key = this.renderedKeys[renderIndex]

        this.destroy(renderIndex)
        this.renderNew(graphics, key)
    }

    private findGraphicIndex(renderKey: string): number {
        return this.renderedKeys.indexOf(renderKey)
    }

    public destroy(renderIndex: number): void {
        this.container.removeChildAt(renderIndex).destroy()

        this.renderedKeys.splice(renderIndex, 1)
    }

    public destroyByKey(renderKey: string): void {
        this.destroy(this.findGraphicIndex(renderKey))
    }
}
