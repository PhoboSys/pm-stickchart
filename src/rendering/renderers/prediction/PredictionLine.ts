import merge from 'lodash/merge'

import { RenderingContext } from '@rendering'

import datamath from '@lib/datamath'
import { Graphics, Container } from '@lib/pixi'

import { EPosition } from '@enums'

import { GroupComponent } from '@rendering/components/GroupComponent'

import { BasePredictionsRenderer } from './BasePredictionsRenderer'

export class PredictionLine extends BasePredictionsRenderer {

    static readonly PREDICTION_LINE_ID: symbol = Symbol('PREDICTION_LINE_ID')

    public get rendererId(): symbol {
        return PredictionLine.PREDICTION_LINE_ID
    }

    private baseLineStyle: any = {
        [EPosition.Up]: {
            startOffset: [0, -8],
            endOffset: [0, 40+(58-32)/2+32],
            lineStyle: {
                width: 2,
            }
        },

        [EPosition.Down]: {
            startOffset: [0, 8],
            endOffset: [0, -134-62+(58-32)/2],
            lineStyle: {
                width: 2,
            }
        },

        [EPosition.Zero]: {
            startOffset: [0, 8],
            endOffset: [0, 14+(58-32)/2],
            lineStyle: {
                width: 2,
            }
        }
    }

    private orphanlineStyle: any = merge({}, this.baseLineStyle, {
        [EPosition.Up]: { lineStyle: { color: 0xD32F2F } },
        [EPosition.Down]: { lineStyle: { color: 0xD32F2F } },
        [EPosition.Zero]: { lineStyle: { color: 0xD32F2F } }
    })

    private nocontestLineStyle: any = merge({}, this.baseLineStyle, {
        [EPosition.Up]: { lineStyle: { color: 0xFFFFFF } },
        [EPosition.Down]: { lineStyle: { color: 0xFFFFFF } },
        [EPosition.Zero]: { lineStyle: { color: 0xFFFFFF } }
    })

    private winlineStyle: any = merge({}, this.baseLineStyle, {
        [EPosition.Up]: { lineStyle: { color: 0xF7C15B } },
        [EPosition.Down]: { lineStyle: { color: 0xF7C15B } },
        [EPosition.Zero]: { lineStyle: { color: 0xF7C15B } }
    })

    private validPredictionPositions = {
        [EPosition.Up]: EPosition.Up,
        [EPosition.Down]: EPosition.Down,
        [EPosition.Zero]: EPosition.Zero,
    }

    protected updatePrediction(
        round: any,
        prediction: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (!(prediction.position in this.validPredictionPositions)) return this.clear()
        if (!round.entryPriceTimestamp || !round.entryPriceValue) return this.clear()

        const state = this.getPredictionState(round, prediction, context)

        if (!state.win && !state.nocontest && state.isHistorical) return this.clear()

        const [groupElement] = this.get('groupElement', () => new GroupComponent())
        const [group, groupstate] = groupElement.update(context, { roundid: round.roundid, predictionState: state })
        if (group && groupstate.new) container.addChild(group)

        this.updateLine(round, prediction, context, group, state)

    }

    private updateLine(
        round: any,
        prediction: any,
        context: RenderingContext,
        container: Container,
        state: any,
    ): void {
        const position = prediction.position
        const { win, orphan } = state

        if (!container) return this.clear('line')

        const { height } = context.screen
        const { pricerange } = context.plotdata
        const { entryPriceValue, entryPriceTimestamp } = round

        const [ox] = datamath.scale([entryPriceTimestamp], context.plotdata.timerange, context.screen.width)
        const [oy] = datamath.scaleReverse([entryPriceValue], pricerange, height)

        const [line, linestate] = this.get('line', () => new Graphics())
        if (linestate.new) container.addChild(line)

        let style = this.nocontestLineStyle
        if (orphan) style = this.orphanlineStyle
        else if (win) style = this.winlineStyle

        const [startx, starty] = style[prediction.position].startOffset
        const [endx, endy] = style[prediction.position].endOffset

        let vertical: any = null
        if (position === EPosition.Up) vertical = 0
        if (position === EPosition.Zero) vertical = oy
        if (position === EPosition.Down) vertical = context.screen.height

        line
            .clear()
            .lineStyle(style[prediction.position].lineStyle)
            .moveTo(ox+startx, oy+starty)
            .lineTo(ox+endx, vertical+endy)

        line.position.y = -container.position.y

    }

}
