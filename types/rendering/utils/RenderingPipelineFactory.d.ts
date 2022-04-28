<<<<<<< HEAD
import { IRenderer, IGraphicStorage } from '..';
import { EChartType } from '../../enums/EChartType';
export declare class RenderingPipelineFactory {
    private readonly renderer;
    private pipelines;
    constructor(renderer: IGraphicStorage);
=======
import { IRenderer, IGraphicRenderer } from '..';
import { EChartType } from '../../enums';
export declare class RenderingPipelineFactory {
    private readonly renderer;
    private pipelines;
    constructor(renderer: IGraphicRenderer);
>>>>>>> e25cbca (build project)
    get(charttype: EChartType): IRenderer;
    private create;
}
