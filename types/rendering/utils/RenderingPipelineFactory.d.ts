import { IRenderer, IGraphicStorage } from '..';
import { EChartType } from '@enums';
export declare class RenderingPipelineFactory {
    private readonly renderer;
    private pipelines;
    constructor(renderer: IGraphicStorage);
    get(charttype: EChartType): IRenderer;
    private create;
}
