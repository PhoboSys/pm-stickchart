import { Container, Graphics } from '../../lib/pixi';
import { IGraphicStorage } from '..';
export declare class GraphicRenderer implements IGraphicStorage {
    private readonly container;
    private rendered;
    constructor(container: Container);
    render(graphics: Graphics, renderKey: string): void;
    private add;
    private update;
    private destroy;
    private exists;
    private indexOf;
}
