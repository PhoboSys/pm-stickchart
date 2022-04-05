import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
export declare class Viewport {
    container: Container;
    private renderedKeys;
    constructor(container: Container);
    private renderInexisted;
    private rerenderExisted;
    private findGraphicIndex;
    keyRender(graphics: Graphics, renderKey: string): void;
    removeByIndex(renderIndex: number): void;
    removeByKey(renderKey: string): void;
}
