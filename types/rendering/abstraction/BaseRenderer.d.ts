import { IRenderer, IGraphicStorage } from '..';
import { RenderingContext, DoneFunction } from '..';
import { Container } from '../../lib/pixi';
export declare abstract class BaseRenderer implements IRenderer {
    protected readonly storage: IGraphicStorage;
    private local;
    private stateprefix;
    constructor(storage: IGraphicStorage);
    protected get animations(): any;
    render(context: RenderingContext, done: DoneFunction): void;
    protected rebind(...path: any[]): void;
    protected clear(name?: string): void;
    protected read(name: string): [any, any, any[]];
    protected get<T>(name: string, create: () => T, dependencies?: any[]): [T, any, any[]];
    private isEqual;
    protected animate(name: string, animation: string, vars?: object): void;
    abstract get rendererId(): symbol;
    protected abstract update(context: RenderingContext, container: Container): Container;
}
