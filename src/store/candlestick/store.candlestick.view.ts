import { Graphics } from '@pixi/graphics'

import { CandleStickBuilder } from '../../builders/builder.candlestick'
import { Viewport } from '../../core/core.viewport'
import { StickChartState, IView } from '../../interfaces'
import { IStick } from '../../interfaces/interface.stick'

export class CandleStickView implements IView<StickChartState> {
    static readonly renderKey: string = 'candle_sticks_graphics'

    private readonly builded: Graphics = new Graphics()

    constructor(
        public readonly state: StickChartState,
        public readonly viewport: Viewport,
    ) { }

    private get stickWidth(): number {
        const { width, stickIntervalWidth, renderDateRange } = this.state

        return width * (stickIntervalWidth.asMilliseconds() / renderDateRange.duration)
    }

    public render(): void {
        this.buildSticks()

        this.viewport.keyRender(this.builded, CandleStickView.renderKey)
    }

    private buildSticks(): Graphics {
        const { stickWidth, state: { width, height, valueRange, renderDateRange, renderSticks } } = this

        const build = (stick: IStick): Graphics => {
            const builder = new CandleStickBuilder(
                stick,
                width,
                height,
                stickWidth,
                valueRange,
                renderDateRange,
            )

            return builder.build()
        }

        for (const stick of renderSticks) {
            this.builded.addChild(build(stick))
        }

        return this.builded
    }
}
