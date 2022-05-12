import { RenderingContext, IGraphicStorage } from '..';
import { BaseRenderer } from '..';
import { PointermoveEvent } from '../../events';
import { Container } from '../../lib/pixi';
export declare class CrosshairRenderer extends BaseRenderer {
    static readonly CROSSHAIR_ID: symbol;
    private readonly lineStyle;
    private readonly priceCoverStyle;
    private handlePointermoveEvent;
    private handlePointerleaveEvent;
    private _context;
    constructor(storage: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    protected updatePointer(container: Container, mouseEvent: PointermoveEvent): void;
}
