import { IGraphicStorage } from '.';
import { IRenderer } from './LineRenderingPipeline';
export declare class NotSupportedRenderingPipeline implements IRenderer {
    private readonly renderer;
    constructor(renderer: IGraphicStorage);
    render(data: any): void;
}
