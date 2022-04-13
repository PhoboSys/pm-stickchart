import { Graphics } from '@pixi/graphics'

import { CandleStickBuilder } from '../../builders/builder.candlestick'
import { Viewport } from '../../core'
import { IStick, IView, IStickChartState } from '../../data/interfaces'

export class CandleStickView implements IView<IStickChartState> {
    static readonly renderKey: string = 'candle_sticks_graphics'

    private readonly builded: Graphics = new Graphics()

    constructor(
        public readonly state: IStickChartState,
        public readonly viewport: Viewport,
    ) { }

    private get stickWidth(): number {
        const { viewConfig: { width }, renderConfig: { dateRange, stickIntervalSize } } = this.state

        return width * (stickIntervalSize!.asMilliseconds() / dateRange.duration)
    }

    public render(): void {
        this.buildSticks()

        this.viewport.render(this.builded, CandleStickView.renderKey)
    }

    private buildSticks(): Graphics {
        const { style, viewConfig: { width, height }, renderConfig: { valueRange, dateRange, dataManager } } = this.state

        const build = (stick: IStick): Graphics => {
            const builder = new CandleStickBuilder(
                stick,
                style,
                width,
                height,
                this.stickWidth,
                valueRange,
                dateRange,
            )

            return builder.build()
        }

        for (const stick of dataManager!.data) {
            this.builded.addChild(build(<IStick>stick))
        }

        return this.builded
    }
}
