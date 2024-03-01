import { RenderingContext, GraphicUtils } from '@rendering'

import { EPosition } from '@enums'
import config from '@config'
import { PricePoint } from '@chartdata'
import datamath from '@lib/datamath'
import { Container } from '@lib/pixi'
import ui from '@lib/ui/index'
import { PoolHoverEvent, PoolUnhoverEvent } from '@events'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolResolutionPriceTag extends BasePoolsRenderer {

    static readonly POOL_RESOLUTION_PRICE_TAG_ID: symbol = Symbol('POOL_RESOLUTION_PRICE_TAG_ID')

    private baseCoverStyle: any = {
        color: 0xFFFFFF,
        offset: [14, -14],
        anchor: [0, 0],
        padding: [6, 8],
        radius: 16,
        textstyle: {
            fill: 0xFFFFFF,
            fontWeight: 500,
            fontFamily: 'Roboto',
            fontSize: 12,
        }
    }

    private coverStyle: any = {

        [EPosition.Undefined]: {
            ...this.baseCoverStyle,
            color: 0x000000,
        },

        [EPosition.Up]: {
            ...this.baseCoverStyle,
            color: config.style.linearresolution.upcolor
        },

        [EPosition.Down]: {
            ...this.baseCoverStyle,
            color: config.style.linearresolution.downcolor
        },

        [EPosition.Zero]: {
            ...this.baseCoverStyle,
            color: config.style.linearresolution.zerocolor,
            textstyle: {
                ...this.baseCoverStyle.textstyle,
                fill: 0x071226,
            }
        },

        [EPosition.NoContest]: {
            ...this.baseCoverStyle,
            color: config.style.linearresolution.nocontest
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

    protected get animations(): any {
        return this.configAnimations
    }

    public get rendererId(): symbol {
        return PoolResolutionPriceTag.POOL_RESOLUTION_PRICE_TAG_ID
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (!pool.openPriceTimestamp || !pool.openPriceValue || this.isActualPool(pool)) return this.clear()

        const rprice = this.getResolutionPricePoint(pool, context)
        if (!rprice) return this.clear()
        this.updateResolutionPriceTag(pool, context, container, rprice)
    }

    private updateResolutionPriceTag(
        pool: any,
        context: RenderingContext,
        container: Container,
        rprice: PricePoint,
    ): void {

        const {
            timerange,
            pricerange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const [x] = datamath.scale([rprice.timestamp], timerange, width)
        const [y] = datamath.scaleReverse([Number(rprice.value)], pricerange, height)
        const priceValue = ui.currency(rprice.value, context.metapool.quote)
        const position = this.getPoolResolution(pool, context)
        const coverStyle = this.coverStyle[position]

        const [cover, coverState] = this.get('cover', () => GraphicUtils.createCoveredText(
            priceValue,
            coverStyle.offset,
            { ...coverStyle, color: 0xFFFFFF },
        ))

        const [ofx, ofy] = coverStyle.offset

        if (coverState.new) container.addChild(cover)
        else cover.update((textGraphic, coverGraphic) => {
            textGraphic.text = priceValue
            textGraphic.style.fill = coverStyle.textstyle.fill
            coverGraphic.tint = coverStyle.color
        }, [x+ofx, y+ofy], coverStyle)

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
