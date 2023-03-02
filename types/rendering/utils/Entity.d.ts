declare class Entity {
    private getTransactionsByEntityId;
    private getComittedTransactions;
    private getRevertedTransactions;
    private getPendingTransactions;
    private getUnpropagatedTransactions;
    protected isEntityPropagating(context: RenderingContext, entityid: string): boolean;
    protected isEnityVerified(context: RenderingContext, entityid: string): boolean;
    protected isEnityReverted(context: RenderingContext, entityid: string): boolean;
}
