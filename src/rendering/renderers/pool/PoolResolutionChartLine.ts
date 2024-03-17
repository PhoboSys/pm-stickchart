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

    private baseTorusStyle: any = {
        inner: 3,
        outer: 8,
        innerColor: 0xFFFFFF,
        outerColor: 0xFFFFFF,
        zIndex: 3,
    }

    private torusStyle: any = {

        [EPosition.Undefined]: {
            ...this.baseTorusStyle,
            innerAlpha: 0,
        },

        [EPosition.Up]: {
            ...this.baseTorusStyle,
            innerColor: config.style.curvedresolution.upcolor,
        },

        [EPosition.Down]: {
            ...this.baseTorusStyle,
            innerColor: config.style.curvedresolution.downcolor,
        },

        [EPosition.Zero]: {
            ...this.baseTorusStyle,
            innerColor: 0x071226,
            outerColor: config.style.curvedresolution.zerocolor,
        },

        [EPosition.NoContest]: {
            ...this.baseTorusStyle,
            innerColor: config.style.curvedresolution.nocontest,
        }

    }

    private readonly baseInnerLineStyle: any = {
        width: config.style.linesize,
        color: config.style.linecolor,
        alpha: 1,
        join: 'round',
        cap: 'round',
        zIndex: 2,
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
        zIndex: 1,
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
        const rprice = this.getResolutionPricePoint(pool, context)

        if (context.features.curvedResolutionLines) {
            this.clear('actualLine')

            const resolution = this.getPoolResolution(pool, context)

            const [group] = this.updateGroup(context, container, pool)

            this.updateOpenPoint(context, group, resolution, pool)
            this.updateResPoint(context, group, resolution, rprice)
            this.drawResolutionLine(pool, context, group, resolution, rprice)

        } else if (this.isActualPool(pool, context)) {
            this.clear('group')
            this.clear('resolutionLine')
            this.clear('innerLine')
            this.clear('openpoint')
            this.clear('respoint')

            this.drawActualLine(context, container, pool, rprice)

        } else {
            this.clear()
        }
    }

    private updateGroup(
        context: RenderingContext,
        container: Container,
        pool: any,
    ): [Graphics, any] {
        const [group, groupstate] = this.get('group', () => new Graphics())
        if (groupstate.new) {
            group.sortableChildren = true
            container.addChild(group)
        }

        if (this.isHistoricalPool(pool, context)) {
            const poolid = pool.poolid
            if (!groupstate.subscribed) {
                groupstate.subscribed = true
                context.eventTarget.addEventListener('poolhover', (e: PoolHoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid)
                    this.animate('group', 'fadein')
                })
                context.eventTarget.addEventListener('poolunhover', (e: PoolUnhoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid)
                    this.animate('group', 'fadeout')
                })
            }

            if (groupstate.new) {
                group.alpha = 0.7
            } else if (groupstate.animation !== 'fadein') {
                this.animate('group', 'fadeout')
            }
        }

        return [group, groupstate]
    }

    private updateOpenPoint(
        context: RenderingContext,
        container: Container,
        resolution: EPosition,
        pool: any,
    ): void {

        const { timerange, pricerange } = context.plotdata
        const { width, height } = context.screen

        const [x] = datamath.scale([pool.openPriceTimestamp], timerange, width)
        const [y] = datamath.scaleReverse([pool.openPriceValue], pricerange, height)

        const [openpoint, openpointstate] = this.get(
            'openpoint',
            () => this.createPricePoint(this.torusStyle[resolution]),
            [resolution]
        )
        if (openpointstate.new) container.addChild(openpoint)
        openpoint.position.set(x, y)
    }

    private updateResPoint(
        context: RenderingContext,
        container: Container,
        resolution: EPosition,
        rprice: PricePoint | null,
    ): void {

        if (!rprice) return this.clear('respoint')

        const { timerange, pricerange } = context.plotdata
        const { width, height } = context.screen

        const [x] = datamath.scale([rprice.timestamp], timerange, width)
        const [y] = datamath.scaleReverse([Number(rprice.value)], pricerange, height)

        const [respoint, respointstate] = this.get(
            'respoint',
            () => this.createPricePoint(this.torusStyle[resolution]),
            [resolution]
        )
        if (respointstate.new) container.addChild(respoint)
        respoint.position.set(x, y)
    }

    private drawActualLine(
        context: RenderingContext,
        container: Container,
        pool: any,
        rprice: PricePoint | null,
    ): void {
        if (!rprice) return this.clear('actualLine')

        const [actualLine, actualLineState] = this.get('actualLine', () => new Graphics())
        if (actualLineState.new) container.addChild(actualLine)

        const { xs, ys } = context.plotdata
        const { width, height } = context.screen
        const { timerange, pricerange } = context.plotdata

        const [startx, endx] = datamath.scale([pool.openPriceTimestamp, rprice.timestamp], timerange, width)
        const [starty, endy] = datamath.scaleReverse([Number(pool.openPriceValue), Number(rprice.value)], pricerange, height)

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

        this.drawLine(context, actualLine, [poolxs, poolys], this.actualLineStyle)
    }

    private drawResolutionLine(
        pool: any,
        context: RenderingContext,
        container: Graphics,
        resolution: EPosition,
        rprice: PricePoint | null,
    ): void {
        if (!rprice) {
            this.clear('resolutionLine')
            this.clear('innerLine')

            return
        }

        const { xs, ys } = context.plotdata
        const { width, height } = context.screen
        const { timerange, pricerange } = context.plotdata

        const [startx, endx] = datamath.scale([pool.openPriceTimestamp, rprice.timestamp], timerange, width)
        const [starty, endy] = datamath.scaleReverse([Number(pool.openPriceValue), Number(rprice.value)], pricerange, height)

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

        const resolutionLineStyle = this.resolutionLineStyle[resolution]
        const [resolutionLine, resolutionLineState] = this.get('resolutionLine', () => new Graphics())
        if (resolutionLineState.new) {
            resolutionLine.zIndex = resolutionLineStyle.zIndex
            container.addChild(resolutionLine)
        }
        this.drawLine(context, resolutionLine, [poolxs, poolys], resolutionLineStyle)

        const innerLineStyle = this.innerLineStyle[resolution]
        const [innerLine, innerLineState] = this.get('innerLine', () => new Graphics())
        if (innerLineState.new) {
            innerLine.zIndex = innerLineStyle.zIndex
            container.addChild(innerLine)
        }
        this.drawLine(context, innerLine, [poolxs, poolys], innerLineStyle)
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

    private createPricePoint(style: any): Container {

        const inner = GraphicUtils.createCircle(
            [0, 0],
            style.inner,
            { color: style.innerColor, alpha: style.innerAlpha }
        )

        const outer = GraphicUtils.createTorus(
            [0, 0],
            [style.inner, style.outer],
            { color: style.outerColor }
        )

        const pointer = new Container()
        pointer.zIndex = style.zIndex
        pointer.addChild(outer, inner)

        return pointer
    }

}
