import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BaseParisRenderer } from './BaseParisRenderer';
export declare class PariClaimBackground extends BaseParisRenderer {
    static readonly PARI_CLAIM_BACKGROUND_ID: symbol;
    get rendererId(): symbol;
    private validPariPositions;
    private configAnimations;
    protected get animations(): any;
    protected updatePari(pool: any, pari: any, context: RenderingContext, container: Container): void;
    private updateBackground;
}
