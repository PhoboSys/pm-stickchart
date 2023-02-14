import { RenderingContext, IGraphicStorage, BaseRenderer, GraphicUtils } from '@rendering'

import { PointermoveEvent } from '@events'

import datamath from '@lib/datamath'
import { Graphics, Container, Text } from '@lib/pixi'
import ui from '@lib/ui'

import { USD } from '@constants'

export class CrosshairRenderer extends BaseRenderer {

    static readonly CROSSHAIR_ID: symbol = Symbol('CROSSHAIR_ID')

    private readonly lineStyle: any

    private readonly priceCoverStyle: any

    private readonly timeCoverStyle: any

    private handlePointermoveEvent: any

    private handlePointerleaveEvent: any

    private _context: RenderingContext

    private _position: { x: number, y: number } | null

    constructor(storage: IGraphicStorage) {
        super(storage)

        this.lineStyle = {
            width: 1,
            color: 0x009797,
            alpha: 0.6,
            join: 'round',
            cap: 'round',
            paddingRight: 5,
            paddingBottom: 5,
        }

        this.priceCoverStyle = {
            color: 0x009797,
            paddingx: 5,
            paddingy: 2.5,
            anchorx: 1.2,
            anchory: 0.5,
            radius: 30,
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
        }

        this.timeCoverStyle = {
            color: 0x009797,
            paddingx: 5,
            paddingy: 2.5,
            anchorx: .5,
            anchory: 1,
            radius: 30,
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
        }
    }

    public get rendererId(): symbol {
        return CrosshairRenderer.CROSSHAIR_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        if (this._context?.eventTarget !== context.eventTarget) {
            const handlePointermoveEvent = (event): void => this.updatePointer(container, event)
            const handlePointerleaveEvent = (): void => this.clear()

            this.handlePointermoveEvent = this.handlePointermoveEvent ?? handlePointermoveEvent
            this.handlePointerleaveEvent = this.handlePointerleaveEvent ?? handlePointerleaveEvent

            this._context?.eventTarget.removeEventListener('pointermove', this.handlePointermoveEvent)
            this._context?.eventTarget.removeEventListener('pointerleave', this.handlePointerleaveEvent)

            context.eventTarget.addEventListener('pointermove', this.handlePointermoveEvent)
            context.eventTarget.addEventListener('pointerleave', this.handlePointerleaveEvent)
        }

        this._context = context

        this.updatePointer(container)

        return container
    }

    protected updatePointer(container: Container, event?: PointermoveEvent): void {
        if (event) this._position = event.position

        if (!this._position) return

        this.updateVertical(container)
        this.updateHorizontal(container)
    }

    protected updateVertical(container: Container): void {
        const { width, height } = this._context.screen
        const { timerange: [mintime, maxtime] } = this._context.plotdata
        const { x } = this._position!

        const timedif = maxtime - mintime
        const [timestamp] = datamath.scale([x], [0, width], timedif)
        const time24 = ui.time24(mintime + timestamp)

        const [coveredText, coveredTextState] = this.get(
            'timeCoveredText',
            () => GraphicUtils.createCoveredText(
                time24,
                [x, height],
                this.timeCoverStyle,
            )
        )

        const textGraphic = <Text>coveredText.getChildAt(1)
        textGraphic.text = time24

        const { paddingx, paddingy } = this.timeCoverStyle
        const coverGraphic = <Graphics>coveredText.getChildAt(0)
        coverGraphic.width = textGraphic.width + paddingx * 2
        coverGraphic.height = textGraphic.height + paddingy * 2

        const { anchorx, anchory } = this.timeCoverStyle
        coveredText.position.set(
            x - coveredText.width * anchorx,
            height - coveredText.height * anchory
        )

        const padding = coveredText.height + this.lineStyle.paddingBottom
        const [horizontal, horizontalState] = this.get(
            'vertical',
            () => GraphicUtils.createLine(
                [0, 0],
                [0, height],
                this.lineStyle,
            )
        )
        horizontal.position.set(x, 0)
        horizontal.height = height - padding

        if (horizontalState.new) container.addChild(horizontal)
        if (coveredTextState.new) container.addChild(coveredText)
    }

    protected updateHorizontal(container: Container): void {
        const { width, height } = this._context.screen
        const { pricerange: [minprice, maxprice] } = this._context.plotdata
        const { y } = this._position!

        const pricedif = maxprice - minprice
        const price = minprice + datamath.scaleReverse([y], [0, height], pricedif)[0]

        const [coveredText, coveredTextState] = this.get(
            'priceCoveredText',
            () => GraphicUtils.createCoveredText(
                ui.currency(price, USD),
                [width, y],
                this.priceCoverStyle,
            )
        )

        const textGraphic = <Text>coveredText.getChildAt(1)
        textGraphic.text = ui.currency(price, USD)

        const { paddingx, paddingy } = this.priceCoverStyle
        const coverGraphic = <Graphics>coveredText.getChildAt(0)
        coverGraphic.width = textGraphic.width + paddingx * 2
        coverGraphic.height = textGraphic.height + paddingy * 2

        const { anchorx, anchory } = this.priceCoverStyle
        coveredText.position.set(
            width - coveredText.width * anchorx,
            y - coveredText.height * anchory
        )

        const padding = coveredText.width + this.lineStyle.paddingRight
        const [horizontal, horizontalState] = this.get('horizontal', () => GraphicUtils.createLine(
            [0, 0],
            [width, 0],
            this.lineStyle,
        ))
        horizontal.position.set(0, y)
        horizontal.width = width - padding

        if (horizontalState.new) container.addChild(horizontal)
        if (coveredTextState.new) container.addChild(coveredText)
    }

    protected clear(name?: string): void {
        if (!name) this._position = null

        super.clear(name)
    }
}
