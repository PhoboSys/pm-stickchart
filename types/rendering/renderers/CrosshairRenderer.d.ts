import { RenderingContext, IGraphicStorage } from '..';
import { BaseRenderer } from '..';
import { Container } from '../../lib/pixi';
import { PointermoveEvent } from '@events';
export declare class CrosshairRenderer extends BaseRenderer {
    static readonly CROSSHAIR_ID: symbol;
    private readonly lineStyle;
    private readonly priceCoverStyle;
    private readonly timeCoverStyle;
    private handlePointermoveEvent;
    private handlePointerleaveEvent;
    private _context;
    private _position;
    constructor(storage: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    protected updatePointer(container: Container, event?: PointermoveEvent): void;
    protected updateVertical(container: Container): void;
    protected updateHorizontal(container: Container): void;
    protected clear(name?: string): void;
}
