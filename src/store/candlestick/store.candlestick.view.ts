import { Graphics } from '@pixi/graphics'

import { CandleStickBuilder } from '../../builders/builder.candlestick'
import { Viewport } from '../../core'
import { IStick, IView, IState } from '../../data/interfaces'

export class CandleStickView implements IView<IState> {
    static readonly renderKey: string = 'chart_data_graphics'

    private readonly builded: Graphics = new Graphics()

    constructor(
        public readonly state: IState,
        public readonly viewport: Viewport,
    ) { }

    private get stickWidth(): number {
        const { basicConfig: { width, stickIntervalSize }, renderConfig: { dateRange } } = this.state

        return width * (stickIntervalSize / dateRange.length)
    }

    public render(): void {
        console.log(this.state.dataManager.data)

        this.buildSticks()

        this.viewport.render(this.builded, CandleStickView.renderKey)
    }

    private buildSticks(): Graphics {
        const { dataManager, basicConfig: { width, height, style }, renderConfig: { priceRange: valueRange, dateRange } } = this.state

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

        for (const stick of dataManager.data) {
            this.builded.addChild(build(<IStick>stick))
        }

        return this.builded
    }
}
