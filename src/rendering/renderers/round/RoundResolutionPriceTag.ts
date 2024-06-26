import { RenderingContext, GraphicUtils } from '@rendering'

import { EPosition } from '@enums'
import config from '@config'
import { PricePoint } from '@chartdata'
import datamath from '@lib/datamath'
import { Container } from '@lib/pixi'
import ui from '@lib/ui/index'
import { RoundHoverEvent, RoundUnhoverEvent } from '@events'

import { BaseRoundsRenderer } from './BaseRoundsRenderer'

export class RoundResolutionPriceTag extends BaseRoundsRenderer {

    static readonly ROUND_RESOLUTION_PRICE_TAG_ID: symbol = Symbol('ROUND_RESOLUTION_PRICE_TAG_ID')

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
            color: config.style.linearresolution.nocontest,
            textstyle: {
                ...this.baseCoverStyle.textstyle,
                fill: 0x071226,
            },
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

    protected get animations(): any {
        return this.configAnimations
    }

    public get rendererId(): symbol {
        return RoundResolutionPriceTag.ROUND_RESOLUTION_PRICE_TAG_ID
    }

    protected updateRound(
        round: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (!round.openPriceTimestamp || !round.openPriceValue || this.isActualRound(round, context)) return this.clear()

        const rprice = this.getResolutionPricePoint(round, context)
        if (!rprice) return this.clear()
        this.updateResolutionPriceTag(round, context, container, rprice)
    }

    private updateResolutionPriceTag(
        round: any,
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
        const priceValue = ui.currency(rprice.value, context.game.quote)
        const position = this.getRoundResolution(round, context)
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

        if (this.isHistoricalRound(round, context)) {
            const roundid = round.roundid
            if (!coverState.subscribed) {
                coverState.subscribed = true
                context.eventTarget.addEventListener('roundhover', (e: RoundHoverEvent) => {
                    if (e.roundid !== roundid) return

                    this.rebind(roundid)
                    this.animate('cover', 'fadein')
                })
                context.eventTarget.addEventListener('roundunhover', (e: RoundUnhoverEvent) => {
                    if (e.roundid !== roundid) return

                    this.rebind(roundid)
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
