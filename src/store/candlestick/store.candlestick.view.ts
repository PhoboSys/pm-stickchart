import { Graphics } from '@pixi/graphics'

import { CandleStickBuilder } from '../../builders/builder.candlestick'
import { Viewport } from '../../core'
import { IStick, IView, IStickChartState } from '../../data/interfaces'

export class CandleStickView implements IView<IStickChartState> {
    static readonly renderKey: string = 'chart_data_graphics'

    private readonly builded: Graphics = new Graphics()

    constructor(
        public readonly state: IStickChartState,
        public readonly viewport: Viewport,
    ) { }

    private get stickWidth(): number {
        const { viewConfig: { width, stickIntervalSize }, renderConfig: { dateRange } } = this.state

        return width * (stickIntervalSize!.asMilliseconds() / dateRange.width)
    }

    public render(): void {
        this.buildSticks()

        this.viewport.render(this.builded, CandleStickView.renderKey)
    }

    private buildSticks(): Graphics {
        const { style, dataManager, viewConfig: { width, height }, renderConfig: { valueRange, dateRange } } = this.state

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
