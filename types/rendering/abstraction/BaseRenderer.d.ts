import { IRenderer, IGraphicStorage } from '@rendering';
import { RenderingContext, DoneFunction } from '@rendering';
import { Container } from '../../lib/pixi';
import { BaseElement } from './BaseElement';
export declare abstract class BaseRenderer extends BaseElement implements IRenderer {
    protected readonly storage: IGraphicStorage;
    constructor(storage: IGraphicStorage);
    render(context: RenderingContext, done: DoneFunction): void;
    abstract get rendererId(): symbol;
    protected abstract update(context: RenderingContext, container: Container): Container;
}
