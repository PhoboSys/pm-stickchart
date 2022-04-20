import { IGraphicRenderer } from '.';
import { IRenderer } from './LineRenderingPipeline';
export declare class NotSupportedRenderingPipeline implements IRenderer {
    private readonly renderer;
    constructor(renderer: IGraphicRenderer);
    render(data: any): void;
}
