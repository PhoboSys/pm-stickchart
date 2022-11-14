import { RenderingContext, BaseRenderer } from '@rendering';
import { Container } from '../../../lib/pixi';
import { PricePoint } from '@chartdata';
import { EPosition } from '@enums';
export declare abstract class BasePoolsRenderer extends BaseRenderer {
    protected prevpools: {
        [key: string]: string;
    };
    protected newpools: {
        [key: string]: string;
    };
    protected update(context: RenderingContext, layer: Container): Container;
    private updateEachPool;
    private cleanup;
    protected getPoolResolution(pool: any, context: RenderingContext): EPosition;
    protected getPoolResolutionByPrice(pool: any, resolutionPrice: PricePoint | null): EPosition;
    protected isNoContestPool(pool: any, context: RenderingContext): boolean;
    private _isNoContestEmptyPool;
    private _isNoContestPool;
    protected isHistoricalPool(pool: any, context: RenderingContext): boolean;
    protected getResolutionPricePoint(pool: any, context: RenderingContext): PricePoint | null;
    protected isActualPool(pool: any): boolean;
    protected abstract updatePool(pool: any, context: RenderingContext, container: Container, index: number): void;
}
