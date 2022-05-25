import { IRenderer, IGraphicStorage } from '..';
import { RenderingContext, DoneFunction } from '..';
import { Container } from '../../lib/pixi';
export declare abstract class BaseRenderer implements IRenderer {
    protected readonly storage: IGraphicStorage;
    private _local;
    private _renderMode?;
    constructor(storage: IGraphicStorage);
    render(context: RenderingContext, done: DoneFunction): void;
    private _update;
    protected clear(name?: string): void;
    private isEqual;
    protected get<T>(name: string, create: () => T, dependencies?: any[]): [T, any];
    abstract get rendererId(): symbol;
    protected onSetMobileRenderMod?(context: RenderingContext, container: Container): void;
    protected onSetNormalRenderMod?(context: RenderingContext, container: Container): void;
    protected onSetRenderMod?(context: RenderingContext, container: Container): void;
    protected abstract update(context: RenderingContext, container: Container): Container;
    protected updateMobile?(context: RenderingContext, container: Container): Container;
}
