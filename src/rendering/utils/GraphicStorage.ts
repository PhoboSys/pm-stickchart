import { IGraphicStorage } from '..'
import { Container } from '../../lib/pixi'

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

    public init(renderKey: symbol): Container {

        const container = new Container()

        this.add(renderKey, container)

        return container

    }

    public set(renderKey: symbol, container: Container): void {

        const old = this.get(renderKey)
        if (old !== container) {
            this.update(renderKey, container)
        }

    }

    public get(renderKey: symbol): Container {

        return <Container> this.root.getChildAt(this.indexOf(renderKey))

    }

    private exists(renderKey: symbol): boolean {
        return this.indexOf(renderKey) !== -1
    }

    private indexOf(renderKey: symbol): number {
        return this.containers.indexOf(renderKey)
    }

}

