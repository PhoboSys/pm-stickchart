import config from '../../config'

import { Graphics } from '../../lib/pixi'
import datamath from '../../lib/datamath'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

export class PoolRenderer extends BaseRenderer {

    static readonly POOL_ID: symbol = Symbol('POOL_ID')

    private readonly openPoolStyle: any
    private readonly lockPoolStyle: any
    private readonly resolutionPoolStyle: any
    private readonly openPricePointStyle: any
    private readonly resolutionPricePointStyle: any

    constructor(renderer: IGraphicRenderer) {
        super(renderer)

        const basicLineStyle = {
            width: 2,
            alpha: 0.7,
            join: 'round',
            cap: 'round',
            torusPadding: 5,
            gap: 10,
            dash: 10,
        }

        const basicTorusStyle = {
            innerr: 2.5,
            outterr: 5,
        }

        const basicTextNameStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
        }

        const basicCoveredTextStyle = {
            radius: 20,
            paddingx: 10,
            paddingy: 5,
            linePadding: 5,
        }

        this.openPoolStyle = {
            paddingTop: 20,
            paddingBottom: 5,
            linestyle: {
                ...basicLineStyle,
                color: 0xB7BDD7,
            },
            torusstyle: {
                ...basicTorusStyle,
                color: 0xB7BDD7,

            },
            coveredNameStyle: {
                ...basicCoveredTextStyle,
                textstyle: {
                    ...basicTextNameStyle,
                    fill: 0x303550,
                },
                linePadding: -5,
                color: 0xB7BDD7,
                anchorx: 1,
                anchory: 0,
            }
        }

        this.lockPoolStyle = {
            paddingTop: 20,
            paddingBottom: 5,
            linestyle: {
                ...basicLineStyle,
                color: 0x00A573,
            },
            torusstyle: {
                ...basicTorusStyle,
                color: 0x00A573
            },
            coveredNameStyle: {
                ...basicCoveredTextStyle,
                textstyle: {
                    ...basicTextNameStyle,
                    fill: 0xFFFFFF,
                },
                color: 0x00A573,
                anchorx: 0,
                anchory: 0,
            }
        }

        this.resolutionPoolStyle = {
            paddingTop: 20,
            paddingBottom: 5,
            linestyle: {
                ...basicLineStyle,
                color: 0xF05350,
            },
            torusstyle: {
                ...basicTorusStyle,
                color: 0xF05350
            },
            coveredNameStyle: {
                ...basicCoveredTextStyle,
                textstyle: {
                    ...basicTextNameStyle,
                    fill: 0xFFFFFF,
                },
                color: 0xF05350,
                anchorx: 0,
                anchory: 0,
            }
        }

        this.openPricePointStyle = {
            circlstyle: {
                inner: {
                    color: 0x303550,
                    radius: 3,
                    alpha: 1,
                },
                outer: {
                    radius: 6,
                    color: 0xB7BDD7,
                    alpha: 1,
                }
            },
            linestyle: {
                color: 0xB7BDD7,
                width: 1,
                alpha: 0.7,
            },
            textCoverStyle: {
                color: 0xB7BDD7,
                paddingx: 10,
                paddingy: 2,
                anchorx: 1.1,
                anchory: 0.5,
                radius: 10,
                textstyle: {
                    fill: 0x303550,
                    fontWeight: 600,
                    fontFamily: 'Gilroy',
                    fontSize: 13,
                }
            }
        }
    }

    public get rendererId() {
        return PoolRenderer.POOL_ID
    }

    protected create(
        context: RenderingContext,
    ): Graphics {
        if (!context.pool) return new Graphics()

        const {
            lockDate,
            openDate,
            resolutionDate,
            openPrice,
        } = context.pool

        const result = new Graphics()
        result.addChild(
            this.createPool(context, 'Open', openDate, this.openPoolStyle),
            this.createPool(context, 'Lock', lockDate, this.lockPoolStyle),
            this.createPool(context, 'Resolution', resolutionDate, this.resolutionPoolStyle),

        )
        if (openPrice) {
            result.addChild(
                this.createPrice(context, openPrice, this.openPricePointStyle)
            )
        }

        return result
    }

    private createPrice(
        context: RenderingContext,
        pricePoint,
        { circlstyle, linestyle, textCoverStyle }
    ) {

        const {
            xrange,
            yrange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const [x] = datamath.scale([pricePoint.timestamp], xrange, width)
        const [yr] = datamath.scale([pricePoint.value], yrange, height)
        const y = height - yr

        const outer = GraphicUtils.createCircle(
            [x, y],
            circlstyle.outer.radius,
            circlstyle.outer,
        )
        const inner = GraphicUtils.createCircle(
            [x, y],
            circlstyle.inner.radius,
            circlstyle.inner,
        )
        const line = GraphicUtils.createLine(
            [0, y],
            [width, y],
            linestyle,
        )

        const coveredText = GraphicUtils.createCoveredText(
            datamath.toFixedPrecisionisionisionisionisionision(pricePoint.value, 8),
            [width, y],
            textCoverStyle,
        )

        const price = new Graphics()
        price.addChild(line, outer, inner, coveredText)
        return price
    }

    private createPool(context: RenderingContext, name: string, poolDate, style): Graphics {
        const {
            xrange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const { paddingTop, paddingBottom } = style
        const [x] = datamath.scale([poolDate], xrange, width)

        const { coveredNameStyle } = style
        const { linePadding: coverpadding } = coveredNameStyle
        const coveredName = GraphicUtils.createCoveredText(
            name,
            [x + coverpadding, paddingTop],
            coveredNameStyle
        )

        const covery = coveredName.y + coveredName.height
        const { torusstyle } = style
        const torus = GraphicUtils.createTorus(
            [x, covery],
            [torusstyle.innerr, torusstyle.outterr],
            torusstyle,
        )

        const torusy = torus.y + torusstyle.outterr
        const { linestyle } = style
        const { torusPadding } = linestyle
        const line = GraphicUtils.createVerticalDashLine( // TODO: dash-line
            x,
            [torusy + torusPadding, height - paddingBottom],
            style.linestyle
        )

        const pool = new Graphics()
        pool.addChild(line, torus, coveredName)
        return pool
    }
}
