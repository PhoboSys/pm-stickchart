import { Graphics, Container, Sprite, gsap } from '../../lib/pixi'
import datamath from '../../lib/datamath'

import { IGraphicStorage, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'
import { DateUtils } from '../utils';

import { DOWN_WAGET_TEXTURE, UP_WAGET_TEXTURE } from '..'

export class PariResolutionRenderer extends BaseRenderer {

    static readonly PARI_RESOLUTION_ID: symbol = Symbol('PARI_RESOLUTION_ID')

    public get rendererId() {
        return PariResolutionRenderer.PARI_RESOLUTION_ID
    }

    private readonly wagerUp: any
    private readonly wagerDown: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.wagerUp = {
            linestyle: {
                width: 1,
                color: 0xFFFFFF,
                alpha: 1,
            },
            textstyle: {
                fill: 0x00A573,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 29,
            },
            outerPoint: {
                color: 0x00A573,
                radius: 6
            },
            innerPoint: {
                color: 0xFFFFFF,
                radius: 3
            },
        }

        this.wagerDown = {
            linestyle:  {
                width: 1,
                color: 0xFFFFFF,
                alpha: 1,
            },
            textstyle: {
                fill: 0xD64E48,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 29,
            },
            outerPoint: {
                color: 0xD64E48,
                radius: 6
            },
            innerPoint: {
                color: 0xFFFFFF,
                radius: 3
            },
        }
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        if (!context.pool) return new Container()
        if (!context.pool.openPrice) return new Container()
        if (!context.paris?.length) return new Container()

        const { openDate, resolutionDate, openPrice } = context.pool

        const { width, height } = context.screen
        const { xrange, yrange, ylast } = context.plotdata

        const [ox, rx] = datamath.scale([openDate, resolutionDate], xrange, width)
        const [yr] = datamath.scale([openPrice.value], yrange, height)
        const y = height - yr

        for (const pari of context.paris) {

            if (pari.position === 'POS') {

                const [gradientpos, statepos] = this.get('gradientpos', () => new Sprite(context.textures.get(UP_WAGET_TEXTURE)))
                if (statepos.new) container.addChild(gradientpos)

                gradientpos.position.set(ox, y)
                gradientpos.width = rx-ox

                if (statepos.new) {
                    gradientpos.height = height * 0.3
                    gradientpos.alpha = 0
                    // flip
                    gradientpos.scale.y *= -1
                }

                if (ylast > context.pool.openPrice.value) {

                    if (statepos.animation !== 'hight') {
                        statepos.animation = 'hight'

                        gsap.to(gradientpos, {
                            pixi: {
                                alpha: 0.3,
                                height: height * 0.6,
                            },
                            duration: 0.5
                        })
                    }

                } else {

                    if (statepos.animation !== 'low') {
                        statepos.animation = 'low'

                        gsap.to(gradientpos, {
                            pixi: {
                                alpha: 0.15,
                                height: height * 0.3,
                            },
                            duration: 0.5
                        })
                    }

                }
            }

            if (pari.position === 'NEG') {

                const [gradientneg, stateneg] = this.get('gradientneg', () => new Sprite(context.textures.get(DOWN_WAGET_TEXTURE)))
                if (stateneg.new) container.addChild(gradientneg)

                gradientneg.position.set(ox, y)
                gradientneg.width = rx-ox

                if (stateneg.new) {
                    gradientneg.height = height * 0.3
                    gradientneg.alpha = 0
                }

                if (ylast < context.pool.openPrice.value) {

                    if (stateneg.animation !== 'hight') {
                        stateneg.animation = 'hight'

                        gsap.to(gradientneg, {
                            pixi: {
                                alpha: 0.3,
                                height: height * 0.6,
                            },
                            duration: 0.5
                        })
                    }

                } else {

                    if (stateneg.animation !== 'low') {
                        stateneg.animation = 'low'

                        gsap.to(gradientneg, {
                            pixi: {
                                alpha: 0.15,
                                height: height * 0.3,
                            },
                            duration: 0.5
                        })
                    }

                }
            }

        }

        return container
    }

}

