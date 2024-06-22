import { Application } from '../../lib/pixi';
import { Texture } from '../../lib/pixi';
import { ITextureStorage } from '../abstraction';
import { DOWN_WAGET_TEXTURE, UP_WAGET_TEXTURE, ETH_DARK_TEXTURE, USDT_DARK_TEXTURE, USDC_TEXTURE, DEMO_TEXTURE, ORCY_TEXTURE, UNKNOWN_DARK_TEXTURE, CHAINLINK_TEXTURE, WINNING_COUNTDOWN_TEXTURE, PRICE_LINE_TEXTURE, LOCK_COUNTDOWN_TEXTURE, RESOLUTION_COUNTDOWN_TEXTURE, SHADOW_COUNTDOWN_TEXTURE, SILVER_LEVEL_TEXTURE, GOLD_LEVEL_TEXTURE, BRONZE_LEVEL_TEXTURE, UP_ICON_TEXTURE, DOWN_ICON_TEXTURE, ZERO_ICON_TEXTURE, UNDEFINED_ICON_TEXTURE, GRADIENT_TEXTURE, COIN_SHINE, UNKNOWN_CURRENCY_TEXTURE, DEMO_GOLD_TEXTURE, DEMO_SILVER_TEXTURE, USDC_GOLD_TEXTURE, USDC_SILVER_TEXTURE } from './symbols';
export declare class TextureStorage implements ITextureStorage {
    private readonly application;
    private readonly textures;
    private readonly sprites;
    private readonly precreate;
    constructor(application: Application);
    animations(name: symbol, params?: object): any;
    get(name: symbol, params?: object): Texture;
    private EMPTY;
    private [UP_WAGET_TEXTURE];
    private [DOWN_WAGET_TEXTURE];
    private [PRICE_LINE_TEXTURE];
    private [UP_ICON_TEXTURE];
    private [DOWN_ICON_TEXTURE];
    private [ZERO_ICON_TEXTURE];
    private [UNDEFINED_ICON_TEXTURE];
    private [GRADIENT_TEXTURE];
    private [SILVER_LEVEL_TEXTURE];
    private [GOLD_LEVEL_TEXTURE];
    private [BRONZE_LEVEL_TEXTURE];
    private [RESOLUTION_COUNTDOWN_TEXTURE];
    private [LOCK_COUNTDOWN_TEXTURE];
    private [SHADOW_COUNTDOWN_TEXTURE];
    private [WINNING_COUNTDOWN_TEXTURE];
    private [ETH_DARK_TEXTURE];
    private [USDT_DARK_TEXTURE];
    private [USDC_TEXTURE];
    private [DEMO_TEXTURE];
    private [ORCY_TEXTURE];
    private [UNKNOWN_DARK_TEXTURE];
    private [CHAINLINK_TEXTURE];
    private [COIN_SHINE];
    private [DEMO_GOLD_TEXTURE];
    private [DEMO_SILVER_TEXTURE];
    private [USDC_SILVER_TEXTURE];
    private [USDC_GOLD_TEXTURE];
    private [UNKNOWN_CURRENCY_TEXTURE];
}
