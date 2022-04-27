import { ITextureStorage } from '../abstraction';
import { Application, RenderTexture } from '../../lib/pixi';
export declare class TextureStorage implements ITextureStorage {
    private readonly application;
    private readonly textures;
    constructor(application: Application);
    get(name: symbol): RenderTexture;
    private EMPTY;
}
