import { RenderingContext } from '@rendering';
export declare class EntityUtils {
    static getTransactionsByEntityId(context: RenderingContext, entityid: string): any[];
    static getComittedTransactions(context: RenderingContext, entityid: string): any;
    static getRevertedTransactions(context: RenderingContext, entityid: string): any;
    static getPendingTransactions(context: RenderingContext, entityid: string): any;
    static getUnpropagatedTransactions(context: RenderingContext, entityid: string): any;
    static isEntityPropagating(context: RenderingContext, entityid: string): boolean;
    static isEnityVerified(context: RenderingContext, entityid: string): boolean;
    static isEnityReverted(context: RenderingContext, entityid: string): boolean;
}
