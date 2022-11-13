import { RenderingContext } from '@rendering';
import { BasePoolsRenderer } from '../../renderers/pool/BasePoolsRenderer';
import { Container } from '../../../lib/pixi';
export declare abstract class BaseParisRenderer extends BasePoolsRenderer {
    protected prevparis: {
        [key: string]: string;
    };
    protected newparis: {
        [key: string]: string;
    };
    protected updatePool(pool: any, context: RenderingContext, layer: Container): Container;
    private updateEachPari;
    private cleanupPari;
    protected abstract updatePari(pool: any, pari: any, context: RenderingContext, container: Container, index: number): void;
}
