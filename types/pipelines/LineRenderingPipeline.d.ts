import { Graphics, LineStyle } from '@pixi/graphics';
import { Rectangle } from '@pixi/math';
import { IGraphicStorage, ChartData } from '.';
declare type RenderingContext = {
    chartdata: ChartData;
    screen: Rectangle;
};
declare type DoneFunction = () => void;
export interface IRenderer {
    render(context: RenderingContext, done?: DoneFunction): void;
}
export declare class GraphicUtils {
    static createLine([x1, y1]: [number, number], [x2, y2]: [number, number], linestyle: LineStyle): Graphics;
    static lineTo(line: Graphics, [x1, y1]: [number, number], linestyle: LineStyle): Graphics;
    static startLine([x1, y1]: [number, number], linestyle: LineStyle): Graphics;
}
export declare abstract class BaseRenderer implements IRenderer {
    protected readonly renderer: IGraphicStorage;
    constructor(renderer: IGraphicStorage);
    render(context: RenderingContext, done: DoneFunction): void;
    abstract get rendererId(): string;
    protected abstract create(context: RenderingContext): Graphics;
}
export declare class PriceLineRenderer extends BaseRenderer {
    static readonly PRICE_LINE_ID: string;
    private readonly lineStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): string;
    private convert;
    protected create(context: RenderingContext): Graphics;
}
export declare class GridRenderer implements IRenderer {
    private readonly renderer;
    private readonly compositor;
    constructor(renderer: IGraphicStorage);
    render(context: RenderingContext, next: DoneFunction): void;
}
export declare class VerticalGridRenderer extends BaseRenderer {
    static readonly VERTICAL_GRID_ID: string;
    private readonly lineStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): string;
    protected create(context: RenderingContext): Graphics;
}
export declare class HorizontalGridRenderer extends BaseRenderer {
    static readonly HORIZONTAL_GRID_ID: string;
    private readonly lineStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): string;
    protected create(context: RenderingContext): Graphics;
}
export declare class LineChartRenderer implements IRenderer {
    private readonly renderer;
    private readonly compositor;
    constructor(renderer: IGraphicStorage);
    render(context: RenderingContext, done?: DoneFunction): void;
}
export declare class RenderingCompositor {
    private readonly renderers;
    constructor(renderers: Array<IRenderer>);
    use(renderer: IRenderer): void;
    compose(context: RenderingContext, next?: DoneFunction): DoneFunction;
    private create;
}
export {};
