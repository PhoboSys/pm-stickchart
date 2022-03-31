import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'

import { IStickChart } from '../types/stick_chart'
export class Grid {
    protected stickChart: IStickChart

    constructor(stickChart) {
        this.stickChart = stickChart
    }

    draw(container: Container): void {
        const verticalSegmentsCount = this.verticalSegmentsCount()

        for (let i = 0; i < verticalSegmentsCount; i++) {
            const pos = i * this.widthForSegment()

            const line = new Graphics()

            line.lineStyle({ width: 1, color: 0xFFFF }).moveTo(pos, 0).lineTo(pos, this.stickChart.height).endFill()

            container.addChild(line)
        }
    }

    private widthForSegment(): number {
        return this.stickChart.width / this.verticalSegmentsCount()
    }

    private verticalSegmentsCount(): number {
        const verticalSegmentsCount =
            this.stickChart.dateRange.milliseconds / this.stickChart.segmentDateInterval.milliseconds

        if (verticalSegmentsCount < 1) {
            throw new Error('DateRange could\'t be smaller than the Interval. It should contain 1 or more intervals')
        }

        return verticalSegmentsCount
    }
}
