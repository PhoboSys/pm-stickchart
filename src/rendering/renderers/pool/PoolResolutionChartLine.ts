import config from '@config'
import { RenderingContext, GraphicUtils } from '@rendering'

import { EPosition } from '@enums'
import { PricePoint } from '@chartdata'
import datamath from '@lib/datamath'
import { Graphics, Container } from '@lib/pixi'
import { gt, gte } from '@lib/calc-utils'
import { PoolHoverEvent, PoolUnhoverEvent } from '@events'

import { BasePoolsRenderer } from './BasePoolsRenderer'
export class PoolResolutionChartLine extends BasePoolsRenderer {

    static readonly POOL_RESOLUTION_CHART_LINE_ID: symbol = Symbol('POOL_RESOLUTION_CHART_LINE_ID')

    private torusStyle: any = {

        [EPosition.Undefined]: {
            innerr: 3,
            outerr: 8,
            innerColor: 0xFFFFFF,
            outerColor: 0xFFFFFF,
        },

        [EPosition.Up]: {
            innerr: 3,
            outerr: 8,
            innerColor: config.style.curvedresolution.upcolor,
            outerColor: 0xFFFFFF,
        },

        [EPosition.Down]: {
            innerr: 3,
            outerr: 8,
            innerColor: config.style.curvedresolution.downcolor,
            outerColor: 0xFFFFFF,
        },

        [EPosition.Zero]: {
            innerr: 3,
            outerr: 8,
            innerColor: config.style.curvedresolution.zerocolor,
            outerColor: 0xFFFFFF,
        },

        [EPosition.NoContest]: {
            innerr: 3,
            outerr: 8,
            innerColor: config.style.curvedresolution.nocontest,
            outerColor: 0xFFFFFF,
        }

    }

    private readonly baseLineStyle: any = {
        width: config.style.curvedresolution.linesize,
        color: config.style.curvedresolution.linecolor,
        alpha: config.style.curvedresolution.linealpha,
        join: 'round',
        cap: 'round',
    }

    private lineStyle: any = {

        [EPosition.Undefined]: {
            ...this.baseLineStyle,
            color: 0xFFFFFF,
        },

        [EPosition.Up]: {
            ...this.baseLineStyle,
            color: config.style.curvedresolution.upcolor,
            alpha: config.style.curvedresolution.upalpha ?? this.baseLineStyle.alpha,
        },

        [EPosition.Down]: {
            ...this.baseLineStyle,
            color: config.style.curvedresolution.downcolor,
            alpha: config.style.curvedresolution.downalpha ?? this.baseLineStyle.alpha,
        },

        [EPosition.Zero]: {
            ...this.baseLineStyle,
            color: config.style.curvedresolution.zerocolor,
            alpha: config.style.curvedresolution.zeroalpha ?? this.baseLineStyle.alpha,
        },

        [EPosition.NoContest]: {
            ...this.baseLineStyle,
            color: config.style.curvedresolution.nocontest,
            alpha: config.style.curvedresolution.nocontestalpha ?? this.baseLineStyle.alpha,
        }

    }

    private configAnimations: any = {
        fadein: {
            pixi: {
                alpha: 1,
            },
            duration: 0.5,
            ease: 'power2.out',
            clear: true,
        },
        fadeout: {
            pixi: {
                alpha: 0.7,
            },
            duration: 0.3,
            ease: 'power2.out',
            delay: 0.2,
        }
    }

    public get rendererId(): symbol {
        return PoolResolutionChartLine.POOL_RESOLUTION_CHART_LINE_ID
    }

    protected get animations(): any {
        return this.configAnimations
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (!pool.openPriceTimestamp || !pool.openPriceValue) return this.clear()
        const resolution = this.getResolutionPricePoint(pool, context)
        if (!resolution) return this.clear()

        if (context.features.curvedResolutionLines) {
            this.clear('actualLine')

            const position = this.getPoolResolution(pool, context)

            const [resolutiongroup, resolutiongroupstate] = this.get('resolutiongroup', () => new Graphics())
            if (resolutiongroupstate.new) container.addChild(resolutiongroup)

            const [resolutionLine, resolutionLineState] = this.get('resolutionLine', () => new Graphics())
            if (resolutionLineState.new) resolutiongroup.addChild(resolutionLine)

            const [openpoint, openpointstate] = this.get(
                'openpoint',
                () => this.createPricePoint(pool, context, this.torusStyle[position]),
                [position]
            )
            if (openpointstate.new) resolutiongroup.addChild(openpoint)

            const [respoint, respointstate] = this.get(
                'respoint',
                () => this.createPricePoint(pool, context, this.torusStyle[position]),
                [position]
            )
            if (respointstate.new) resolutiongroup.addChild(respoint)

            this.drawResolutionLine(pool, context, position, resolution)

        } else if (this.isActualPool(pool)) {
            this.clear('resolutiongroup')
            this.clear('resolutionLine')
            this.clear('openpoint')
            this.clear('respoint')

            const [actualLine, actualLineState] = this.get('actualLine', () => new Graphics())
            if (actualLineState.new) container.addChild(actualLine)

            this.drawActualLine(pool, context, resolution)

        } else {
            this.clear()
        }
    }

    private drawActualLine(pool: any, context: RenderingContext, resolution: PricePoint): void {
        const { xs, ys } = context.plotdata
        const { width, height } = context.screen
        const { timerange, pricerange } = context.plotdata

        const [startx, endx] = datamath.scale([pool.openPriceTimestamp, resolution.timestamp], timerange, width)
        const [starty, endy] = datamath.scaleReverse([Number(pool.openPriceValue), Number(resolution.value)], pricerange, height)

        const poolxs: number[] = []
        const poolys: number[] = []

        poolxs.push(startx)
        poolys.push(starty)

        for (const idx in xs) {
            if (gte(xs[idx], endx)) break
            if (gt(xs[idx], startx)) {
                poolxs.push(xs[idx])
                poolys.push(ys[idx])
            }
        }

        poolxs.push(endx)
        poolys.push(endy)

        const [actualLine] = this.read('actualLine')

        let prevY: any = null

        for (const idx in poolxs) {
            const x = poolxs[idx]
            const y = poolys[idx]

            if (+idx === 0) {

                actualLine
                    .clear()
                    .lineStyle(this.baseLineStyle)
                    .moveTo(x, y)

            } else if (+idx + 1 === poolxs.length) {

                if (context.features.rectungedPriceLine) actualLine.lineTo(x, prevY)

                actualLine.lineTo(x, y)

            } else {

                if (context.features.rectungedPriceLine) actualLine.lineTo(x, prevY)

                actualLine.lineTo(x, y)

            }

            prevY = y
        }
    }

    private drawResolutionLine(
        pool: any,
        context: RenderingContext,
        position: EPosition,
        resolution: PricePoint,
    ): void {
        const { xs, ys } = context.plotdata
        const { width, height } = context.screen
        const { timerange, pricerange } = context.plotdata

        const [startx, endx] = datamath.scale([pool.openPriceTimestamp, resolution.timestamp], timerange, width)
        const [starty, endy] = datamath.scaleReverse([Number(pool.openPriceValue), Number(resolution.value)], pricerange, height)

        const poolxs: number[] = []
        const poolys: number[] = []

        poolxs.push(startx)
        poolys.push(starty)

        for (const idx in xs) {
            if (gte(xs[idx], endx)) break
            if (gt(xs[idx], startx)) {
                poolxs.push(xs[idx])
                poolys.push(ys[idx])
            }
        }

        poolxs.push(endx)
        poolys.push(endy)

        const [resolutionLine] = this.read('resolutionLine')

        let prevY: any = null

        for (const idx in poolxs) {
            const x = poolxs[idx]
            const y = poolys[idx]

            if (+idx === 0) {

                resolutionLine
                    .clear()
                    .lineStyle(this.lineStyle[position])
                    .moveTo(x, y)

            } else if (+idx + 1 === poolxs.length) {

                if (context.features.rectungedPriceLine) resolutionLine.lineTo(x, prevY)

                resolutionLine.lineTo(x, y)

            } else {

                if (context.features.rectungedPriceLine) resolutionLine.lineTo(x, prevY)

                resolutionLine.lineTo(x, y)

            }

            prevY = y
        }

        const [resolutiongroup, resolutiongroupstate] = this.read('resolutiongroup')

        const [openpoint] = this.read('openpoint')
        openpoint.position.set(startx, starty)

        const [respoint] = this.read('respoint')
        respoint.position.set(endx, endy)

        if (this.isHistoricalPool(pool, context)) {
            const poolid = pool.poolid
            if (!resolutiongroupstate.subscribed) {
                resolutiongroupstate.subscribed = true
                context.eventTarget.addEventListener('poolhover', (e: PoolHoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid)
                    this.animate('resolutiongroup', 'fadein')
                })
                context.eventTarget.addEventListener('poolunhover', (e: PoolUnhoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid)
                    this.animate('resolutiongroup', 'fadeout')
                })
            }

            if (resolutiongroupstate.new) {
                resolutiongroup.alpha = 0.7
            } else if (resolutiongroupstate.animation !== 'fadein') {
                this.animate('resolutiongroup', 'fadeout')
            }
        }
    }

    private createPricePoint(
        pool: any,
        context: RenderingContext,
        style: any
    ): Container {

        const inner = GraphicUtils.createCircle(
            [0, 0],
            style.innerr,
            { color: style.innerColor }
        )

        const outer = GraphicUtils.createCircle(
            [0, 0],
            style.outerr,
            { color: style.outerColor }
        )

        const pointer = new Container()
        pointer.addChild(outer, inner)

        return pointer
    }

}
