import { IRenderer, IGraphicStorage } from '@rendering';
import { EChartType } from '@enums';
export declare class RenderingPipelineFactory {
    private readonly renderer;
    private pipelines;
    constructor(renderer: IGraphicStorage);
    get(charttype: EChartType): IRenderer;
    private create;
}
