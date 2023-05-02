import config from '@config'

import { gsap } from '@lib/pixi'
import { PricePoint } from '@chartdata'
import { Priceframe } from '@lib/priceframe'
import { Timeframe } from '@lib/timeframe'
import { eq } from '@lib/calc-utils'

type ChartData = { prices: string[], timestamps: number[] }
type PriceFrame = { since: number, until: number }
export default class MorphController {

    private pointsTimeline: gsap.core.Timeline = gsap.timeline()

    public priceframeTimeline: gsap.core.Timeline = gsap.timeline()

    constructor(
        private timeframe: Timeframe,
        private priceframe: Priceframe,
        private _onUpdate: () => void
    ) { }

    public morph(
        previousChartData: ChartData,
        currentChartData: ChartData,
        previousPriceframe: PriceFrame,
        currentPriceframe: PriceFrame,

    ): void {
        if (!previousChartData || !currentChartData || !previousPriceframe || !currentPriceframe || !config.morph) return

        // 0. Make sure to complite running animations and clear timeline
        this.terminatePointsTimeline()
        this.terminatePriceframeTimeline()

        // 1. Find all points that was added from previous to current
        const { indeces, intersect, animations } = this.getFrontPoints(previousChartData, currentChartData)

        // 3. If any intersaction found and animations are in valid range perform animations
        const shouldAnimate = animations <= config.morph.maxstack && animations > 0
        if (intersect && shouldAnimate) {

            this.performNewPoints(currentChartData, indeces, animations)
            this.performPriceframe(previousPriceframe, currentPriceframe)

            // 5. retrun in order to avoid defaul update/render if morph preformed
            return
        }

        // 4. Perform default update/render
        this.priceframe.set(currentPriceframe)
        this._onUpdate()
    }

    private getFrontPoints(previous, current): { indeces: number[], intersect: boolean, animations: number } {
        const frontdiff: number[] = []
        const pts = previous.timestamps[previous.timestamps.length - 1]

        let cidx = current.timestamps.length
        let intersect = false
        while (!intersect && cidx-- && pts) {
            const cts = current.timestamps[cidx]

            intersect = cts === pts
            frontdiff.unshift(cidx)
        }

        return {
            indeces: frontdiff,
            intersect,
            animations: frontdiff.length ? frontdiff.length - 1 : 0,
        }
    }

    private terminatePointsTimeline(): void {
        if (this.pointsTimeline.isActive()) this.pointsTimeline.progress(1)
        this.pointsTimeline.clear()
    }

    private performNewPoints(chartdata: ChartData, pointsIndeces: number[], animations: number): void {
        let prevpoint: PricePoint | null = null
        for (const idx of pointsIndeces) {
            const target: PricePoint = {
                timestamp: chartdata.timestamps[idx],
                value: chartdata.prices[idx],
            }

            if (prevpoint) {
                this.addPoint(prevpoint, target, chartdata, idx)
            }

            prevpoint = target
        }

        // 0. Removing points form current chart data in order to add them back animated via timeline
        chartdata.timestamps.splice(-animations)
        chartdata.prices.splice(-animations)

        // 1. Speedup animation to make all timeline finish in config.morph.duration
        this.pointsTimeline.timeScale(animations)

        return

    }

    private addPoint(
        animated: PricePoint,
        end: PricePoint,
        current: ChartData,
        idx: number,
    ): void {
        this.pointsTimeline.to(
            animated,
            {
                ...end,
                ...config.morph.animation,
                onUpdate: () => {
                    current.timestamps[idx] = animated.timestamp
                    current.prices[idx] = animated.value
                    this._onUpdate()
                },
                onComplete: () => {
                    // gsap has limited precision
                    // in order to render exactly 'end'
                    // we have to apply it explicitly
                    current.timestamps[idx] = end.timestamp
                    current.prices[idx] = end.value
                    this._onUpdate()
                }
            }
        )
    }

    public terminatePriceframeTimeline(): void {
        if (this.priceframeTimeline) {
            if (this.priceframeTimeline.isActive()) this.priceframeTimeline.progress(1)
            this.priceframeTimeline.clear()
        }
    }

    private performPriceframe(previous: PriceFrame, current: PriceFrame): void {
        if (eq(previous.since, current.since) && eq(previous.until, current.until)) return

        this.terminatePriceframeTimeline()

        this.addPriceframe({ ...previous }, current)

    }

    private addPriceframe(animated, end): void {
        this.priceframeTimeline.to(
            animated,
            {
                ...end,
                ...config.morph.animation,
                onUpdate: () => {
                    this.priceframe.set({ since: animated.since, until: animated.until })
                    this._onUpdate()
                },
                onComplete: () => {
                    // gsap has limited precision
                    // in order to render exactly 'end'
                    // we have to apply it explicitly
                    this.priceframe.set({ since: end.since, until: end.until })
                    this._onUpdate()
                }
            }
        )
    }
}
