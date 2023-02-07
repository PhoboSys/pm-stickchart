import { pick, keys, filter, isEmpty } from 'lodash'

import { RenderingContext } from '@rendering'
import { ETransactionStatus } from '@enums'
import { BaseRenderer } from './BaseRenderer'

export abstract class BaseEntityRenderer extends BaseRenderer {

    private getTransactionsByEntityId(
        context: RenderingContext,
        entityid: string
    ): any {
        const ids = context.transactions?.entity?.[entityid]
        const txns = pick(context.transactions?.collection, keys(ids))

        return txns
    }

    private getComittedTransactions(
        context: RenderingContext,
        entityid: string
    ): any {
        const txns = this.getTransactionsByEntityId(context, entityid)
        const commited = filter(txns, { status: ETransactionStatus.Commited })

        return commited
    }

    private getRevertedTransactions(
        context: RenderingContext,
        entityid: string
    ): any {
        const txns = this.getTransactionsByEntityId(context, entityid)
        const reverted = filter(txns, { status: ETransactionStatus.Reverted })

        return reverted
    }

    private getPendingTransactions(
        context: RenderingContext,
        entityid: string
    ): any {
        const txns = this.getTransactionsByEntityId(context, entityid)
        const pending = filter(txns, { blockNumber: null, blockHash: null })

        return pending
    }

    private getUnpropagatedTransactions(
        context: RenderingContext,
        entityid: string
    ): any {
        const txns = this.getComittedTransactions(context, entityid)
        const unpropagated = filter(txns, ({ blockNumber }) => blockNumber > context?.latestBlockNumber)

        return unpropagated
    }

    protected isEntityPropagating(
        context: RenderingContext,
        entityid: string
    ): any {
        const pending = this.getPendingTransactions(context, entityid)
        const unpropagated = this.getUnpropagatedTransactions(context, entityid)

        return (
            !isEmpty(pending) ||
            !isEmpty(unpropagated)
        )
    }

    protected isEnityVerified(
        context: RenderingContext,
        entityid: string
    ): any {
        const commited = this.getComittedTransactions(context, entityid)
        const pending = this.getPendingTransactions(context, entityid)

        return (
            !isEmpty(commited) &&
            isEmpty(pending)
        )
    }

    protected isEnityReverted(
        context: RenderingContext,
        entityid: string
    ): any {
        const commited = this.getComittedTransactions(context, entityid)
        const pending = this.getPendingTransactions(context, entityid)
        const reverted = this.getRevertedTransactions(context, entityid)

        return (
            isEmpty(commited) &&
            isEmpty(pending) &&
            !isEmpty(reverted)
        )
    }

}
