import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolResolutionChartLine extends BasePoolsRenderer {
    static readonly POOL_RESOLUTION_CHART_LINE_ID: symbol;
    private baseTorusStyle;
    private torusStyle;
    private readonly baseInnerLineStyle;
    private innerLineStyle;
    private readonly baseLineStyle;
    private readonly actualLineStyle;
    private resolutionLineStyle;
    private configAnimations;
    get rendererId(): symbol;
    protected get animations(): any;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateGroup;
    private updateOpenPoint;
    private updateResPoint;
    private drawActualLine;
    private drawResolutionLine;
    private drawLine;
    private createPricePoint;
}
