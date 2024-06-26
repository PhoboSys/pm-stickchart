import { RenderingContext, BaseRenderer } from '@rendering';
import { Container } from '../../../lib/pixi';
import { PricePoint } from '@chartdata';
import { EPosition } from '@enums';
export declare abstract class BaseRoundsRenderer extends BaseRenderer {
    protected prevrounds: {
        [key: string]: string;
    };
    protected newrounds: {
        [key: string]: string;
    };
    protected update(context: RenderingContext, layer: Container): Container;
    private updateEachRound;
    private cleanup;
    protected getRoundResolution(round: any, context: RenderingContext): EPosition;
    private getRoundResolutionByPrice;
    private isNoContestRound;
    protected isNoContestEmptyRound(round: any): boolean;
    private _isNoContestRound;
    protected isHistoricalRound(round: any, context: RenderingContext): boolean;
    protected getResolutionPricePoint(round: any, context: RenderingContext): PricePoint | null;
    protected getRoundResolutionPriceFormPricefeed(endDate: any, chartdata: {
        timestamps: any;
        prices: any;
    }): PricePoint | null;
    protected isActualRound(round: any, context: RenderingContext): boolean;
    protected getLevelTextureName(context: RenderingContext): symbol;
    protected abstract updateRound(round: any, context: RenderingContext, container: Container, index: number): void;
}
