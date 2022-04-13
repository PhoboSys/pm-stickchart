import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
export declare class Viewport {
    container: Container;
    private renderedKeys;
    constructor(container: Container);
    render(graphics: Graphics, renderKey: string): void;
    private renderNew;
    private rerenderExisted;
    private findGraphicIndex;
    destroy(renderIndex: number): void;
    destroyByKey(renderKey: string): void;
}
