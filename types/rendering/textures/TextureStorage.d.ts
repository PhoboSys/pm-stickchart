import { Application, RenderTexture } from '../../lib/pixi';
import { ITextureStorage } from '../abstraction';
import { DOWN_WAGET_TEXTURE, UP_WAGET_TEXTURE, ETH_DARK_TEXTURE, USDT_DARK_TEXTURE, USDC_DARK_TEXTURE, UNKNOWN_DARK_TEXTURE, CHAINLINK_TEXTURE, PARI_DARK_TEXTURE } from './symbols';
import { PRICE_LINE_TEXTURE, POOL_ROUND_TEXTURE } from './symbols';
import { LOCK_COUNTDOWN_TEXTURE, RESOLUTION_COUNTDOWN_TEXTURE } from './symbols';
import { SILVER_LEVEL_TEXTURE, GOLD_LEVEL_TEXTURE, ROYAL_LEVEL_TEXTURE } from './symbols';
import { LOCK_ICON_TEXTURE, UP_ICON_TEXTURE, DOWN_ICON_TEXTURE } from './symbols';
import { ZERO_ICON_TEXTURE, UNDEFINED_ICON_TEXTURE } from './symbols';
import { GRADIENT_TEXTURE } from './symbols';
import { POOL_CLAIM_TEXTURE } from './symbols';
export declare class TextureStorage implements ITextureStorage {
    private readonly application;
    private readonly textures;
    private readonly precreate;
    constructor(application: Application);
    get(name: symbol, params?: object): RenderTexture;
    private EMPTY;
    private [UP_WAGET_TEXTURE];
    private [DOWN_WAGET_TEXTURE];
    private [PRICE_LINE_TEXTURE];
    private [POOL_CLAIM_TEXTURE];
    private [POOL_ROUND_TEXTURE];
    private [LOCK_ICON_TEXTURE];
    private [UP_ICON_TEXTURE];
    private [DOWN_ICON_TEXTURE];
    private [ZERO_ICON_TEXTURE];
    private [UNDEFINED_ICON_TEXTURE];
    private [GRADIENT_TEXTURE];
    private [SILVER_LEVEL_TEXTURE];
    private [GOLD_LEVEL_TEXTURE];
    private [ROYAL_LEVEL_TEXTURE];
    private [RESOLUTION_COUNTDOWN_TEXTURE];
    private [LOCK_COUNTDOWN_TEXTURE];
    private [ETH_DARK_TEXTURE];
    private [USDT_DARK_TEXTURE];
    private [USDC_DARK_TEXTURE];
    private [PARI_DARK_TEXTURE];
    private [UNKNOWN_DARK_TEXTURE];
    private [CHAINLINK_TEXTURE];
}
