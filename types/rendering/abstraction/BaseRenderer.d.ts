import { IRenderer, IGraphicStorage } from '..';
import { RenderingContext, DoneFunction } from '..';
import { Container } from '../../lib/pixi';
export declare abstract class BaseRenderer implements IRenderer {
    protected readonly storage: IGraphicStorage;
    private local;
    constructor(storage: IGraphicStorage);
    render(context: RenderingContext, done: DoneFunction): void;
    protected clear(name?: string): void;
    protected get<T>(name: string): [T, any];
    protected use<T>(name: string, init: () => T): [T, any];
    abstract get rendererId(): symbol;
    protected abstract update(context: RenderingContext, container: Container): Container;
}
