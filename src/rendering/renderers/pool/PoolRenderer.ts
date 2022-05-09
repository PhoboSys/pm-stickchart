import config  from '../../../config'
import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer, GraphicUtils } from '../..'
import { POOL_ROUND_TEXTURE, LOCK_ICON_TEXTURE } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text, GradientFactory, RenderTexture, Renderer, ColorStop } from '../../../lib/pixi'
import { ROYAL, SILVER, GOLD } from '../../../constants/poollevels'

export class PoolRenderer extends BaseRenderer {

    static readonly POOL_ID: symbol = Symbol('POOL_ID')

    private _context: RenderingContext

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
            outerr: 5,
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
            paddingBottom: 10,
            linestyle: {
                ...basicLineStyle,
            },
            torusstyle: {
                ...basicTorusStyle,
                color: 0xF05350,
            },
            coveredNameStyle: {
                ...basicCoveredTextStyle,
                textstyle: {
                    ...basicTextNameStyle,
                    fill: config.style.background,
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

        this.updateResolutionPool(context, container)

        const [price, priceState] = this.createPrice(context, openPrice, this.openPricePointStyle)
        if (priceState.new) container.addChild(price)

        this._context = context

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
            [torusstyle.innerr, torusstyle.outerr],
            torusstyle,
        ))
        torus.position.set(
            x,
            covery
        )

        const torusy = torus.y + torusstyle.outerr
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
            [torusstyle.innerr, torusstyle.outerr],
            torusstyle,
        ))

        torus.position.set(
            x,
            covery
        )

        const torusy = torus.y + torusstyle.outerr
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

    private getLevelGradientColors(context: RenderingContext): ColorStop[] {
        switch (context.pool.level) {
            case ROYAL:
                return config.style.levels.royalColors
            case SILVER:
                return config.style.levels.silverColors
            case GOLD:
                return config.style.levels.goldColors

            default:
                throw Error('pool level is not supported')
        }
    }

    private updateResolutionPool(context: RenderingContext, container: Container): Container {
        if (this._context && this._context.screen !== context.screen) {
            this.clear('resolutionDashLine')
        }

        const {
            timerange,
        } = context.plotdata

        const {
            width,
        } = context.screen

        const { paddingTop } = this.resolutionPoolStyle
        const [x] = datamath.scale([context.pool.resolutionDate], timerange, width)

        const [cover, coverstate] = this.get<Graphics>(
            'resolutionTextCover', () => this.createResolutionCover(context)
        )
        if (coverstate.new) {
            container.addChild(cover)

            cover.position.y = paddingTop
        }

        const { linePadding } = this.resolutionPoolStyle.coveredNameStyle
        cover.position.x = x + linePadding

        const [torus, torusstate] = this.get<Graphics>(
            'resolutionTorus', () => this.createResolutionTorus(context)
        )
        if (torusstate.new) {
            container.addChild(torus)

            torus.position.y = cover.position.y + cover.height
        }

        torus.position.x = x

        const { outerr } = this.resolutionPoolStyle.torusstyle
        const { torusPadding } = this.resolutionPoolStyle.linestyle
        const linestarty = torus.position.y + outerr + torusPadding

        const [line, linestate] = this.get<Graphics>(
            'resolutionLine', () => this.createResolutionDash(context, linestarty)
        )
        if (linestate.new) container.addChild(line)

        line.position.x = x

        return container
    }

    private createResolutionCover(context: RenderingContext): Graphics {
        const { coveredNameStyle } = this.resolutionPoolStyle
        const { paddingx, paddingy, radius } = coveredNameStyle

        const text = new Text(
            'Resolution', coveredNameStyle.textstyle)
        text.position.set(paddingx, paddingy)

        const width = text.width + paddingx * 2
        const height = text.height + paddingy * 2

        const coverGradient = GradientFactory.createLinearGradient(
            <Renderer>context.renderer,
            RenderTexture.create({ width, height }),
            {
                x0: 0,
                y0: -height * .5,
                x1: width,
                y1: height * 1.5,
                colorStops: this.getLevelGradientColors(context)
            },
        )

        const cover = new Graphics()
            .beginTextureFill({ texture: coverGradient })
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill()

        const coveredText = new Graphics()

        coveredText.addChild(cover, text)

        return coveredText
    }

    private createResolutionTorus(context: RenderingContext): Graphics {
        const { innerr, outerr } = this.resolutionPoolStyle.torusstyle

        const size = outerr * 2

        const gradient = GradientFactory.createLinearGradient(
            <Renderer>context.renderer,
            RenderTexture.create({ width: size, height: size }),
            {
                x0: 0,
                y0: size,
                x1: size,
                y1: 0,
                colorStops: this.getLevelGradientColors(context)
            },
        )

        const torus = new Graphics()
            .beginTextureFill({ texture: gradient,  })
            .drawTorus!(0, 0, innerr, outerr)
            .endFill()

        return torus
    }

    private createResolutionDash(context: RenderingContext, starty: number): Graphics {
        const { height } = context.screen

        const { width: linewidth } = this.resolutionPoolStyle.linestyle

        const [gradient] = this.get<RenderTexture>(
            'resolutionDashGradient',
            () => GradientFactory.createLinearGradient(
                <Renderer>context.renderer,
                RenderTexture.create({ height: context.screen.height, width: linewidth }),
                {
                    x0: linewidth,
                    y0: height,
                    x1: 0,
                    y1: 0,
                    colorStops: this.getLevelGradientColors(context)
                }
            )
        )
        const { paddingBottom, linestyle } = this.resolutionPoolStyle

        const dash = GraphicUtils.createTexturedVerticalDashLine(
            0,
            [starty, height - paddingBottom],
            { ...linestyle, texture: gradient }
        )

        return dash
    }

}
