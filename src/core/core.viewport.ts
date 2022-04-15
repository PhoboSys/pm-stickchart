import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'

export class Viewport {

    private rendered: string[] = []

    constructor(
        private readonly container: Container,
    ) { }

    public render(
        graphics: Graphics,
        renderKey: string
    ): void {

        if (this.exists(renderKey)) {

            this.update(renderKey, graphics)

        } else {

            this.add(renderKey, graphics)

        }

    }

    private add(renderKey: string, graphics: Graphics): void {

        this.container.addChild(graphics)
        this.rendered.push(renderKey)

    }

    private update(renderKey: string, graphics: Graphics): void {

        this.destroy(renderKey)
        this.add(renderKey, graphics)

    }

    private destroy(renderKey: string): void {

        const index = this.indexOf(renderKey)

        this.container.removeChildAt(index).destroy()
        this.rendered.splice(index, 1)

    }

    private exists(renderKey: string): boolean {
        return this.indexOf(renderKey) !== -1
    }

    private indexOf(renderKey: string): number {
        return this.rendered.indexOf(renderKey)
    }

}
