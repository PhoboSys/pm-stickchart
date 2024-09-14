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

        const predictions = context.predictions?.[round.roundid]
        if (!round.entryPriceTimestamp || !this.isActualRound(round, context) && isEmpty(predictions)) return this.clear()

        const resolution = this.getRoundResolution(round, context)
        const hasWinPrediction = predictions && predictions.some(prediction => prediction.position === resolution)
        const isHistorical = this.isHistoricalRound(round, context)
        const nocontest = resolution === EPosition.NoContest
        const emptyround = this.isNoContestEmptyRound(round)
        const hashClaimablePrediction = predictions && predictions.some(prediction => {
            const phantom = prediction.phantom
            const win = prediction.position === resolution
            const won = win && isHistorical && !nocontest && !phantom
            const reverted = EntityUtils.isEnityReverted(context, prediction.predictionid)
            const propagating = EntityUtils.isEntityPropagating(context, prediction.predictionid)
            const orphan = phantom && reverted || isHistorical && phantom && !propagating
            const claimable = !prediction.claimed && (won || nocontest) && !orphan && !phantom

            return claimable
        })

        const [groupElement] = this.get('groupElement', () => new GroupComponent())
        const state = { win: hasWinPrediction, isHistorical, nocontest, emptyround, claimable: hashClaimablePrediction }
        const [group, groupstate] = groupElement.update(context, { roundid: round.roundid, predictionState: state })
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
        const [x] = datamath.scale([round.entryPriceTimestamp], timerange, width)

        const [line, linestate] = this.get('line', () => GraphicUtils.createVerticalDashLine(
            0,
            [0, context.screen.height],
            this.dashLineStyle
        ), [height])

        if (linestate.new) container.addChild(line)

        line.position.x = x
    }

}
