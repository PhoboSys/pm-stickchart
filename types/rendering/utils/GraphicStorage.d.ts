import { IGraphicStorage } from '..';
import { Container } from '../../lib/pixi';
export declare class GraphicStorage implements IGraphicStorage {
    private readonly root;
    private containers;
    constructor(root: Container);
    private add;
    private update;
    init(renderKey: symbol): Container;
    set(renderKey: symbol, container: Container): void;
    get(renderKey: symbol): Container;
    private exists;
    private indexOf;
}
