import { EntityUtils, RenderingContext } from '@rendering'
import { BaseRoundsRenderer } from '@rendering/renderers/round/BaseRoundsRenderer'

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
    emptyround,
    resolution,
    propagating,
}

export abstract class BaseParisRenderer extends BaseRoundsRenderer {

    protected prevparis: { [key:string]: string } = {}

    protected newparis: { [key:string]: string } = {}

    protected updateRound(
        round: any,
        context: RenderingContext,
        layer: Container,
    ): Container {
        const paris = context.paris?.[round.roundid]
        if (isEmpty(paris)) {
            this.cleanupPari(round)

            return layer
        }

        this.updateEachPari(round, paris, context, layer)
        this.cleanupPari(round)

        return layer
    }

    private updateEachPari(
        round: any,
        paris: any[],
        context: RenderingContext,
        layer: Container,
    ): void {

        forEach(paris, (pari, idx) => {
            // NOTE: short exit if not in timeframe, [performance improvment]
            if (round.endDate < context.timeframe.since) return
            if (round.startDate > context.timeframe.until) return

            this.rebind(round.roundid, pari.pariid)
            this.updatePari(round, pari, context, layer, idx)
            this.newparis[pari.pariid] = pari.pariid
        })

    }

    private cleanupPari(round: any): void {

        forEach(this.prevparis, pariid => {
            if (pariid in this.newparis) return

            this.rebind(round.roundid, pariid)
            this.clear()
        })

        this.prevparis = this.newparis
        this.newparis = {}
    }

    protected getPariState(
        round: any,
        pari: any,
        context: RenderingContext,
    ): PariState {

        const resolution: EPosition = this.getRoundResolution(round, context)
        const phantom = pari.phantom
        const undef = resolution === EPosition.Undefined
        const nocontest = resolution === EPosition.NoContest
        const isHistorical = this.isHistoricalRound(round, context)
        const win = pari.position === resolution
        const lose = !win && !phantom
        const winning = win && !isHistorical && !phantom
        const loseing = lose && !isHistorical && !phantom
        const won = win && isHistorical && !nocontest && !phantom
        const reverted = EntityUtils.isEnityReverted(context, pari.pariid)
        const emptyround = this.isNoContestEmptyRound(round)
        const propagating = EntityUtils.isEntityPropagating(context, pari.pariid)
        const orphan = phantom && reverted || isHistorical && phantom && !propagating
        const claimable = !pari.claimed && (won || nocontest) && !orphan && !phantom

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
            emptyround,
            resolution,
            propagating,
        }
    }

    protected abstract updatePari(round: any, pari: any, context: RenderingContext, container: Container, index: number): void

}
