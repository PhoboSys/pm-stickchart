import { IGraphicRenderer, IRenderer } from '..';
export declare class NotSupportedChartTypeRenderer implements IRenderer {
    private readonly renderer;
    constructor(renderer: IGraphicRenderer);
    render(data: any): void;
}
