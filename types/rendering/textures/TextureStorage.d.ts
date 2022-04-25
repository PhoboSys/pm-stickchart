import { Application, RenderTexture } from '../../lib/pixi';
export declare class TextureStorage {
    private readonly application;
    static readonly PRICE_LINE_TEXTURE: symbol;
    private readonly textires;
    constructor(application: Application);
    getPriceLineGradient(): RenderTexture;
    createPriceLineTexture(): RenderTexture;
}
