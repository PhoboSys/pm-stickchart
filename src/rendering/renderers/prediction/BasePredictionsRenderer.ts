import { EntityUtils, RenderingContext } from '@rendering'
import { BaseRoundsRenderer } from '@rendering/renderers/round/BaseRoundsRenderer'

import { Container } from '@lib/pixi'
import { isEmpty, forEach } from '@lib/utils'

import { EPosition } from '@enums'

type PredictionState = {
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

export abstract class BasePredictionsRenderer extends BaseRoundsRenderer {

    protected prevpredictions: { [key:string]: string } = {}

    protected newpredictions: { [key:string]: string } = {}

    protected updateRound(
        round: any,
        context: RenderingContext,
        layer: Container,
    ): Container {
        const predictions = context.predictions?.[round.roundid]
        if (isEmpty(predictions)) {
            this.cleanupPrediction(round)

            return layer
        }

        this.updateEachPrediction(round, predictions, context, layer)
        this.cleanupPrediction(round)

        return layer
    }

    private updateEachPrediction(
        round: any,
        predictions: any[],
        context: RenderingContext,
        layer: Container,
    ): void {

        forEach(predictions, (prediction, idx) => {
            // NOTE: short exit if not in timeframe, [performance improvment]
            if (round.endDate < context.timeframe.since) return
            if (round.startDate > context.timeframe.until) return

            this.rebind(round.roundid, prediction.predictionid)
            this.updatePrediction(round, prediction, context, layer, idx)
            this.newpredictions[prediction.predictionid] = prediction.predictionid
        })

    }

    private cleanupPrediction(round: any): void {

        forEach(this.prevpredictions, predictionid => {
            if (predictionid in this.newpredictions) return

            this.rebind(round.roundid, predictionid)
            this.clear()
        })

        this.prevpredictions = this.newpredictions
        this.newpredictions = {}
    }

    protected getPredictionState(
        round: any,
        prediction: any,
        context: RenderingContext,
    ): PredictionState {

        const resolution: EPosition = this.getRoundResolution(round, context)
        const phantom = prediction.phantom
        const undef = resolution === EPosition.Undefined
        const nocontest = resolution === EPosition.NoContest
        const isHistorical = this.isHistoricalRound(round, context)
        const win = prediction.position === resolution
        const lose = !win && !phantom
        const winning = win && !isHistorical && !phantom
        const loseing = lose && !isHistorical && !phantom
        const won = win && isHistorical && !nocontest && !phantom
        const reverted = EntityUtils.isEnityReverted(context, prediction.predictionid)
        const emptyround = this.isNoContestEmptyRound(round)
        const propagating = EntityUtils.isEntityPropagating(context, prediction.predictionid)
        const orphan = phantom && reverted || isHistorical && phantom && !propagating
        const claimable = !prediction.claimed && (won || nocontest) && !orphan && !phantom

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

    protected abstract updatePrediction(round: any, prediction: any, context: RenderingContext, container: Container, index: number): void

}
