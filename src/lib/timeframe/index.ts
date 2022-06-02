import throttle from 'lodash.throttle'

import { ZoomEvent } from '../../events'
import config from '../../config'

export const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000
export const INVALID_DATE = new Date(NaN)

export const UNIX_MINUTE = 60
export const UNIX_HOUR = 60 * UNIX_MINUTE
export const UNIX_DAY = 24 * UNIX_HOUR
export const UNIX_WEEK = 7 * UNIX_DAY

export const MAX_FRAME_DURATION = UNIX_DAY
export const MIN_FRAME_DURATION = 5 * UNIX_MINUTE

export const SHRINK_RATE = 3

export function nowUnixTS() {
    return Math.floor(Date.now() / 1000)
}

export class Timeframe {
    private _lastDuration: number = UNIX_DAY

    private since: number = nowUnixTS() - UNIX_DAY

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

    public save(timeframe): this {
        timeframe = this.getValid(timeframe)

        this.since = nowUnixTS() - timeframe
        this._lastDuration = timeframe

        return this
    }

    public get() {
        return { since: this.since, until: nowUnixTS() }
    }

    public destroy(): void {
        this.zoomTarget.removeEventListener('zoom', this.zoomevent)
    }

    public actualize(): this {
        const currentDuration = nowUnixTS() - this.since
        const maxDuration = this.getValid(this._lastDuration * SHRINK_RATE)

        if (currentDuration < maxDuration) return this
        this.since = nowUnixTS() - this._lastDuration

        return this
    }

    private getValid(timeframe): number {
        if (this.tooBig(timeframe)) return MAX_FRAME_DURATION
        if (this.tooSmall(timeframe)) return MIN_FRAME_DURATION

        return timeframe
    }

    private tooBig(timeframe): boolean {
        return timeframe > MAX_FRAME_DURATION
    }

    private tooSmall(timeframe): boolean {
        return timeframe < MIN_FRAME_DURATION
    }

    private zoom(zoom: number): void {
        const now = nowUnixTS()

        let duration = now - this.since
        duration += Math.round(duration * zoom)
        const vduration = this.getValid(duration)

        this.since = now - vduration
        this._lastDuration = vduration
        if (duration === vduration) this.onZoom()
    }
}
