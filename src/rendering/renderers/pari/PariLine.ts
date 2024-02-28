import { RenderingContext } from '@rendering'

import datamath from '@lib/datamath'
import { Graphics, Container } from '@lib/pixi'

import { EPosition } from '@enums'

import { GroupComponent } from '@rendering/components/GroupComponent'

import { BaseParisRenderer } from './BaseParisRenderer'
export class PariLine extends BaseParisRenderer {

    static readonly PARI_LINE_ID: symbol = Symbol('PARI_LINE_ID')

    public get rendererId(): symbol {
        return PariLine.PARI_LINE_ID
    }

    private nocontestLineStyle: any = {

        [EPosition.Up]: {
            startOffset: [0, -8],
            endOffset: [0, 40+(58-32)/2+32],
            lineStyle: {
                color: 0xFFFFFF,
                width: 2,
            }
        },

        [EPosition.Down]: {
            startOffset: [0, 8],
            endOffset: [0, -134-62+(58-32)/2],
            lineStyle: {
                color: 0xFFFFFF,
                width: 2,
            }
        },

        [EPosition.Zero]: {
            startOffset: [0, 8],
            endOffset: [0, 14+(58-32)/2],
            lineStyle: {
                color: 0xFFFFFF,
                width: 2,
            }
        }
    }

    private winlineStyle: any = {

        [EPosition.Up]: {
            startOffset: [0, -8],
            endOffset: [0, 40+(58-32)/2+32],
            lineStyle: {
                color: 0xF7C15B,
                width: 2,
            }
        },

        [EPosition.Down]: {
            startOffset: [0, 8],
            endOffset: [0, -134-62+(58-32)/2],
            lineStyle: {
                color: 0xF7C15B,
                width: 2,
            }
        },

        [EPosition.Zero]: {
            startOffset: [0, 8],
            endOffset: [0, 14+(58-32)/2],
            lineStyle: {
                color: 0xF7C15B,
                width: 2,
            }
        }
    }

    private validPariPositions = {
        [EPosition.Up]: EPosition.Up,
        [EPosition.Down]: EPosition.Down,
        [EPosition.Zero]: EPosition.Zero,
    }

    protected updatePari(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (!context.features.pariTileNewDesign) return this.clear()
        if (!(pari.position in this.validPariPositions)) return this.clear()

        const state = this.getPariState(pool, pari, context)

        const [groupElement] = this.get('groupElement', () => new GroupComponent())
        const [group, groupstate] = groupElement.update(context, { poolid: pool.poolid, pariState: state })
        if (group && groupstate.new) container.addChild(group)

        if (!state.win && !state.nocontest && state.isHistorical) return

        this.updateLine(pool, pari, context, group, state)

    }

    private updateLine(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Container,
        state: any,
    ): void {
        const position = pari.position
        const { win } = state

        if (!container) return this.clear('line')

        const { height } = context.screen
        const { pricerange } = context.plotdata
        const { openPriceValue, openPriceTimestamp } = pool

        const [ox] = datamath.scale([openPriceTimestamp], context.plotdata.timerange, context.screen.width)
        const [oy] = datamath.scaleReverse([openPriceValue], pricerange, height)

        const [line, linestate] = this.get('line', () => new Graphics())
        if (linestate.new) container.addChild(line)

        const style = win ? this.winlineStyle : this.nocontestLineStyle

        const [startx, starty] = style[pari.position].startOffset
        const [endx, endy] = style[pari.position].endOffset

        let vertical: any = null
        if (position === EPosition.Up) vertical = 0
        if (position === EPosition.Zero) vertical = oy
        if (position === EPosition.Down) vertical = context.screen.height

        line
            .clear()
            .lineStyle(style[pari.position].lineStyle)
            .moveTo(ox+startx, oy+starty)
            .lineTo(ox+endx, vertical+endy)

        line.position.y = -container.position.y

    }

}
