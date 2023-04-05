import { RenderingContext } from '@rendering'
import { ETransactionStatus } from '@enums'

import { pick, isEmpty } from '@lib/utils'

export class EntityUtils {

    static getTransactionsByEntityId(
        context: RenderingContext,
        entityid: string
    ): any[] {
        let result: any[] = []

        const txnids = context.transactionsEntities?.[entityid]
        if (isEmpty(txnids)) return result

        const txns = pick(context.transactions, Object.keys(txnids))
        if (isEmpty(txns)) return result

        result = Object.values(txns)

        return result
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
        entityid: string
    ): any {
        const txns = this.getComittedTransactions(context, entityid)
        const entityBlock = context.blocksEntities?.[entityid] || context.blocksLatest
        const unpropagated = txns.filter((txn) => txn.blockNumber > entityBlock?.number)

        return unpropagated
    }

    static isEntityPropagating(
        context: RenderingContext,
        entityid: string
    ): boolean {
        const pending = this.getPendingTransactions(context, entityid)
        const unpropagated = this.getUnpropagatedTransactions(context, entityid)

        return pending.length !== 0 || unpropagated.length !== 0
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
