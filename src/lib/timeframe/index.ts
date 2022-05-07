import throttle from 'lodash.throttle'

import { ZoomEvent } from '../../events'
export const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000
export const INVALID_DATE = new Date(NaN)

export const UNIX_MINUTE = 60
export const UNIX_HOUR = 60 * UNIX_MINUTE
export const UNIX_DAY = 24 * UNIX_HOUR
export const UNIX_WEEK = 7 * UNIX_DAY

export function nowUnixTS() {
  return Math.floor(Date.now() / 1000)
}

export class Timeframe {

    private since: number = nowUnixTS() - UNIX_DAY

    private readonly zoomevent: any

    constructor (
       private readonly zoomTarget: EventTarget,
       private readonly onZoom: () => any,
    ) {
        this.zoomevent = throttle((e: ZoomEvent) => this.zoom(e.zoom), 50)
        this.zoomTarget.addEventListener('zoom', this.zoomevent)
    }

    public save(timeframe) {
        if (!this.validate(timeframe)) timeframe = UNIX_DAY
        this.since = nowUnixTS() - timeframe
    }

    public get() {
        return { since: this.since, until: nowUnixTS() }
    }

    public destroy() {
        this.zoomTarget.removeEventListener('zoom', this.zoomevent)
    }

    private validate(timeframe) {
        return (
            timeframe &&
            !this.tooBig(timeframe) &&
            !this.tooSmall(timeframe)
        )
    }

    private tooBig(timeframe) {
        return timeframe > UNIX_DAY
    }

    private tooSmall(timeframe) {
        return timeframe < UNIX_MINUTE * 10
    }

    private zoom(zoom: number) {
        const now = nowUnixTS()
        let timeframe = now - this.since
        timeframe += Math.round(timeframe * zoom)

        const zoominUp = zoom > 0
        const zoominDown = zoom < 0

        const hitLower = this.tooSmall(timeframe) && zoominDown
        const hitUpper = this.tooBig(timeframe) && zoominUp

        if (!hitLower && !hitUpper) {
            this.since = now - timeframe
            this.onZoom()
        }
    }
}
