import { RenderingContext } from '@rendering';
import { BasePoolsRenderer } from '../../renderers/pool/BasePoolsRenderer';
import { Container } from '../../../lib/pixi';
type PariState = {
    phantom: any;
    undef: any;
    nocontest: any;
    isHistorical: any;
    win: any;
    lose: any;
    winning: any;
    loseing: any;
    won: any;
    reverted: any;
    orphan: any;
    claimable: any;
    emptypool: any;
    resolution: any;
    propagating: any;
};
export declare abstract class BaseParisRenderer extends BasePoolsRenderer {
    protected prevparis: {
        [key: string]: string;
    };
    protected newparis: {
        [key: string]: string;
    };
    protected updatePool(pool: any, context: RenderingContext, layer: Container): Container;
    private updateEachPari;
    private cleanupPari;
    protected getPariState(pool: any, pari: any, context: RenderingContext): PariState;
    protected abstract updatePari(pool: any, pari: any, context: RenderingContext, container: Container, index: number): void;
}
export {};
