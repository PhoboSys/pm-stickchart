import config from '@config'
import { RenderingContext, GraphicUtils } from '@rendering'

import { PricePoint } from '@chartdata'
import datamath from '@lib/datamath'
import { EPosition } from '@enums'
import { Graphics, Container } from '@lib/pixi'
import { PoolHoverEvent, PoolUnhoverEvent } from '@events'

import { BasePoolsRenderer } from './BasePoolsRenderer'
export class PoolResolutionLine extends BasePoolsRenderer {

    static readonly POOL_RESOLUTION_LINE_ID: symbol = Symbol('POOL_RESOLUTION_LINE_ID')

    private baseTorusStyle: any = {
        inner: 3,
        outer: 8,
        zIndex: 2,
        innerColor: 0xFFFFFF,
        outerColor: 0xFFFFFF,
    }

    private torusStyle: any = {

        [EPosition.Undefined]: {
            ...this.baseTorusStyle,
            innerAlpha: 0,
        },

        [EPosition.Up]: {
            ...this.baseTorusStyle,
            innerColor: config.style.linearresolution.upcolor,
        },

        [EPosition.Down]: {
            ...this.baseTorusStyle,
            innerColor: config.style.linearresolution.downcolor,
        },

        [EPosition.Zero]: {
            ...this.baseTorusStyle,
            innerColor: config.style.linearresolution.zerocolor,
        },

        [EPosition.NoContest]: {
            ...this.baseTorusStyle,
            innerColor: config.style.linearresolution.nocontest,
        },

        won: {
            ...this.baseTorusStyle,
            innerColor: config.style.linearresolution.won,
        }

    }

    private baseLineStyle: any = {
        color: 0xFFFFFF,
        width: 5,
        alpha: 1,
        zIndex: 1,
    }

    private lineStyle: any = {

        [EPosition.Undefined]: {
            ...this.baseLineStyle,
            alpha: 0.9,
        },

        [EPosition.Up]: {
            ...this.baseLineStyle,
            color: config.style.linearresolution.upcolor,
        },

        [EPosition.Down]: {
            ...this.baseLineStyle,
            color: config.style.linearresolution.downcolor,
        },

        [EPosition.Zero]: {
            ...this.baseLineStyle,
            color: config.style.linearresolution.zerocolor,
        },

        [EPosition.NoContest]: {
            ...this.baseLineStyle,
            color: config.style.linearresolution.nocontest,
        },

        won: {
            ...this.baseLineStyle,
            color: config.style.linearresolution.won,
        },

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

    protected get animations(): any {
        return this.configAnimations
    }

    public get rendererId(): symbol {
        return PoolResolutionLine.POOL_RESOLUTION_LINE_ID
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (context.features.curvedResolutionLines || !pool.openPriceTimestamp || !pool.openPriceValue) return this.clear()

        const [group] = this.updateGroup(context, container, pool)

        const rprice = this.getResolutionPricePoint(pool, context)
        const resolution = this.getPoolResolution(pool, context)
        const isHistorical = this.isHistoricalPool(pool, context)
        const nocontest = resolution === EPosition.NoContest
        const paris = context.paris?.[pool.poolid]
        const hasWonPari = paris && paris.some(pari => pari.position === resolution && isHistorical && !nocontest && !pari.phantom)

        this.updateOpenPoint(context, group, resolution, pool, hasWonPari)
        this.updateResPoint(context, group, resolution, rprice, hasWonPari)
        this.updateResolutionLine(context, group, resolution, pool, rprice, hasWonPari)
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
        won: boolean,
    ): void {

        const { timerange, pricerange } = context.plotdata
        const { width, height } = context.screen

        const [x] = datamath.scale([pool.openPriceTimestamp], timerange, width)
        const [y] = datamath.scaleReverse([pool.openPriceValue], pricerange, height)

        const [openpoint, openpointstate] = this.get(
            'openpoint',
            () => this.createPricePoint(won ? this.torusStyle.won : this.torusStyle[resolution]),
            [resolution, won]
        )
        if (openpointstate.new) container.addChild(openpoint)
        openpoint.position.set(x, y)
    }

    private updateResPoint(
        context: RenderingContext,
        container: Container,
        resolution: EPosition,
        rprice: PricePoint | null,
        won: boolean,
    ): void {

        if (!rprice) return this.clear('respoint')

        const { timerange, pricerange } = context.plotdata
        const { width, height } = context.screen

        const [x] = datamath.scale([rprice.timestamp], timerange, width)
        const [y] = datamath.scaleReverse([Number(rprice.value)], pricerange, height)

        const [respoint, respointstate] = this.get(
            'respoint',
            () => this.createPricePoint(won ? this.torusStyle.won : this.torusStyle[resolution]),
            [resolution, won]
        )
        if (respointstate.new) container.addChild(respoint)
        respoint.position.set(x, y)
    }

    private updateResolutionLine(
        context: RenderingContext,
        container: Container,
        resolution: EPosition,
        pool: any,
        rprice: PricePoint | null,
        won: boolean,
    ): void {

        if (!rprice) return this.clear('line')

        const { timerange, pricerange } = context.plotdata
        const { width, height } = context.screen

        const [x1, x2] = datamath.scale([pool.openPriceTimestamp, rprice.timestamp], timerange, width)
        const [y1, y2] = datamath.scaleReverse([pool.openPriceValue, Number(rprice.value)], pricerange, height)

        const style = won ? this.lineStyle.won : this.lineStyle[resolution]

        const [line, linestate] = this.get('line', () => new Graphics())
        if (linestate.new) {
            container.addChild(line)
            line.zIndex = style.zIndex
        }

        line
            .clear()
            .lineStyle(style)
            .moveTo(x1, y1)
            .lineTo(x2, y2)
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
