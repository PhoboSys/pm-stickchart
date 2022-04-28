import { EChartType } from '../enums';
import { IRenderer, IGraphicStorage } from '.';
export declare class RenderingPipelineFactory {
    private readonly renderer;
    private pipelines;
    constructor(renderer: IGraphicStorage);
    get(charttype: EChartType): IRenderer;
    private create;
}
