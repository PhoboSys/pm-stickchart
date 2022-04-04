import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
export declare class Viewport {
    container: Container;
    private renderIndexMap;
    constructor(container: Container);
    render(graphics: Graphics): void;
    renderWithKey(graphics: Graphics, renderKey: string): void;
    removeByKey(renderKey: string): void;
}
