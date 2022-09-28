import { RenderingContext } from '../..';
import { BaseRenderer } from '../..';
import { Container } from '../../../lib/pixi';
import { PricePoint } from '../../../chartdata';
import { EPosition } from '../../../enums';
export declare abstract class BasePoolsRenderer extends BaseRenderer {
    protected prevpools: {
        [key: string]: string;
    };
    protected newpools: {
        [key: string]: string;
    };
    protected update(context: RenderingContext, layer: Container): Container;
    private updateEach;
    private cleanup;
    protected getPoolResolutionByPrice(pool: any, resolutionPrice: PricePoint | null): EPosition;
    protected isHistoricalPool(pool: any, context: RenderingContext): boolean;
    protected isActualPool(pool: any): boolean;
    protected getResolutionPricePoint(pool: any, context: RenderingContext): PricePoint | null;
    protected abstract updatePool(pool: any, context: RenderingContext, container: Container, index: number): void;
}
