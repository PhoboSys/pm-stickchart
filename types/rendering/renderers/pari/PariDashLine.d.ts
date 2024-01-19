import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BaseParisRenderer } from './BaseParisRenderer';
export declare class PariDashLine extends BaseParisRenderer {
    static readonly PARI_DASH_LINE_ID: symbol;
    get rendererId(): symbol;
    private dashLineStyle;
    private nocontestLineStyle;
    private winlineStyle;
    private groupStyle;
    private validPariPositions;
    private configAnimations;
    protected get animations(): any;
    protected updatePari(pool: any, pari: any, context: RenderingContext, container: Container): void;
    private updateGroup;
    private updateLine;
    private getPariState;
}
