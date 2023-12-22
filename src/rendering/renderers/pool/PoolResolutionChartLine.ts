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
            innerColor: 0x071226,
            outerColor: config.style.curvedresolution.zerocolor,
        },

        [EPosition.NoContest]: {
            innerr: 3,
            outerr: 8,
            innerColor: config.style.curvedresolution.nocontest,
            outerColor: 0xFFFFFF,
        }

    }

    private readonly baseInnerLineStyle: any = {
        width: config.style.linesize,
        color: config.style.linecolor,
        alpha: 1,
        join: 'round',
        cap: 'round',
    }

    private innerLineStyle: any = {

        [EPosition.Undefined]: this.baseInnerLineStyle,
        [EPosition.Up]: this.baseInnerLineStyle,
        [EPosition.Down]: this.baseInnerLineStyle,
        [EPosition.Zero]: {
            ...this.baseInnerLineStyle,
            color: 0x071226,
        },
        [EPosition.NoContest]: this.baseInnerLineStyle,

    }

    private readonly baseLineStyle: any = {
        width: config.style.curvedresolution.linesize,
        color: config.style.curvedresolution.linecolor,
        alpha: 1,
        join: 'round',
        cap: 'round',
    }

    private readonly actualLineStyle: any = {
        ...this.baseLineStyle,
        alpha: 0.1,
    }

    private resolutionLineStyle: any = {

        [EPosition.Undefined]: {
            ...this.baseLineStyle,
            color: 0xFFFFFF,
            alpha: 0.1,
        },

        [EPosition.Up]: {
            ...this.baseLineStyle,
            color: config.style.curvedresolution.upcolor,
        },

        [EPosition.Down]: {
            ...this.baseLineStyle,
            color: config.style.curvedresolution.downcolor,
        },

        [EPosition.Zero]: {
            ...this.baseLineStyle,
            color: config.style.curvedresolution.zerocolor,
        },

        [EPosition.NoContest]: {
            ...this.baseLineStyle,
            color: config.style.curvedresolution.nocontest,
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

            const [innerLine, innerLineState] = this.get('innerLine', () => new Graphics())
            if (innerLineState.new) resolutiongroup.addChild(innerLine)

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
            this.clear('innerLine')
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

        this.drawLine(context, actualLine, [poolxs, poolys], this.actualLineStyle)
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
        const [innerLine] = this.read('innerLine')

        this.drawLine(context, resolutionLine, [poolxs, poolys], this.resolutionLineStyle[position])
        this.drawLine(context, innerLine, [poolxs, poolys], this.innerLineStyle[position])

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

    private drawLine(context, line, [xs, ys], style): void {

        let prevY: any = null

        for (const idx in xs) {
            const x = xs[idx]
            const y = ys[idx]

            if (+idx === 0) {

                line
                    .clear()
                    .lineStyle(style)
                    .moveTo(x, y)

            } else if (+idx + 1 === xs.length) {

                if (context.features.rectungedPriceLine) line.lineTo(x, prevY)

                line.lineTo(x, y)

            } else {

                if (context.features.rectungedPriceLine) line.lineTo(x, prevY)

                line.lineTo(x, y)

            }

            prevY = y
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
