import { RenderingContext } from '../..';
import { Container } from '../../../lib/pixi';
import { BaseParisRenderer } from './BaseParisRenderer';
export declare class PariResolutionLine extends BaseParisRenderer {
    static readonly PARI_RESOLUTION_LINE_ID: symbol;
    get rendererId(): symbol;
    private lineStyle;
    private configAnimations;
    protected get animations(): any;
    protected updatePari(pool: any, pari: any, context: RenderingContext, container: Container): void;
    private updateTile;
    private getPositionIconTextureName;
    private createIcon;
    private createBackground;
}
