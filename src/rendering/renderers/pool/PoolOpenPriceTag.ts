import { RenderingContext, GraphicUtils } from '@rendering'

import datamath from '@lib/datamath'
import { Container } from '@lib/pixi'
import ui from '@lib/ui/index'

import { PoolHoverEvent, PoolUnhoverEvent } from '@events'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolOpenPriceTag extends BasePoolsRenderer {

    static readonly POOL_OPEN_PRICE_TAG_ID: symbol = Symbol('POOL_OPEN_PRICE_TAG_ID')

    private coverStyle: any = {
        offset: [-10, -10],
        anchor: [1, 0],
        textStyle: {
            fill: 0xFFFFFF,
            fontWeight: 700,
            fontFamily: 'Gilroy',
            fontSize: 13,
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
                alpha: 0,
            },
            duration: 0.3,
            ease: 'power2.out',
            delay: 0.1,
        }
    }

    public get rendererId(): symbol {
        return PoolOpenPriceTag.POOL_OPEN_PRICE_TAG_ID
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

        this.updateOpenPriceTag(pool, context, container)
    }

    private updateOpenPriceTag(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const {
            timerange,
            pricerange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const [x] = datamath.scale([pool.openPriceTimestamp], timerange, width)
        const [y] = datamath.scaleReverse([pool.openPriceValue], pricerange, height)
        const priceValue = ui.currency(pool.openPriceValue, context.metapool.quote)

        const [cover, coverState] = this.get('cover', () => GraphicUtils.createText(
            priceValue,
            [0, 0],
            this.coverStyle.textStyle,
            this.coverStyle.anchor,
        )
        )
        if (coverState.new) container.addChild(cover)

        cover.text = priceValue

        const [ofx, ofy] = this.coverStyle.offset
        cover.position.set(x+ofx, y+ofy)

        if (this.isHistoricalPool(pool, context)) {
            const poolid = pool.poolid
            if (!coverState.subscribed) {
                coverState.subscribed = true
                context.eventTarget.addEventListener('poolhover', (e: PoolHoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid)
                    this.animate('cover', 'fadein')
                })
                context.eventTarget.addEventListener('poolunhover', (e: PoolUnhoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid)
                    this.animate('cover', 'fadeout')
                })
            }

            if (coverState.new) {
                cover.alpha = 0
            } else if (coverState.animation !== 'fadein') {
                this.animate('cover', 'fadeout')
            }
        }
    }

}
