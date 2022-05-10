import { RenderingContext, IGraphicStorage } from '..';
import { BaseRenderer } from '..';
import { MouseleaveEvent } from '../../events/MouseleaveEvent';
import { MousemoveEvent } from '../../events/MousemoveEvent';
import { Container } from '../../lib/pixi';
export declare class CrosshairRenderer extends BaseRenderer {
    static readonly CROSSHAIR_ID: symbol;
    private readonly lineStyle;
    private readonly priceCoverStyle;
    private _context;
    private eventTarget;
    constructor(storage: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    private handleMouseleaveEvent;
    private handleMousemoveEvent;
    protected updatePointer(container: Container, mouseEvent: MouseleaveEvent | MousemoveEvent): void;
}
