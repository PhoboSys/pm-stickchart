import { IGraphicStorage, IRenderer } from '@rendering';
export declare class NotSupportedChartTypeRenderer implements IRenderer {
    private readonly renderer;
    constructor(renderer: IGraphicStorage);
    render(data: any): void;
}
