import { EChartType } from '../../enums';
import { IRenderer, IGraphicRenderer } from '..';
export declare class RenderingPipelineFactory {
    private readonly renderer;
    private pipelines;
    constructor(renderer: IGraphicRenderer);
    get(charttype: EChartType): IRenderer;
    private create;
}
