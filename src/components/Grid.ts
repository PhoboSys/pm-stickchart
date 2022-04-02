import { Graphics } from '@pixi/graphics'

import { IRenderStickChart } from '../types/'

export class Grid extends Graphics {
    private stickChart: IRenderStickChart

    constructor(stickChart: IRenderStickChart) {
        super()

        this.stickChart = stickChart
    }

    public build(): Grid {
        this.buildVerticalLines()
        this.buildHorizontalLines()

        return this
    }

    private buildVerticalLines(): void {
        const { verticalSegmentsCount, segmentWidth, height, firstVerticalSegmentX } = this.stickChart

        const coords: Array<number> = [firstVerticalSegmentX]

        for (let i = 0; i < verticalSegmentsCount; i++) {
            const pos = coords[i]

            coords[i + 1] = pos + segmentWidth

            const line = new Graphics()

            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(pos, 0)
                .lineTo(pos, height)

            super.addChild(line)
        }
    }

    private buildHorizontalLines(): void {
        const { horizontalSegmentsCount, segmentHeight, width } = this.stickChart

        for (let i = 0; i < horizontalSegmentsCount; i++) {
            const pos = i * segmentHeight

            const line = new Graphics()

            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(0, pos)
                .lineTo(width, pos)
                .endFill()

            super.addChild(line)
        }
    }
}
