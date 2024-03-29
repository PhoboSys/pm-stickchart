import { RenderingContext } from '../..';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolOpen extends BasePoolsRenderer {
    static readonly POOL_OPEN_ID: symbol;
    private historicalLineStyle;
    private lineStyle;
    private textStyle;
    private coverStyle;
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updatePositioningLine;
    private createTitle;
}
