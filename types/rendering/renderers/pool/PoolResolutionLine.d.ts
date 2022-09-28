import { RenderingContext } from '../..';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolResolutionLine extends BasePoolsRenderer {
    static readonly POOL_RESOLUTION_LINE_ID: symbol;
    private torusStyle;
    private lineStyle;
    private configAnimations;
    protected get animations(): any;
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateResolutionLine;
    private createPricePoint;
}
