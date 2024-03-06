import { RenderingContext, GraphicUtils } from '@rendering'

import config from '@config'
import { EPosition } from '@enums'
import datamath from '@lib/datamath'
import { Container } from '@lib/pixi'
import ui from '@lib/ui/index'

import { PoolHoverEvent, PoolUnhoverEvent } from '@events'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolOpenPriceTag extends BasePoolsRenderer {

    static readonly POOL_OPEN_PRICE_TAG_ID: symbol = Symbol('POOL_OPEN_PRICE_TAG_ID')

    private baseCoverStyle: any = {
        color: 0xFFFFFF,
        offset: [-14, -14],
        anchor: [1, 0],
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
            color: config.style.linearresolution.nocontest,
            textstyle: {
                ...this.baseCoverStyle.textstyle,
                fill: 0x071226,
            }
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
            color: config.style.linearresolution.nocontest,
            textstyle: {
                ...this.baseCoverStyle.textstyle,
                fill: 0x071226,
            }
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
        const position = this.getPoolResolution(pool, context)
        const coverStyle = this.coverStyle[position]

        const [cover, coverState] = this.get('cover', () => GraphicUtils.createCoveredText(
            ui.currency(pool.openPriceValue, context.metapool.quote),
            coverStyle.offset,
            { ...coverStyle, color: 0xFFFFFF },
        ))

        const [ofx, ofy] = coverStyle.offset

        if (coverState.new) container.addChild(cover)
        else cover.update((textGraphic, coverGraphic) => {
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
