import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolLock extends BasePoolsRenderer {
    static readonly POOL_LOCK_ID: symbol;
    private actualLineStyle;
    private actualIconStyle;
    private actualCoverStyle;
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateActualPool;
    private createActualPoolTitle;
    private createActualPoolLine;
}
