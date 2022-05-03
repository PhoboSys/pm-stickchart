import { RenderingContext, DoneFunction, IGraphicStorage } from '..';
import { BaseRenderer } from '..';
import { MouseleaveEvent } from '../../events/MouseleaveEvent';
import { MousemoveEvent } from '../../events/MousemoveEvent';
import { Container } from '../../lib/pixi';
export declare class CrosshairRenderer extends BaseRenderer {
    static readonly CROSSHAIR_ID: symbol;
    private readonly lineStyle;
    private readonly priceCoverStyle;
    private lastContext;
    private lastEvent;
    constructor(storage: IGraphicStorage);
    get rendererId(): symbol;
    render(context: RenderingContext, done: DoneFunction): void;
    protected handleMouseEvent(event: MousemoveEvent | MouseleaveEvent): void;
    protected update(context: RenderingContext, container: Container): Container;
}
