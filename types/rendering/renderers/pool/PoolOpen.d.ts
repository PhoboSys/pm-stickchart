import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolOpen extends BasePoolsRenderer {
    static readonly POOL_OPEN_ID: symbol;
    private openBorder;
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateOpenLine;
    private createTitle;
}
