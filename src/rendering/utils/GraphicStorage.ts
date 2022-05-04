import { Container } from '../../lib/pixi'

import { IGraphicStorage } from '..'

export class GraphicStorage implements IGraphicStorage {

    private containers: Array<symbol> = []

    constructor(
        private readonly root: Container,
    ) { }

    private add(renderKey: symbol, container: Container): void {

        this.root.addChild(container)
        this.containers.push(renderKey)

    }

    private update(renderKey: symbol, container: Container): void {

        const index = this.indexOf(renderKey)

        const old = this.root.getChildAt(index)
        old.destroy()

        this.root.addChildAt(container, index)
    }

    public set(renderKey: symbol, container: Container): void {

        const old = this.get(renderKey)
        if (old !== container) {
            this.update(renderKey, container)
        }

    }

    public get(renderKey: symbol): Container {

        if (!this.exists(renderKey)) {
            this.add(renderKey, new Container())
        }

        return <Container>this.root.getChildAt(this.indexOf(renderKey))

    }

    private exists(renderKey: symbol): boolean {
        return this.indexOf(renderKey) !== -1
    }

    private indexOf(renderKey: symbol): number {
        return this.containers.indexOf(renderKey)
    }

}

