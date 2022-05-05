import { IGraphicStorage, RenderingContext } from '..';
import { BaseRenderer } from '..';
import { Container } from '../../lib/pixi';
import { DoneFunction } from '../abstraction';
export declare class PriceLineRenderer extends BaseRenderer {
    static readonly PRICE_LINE_ID: symbol;
    private readonly lineStyle;
    private readonly textStyle;
    private anim;
    private context;
    private ticker;
    private xlast;
    private ylast;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    render(context: RenderingContext, done: DoneFunction): void;
    protected update(context: RenderingContext, container: Container): Container;
    private animateLatestLine;
    protected renderLines(context: RenderingContext, container: Container): Container;
}
