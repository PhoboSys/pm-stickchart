import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
export declare class Viewport {
    container: Container;
    private renderedKeys;
    constructor(container: Container);
    keyRender(graphics: Graphics, renderKey: string): void;
    private renderInexisted;
    private rerenderExisted;
    private findGraphicIndex;
    removeByIndex(renderIndex: number): void;
    removeByKey(renderKey: string): void;
}
