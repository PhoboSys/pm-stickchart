import { Application, RenderTexture } from '../../lib/pixi';
import { ITextureStorage } from '../abstraction';
import { DOWN_WAGET_TEXTURE, UP_WAGET_TEXTURE, SILVER_LEVEL_TEXTURE, GOLD_LEVEL_TEXTURE, ROYAL_LEVEL_TEXTURE } from './symbols';
import { PRICE_LINE_TEXTURE, POOL_ROUND_TEXTURE } from './symbols';
import { LOCK_ICON_TEXTURE } from './symbols';
export declare class TextureStorage implements ITextureStorage {
    private readonly application;
    private readonly textures;
    constructor(application: Application);
    get(name: symbol, params?: object): RenderTexture;
    private EMPTY;
    private [UP_WAGET_TEXTURE];
    private [DOWN_WAGET_TEXTURE];
    private [PRICE_LINE_TEXTURE];
    private [POOL_ROUND_TEXTURE];
    private [LOCK_ICON_TEXTURE];
    private [SILVER_LEVEL_TEXTURE];
    private [GOLD_LEVEL_TEXTURE];
    private [ROYAL_LEVEL_TEXTURE];
}
