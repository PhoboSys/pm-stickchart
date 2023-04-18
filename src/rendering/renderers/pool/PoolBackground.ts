import { RenderingContext } from '@rendering'
import { POOL_ROUND_TEXTURE } from '@rendering/textures/symbols'

import datamath from '@lib/datamath'
import { Graphics, Container } from '@lib/pixi'

import { PoolHoverEvent, PoolUnhoverEvent } from '@events'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolBackground extends BasePoolsRenderer {

    static readonly POOL_BACKGROUND_ID: symbol = Symbol('POOL_BACKGROUND_ID')

    public get rendererId(): symbol {
        return PoolBackground.POOL_BACKGROUND_ID
    }

    private configAnimations: any = {
        hover_group: {
            pixi: {
                alpha: 0.1,
            },
            duration: 0.5,
            ease: 'back.out(4)',
            clear: true,
        },
        unhover_group: {
            pixi: {
                alpha: 0,
            },
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.5,
        },
        actual_group: {
            pixi: {
                alpha: 0.15,
            },
            duration: 0.5,
            ease: 'back.out(4)',
        }
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

        this.updateBackground(pool, context, container)

    }

    private updateBackground(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const {
            width,
            height,
        } = context.screen

        const { timerange } = context.plotdata
        const { openPriceTimestamp, endDate } = pool

        let rdate = endDate
        if (this.isHistoricalPool(pool, context)) {
            const resolution = this.getResolutionPricePoint(pool, context)
            if (resolution?.timestamp) rdate = resolution?.timestamp
        }

        const [ox, rx] = datamath.scale([openPriceTimestamp, rdate], timerange, width)

        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ]

        const [group, groupstate] = this.get('group', () => new Graphics())
        if (groupstate.new) {
            group.alpha = 0
            container.addChild(group)
        }

        const [gradient, gradientState] = this.get('gradient', () => new Graphics())
        if (gradientState.new) group.addChild(gradient)

        gradient
            .clear()
            .beginTextureFill({
                texture: context.textures.get(POOL_ROUND_TEXTURE),
            })
            .drawPolygon(shape)
            .closePath()
            .endFill()

        if (this.isHistoricalPool(pool, context)) {
            const poolid = pool.poolid
            if (!groupstate.subscribed) {
                groupstate.subscribed = true
                context.eventTarget.addEventListener('poolhover', (e: PoolHoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid)
                    this.animate('group', 'hover_group')
                })
                context.eventTarget.addEventListener('poolunhover', (e: PoolUnhoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid)
                    this.animate('group', 'unhover_group')
                })
            }

            if (groupstate.animation !== 'hover_group') this.animate('group', 'unhover_group')

        }

        if (this.isActualPool(pool)) this.animate('group', 'actual_group')

    }

}
