import { Container } from '../../lib/pixi';
import { IGraphicStorage } from '..';
export declare class GraphicStorage implements IGraphicStorage {
    private readonly root;
    private containers;
    constructor(root: Container);
    private add;
    private update;
    set(renderKey: symbol, container: Container): void;
    get(renderKey: symbol): Container;
    private exists;
    private indexOf;
}
