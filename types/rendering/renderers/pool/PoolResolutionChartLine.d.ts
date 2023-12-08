import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolResolutionChartLine extends BasePoolsRenderer {
    static readonly POOL_RESOLUTION_CHART_LINE_ID: symbol;
    private torusStyle;
    private readonly baseLineStyle;
    private lineStyle;
    private configAnimations;
    get rendererId(): symbol;
    protected get animations(): any;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private drawActualLine;
    private drawResolutionLine;
    private createPricePoint;
}
