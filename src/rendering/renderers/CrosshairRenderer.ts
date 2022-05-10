import { RenderingContext, IGraphicStorage } from '..'
import { BaseRenderer, GraphicUtils } from '..'

import { MouseleaveEvent } from '../../events/MouseleaveEvent'
import { MousemoveEvent } from '../../events/MousemoveEvent'
import datamath from '../../lib/datamath'
import { Graphics, Container } from '../../lib/pixi'

export class CrosshairRenderer extends BaseRenderer {

    static readonly CROSSHAIR_ID: symbol = Symbol('CROSSHAIR_ID')

    private readonly lineStyle: any

    private readonly priceCoverStyle: any

    private _context: RenderingContext

    private eventTarget: EventTarget

    constructor(storage: IGraphicStorage) {
        super(storage)

        this.lineStyle = {
            width: 2,
            color: 0x009797,
            alpha: 1,
            join: 'round',
            cap: 'round',
        }

        this.priceCoverStyle = {
            color: 0x009797,
            paddingright: 5,
            paddingx: 5,
            paddingy: 2.5,
            anchorx: 1,
            anchory: 0.5,
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
        this._context = context

        if (this.eventTarget !== context.application.resizeTo) {
            this.eventTarget = context.application.resizeTo

            this.eventTarget.addEventListener('mousemove', this.handleMousemoveEvent.bind(this, container))
            this.eventTarget.addEventListener('mouseleave', this.handleMouseleaveEvent.bind(this, container))
        }

        return container
    }

    private handleMouseleaveEvent(container: Container, event: MouseEvent): void {
        this.updatePointer(container, new MouseleaveEvent(event))
    }

    private handleMousemoveEvent(container: Container, event: MouseEvent): void {
        this.updatePointer(container, new MousemoveEvent(event))
    }

    protected updatePointer(container: Container, mouseEvent: MouseleaveEvent | MousemoveEvent) {
        if (mouseEvent instanceof MouseleaveEvent) {
            return this.clear()
        }

        const { width, height } = this._context.screen
        const { timerange: [minprice, maxprice] } = this._context.plotdata
        const { x, y } = mouseEvent.position

        const [vertical, verticalstate] = this.get<Graphics>('vertical', () => new Graphics())
        if (verticalstate.new) container.addChild(vertical)

        vertical
            .clear()
            .lineStyle(this.lineStyle)
            .moveTo(x, 0)
            .lineTo(x, height)

        const pricedif = maxprice - minprice
        const price = maxprice - datamath.scale([y], [0, height], pricedif)[0]

        const { paddingright } = this.priceCoverStyle
        const priceText = GraphicUtils.createCoveredText(
            price.toFixed(3),
            [width - paddingright, y],
            this.priceCoverStyle,
        )

        const horizontalLine = GraphicUtils.createLine(
            [0, y],
            [priceText.x, y],
            this.lineStyle,
        )

        const [horizontal, horizontalstate] = this.get<Graphics>('horizontal', () => new Graphics())
        if (horizontalstate.new) container.addChild(horizontal)
        else horizontal.removeChildren().forEach(e => e.destroy())

        horizontal.addChild(horizontalLine, priceText)
    }
}
