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

    private torusStyle: any = {

        [EPosition.Undefined]: {
            innerr: 3,
            outerr: 6,
            innerColor: 0x303550,
            outerColor: 0xFFFFFF,
        },

        [EPosition.Up]: {
            innerr: 3,
            outerr: 6,
            innerColor: 0x303550,
            outerColor: config.style.resolution.upcolor,
        },

        [EPosition.Down]: {
            innerr: 3,
            outerr: 6,
            innerColor: 0x303550,
            outerColor: config.style.resolution.downcolor,
        },

        [EPosition.Zero]: {
            innerr: 3,
            outerr: 6,
            innerColor: 0x303550,
            outerColor: config.style.resolution.zerocolor,
        }

    }

    private lineStyle: any = {

        [EPosition.Undefined]: {
            color: 0xFFFFFF,
            width: 3,
            alpha: 0.9,
        },

        [EPosition.Up]: {
            color: config.style.resolution.upcolor,
            width: 3,
            alpha: 1,
        },

        [EPosition.Down]: {
            color: config.style.resolution.downcolor,
            width: 3,
            alpha: 1,
        },

        [EPosition.Zero]: {
            color: config.style.resolution.zerocolor,
            width: 3,
            alpha: 1,
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

        if (!pool.openPriceTimestamp || !pool.openPriceValue) return this.clear()

        const resolution = this.getResolutionPricePoint(pool, context)
        if (!resolution) return this.clear()

        this.updateResolutionLine(pool, context, container, resolution)
    }

    private updateResolutionLine(
        pool: any,
        context: RenderingContext,
        container: Container,
        resolution: PricePoint,
    ): void {

        const {
            timerange,
            pricerange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const [x1, x2] = datamath.scale([pool.openPriceTimestamp, resolution.timestamp], timerange, width)
        const [y1, y2] = datamath.scaleReverse([pool.openPriceValue, Number(resolution.value)], pricerange, height)

        const [group, groupstate] = this.get('group', () => new Graphics())
        if (groupstate.new) container.addChild(group)

        const [line, linestate] = this.get('line', () => new Graphics())
        if (linestate.new) group.addChild(line)

        const position = this.getPoolResolutionByPrice(pool, resolution)
        line
            .clear()
            .lineStyle(this.lineStyle[position])
            .moveTo(x1, y1)
            .lineTo(x2, y2)

        const [openpoint, openpointstate] = this.get(
            'openpoint',
            () => this.createPricePoint(pool, context, this.torusStyle[position]),
            [position]
        )
        if (openpointstate.new) group.addChild(openpoint)
        openpoint.position.set(x1, y1)

        const [respoint, respointstate] = this.get(
            'respoint',
            () => this.createPricePoint(pool, context, this.torusStyle[position]),
            [position]
        )
        if (respointstate.new) group.addChild(respoint)
        respoint.position.set(x2, y2)

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
