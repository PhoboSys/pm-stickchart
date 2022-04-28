import { Application } from '../../lib/pixi';
import { Texture } from '../../lib/pixi';
import { ITextureStorage } from '../abstraction';
import { PRICE_LINE_TEXTURE, POOL_ROUND_TEXTURE } from './symbols';
import { LOCK_ICON_TEXTURE } from './symbols';
export declare class TextureStorage implements ITextureStorage {
    private readonly application;
    private readonly textures;
    constructor(application: Application);
    get(name: symbol): Texture;
    private EMPTY;
    private [PRICE_LINE_TEXTURE];
    private [POOL_ROUND_TEXTURE];
    private [LOCK_ICON_TEXTURE];
}
