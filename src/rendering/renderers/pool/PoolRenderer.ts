import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer, GraphicUtils } from '../..'
import { POOL_ROUND_TEXTURE, LOCK_ICON_TEXTURE } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container } from '../../../lib/pixi'

export class PoolRenderer extends BaseRenderer {

    static readonly POOL_ID: symbol = Symbol('POOL_ID')

    private readonly openPoolStyle: any
    private readonly lockPoolStyle: any
    private readonly resolutionPoolStyle: any
    private readonly openPricePointStyle: any
    private readonly resolutionPricePointStyle: any

    constructor(renderer: IGraphicStorage) {
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

        this.lockPoolStyle = {
            paddingTop: 20,
            paddingBottom: 20,
            linestyle: {
                ...basicLineStyle,
                color: 0xFFA000,
            },
            torusstyle: {
                ...basicTorusStyle,
                color: 0xFFA000,
            },
            coveredIconStyle: {
                ...basicCoveredTextStyle,
                radius: 8,
                paddingx: 7,
                iconstyle: {
                    size: 13,
                },
                color: 0xFFA000,
                anchorx: 0,
                anchory: 0,
            },
        }

        this.resolutionPoolStyle = {
            paddingTop: 20,
            paddingBottom: 20,
            linestyle: {
                ...basicLineStyle,
                color: 0xF05350,
            },
            torusstyle: {
                ...basicTorusStyle,
                color: 0xF05350,
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
            },
        }

        this.openPoolStyle = {
            paddingTop: 20,
            paddingBottom: 20,
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
                    fill: 0xB7BDD7,
                },
                linestyle: {
                    color: 0xB7BDD7,
                    width: 1,
                },
                linePadding: -5,
                color: 0x22273F,
                bordercolor: 0xB7BDD7,
                anchorx: 1,
                anchory: 0,
            },
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
                },
            },
            linestyle: {
                color: 0xB7BDD7,
                width: 1,
                alpha: 0.7,
            },
            textCoverStyle: {
                color: 0x22273F,
                paddingx: 7,
                paddingy: 5,
                anchorx: 1.1,
                anchory: 0.5,
                radius: 30,
                textstyle: {
                    fill: 0xB7BDD7,
                    fontWeight: 600,
                    fontFamily: 'Gilroy',
                    fontSize: 13,
                },
                linestyle: {
                    color: 0xB7BDD7,
                    width: 1,
                },
            },
        }
    }

    public get rendererId(): symbol {
        return PoolRenderer.POOL_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        if (!context.pool) return new Graphics()

        const {
            lockDate,
            openDate,
            resolutionDate,
            openPrice,
        } = context.pool

        const {
            timerange,
            pricerange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const result = new Graphics()

        const [ox, rx] = datamath.scale([openDate, resolutionDate], timerange, width)

        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ]

        const gradient = new Graphics()

        gradient.beginTextureFill({
            texture: context.textures.get(POOL_ROUND_TEXTURE),
            alpha: 0.07,
        })
        gradient.drawPolygon(shape)
        gradient.closePath()
        gradient.endFill()

        result.addChild(gradient)

        this.lockPoolStyle.coveredIconStyle.texture = context.textures.get(LOCK_ICON_TEXTURE)
        result.addChild(
            this.createPoolBorder(context, 'Start', openDate, this.openPoolStyle),
            this.createLockLine(context, lockDate, this.lockPoolStyle),
            this.createPoolBorder(context, 'Resolution', resolutionDate, this.resolutionPoolStyle),
        )
        if (openPrice) {
            result.addChild(
                this.createPrice(context, openPrice, this.openPricePointStyle),
            )
        }

        return result
    }

    private createPrice(
        context: RenderingContext,
        pricePoint,
        { circlstyle, linestyle, textCoverStyle },
    ): Graphics {

        const {
            timerange,
            pricerange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const [x] = datamath.scale([pricePoint.timestamp], timerange, width)
        const [y] = datamath.scaleReverse([pricePoint.value], pricerange, height)

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
            datamath.toFixedPrecision(pricePoint.value, 8),
            [width, y],
            textCoverStyle,
        )

        const price = new Graphics()

        price.addChild(line, outer, inner, coveredText)

        return price
    }

    private createLockLine(context: RenderingContext, poolDate, style): Graphics {
        const {
            timerange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const { paddingTop, paddingBottom } = style
        const [x] = datamath.scale([poolDate], timerange, width)

        const { coveredIconStyle } = style
        const { linePadding: coverpadding } = coveredIconStyle
        const coveredIcon = GraphicUtils.createCoveredIcon(
            [x + coverpadding, paddingTop],
            coveredIconStyle,
        )

        const covery = coveredIcon.y + coveredIcon.height
        const { torusstyle } = style
        const torus = GraphicUtils.createTorus(
            [x, covery],
            [torusstyle.innerr, torusstyle.outterr],
            torusstyle,
        )

        const torusy = torus.y + torusstyle.outterr
        const { linestyle } = style
        const { torusPadding } = linestyle
        const line = GraphicUtils.createVerticalDashLine(
            x,
            [torusy + torusPadding, height - paddingBottom],
            style.linestyle,
        )

        const pool = new Graphics()

        pool.addChild(line, torus, coveredIcon)

        return pool

    }

    private createPoolBorder(context: RenderingContext, title: string, poolDate, style): Graphics {
        const {
            timerange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const { paddingTop, paddingBottom } = style
        const [x] = datamath.scale([poolDate], timerange, width)

        const { coveredNameStyle } = style
        const { linePadding: coverpadding } = coveredNameStyle
        const coveredName = GraphicUtils.createCoveredText(
            title,
            [x + coverpadding, paddingTop],
            coveredNameStyle,
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
        const line = GraphicUtils.createVerticalDashLine(
            x,
            [torusy + torusPadding, height - paddingBottom],
            style.linestyle,
        )

        const pool = new Graphics()

        pool.addChild(line, torus, coveredName)

        return pool
    }
}
