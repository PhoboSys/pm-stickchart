import { IGraphicStorage, RenderingContext } from '@rendering'
import { BaseRenderer, GraphicUtils } from '@rendering'

import { Container, gsap } from '@lib/pixi'
import datamath from '@lib/datamath'

export class PariResolvedRenderer extends BaseRenderer {

    static readonly PARI_RESOLVED_ID: symbol = Symbol('PARI_RESOLVED_ID')

    public get rendererId() {
        return PariResolvedRenderer.PARI_RESOLVED_ID
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

        this.subtextstyle = {
            fill: 0xFFFFFF,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 18,
        }

        this.textstylePrecent = {
            fill: 0xFFFFFF,
            fontWeight: 300,
            fontFamily: 'Gilroy',
            fontSize: 15,
        }

    }

    private renderedMetaId: any

    private unresolvedParis: any = {}

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        if (
            !context.pool ||
            !context.paris?.length && !context.resolved?.length
        ) {
            this.clear()

            return container
        }

        // clear if pool changed
        if (this.renderedMetaId !== context.pool.metaid) {
            this.clear()
            this.renderedMetaId = context.pool.metaid
            this.unresolvedParis = {}
        }

        // create Paris for render
        const paris = {}
        const resolvedPari1 = context.resolved.at(0)
        if (resolvedPari1 && this.unresolvedParis[resolvedPari1.position]?.id === resolvedPari1.id) {
            paris[resolvedPari1.position] = resolvedPari1
        }
        const resolvedPari2 = context.resolved.at(1)
        if (resolvedPari2 && this.unresolvedParis[resolvedPari2.position]?.id === resolvedPari2.id) {
            paris[resolvedPari2.position] = resolvedPari2
        }

        // update unresolved paris
        for (const pari of context.paris) {
            this.unresolvedParis[pari.position] = pari
        }

        const anim = {
            win: {
                pixi: {
                    positionY: '-=100',
                    scale: 1.5,
                    alpha: -0.3,
                },
                ease: 'power2.out',
                duration: 12,
            },
            lose: {
                pixi: {
                    positionY: '-=100',
                    scale: 1.5,
                    alpha: -1,
                },
                ease: 'power2.out',
                duration: 12,
            },
        }

        // loop
        const { width, height } = context.screen
        const { timerange, pricerange } = context.plotdata
        for (const position in paris) {
            const pari = paris[position]

            const [x] = datamath.scale([pari.resolutionDate], timerange, width)
            const [y] = datamath.scaleReverse([pari.openPrice.value], pricerange, height)

            const gap = 6
            const xpad = 8

            const prize = datamath.returnPrize({
                wager: pari.wager,
                position: pari.position,
                resolution: pari.resolution,
                positiveFund: pari.positiveFund,
                negativeFund: pari.negativeFund,
                precision: 5
            })

            const percent = datamath.profitPercent(prize, pari.wager, 2)
            const isWinning = prize !== 0

            if (pari.position === 'POS') {

                const [prizePos, prizePosState] = this.get('prizePos', () => new Container())
                if (prizePosState.new) container.addChild(prizePos)

                if (prizePosState.animation !== 'POS') {
                    prizePosState.animation = 'POS'

                    prizePos.position.set(x, y)
                    this.unresolvedParis = {}

                    if (isWinning) {

                        prizePosState.timeline = gsap.to(prizePos, {
                            ...anim.win,
                            onComplete: () => {
                                this.clear('prizePos')
                                this.clear('dividendsPos')
                                this.clear('dividendsCurPos')
                                this.clear('dividendsPerPos')
                            }
                        })

                    } else {

                        prizePosState.timeline = gsap.to(prizePos, {
                            ...anim.lose,
                            onComplete: () => {
                                this.clear('prizePos')
                                this.clear('dividendsPos')
                                this.clear('dividendsCurPos')
                                this.clear('dividendsPerPos')
                            }
                        })

                    }
                }

                const [dividendsPos, dividendsPosState] = this.get(
                    'dividendsPos',
                    () => GraphicUtils.createText(
                        prize,
                        [0, 0],
                        this.textstyle,
                        [0, 1.25],
                    )
                )
                if (dividendsPosState.new) prizePos.addChild(dividendsPos)
                dividendsPos.position.set(xpad, 0)
                dividendsPos.text = String(prize)

                const [dividendsCurPos, dividendsCurPosState] = this.get(
                    'dividendsCurPos',
                    () => GraphicUtils.createText(
                        pari.currency,
                        [0, 0],
                        this.subtextstyle,
                        [0, 1.25],
                    )
                )
                if (dividendsCurPosState.new) prizePos.addChild(dividendsCurPos)
                dividendsCurPos.position.set(xpad + dividendsPos.width + gap, 0)

                const [dividendsPerPos, dividendsPerPosState] = this.get(
                    'dividendsPerPos',
                    () => GraphicUtils.createText(
                        percent + '%',
                        [0, 0],
                        this.textstylePrecent,
                        [0, 1.25],
                    )
                )
                if (dividendsPerPosState.new) prizePos.addChild(dividendsPerPos)
                dividendsPerPos.position.set(xpad, -dividendsPos.height)
                dividendsPerPos.text = percent + '%'

                dividendsPos.alpha = 5
                dividendsCurPos.alpha = 5
                if (isWinning) {
                    dividendsPos.style.fill = 0x00A573
                    dividendsCurPos.style.fill = 0x00A573
                    dividendsPerPos.alpha = 5
                } else {
                    dividendsPos.style.fill = 0xF05350
                    dividendsCurPos.style.fill = 0xF05350
                    dividendsPerPos.alpha = 0
                }

            }

            if (pari.position === 'NEG') {

                const [prizeNeg, prizeNegState] = this.get('prizeNeg', () => new Container())
                if (prizeNegState.new) container.addChild(prizeNeg)

                if (prizeNegState.animation !== 'NEG') {
                    prizeNegState.animation = 'NEG'

                    prizeNeg.position.set(x, y)
                    this.unresolvedParis = {}

                    if (isWinning) {

                        prizeNegState.timeline = gsap.to(prizeNeg, {
                            ...anim.win,
                            onComplete: () => {
                                this.clear('prizeNeg')
                                this.clear('dividendsNeg')
                                this.clear('dividendsCurNeg')
                                this.clear('dividendsPerNeg')
                            }
                        })

                    } else {

                        prizeNegState.timeline = gsap.to(prizeNeg, {
                            ...anim.lose,
                            onComplete: () => {
                                this.clear('prizeNeg')
                                this.clear('dividendsNeg')
                                this.clear('dividendsCurNeg')
                                this.clear('dividendsPerNeg')
                            }
                        })

                    }
                }

                const [dividendsNeg, dividendsNegState] = this.get(
                    'dividendsNeg',
                    () => GraphicUtils.createText(
                        prize,
                        [0, 0],
                        this.textstyle,
                        [0, -0.3],
                    )
                )
                if (dividendsNegState.new) prizeNeg.addChild(dividendsNeg)
                dividendsNeg.position.set(xpad, 0)
                dividendsNeg.text = String(prize)

                const [dividendsCurNeg, dividendsCurNegState] = this.get(
                    'dividendsCurNeg',
                    () => GraphicUtils.createText(
                        pari.currency,
                        [0, 0],
                        this.subtextstyle,
                        [0, -0.3],
                    )
                )
                if (dividendsCurNegState.new) prizeNeg.addChild(dividendsCurNeg)
                dividendsCurNeg.position.set(xpad + dividendsNeg.width + gap, 0)

                const [dividendsPerNeg, dividendsPerNegState] = this.get(
                    'dividendsPerNeg',
                    () => GraphicUtils.createText(
                        percent + '%',
                        [0, 0],
                        this.textstylePrecent,
                        [0, -0.3],
                    )
                )

                if (dividendsPerNegState.new) prizeNeg.addChild(dividendsPerNeg)
                dividendsPerNeg.position.set(xpad, dividendsNeg.height)
                dividendsPerNeg.text = percent + '%'

                dividendsNeg.alpha = 5
                dividendsCurNeg.alpha = 5
                if (isWinning) {
                    dividendsNeg.style.fill = 0x00A573
                    dividendsCurNeg.style.fill = 0x00A573
                    dividendsPerNeg.alpha = 5
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

