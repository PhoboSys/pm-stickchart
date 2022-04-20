import { Container, Graphics } from '../../lib/pixi';
import { IGraphicRenderer } from '..';
export declare class PixiGraphicRenderer implements IGraphicRenderer {
    private readonly container;
    private rendered;
    constructor(container: Container);
    render(graphics: Graphics, renderKey: symbol): void;
    private add;
    private update;
    private destroy;
    private exists;
    private indexOf;
}
