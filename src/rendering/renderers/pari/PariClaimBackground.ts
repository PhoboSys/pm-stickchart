import { RenderingContext } from '@rendering'
import { POOL_CLAIM_TEXTURE } from '@rendering/textures'

import { PricePoint } from '@chartdata'
import datamath from '@lib/datamath'
import { Graphics, Container } from '@lib/pixi'
import { EPosition } from '@enums'

import { EntityUtils } from '@rendering'

import { BaseParisRenderer } from './BaseParisRenderer'

export class PariClaimBackground extends BaseParisRenderer {

    static readonly PARI_CLAIM_BACKGROUND_ID: symbol = Symbol('PARI_CLAIM_BACKGROUND_ID')

    public get rendererId(): symbol {
        return PariClaimBackground.PARI_CLAIM_BACKGROUND_ID
    }

    private validPariPositions = {
        [EPosition.Up]: EPosition.Up,
        [EPosition.Down]: EPosition.Down,
        [EPosition.Zero]: EPosition.Zero,
    }

    private configAnimations: any = {
        pulsar: {
            pixi: {
                alpha: 0.2,
                scaleY: 3,
            },
            duration: 4,
            ease: 'back.inOut(4)',
            repeat: -1,
            yoyo: true,
            yoyoEase: 'power3.in',
        },
        hide: {
            pixi: {
                alpha: 0,
            },
            duration: 1,
            ease: 'power3.out',
            clear: true,
        }
    }

    protected get animations(): any {
        return this.configAnimations
    }

    protected updatePari(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (!(pari.position in this.validPariPositions)) return this.clear()
        if (!this.isHistoricalPool(pool, context)) return this.clear()

        const rprice = this.getResolutionPricePoint(pool, context)
        const resolution = this.getPoolResolution(pool, context)

        const win = pari.position === resolution
        const nocontest = resolution === EPosition.NoContest

        const poolid = pool.poolid
        const pariid = pari.pariid

        const reverted = EntityUtils.isEnityReverted(context, pariid)
        const orphan = pari.phantom && reverted

        const claimable = !pari.claimed && (win || nocontest) && !orphan

        if (!claimable) return this.animate('group', 'hide', {
            onComplete: () => {
                this.rebind(poolid, pariid)
                this.clear()
            }
        })

        this.updateBackground(pool, pari, context, container, rprice)

    }

    private updateBackground(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Container,
        resolutionPrice: PricePoint | null
    ): void {

        const { width, height } = context.screen
        const { timerange } = context.plotdata
        const { openPriceTimestamp, endDate } = pool
        const rdate = resolutionPrice?.timestamp || endDate

        const [ox, rx] = datamath.scale([openPriceTimestamp, rdate], timerange, width)

        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ]

        const [group, groupstate] = this.get('group', () => new Graphics())
        if (groupstate.new) {
            group.position.y = -height/4
            group.alpha = 0
            container.addChild(group)
        }

        const [gradient, gradientState] = this.get('gradient', () => new Graphics())
        if (gradientState.new) group.addChild(gradient)

        gradient
            .clear()
            .beginTextureFill({
                texture: context.textures.get(POOL_CLAIM_TEXTURE),
            })
            .drawPolygon(shape)
            .closePath()
            .endFill()

        this.animate('group', 'pulsar')
    }

}
