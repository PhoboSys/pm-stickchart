import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolOpen extends BasePoolsRenderer {
    static readonly POOL_OPEN_ID: symbol;
    private dashLineStyle;
    get rendererId(): symbol;
    private configAnimations;
    protected get animations(): any;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateGroup;
    private updateOpenLine;
}
