import { RenderingContext } from '@rendering';
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
    private updateGroup;
    private updateOpenPoint;
    private updateResPoint;
    private updateResolutionLine;
    private createPricePoint;
}
