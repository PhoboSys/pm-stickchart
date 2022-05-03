import { RenderingContext, DoneFunction, IGraphicStorage } from '..';
import { BaseRenderer, GraphicUtils } from '..'

import { MouseleaveEvent } from '../../events/MouseleaveEvent'
import { MousemoveEvent } from '../../events/MousemoveEvent'
import datamath from '../../lib/datamath'
import { Graphics, Container } from '../../lib/pixi'

export class CrosshairRenderer extends BaseRenderer {

    static readonly CROSSHAIR_ID: symbol = Symbol('CROSSHAIR_ID')

    private readonly lineStyle: any

    private readonly priceCoverStyle: any

    private lastContext: RenderingContext

    private lastEvent: MousemoveEvent | MouseleaveEvent

    constructor(storage: IGraphicStorage) {
        super(storage)

        global.chartEventTarget.addEventListener(
            'mousemove',
            (e: MousemoveEvent) => this.handleMouseEvent(e),
        )

        global.chartEventTarget.addEventListener(
            'mouseleave',
            (e: MouseleaveEvent) => this.handleMouseEvent(e),
        )

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

    public render(context: RenderingContext, done: DoneFunction): void {
        this.lastContext = context

        super.render(context, done)
    }

    protected handleMouseEvent(event: MousemoveEvent | MouseleaveEvent): void {
        this.lastEvent = event

        this.render(this.lastContext, () => { })
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        const { lastEvent } = this

        if (!lastEvent || lastEvent instanceof MouseleaveEvent) {
            return new Graphics()
        }

        const { width, height } = context.screen
        const { yrange: [minprice, maxprice] } = context.plotdata
        const { x, y } = lastEvent.position

        const verticalLine = GraphicUtils.createLine(
            [x, 0],
            [x, height],
            this.lineStyle,
        )

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

        const result = new Graphics()
        result.addChild(verticalLine, priceText, horizontalLine)
        return result
    }
}
