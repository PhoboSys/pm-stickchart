import config from '@config'

import { gsap } from '@lib/pixi'
import { PricePoint } from '@chartdata'
import { Priceframe } from '@lib/priceframe'
import { Timeframe } from '@lib/timeframe'
import { Framedata } from '@lib/framedata'
import { eq } from '@lib/calc-utils'

type ChartData = { prices: string[], timestamps: number[] }
type PriceFrame = { since: number, until: number }

export default class MorphController {

    public pointsTimeline: gsap.core.Timeline = gsap.timeline()

    public priceframeTimeline: gsap.core.Timeline = gsap.timeline()

    constructor(
        private timeframe: Timeframe,
        private priceframe: Priceframe,
        private framedata: Framedata,
        private _onUpdate: () => void
    ) { }

    public morph(
        currentChartData: ChartData,
        currentPriceframe: PriceFrame,
        defaultUpdate: () => void,
    ): void {
        const previousChartData = this.framedata.get()
        const previousPriceframe = this.priceframe.get()

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
        defaultUpdate()
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

    public terminatePointsTimeline(): void {
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
                this.addPoint(prevpoint, target)
            }

            prevpoint = target
        }

        // Speedup animation to make all timeline finish in config.morph.duration
        this.pointsTimeline.timeScale(animations)

        return

    }

    private addPoint(
        animated: PricePoint,
        end: PricePoint,
    ): void {
        const updateFramedata = this.framedata.createUpdater()
        this.pointsTimeline.to(
            animated,
            {
                ...end,
                ...config.morph.animation,
                onUpdate: () => {
                    const timeframe = this.timeframe.now(animated.timestamp).get()
                    updateFramedata(animated, timeframe)
                    this._onUpdate()
                },
                onComplete: () => {
                    // gsap has limited precision
                    // in order to render exactly 'end'
                    // we have to apply it explicitly
                    const timeframe = this.timeframe.now(end.timestamp).get()
                    updateFramedata(end, timeframe)
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
