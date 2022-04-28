import { Container } from '../../lib/pixi';
import { IGraphicStorage } from '..';
export declare class GraphicStorage implements IGraphicStorage {
    private readonly container;
    private containers;
    constructor(container: Container);
    private add;
    private update;
    private destroy;
    set(renderKey: symbol, container: Container): boolean;
    get(renderKey: symbol): boolean;
    private exists;
    private indexOf;
}
