import { IGraphicStorage, RenderingContext } from '..'
import { BaseRenderer } from '..'

import { DOWN_WAGET_TEXTURE, UP_WAGET_TEXTURE } from '..'
import datamath from '../../lib/datamath'
import { Container, Sprite, gsap } from '../../lib/pixi'

export class PariResolutionBackground extends BaseRenderer {

    static readonly PARI_RESOLUTION_ID: symbol = Symbol('PARI_RESOLUTION_ID')

    public get rendererId() {
        return PariResolutionBackground.PARI_RESOLUTION_ID
    }

    private renderedMetaId: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        if (!context.pool) return new Container()
        if (!context.pool.openPrice) return new Container()
        if (!context.paris?.length) return new Container()

        // clear if pool metaid changed
        if (this.renderedMetaId && this.renderedMetaId !== context.pool.metaid) {
            this.clear()
        }

        this.renderedMetaId = context.pool.metaid

        const { openDate, resolutionDate, openPrice } = context.pool

        const { width, height } = context.screen
        const { xrange, yrange, ylast } = context.plotdata

        const [ox, rx] = datamath.scale([openDate, resolutionDate], xrange, width)
        const [yr] = datamath.scale([openPrice.value], yrange, height)
        const y = height - yr

        // clear if one dissapeared
        const paries: any = {}

        for (const pari of context.paris) paries[pari.position] = pari
        if (!paries['POS']) this.clear('gradientPos')
        if (!paries['NEG']) this.clear('gradientNeg')

        const anim = {
            high: {
                height: height * 0.9,
                alpha: 0.3,
                duration: 0.5,
                ease: 'back.inOut(2)',
            },
            low: {
                height: height * 0.4,
                alpha: 0.15,
                duration: 0.5,
                ease: 'back.inOut(2)',
            },
            settle: {
                height: height * 0.9,
                alpha: 0.6,
                duration: 12,
                ease: 'back.out(1.7)',
            }
        }

        // pool
        for (const pari of context.paris) {

            if (pari.position === 'POS') {

                const [gradientPos, statepos] = this.use('gradientPos', () => new Sprite(context.textures.get(UP_WAGET_TEXTURE)))

                if (statepos.new) container.addChild(gradientPos)

                gradientPos.position.set(ox, y)
                gradientPos.width = rx-ox

                // flip
                if (statepos.new) gradientPos.scale.y *= -1

                if (pari.position === context.pool.resolution) {

                    if (statepos.new) {
                        gradientPos.alpha = anim.high.alpha
                        gradientPos.height = anim.high.height
                    }

                    if (statepos.animation !== 'high') {
                        statepos.animation = 'high'

                        gsap.to(gradientPos, {
                            pixi: {
                                alpha: anim.high.alpha,
                                height: anim.high.height,
                            },
                            duration: anim.high.duration,
                            ease: anim.high.ease,
                        })
                    }

                    if (context.pool.settling) {

                        if (statepos.animation !== 'settle') {
                            statepos.animation = 'settle'

                            gsap.to(gradientPos, {
                                pixi: {
                                    alpha: anim.settle.alpha,
                                    height: anim.settle.height,
                                },
                                duration: anim.settle.duration,
                                ease: anim.settle.ease,
                            })

                        }

                    }

                } else {

                    if (statepos.new) {
                        gradientPos.alpha = anim.low.alpha
                        gradientPos.height = anim.low.height
                    }

                    if (statepos.animation !== 'low') {
                        statepos.animation = 'low'

                        gsap.to(gradientPos, {
                            pixi: {
                                alpha: anim.low.alpha,
                                height: anim.low.height,
                            },
                            duration: anim.low.duration,
                            ease: anim.low.ease,
                        })
                    }

                }
            }

            if (pari.position === 'NEG') {

                const [gradientNeg, stateneg] = this.use('gradientNeg', () => new Sprite(context.textures.get(DOWN_WAGET_TEXTURE)))

                if (stateneg.new) container.addChild(gradientNeg)

                gradientNeg.position.set(ox, y)
                gradientNeg.width = rx-ox

                if (pari.position === context.pool.resolution) {

                    if (stateneg.new) {
                        gradientNeg.alpha = anim.high.alpha
                        gradientNeg.height = anim.high.height
                    }

                    if (stateneg.animation !== 'hight') {
                        stateneg.animation = 'hight'

                        gsap.to(gradientNeg, {
                            pixi: {
                                alpha: anim.high.alpha,
                                height: anim.high.height,
                            },
                            duration: anim.high.duration,
                            ease: anim.high.ease,
                        })
                    }

                    if (context.pool.settling) {

                        if (stateneg.animation !== 'settle') {
                            stateneg.animation = 'settle'
                            console.log('settle!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

                            gsap.to(gradientNeg, {
                                pixi: {
                                    alpha: anim.settle.alpha,
                                    height: anim.settle.height,
                                },
                                duration: anim.settle.duration,
                                ease: anim.settle.ease,
                            })

                        }

                    }

                } else {

                    if (stateneg.new) {
                        gradientNeg.alpha = anim.low.alpha
                        gradientNeg.height = anim.low.height
                    }

                    if (stateneg.animation !== 'low') {
                        stateneg.animation = 'low'

                        gsap.to(gradientNeg, {
                            pixi: {
                                alpha: anim.low.alpha,
                                height: anim.low.height,
                            },
                            duration: anim.low.duration,
                            ease: anim.low.ease,
                        })
                    }

                }
            }

        }

        return container
    }

}

