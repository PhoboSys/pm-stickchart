import { EntityUtils, GraphicUtils, RenderingContext } from '@rendering'

import datamath from '@lib/datamath'
import { Container } from '@lib/pixi'
import { isEmpty } from '@lib/utils'

import { EPosition } from '@enums'

import { GroupComponent } from '@rendering/components/GroupComponent'

import { BaseRoundsRenderer } from './BaseRoundsRenderer'

export class RoundOpen extends BaseRoundsRenderer {

    static readonly ROUND_OPEN_ID: symbol = Symbol('ROUND_OPEN_ID')

    private dashLineStyle: any = {
        width: 1,
        join: 'round',
        cap: 'round',
        gap: 8,
        dash: 6,
        color: 0xFFFFFF,
    }

    public get rendererId(): symbol {
        return RoundOpen.ROUND_OPEN_ID
    }

    protected updateRound(
        round: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const paris = context.paris?.[round.roundid]
        if (!round.openPriceTimestamp || !this.isActualRound(round, context) && isEmpty(paris)) return this.clear()

        const resolution = this.getRoundResolution(round, context)
        const hasWinPari = paris && paris.some(pari => pari.position === resolution)
        const isHistorical = this.isHistoricalRound(round, context)
        const nocontest = resolution === EPosition.NoContest
        const emptyround = this.isNoContestEmptyRound(round)
        const hashClaimablePari = paris && paris.some(pari => {
            const phantom = pari.phantom
            const win = pari.position === resolution
            const won = win && isHistorical && !nocontest && !phantom
            const reverted = EntityUtils.isEnityReverted(context, pari.pariid)
            const propagating = EntityUtils.isEntityPropagating(context, pari.pariid)
            const orphan = phantom && reverted || isHistorical && phantom && !propagating
            const claimable = !pari.claimed && (won || nocontest) && !orphan && !phantom

            return claimable
        })

        const [groupElement] = this.get('groupElement', () => new GroupComponent())
        const state = { win: hasWinPari, isHistorical, nocontest, emptyround, claimable: hashClaimablePari }
        const [group, groupstate] = groupElement.update(context, { roundid: round.roundid, pariState: state })
        if (group && groupstate.new) container.addChild(group)

        this.updateOpenLine(round, context, group)

    }

    private updateOpenLine(
        round: any,
        context: RenderingContext,
        container: Container,
    ): void {
        if (!container) return this.clear('line')

        const { width, height } = context.screen
        const { timerange } = context.plotdata
        const [x] = datamath.scale([round.openPriceTimestamp], timerange, width)

        const [line, linestate] = this.get('line', () => GraphicUtils.createVerticalDashLine(
            0,
            [0, context.screen.height],
            this.dashLineStyle
        ), [height])

        if (linestate.new) container.addChild(line)

        line.position.x = x
    }

}
