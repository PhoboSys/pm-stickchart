import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'

export class Viewport {
    private renderedKeys: string[] = []

    constructor(
        public container: Container,
    ) { }

    public keyRender(graphics: Graphics, renderKey: string): void {
        const index = this.findGraphicIndex(renderKey)

        if (index === -1) {
            return this.renderInexisted(graphics, renderKey)
        }

        this.rerenderExisted(graphics, index)
    }

    private renderInexisted(graphics: Graphics, renderKey: string): void {
        this.container.addChild(graphics)

        this.renderedKeys.push(renderKey)
    }

    private rerenderExisted(graphics: Graphics, renderIndex: number): void {
        const key = this.renderedKeys[renderIndex]

        this.removeByIndex(renderIndex)
        this.renderInexisted(graphics, key)
    }

    private findGraphicIndex(renderKey: string): number {
        return this.renderedKeys.indexOf(renderKey)
    }

    public removeByIndex(renderIndex: number): void {
        this.container.removeChildAt(renderIndex)

        this.renderedKeys.splice(renderIndex, 1)
    }

    public removeByKey(renderKey: string): void {
        this.removeByIndex(this.findGraphicIndex(renderKey))
    }
}
