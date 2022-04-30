import { Graphics, Container, Sprite, gsap } from '../../../../lib/pixi'
import datamath from '../../../../lib/datamath'

import { IGraphicStorage, RenderingContext } from '../../..'
import { BaseRenderer, GraphicUtils } from '../../..'
import { DateUtils } from '../../../utils'

import { DOWN_WAGET_TEXTURE, UP_WAGET_TEXTURE } from '../../..'

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
        if (
            !context.pool ||
            !context.pool.openPrice ||
            !context.paris?.length
        ) {
            this.clear()
            return container
        }

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
        const paries = {}
        for (const pari of context.paris) paries[pari.position] = pari
        if (!paries['POS']) this.clear('gradientPos')
        if (!paries['NEG']) this.clear('gradientNeg')

        const anim = {
            high: {
                lable: 'high',
                pixi: {
                    height: height * 0.9,
                    alpha: 0.3,
                },
                duration: 0.5,
                ease: 'back.inOut(2)',
            },
            low: {
                lable: 'low',
                pixi: {
                    height: height * 0.4,
                    alpha: 0.15,
                },
                duration: 0.5,
                ease: 'back.inOut(2)',
            },
            settle: {
                lable: 'settle',
                pixi: {
                    height: height * 0.9,
                    alpha: 0.6,
                },
                duration: 4,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true,
                yoyoEase: 'power3.in',
            }
        }

        // pool
        for (const pari of context.paris) {

            if (pari.position === 'POS') {

                const [gradientPos, statepos] = this.get('gradientPos', () => new Sprite(context.textures.get(UP_WAGET_TEXTURE)))
                if (statepos.new) container.addChild(gradientPos)

                gradientPos.position.set(ox, y)
                gradientPos.width = rx-ox

                // flip
                if (statepos.new) gradientPos.scale.y *= -1

                if (pari.position === context.pool.resolution) {

                    if (statepos.new) {
                        gradientPos.alpha = anim.high.pixi.alpha
                        gradientPos.height = anim.high.pixi.height
                    }

                    if (context.pool.settling) {

                        if (statepos.animation !== anim.settle.lable) {
                            statepos.animation = anim.settle.lable

                            gsap.to(gradientPos, anim.settle)

                        }

                    } else {

                        if (statepos.animation !== anim.high.lable) {
                            statepos.animation = anim.high.lable

                            gsap.to(gradientPos, anim.high)
                        }

                    }

                } else {

                    if (statepos.new) {
                        gradientPos.alpha = anim.low.pixi.alpha
                        gradientPos.height = anim.low.pixi.height
                    }

                    if (statepos.animation !== anim.low.lable) {
                        statepos.animation = anim.low.lable

                        gsap.to(gradientPos, anim.low)
                    }

                }
            }

            if (pari.position === 'NEG') {

                const [gradientNeg, stateneg] = this.get('gradientNeg', () => new Sprite(context.textures.get(DOWN_WAGET_TEXTURE)))
                if (stateneg.new) container.addChild(gradientNeg)

                gradientNeg.position.set(ox, y)
                gradientNeg.width = rx-ox

                if (pari.position === context.pool.resolution) {

                    if (stateneg.new) {
                        gradientNeg.alpha = anim.high.pixi.alpha
                        gradientNeg.height = anim.high.pixi.height
                    }

                    if (context.pool.settling) {

                        if (stateneg.animation !== anim.settle.lable) {
                            stateneg.animation = anim.settle.lable

                            gsap.to(gradientNeg, anim.settle)

                        }

                    } else {

                        if (stateneg.animation !== anim.high.lable) {
                            stateneg.animation = anim.high.lable

                            gsap.to(gradientNeg, anim.high)
                        }

                    }

                } else {

                    if (stateneg.new) {
                        gradientNeg.alpha = anim.low.pixi.alpha
                        gradientNeg.height = anim.low.pixi.height
                    }

                    if (stateneg.animation !== anim.low.lable) {
                        stateneg.animation = anim.low.lable

                        gsap.to(gradientNeg, anim.low)
                    }

                }
            }

        }

        return container
    }

}

