import config from '@config'

import { gsap } from '@lib/pixi'
import { PricePoint } from '@chartdata'
import { DataBuilder } from '@chartdata'

type ChartData = { prices: number[], timestamps: number[] }

export default class MorphController {

    #timeline: gsap.core.Timeline = gsap.timeline()

    // private _lastTarget: PricePoint | null

    constructor(
        private _onUpdate: () => void
    ) { }

    public get isActive(): boolean {
        return this.#timeline.isActive()
    }

    public morph(previous?: ChartData, current?: ChartData): void {
        if (!previous || !current || !config.morph) return

        this.#perform(previous, current)
    }

    #perform(previous: ChartData, current: ChartData): void {
        // 0. Make sure to complite running animation and clear timeline
        if (this.isActive) this.#timeline.progress(1)
        this.#timeline.clear()

        // 1. Find all points that was added from previous to current
        const frontdiff: number[] = []
        const pts = previous.timestamps[previous.timestamps.length-1]

        let cidx = current.timestamps.length
        let intersect = false
        while (!intersect && cidx-- && pts) {
            const cts = current.timestamps[cidx]

            intersect = cts === pts
            frontdiff.unshift(cidx)
        }

        // 2. If any intersaction found animate all points
        if (intersect) {
            let animations = 0
            let prevpoint: PricePoint | null = null
            for (const idx of frontdiff) {
                const target: PricePoint = {
                    timestamp: current.timestamps[idx],
                    value: current.prices[idx],
                }

                if (prevpoint) {
                    this.#add(prevpoint, target, current, idx)
                    animations++
                }

                prevpoint = target
            }

            // 3. Check animations to be in valid range
            if (
                animations <= config.morph.maxstack &&
                animations > 0
            ) {

                // 4. Removing points form current chart data
                // in order to add them back animated via timeline
                current.timestamps.splice(-animations)
                current.prices.splice(-animations)

                // 5. Speedup animation to make all timeline finish in config.morph.duration
                this.#timeline.timeScale(animations)

            } else {

                // 6. Clear if we need to go over move than config.morph.maxstack animations
                this.#timeline.clear()
                this._onUpdate()

            }
        }
    }

    #add(
        animated: PricePoint,
        end: PricePoint,
        current: ChartData,
        idx: number,
    ): void {
        this.#timeline.to(
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

}
