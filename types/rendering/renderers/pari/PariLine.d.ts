import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BaseParisRenderer } from './BaseParisRenderer';
export declare class PariLine extends BaseParisRenderer {
    static readonly PARI_LINE_ID: symbol;
    get rendererId(): symbol;
    private baseLineStyle;
    private orphanlineStyle;
    private nocontestLineStyle;
    private winlineStyle;
    private validPariPositions;
    protected updatePari(pool: any, pari: any, context: RenderingContext, container: Container): void;
    private updateLine;
}
