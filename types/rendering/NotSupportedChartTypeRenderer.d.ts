import { IGraphicStorage, IRenderer } from '.';
export declare class NotSupportedChartTypeRenderer implements IRenderer {
    private readonly renderer;
    constructor(renderer: IGraphicStorage);
    render(data: any): void;
}
