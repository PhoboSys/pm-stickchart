import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import { EChartType } from '../enums';
import { IRenderer } from './LineRenderingPipeline';
export declare type ChartData = {
    [key: number]: number;
};
export declare class RenderingPipelineFactory {
    private readonly renderer;
    private pipelines;
    constructor(renderer: IGraphicStorage);
    get(charttype: EChartType): IRenderer;
    private create;
}
export interface IGraphicStorage {
    render(graphics: Graphics, renderKey: string): void;
}
export declare class GraphicRenderer implements IGraphicStorage {
    private readonly container;
    private rendered;
    constructor(container: Container);
    render(graphics: Graphics, renderKey: string): void;
    private add;
    private update;
    private destroy;
    private exists;
    private indexOf;
}
