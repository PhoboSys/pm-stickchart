import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
export declare class Viewport {
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
