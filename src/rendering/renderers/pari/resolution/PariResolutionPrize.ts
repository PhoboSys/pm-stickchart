import { Graphics, Container, Sprite, gsap } from '../../../../lib/pixi'
import datamath from '../../../../lib/datamath'

import { IGraphicStorage, RenderingContext } from '../../..'
import { BaseRenderer, GraphicUtils } from '../../..'
import { DateUtils } from '../../../utils'

export class PariResolutionPrize extends BaseRenderer {

    static readonly PARI_RESOLUTION_PRIZE_ID: symbol = Symbol('PARI_RESOLUTION_PRIZE_ID')

    public get rendererId() {
        return PariResolutionPrize.PARI_RESOLUTION_PRIZE_ID
    }

    private readonly textstyle: any
    private readonly subtextstyle: any
    private readonly textstylePrecent: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.textstyle = {
            fill: 0xFFFFFF,
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 18,
        }

        this.textstylePrecent = {
            fill: 0xFFFFFF,
            fontWeight: 300,
            fontFamily: 'Gilroy',
            fontSize: 15,
        }

        this.subtextstyle = {
            fill: 0xFFFFFF,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 18,
        }
    }

    private renderedMetaId: any

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        if (
            !context.pool ||
            !context.pool.openPrice ||
            !context.paris?.length
        ) {
            this.clear()
            return container
        }

        // clear if pool changed
        if (this.renderedMetaId && this.renderedMetaId !== context.pool.metaid) {
            this.clear()
        }
        this.renderedMetaId = context.pool.metaid

        const { resolutionDate, openPrice } = context.pool

        const { width, height } = context.screen
        const { xrange, yrange } = context.plotdata

        const [x] = datamath.scale([resolutionDate], xrange, width)
        const [yr] = datamath.scale([openPrice.value], yrange, height)
        const y = height - yr

        const gap = 6
        const xpad = 8

        // clear
        const paris = {}
        for (const pari of context.paris) paris[pari.position] = pari
        if (!paris['POS']) {
            this.clear('dividendsPos')
            this.clear('dividendsCurPos')
            this.clear('dividendsPerPos')
        }
        if (!paris['NEG']) {
            this.clear('dividendsNeg')
            this.clear('dividendsCurNeg')
            this.clear('dividendsPerNeg')
        }

        // loop
        const { pool } = context
        for (const pari of context.paris) {

            const prize = datamath.returnPrize({
                wager: pari.wager,
                position: pari.position,
                resolution: pool.resolution,
                positiveFund: pool.positiveFund,
                negativeFund: pool.negativeFund,
                precision: 5
            })
            const percent = datamath.profitPercent(prize, pari.wager, 2)
            const isWinning = prize !== 0

            if (pari.position === 'POS') {

                const [dividendsPos, dividendsPosState] = this.get(
                    'dividendsPos',
                    () => GraphicUtils.createText(
                        prize,
                        [x, y],
                        this.textstyle,
                        [0, 1.25],
                    )
                )
                if (dividendsPosState.new) container.addChild(dividendsPos)
                dividendsPos.position.set(x + xpad, y)
                dividendsPos.text = String(prize)

                const [dividendsCurPos, dividendsCurPosState] = this.get(
                    'dividendsCurPos',
                    () => GraphicUtils.createText(
                        pari.currency,
                        [x, y],
                        this.subtextstyle,
                        [0, 1.25],
                    )
                )
                if (dividendsCurPosState.new) container.addChild(dividendsCurPos)
                dividendsCurPos.position.set(x + xpad + dividendsPos.width + gap, y)

                const [dividendsPerPos, dividendsPerPosState] = this.get(
                    'dividendsPerPos',
                    () => GraphicUtils.createText(
                        percent + '%',
                        [x, y],
                        this.textstylePrecent,
                        [0, 1.25],
                    )
                )
                if (dividendsPerPosState.new) container.addChild(dividendsPerPos)
                dividendsPerPos.position.set(x + xpad, y - dividendsPos.height)
                dividendsPerPos.text = percent + '%'

                if (isWinning) {
                    dividendsPos.style.fill = 0x00A573
                    dividendsCurPos.style.fill = 0x00A573
                    dividendsPerPos.alpha = 1
                } else {
                    dividendsPos.style.fill = 0xF05350
                    dividendsCurPos.style.fill = 0xF05350
                    dividendsPerPos.alpha = 0
                }

            }

            if (pari.position === 'NEG') {

                const [dividendsNeg, dividendsNegState] = this.get(
                    'dividendsNeg',
                    () => GraphicUtils.createText(
                        prize,
                        [x, y],
                        this.textstyle,
                        [0, -0.3],
                    )
                )
                if (dividendsNegState.new) container.addChild(dividendsNeg)
                dividendsNeg.position.set(x + xpad, y)
                dividendsNeg.text = String(prize)

                const [dividendsCurNeg, dividendsCurNegState] = this.get(
                    'dividendsCurNeg',
                    () => GraphicUtils.createText(
                        'ETH',
                        [x, y],
                        this.subtextstyle,
                        [0, -0.3],
                    )
                )
                if (dividendsCurNegState.new) container.addChild(dividendsCurNeg)
                dividendsCurNeg.position.set(x + xpad + dividendsNeg.width + gap, y)

                const [dividendsPerNeg, dividendsPerNegState] = this.get(
                    'dividendsPerNeg',
                    () => GraphicUtils.createText(
                        percent + '%',
                        [x, y],
                        this.textstylePrecent,
                        [0, -0.3],
                    )
                )
                if (dividendsPerNegState.new) container.addChild(dividendsPerNeg)
                dividendsPerNeg.position.set(x + xpad, y + dividendsNeg.height)
                dividendsPerNeg.text = percent + '%'

                if (isWinning) {
                    dividendsNeg.style.fill = 0x00A573
                    dividendsCurNeg.style.fill = 0x00A573
                    dividendsPerNeg.alpha = 1
                } else {
                    dividendsNeg.style.fill = 0xF05350
                    dividendsCurNeg.style.fill = 0xF05350
                    dividendsPerNeg.alpha = 0
                }

            }

        }

        return container
    }

}

