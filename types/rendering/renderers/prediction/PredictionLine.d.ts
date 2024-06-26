import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePredictionsRenderer } from './BasePredictionsRenderer';
export declare class PredictionLine extends BasePredictionsRenderer {
    static readonly PREDICTION_LINE_ID: symbol;
    get rendererId(): symbol;
    private baseLineStyle;
    private orphanlineStyle;
    private nocontestLineStyle;
    private winlineStyle;
    private validPredictionPositions;
    protected updatePrediction(round: any, prediction: any, context: RenderingContext, container: Container): void;
    private updateLine;
}
