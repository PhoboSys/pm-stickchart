import throttle from 'lodash.throttle'

import { ZoomEvent } from '../../events'
import config from '../../config'

export const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000
export const INVALID_DATE = new Date(NaN)

export const UNIX_MINUTE = 60
export const UNIX_HOUR = 60 * UNIX_MINUTE
export const UNIX_DAY = 24 * UNIX_HOUR
export const UNIX_WEEK = 7 * UNIX_DAY

export const FRAME_HIGH_LIMIT  = UNIX_DAY
export const FRAME_LOW_LIMIT = UNIX_MINUTE * 5

export function nowUnixTS() {
    return Math.floor(Date.now() / 1000)
}

export class Timeframe {
    private timeframe: number

    private readonly zoomevent: any

    constructor(
        private readonly zoomTarget: EventTarget,
        private readonly onZoom: () => any,
    ) {
        this.zoomevent = throttle(
            (e: ZoomEvent) => this.zoom(e.zoom),
            config.zoom.throttle,
        )
        this.zoomTarget.addEventListener('zoom', this.zoomevent)
    }

    public save(timeframe): void {
        this.timeframe = this.getValid(timeframe)
    }

    public get() {
        const until = nowUnixTS()
        const since = until - this.timeframe

        return { since, until }
    }

    public destroy(): void {
        this.zoomTarget.removeEventListener('zoom', this.zoomevent)
    }

    private getValid(timeframe): number {
        if (!timeframe || this.tooBig(timeframe)) return FRAME_HIGH_LIMIT

        if (this.tooSmall(timeframe)) return FRAME_LOW_LIMIT

        return timeframe
    }

    private tooBig(timeframe): boolean {
        return timeframe > FRAME_HIGH_LIMIT
    }

    private tooSmall(timeframe): boolean {
        return timeframe < FRAME_LOW_LIMIT
    }

    private zoom(zoom: number): void {
        const zommedFrame = Math.round(this.timeframe * (1 + zoom))

        this.save(zommedFrame)
        this.onZoom()
    }
}
