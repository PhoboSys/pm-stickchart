import { IRenderer, IGraphicRenderer } from '..';
import { EChartType } from '../../enums';
export declare class RenderingPipelineFactory {
    private readonly renderer;
    private pipelines;
    constructor(renderer: IGraphicRenderer);
    get(charttype: EChartType): IRenderer;
    private create;
}
