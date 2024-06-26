import { RenderingContext } from '@rendering';
import { BaseRoundsRenderer } from '../../renderers/round/BaseRoundsRenderer';
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
    emptyround: any;
    resolution: any;
    propagating: any;
};
export declare abstract class BaseParisRenderer extends BaseRoundsRenderer {
    protected prevpredictions: {
        [key: string]: string;
    };
    protected newpredictions: {
        [key: string]: string;
    };
    protected updateRound(round: any, context: RenderingContext, layer: Container): Container;
    private updateEachPari;
    private cleanupPari;
    protected getPariState(round: any, prediction: any, context: RenderingContext): PariState;
    protected abstract updatePari(round: any, prediction: any, context: RenderingContext, container: Container, index: number): void;
}
export {};
