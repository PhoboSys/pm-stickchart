import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'

import { ChartOptions } from './chart'

type GridOptions = {
    width: number,
    height: number
    chartOptions: ChartOptions
}

export class Grid {
    protected width: number

    protected height: number

    chartOptions: ChartOptions

    constructor({ width, height, chartOptions }: GridOptions) {
        this.width = width
        this.height = height

        this.chartOptions = chartOptions
    }

    draw(container: Container): void {
        const verticalSegmentsCount = this.verticalSegmentsCount()
        for (let i = 0; i < verticalSegmentsCount; i++) {
            const pos = i * this.widthForSegment()

            const line = new Graphics()

            line.lineStyle({ width: 1, color: 0xFFFF }).moveTo(pos, 0).lineTo(pos, this.height).endFill()

            container.addChild(line)
        }
    }

    private widthForSegment(): number {
        return this.width / this.verticalSegmentsCount()
    }

    private verticalSegmentsCount(): number {
        const verticalSegmentsCount =
            this.chartOptions.dateRange.milliseconds / this.chartOptions.segmentDateInterval.milliseconds

        if (verticalSegmentsCount < 1) {
            throw new Error('DateRange could\'t be smaller than the Interval. It should contain 1 or more intervals')
        }

        return verticalSegmentsCount
    }
}
