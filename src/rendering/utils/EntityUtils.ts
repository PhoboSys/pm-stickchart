import { RenderingContext } from '@rendering'
import { ETransactionStatus } from '@enums'

export class EntityUtils {

    static getTransactionsByEntityId(
        context: RenderingContext,
        entityid: string
    ): any {
        const tnxs = context.transactions?.[entityid]

        return tnxs ? Object.values(tnxs) : []
    }

    static getComittedTransactions(
        context: RenderingContext,
        entityid: string
    ): any {
        const txns = this.getTransactionsByEntityId(context, entityid)
        const commited = txns.filter((txn) => txn.status === ETransactionStatus.Commited)

        return commited
    }

    static getRevertedTransactions(
        context: RenderingContext,
        entityid: string
    ): any {
        const txns = this.getTransactionsByEntityId(context, entityid)
        const reverted = txns.filter((txn) => txn.status === ETransactionStatus.Reverted)

        return reverted
    }

    static getPendingTransactions(
        context: RenderingContext,
        entityid: string
    ): any {
        const txns = this.getTransactionsByEntityId(context, entityid)
        const pending = txns.filter((txn) => txn.blockNumber === null && txn.blockHash === null)

        return pending
    }

    static getUnpropagatedTransactions(
        context: RenderingContext,
        entityid: string,
        entityBlock: any
    ): any {
        const txns = this.getComittedTransactions(context, entityid)
        const unpropagated = txns.filter((txn) => txn.blockNumber > entityBlock?.number)

        return unpropagated
    }

    static isEntityPropagating(
        context: RenderingContext,
        entityid: string,
        entityBlock: any
    ): boolean {
        const pending = this.getPendingTransactions(context, entityid)
        const unpropagated = this.getUnpropagatedTransactions(context, entityid, entityBlock)

        return pending.length !== 0 || unpropagated.length !== 0 || !entityBlock?.number
    }

    static isEnityVerified(
        context: RenderingContext,
        entityid: string
    ): boolean {
        const commited = this.getComittedTransactions(context, entityid)
        const pending = this.getPendingTransactions(context, entityid)

        return commited.length !== 0 && pending.length === 0
    }

    static isEnityReverted(
        context: RenderingContext,
        entityid: string
    ): boolean {
        const commited = this.getComittedTransactions(context, entityid)
        const pending = this.getPendingTransactions(context, entityid)
        const reverted = this.getRevertedTransactions(context, entityid)

        return commited.length === 0 && pending.length === 0 && reverted.length !== 0
    }
}
