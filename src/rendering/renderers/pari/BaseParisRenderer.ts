import { EntityUtils, RenderingContext } from '@rendering'
import { BasePoolsRenderer } from '@rendering/renderers/pool/BasePoolsRenderer'

import { Container } from '@lib/pixi'
import { isEmpty, forEach } from '@lib/utils'

import { EPosition } from '@enums'

type PariState = {
    phantom,
    undef,
    nocontest,
    isHistorical,
    win,
    lose,
    winning,
    loseing,
    won,
    reverted,
    orphan,
    claimable,
    emptypool,
    resolution,
    propagating,
}

export abstract class BaseParisRenderer extends BasePoolsRenderer {

    protected prevparis: { [key:string]: string } = {}

    protected newparis: { [key:string]: string } = {}

    protected updatePool(
        pool: any,
        context: RenderingContext,
        layer: Container,
    ): Container {
        const paris = context.paris?.[pool.poolid]
        if (isEmpty(paris)) {
            this.cleanupPari(pool)

            return layer
        }

        this.updateEachPari(pool, paris, context, layer)
        this.cleanupPari(pool)

        return layer
    }

    private updateEachPari(
        pool: any,
        paris: any[],
        context: RenderingContext,
        layer: Container,
    ): void {

        forEach(paris, (pari, idx) => {
            // NOTE: short exit if not in timeframe, [performance improvment]
            if (pool.endDate < context.timeframe.since) return
            if (pool.startDate > context.timeframe.until) return

            this.rebind(pool.poolid, pari.pariid)
            this.updatePari(pool, pari, context, layer, idx)
            this.newparis[pari.pariid] = pari.pariid
        })

    }

    private cleanupPari(pool: any): void {

        forEach(this.prevparis, pariid => {
            if (pariid in this.newparis) return

            this.rebind(pool.poolid, pariid)
            this.clear()
        })

        this.prevparis = this.newparis
        this.newparis = {}
    }

    protected getPariState(
        pool: any,
        pari: any,
        context: RenderingContext,
    ): PariState {

        const resolution: EPosition = this.getPoolResolution(pool, context)
        const phantom = pari.phantom
        const undef = resolution === EPosition.Undefined
        const nocontest = resolution === EPosition.NoContest
        const isHistorical = this.isHistoricalPool(pool, context)
        const win = pari.position === resolution
        const lose = !win && !phantom
        const winning = win && !isHistorical && !phantom
        const loseing = lose && !isHistorical && !phantom
        const won = win && isHistorical && !nocontest && !phantom
        const reverted = EntityUtils.isEnityReverted(context, pari.pariid)
        const orphan = phantom && reverted
        const emptypool = this.isNoContestEmptyPool(pool)
        const claimable = !pari.claimed && (won || nocontest) && !orphan
        const propagating = EntityUtils.isEntityPropagating(context, pari.pariid)

        return {
            phantom,
            undef,
            nocontest,
            isHistorical,
            win,
            lose,
            winning,
            loseing,
            won,
            reverted,
            orphan,
            claimable,
            emptypool,
            resolution,
            propagating,
        }
    }

    protected abstract updatePari(pool: any, pari: any, context: RenderingContext, container: Container, index: number): void

}
