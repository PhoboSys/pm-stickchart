import config from '@config'

import { gsap } from '@lib/pixi'
import { PricePoint } from '@chartdata'

type ChartData = { prices: string[], timestamps: number[] }

export default class MorphController {

    #timeline: gsap.core.Timeline

    #active: { timestamps: number[], prices: string[] }

    constructor(
        private _onUpdate: () => void
    ) {
        this.#timeline = gsap.timeline()
        this.#active = { timestamps: [], prices: [] }
    }

    public get isActive(): boolean {
        return this.#timeline.isActive()
    }

    public morph(previous?: ChartData, next?: ChartData): void {
        if (!previous || !next || !config.morph) return

        this.#perform(previous, next)
    }

    #perform(previous: ChartData, next: ChartData): void {
        // TODO: implement morph of some intermidiate data and not chartdata itself
        // in order to be able to detect and add new animations during active animation
        // for not we going to keep active points in memory to compare with next chartdata

        // 1. Find all points that was added from previous to next
        const frontdiff: number[] = []
        const pts = previous.timestamps[previous.timestamps.length-1]
        const ats = this.#active.timestamps[this.#active.timestamps.length-1]

        let cidx = next.timestamps.length
        let intersect = false
        while (!intersect && cidx-- && pts) {
            const nts = next.timestamps[cidx]

            intersect = nts === pts || this.isActive && nts === ats
            frontdiff.unshift(cidx)
        }

        // 2. If any intersaction found animate all points
        if (intersect) {
            const animations = new Array<() => void>()
            let prevpoint: PricePoint | null = null
            for (const idx of frontdiff) {
                const target: PricePoint = {
                    timestamp: next.timestamps[idx],
                    value: next.prices[idx],
                }

                if (prevpoint) {
                    animations.push(this.#add.bind(this, prevpoint, target, next, idx))
                }

                prevpoint = target
            }

            // 3. Check animations to be in valid range
            if (
                animations.length <= config.morph.maxstack &&
                animations.length > 0
            ) {
                // 4. Make sure to complite running animation and clear timeline
                if (this.isActive) this.#timeline.progress(1)
                this.#timeline.clear()

                // 5. Removing points form next chart data
                // in order to add them back animated via timeline
                const timestamps = next.timestamps.splice(-animations.length)
                const prices = next.prices.splice(-animations.length)

                this.#active = { timestamps, prices }

                // 6. Execute animations
                for (const animation of animations) animation()

                // 7. Speedup animation to make all timeline finish in config.morph.duration
                this.#timeline.timeScale(animations.length)

            } else if (this.isActive) {
                // 8. Have to revert changes in order to make amination finish
                next.timestamps = previous.timestamps
                next.prices = previous.prices
            }

        } else {

            // 8. Clear and reperform default update/render
            if (this.isActive) this.#timeline.progress(1)
            this.#timeline.clear()
            this._onUpdate()

        }

    }

    #add(
        animated: PricePoint,
        end: PricePoint,
        next: ChartData,
        idx: number,
    ): void {
        this.#timeline.to(
            animated,
            {
                ...end,
                ...config.morph.animation,
                onUpdate: () => {
                    next.timestamps[idx] = animated.timestamp
                    next.prices[idx] = animated.value
                    this._onUpdate()
                },
                onComplete: () => {
                    // gsap has limited precision
                    // in order to render exactly 'end'
                    // we have to apply it explicitly
                    next.timestamps[idx] = end.timestamp
                    next.prices[idx] = end.value
                    this._onUpdate()
                }
            }
        )
    }

}
