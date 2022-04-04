import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'

type RenderedIndexMap = { [key: string]: number }

export class Viewport {
    private renderIndexMap: RenderedIndexMap = {}

    constructor(
        public container: Container,
    ) { }

    public render(graphics: Graphics): void {
        this.container.addChild(graphics)
    }

    public renderWithKey(graphics: Graphics, renderKey: string): void {
        this.renderIndexMap[renderKey] = this.container.children.length

        this.render(graphics)
    }

    public removeByKey(renderKey: string): void {
        this.container.removeChildAt(this.renderIndexMap[renderKey])
    }
}
