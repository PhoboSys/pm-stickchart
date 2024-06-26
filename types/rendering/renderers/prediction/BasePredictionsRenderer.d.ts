import { RenderingContext } from '@rendering';
import { BaseRoundsRenderer } from '../../renderers/round/BaseRoundsRenderer';
import { Container } from '../../../lib/pixi';
type PredictionState = {
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
export declare abstract class BasePredictionsRenderer extends BaseRoundsRenderer {
    protected prevpredictions: {
        [key: string]: string;
    };
    protected newpredictions: {
        [key: string]: string;
    };
    protected updateRound(round: any, context: RenderingContext, layer: Container): Container;
    private updateEachPrediction;
    private cleanupPrediction;
    protected getPredictionState(round: any, prediction: any, context: RenderingContext): PredictionState;
    protected abstract updatePrediction(round: any, prediction: any, context: RenderingContext, container: Container, index: number): void;
}
export {};
