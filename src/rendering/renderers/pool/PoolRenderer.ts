import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer, GraphicUtils } from '../..'
import { POOL_ROUND_TEXTURE, LOCK_ICON_TEXTURE } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text } from '../../../lib/pixi'

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
                paddingx: 8,
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
        if (!context.pool) {
            this.clear()
            return container
        }

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

        const [ox, rx] = datamath.scale([openDate, resolutionDate], timerange, width)

        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ]

        const [gradient, gradientState] = this.get('gradient', () => new Graphics())
        if (gradientState.new) container.addChild(gradient)

        gradient
            .clear()
            .beginTextureFill({
                texture: context.textures.get(POOL_ROUND_TEXTURE),
                alpha: 0.07,
            })
            .drawPolygon(shape)
            .closePath()
            .endFill()

        const [lock, lockState] = this.createLockLine(context, lockDate, this.lockPoolStyle)
        if (lockState.new) container.addChild(lock)

        const [start, startState] = this.createPoolBorder(context, 'Start', openDate, this.openPoolStyle)
        if (startState.new) container.addChild(start)

        const [resolution, resolutionState] = this.createPoolBorder(context, 'Resolution', resolutionDate, this.resolutionPoolStyle)
        if (resolutionState.new) container.addChild(resolution)

        const [price, priceState] = this.createPrice(context, openPrice, this.openPricePointStyle)
        if (priceState.new) container.addChild(price)

        return container
    }

    private createPrice(
        context: RenderingContext,
        pricePoint,
        { circlstyle, linestyle, textCoverStyle },
    ): [Container, any] {

        const {
            timerange,
            pricerange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const [priceline, pricelineState] = this.get('priceline', () => new Container())

        if (!pricePoint) {
            this.clear('outerPrice')
            this.clear('innerPrice')
            this.clear('linePrice')
            this.clear('coveredTextPrice')

            return [priceline, pricelineState]
        }

        const [x] = datamath.scale([pricePoint.timestamp], timerange, width)
        const [y] = datamath.scaleReverse([pricePoint.value], pricerange, height)

        const [outer, outerState] = this.get('outerPrice', () => GraphicUtils.createCircle(
            [x, y],
            circlstyle.outer.radius,
            circlstyle.outer,
        ))
        outer.position.set(
            x,
            y,
        )

        const [inner, innerState] = this.get('innerPrice', () => GraphicUtils.createCircle(
            [x, y],
            circlstyle.inner.radius,
            circlstyle.inner,
        ))
        inner.position.set(
            x,
            y,
        )

        const [line, lineState] = this.get('linePrice', () => GraphicUtils.createLine(
            [0, 0],
            [width, 0],
            linestyle,
        ))
        line.position.set(
            0,
            y,
        )
        line.width = width

        const [coveredText, coveredTextState] = this.get('coveredTextPrice', () => GraphicUtils.createCoveredText(
            datamath.toFixedPrecision(pricePoint.value, 8),
            [width, y],
            textCoverStyle,
        ))
        const textGraphic = <Text>coveredText.getChildAt(1)
        const price = datamath.toFixedPrecision(pricePoint.value, 8)
        if (textGraphic.text !== price) {
            textGraphic.text = price

            const { paddingx, paddingy } = textCoverStyle
            const coverGraphic = <Graphics>coveredText.getChildAt(0)
            coverGraphic.width = textGraphic.width + paddingx * 2
            coverGraphic.height = textGraphic.height + paddingy * 2
        }

        const { anchorx, anchory } = textCoverStyle
        coveredText.position.set(
            width - coveredText.width * anchorx,
            y - coveredText.height * anchory
        )

        if (lineState.new) priceline.addChild(line)
        if (outerState.new) priceline.addChild(outer)
        if (innerState.new) priceline.addChild(inner)
        if (coveredTextState.new) priceline.addChild(coveredText)

        return [priceline, pricelineState]
    }

    private createLockLine(context: RenderingContext, poolDate, style): [Container, any] {
        const {
            timerange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const [poolline, poollineState] = this.get('poollineLock', () => new Container())

        const { paddingTop, paddingBottom } = style
        const [x] = datamath.scale([poolDate], timerange, width)

        const { coveredIconStyle } = style
        coveredIconStyle.texture = context.textures.get(LOCK_ICON_TEXTURE)

        const { linePadding: coverpadding } = coveredIconStyle
        const [coveredIcon, coveredIconState] = this.get('coveredIcon', () => GraphicUtils.createCoveredIcon(
            [x + coverpadding, paddingTop],
            coveredIconStyle,
        ))

        const { anchorx, anchory } = coveredIconStyle
        coveredIcon.position.set(
            (x + coverpadding) - coveredIcon.width * anchorx,
            paddingTop - coveredIcon.height * anchory
        )

        const covery = coveredIcon.y + coveredIcon.height
        const { torusstyle } = style
        const [torus, torusState] = this.get('torusLock', () => GraphicUtils.createTorus(
            [x, covery],
            [torusstyle.innerr, torusstyle.outterr],
            torusstyle,
        ))
        torus.position.set(
            x,
            covery
        )

        const torusy = torus.y + torusstyle.outterr
        const { linestyle } = style
        const { torusPadding } = linestyle
        const [line, lineState] = this.get('lineLock', () => GraphicUtils.createVerticalDashLine(
            0,
            [torusy + torusPadding, height - paddingBottom],
            style.linestyle,
        ))
        line.position.set(
            x,
            0,
        )
        line.height = height - (paddingBottom + torusy + torusPadding)

        if (lineState.new) poolline.addChild(line)
        if (torusState.new) poolline.addChild(torus)
        if (coveredIconState.new) poolline.addChild(coveredIcon)

        return [poolline, poollineState]
    }

    private createPoolBorder(context: RenderingContext, title: string, poolDate, style): [Container, any] {
        const {
            timerange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const [poolline, poollineState] = this.get('poolline'+title, () => new Container())

        const { paddingTop, paddingBottom } = style
        const [x] = datamath.scale([poolDate], timerange, width)

        const { coveredNameStyle } = style
        const { linePadding: coverpadding } = coveredNameStyle
        const [coveredName, coveredNameState] = this.get('cover'+title, () => GraphicUtils.createCoveredText(
            title,
            [x + coverpadding, paddingTop],
            coveredNameStyle,
        ))

        const { anchorx, anchory } = coveredNameStyle
        coveredName.position.set(
            (x + coverpadding) - coveredName.width * anchorx,
            paddingTop - coveredName.height * anchory
        )

        const covery = coveredName.y + coveredName.height
        const { torusstyle } = style
        const [torus, torusState] = this.get('torus'+title, () => GraphicUtils.createTorus(
            [x, covery],
            [torusstyle.innerr, torusstyle.outterr],
            torusstyle,
        ))

        torus.position.set(
            x,
            covery
        )

        const torusy = torus.y + torusstyle.outterr
        const { linestyle } = style
        const { torusPadding } = linestyle
        const [line, lineState] = this.get('line'+title, () => GraphicUtils.createVerticalDashLine(
            0,
            [torusy + torusPadding, height - paddingBottom],
            style.linestyle,
        ))
        line.position.set(
            x,
            0,
        )
        line.height = height - (paddingBottom + torusy + torusPadding)

        if (lineState.new) poolline.addChild(line)
        if (torusState.new) poolline.addChild(torus)
        if (coveredNameState.new) poolline.addChild(coveredName)

        return [poolline, poollineState]
    }
}
