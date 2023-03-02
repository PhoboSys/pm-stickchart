import { RenderingContext } from '@rendering';
import { BaseRenderer } from './BaseRenderer';
export declare abstract class BaseEntityRenderer extends BaseRenderer {
    private getTransactionsByEntityId;
    private getComittedTransactions;
    private getRevertedTransactions;
    private getPendingTransactions;
    private getUnpropagatedTransactions;
    protected isEntityPropagating(context: RenderingContext, entityid: string): boolean;
    protected isEnityVerified(context: RenderingContext, entityid: string): boolean;
    protected isEnityReverted(context: RenderingContext, entityid: string): boolean;
}
