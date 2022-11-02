import { RenderingContext } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container } from '../../../lib/pixi'
import { isEmpty, forEach } from '../../../lib/utils'
import { PoolHoverEvent, PoolUnhoverEvent } from '../../../events'

import { POOL_ROUND_TEXTURE } from '../../textures/symbols'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolBackground extends BasePoolsRenderer {

    static readonly POOL_BACKGROUND_ID: symbol = Symbol('POOL_BACKGROUND_ID')

    public get rendererId(): symbol {
        return PoolBackground.POOL_BACKGROUND_ID
    }

    private configAnimations: any = {
        fadein: {
            pixi: {
                alpha: 0.1,
            },
            duration: 0.5,
            ease: 'back.out(4)',
            clear: true,
        },
        fadeout: {
            pixi: {
                alpha: 0,
            },
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.5,
            new: 'set'
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
        const { openDate, resolutionDate, poolid } = pool
        const [ox, rx] = datamath.scale([openDate, resolutionDate], timerange, width)

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
                    this.animate('group', 'fadein')
                })
                context.eventTarget.addEventListener('poolunhover', (e: PoolUnhoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid)
                    this.animate('group', 'fadeout')
                })
            }

            if (groupstate.animation !== 'fadein') {
                this.animate('group', 'fadeout')
            }
        } else if (this.isActualPool(pool)) {
            group.alpha = 0.15
        }

    }

}
