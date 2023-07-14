import throttle from 'lodash.throttle'

import { ZoomEvent, PointermoveEvent } from '@events'
import { TimeframeChangedEvent, TimeframeStickToNowEvent, TimeframeUnstickToNowEvent } from '@events'

import { Logger } from '@infra'

import config from '@config'

export const UNIX_MINUTE = 60
export const UNIX_HOUR = 60 * UNIX_MINUTE
export const UNIX_DAY = 24 * UNIX_HOUR

export const MAX_FRAME_DURATION = UNIX_DAY
export const MIN_FRAME_DURATION = 5 * UNIX_MINUTE

export const PADDING_RIGHT = 0.382

type Point = { x: number, y: number }
type Rect = { width: number, height: number }

export class Timeframe {

    private _until: number | null = null

    private _now: number | null = null

    private _timeframe: number = MAX_FRAME_DURATION

    private get nowTS(): number {
        return this._now || Math.floor(Date.now() / 1000)
    }

    private set nowTS(now: number) {
        this._now = now || null
    }

    private get timeframe(): number {
        return this._timeframe
    }

    private set timeframe(timeframe: number) {
        timeframe = timeframe || MAX_FRAME_DURATION
        timeframe = Math.min(timeframe, MAX_FRAME_DURATION)
        timeframe = Math.max(timeframe, MIN_FRAME_DURATION)

        const since = this.until - timeframe
        if (since >= this.nowTS - MAX_FRAME_DURATION) {
            this._timeframe = timeframe
        }
    }

    private get until(): number {
        if (this._until) return this._until

        return this.untilmax(this.timeframe)
    }

    private set until(until: number) {
        if (until < this.untilmax(this.timeframe)) {
            const since = until - this.timeframe
            if (since >= this.nowTS - MAX_FRAME_DURATION) {
                if (this._until === null) this.eventTarget.dispatchEvent(new TimeframeUnstickToNowEvent(this.get()))
                this._until = until
            }
        } else {
            this.reset()
        }
    }

    private untilmax(timeframe: number): number {
        return this.nowTS + timeframe * PADDING_RIGHT
    }

    private get since(): number {
        return this.until - this.timeframe
    }

    private readonly zoomevent: any

    private readonly pointermove: any

    private shifting = 0

    constructor(
        private readonly eventTarget: EventTarget,
        private readonly onUpdate: () => any,
    ) {
        this.zoomevent = throttle((e: ZoomEvent) =>
            this.zoom(e.zoom, e.shift, e.position, e.screen), config.zoom.throttle, { trailing: false }
        )
        this.pointermove = throttle((e: PointermoveEvent) =>
            this.shiftprogress(e.movementX, e.screen, e.inner.buttons), config.zoom.throttle, { trailing: false }
        )

        this.eventTarget.addEventListener('zoom', this.zoomevent)
        this.eventTarget.addEventListener('pointermove', this.pointermove)
        this.eventTarget.addEventListener('timeframechanged', this.onUpdate)

        this.eventTarget.addEventListener('timeframeTonow', () => Logger.info('tf => now'))
        this.eventTarget.addEventListener('timeframeUnnow', () => Logger.info('tf <= now'))
    }

    public save(timeframe: number): this {
        this.timeframe = timeframe

        return this
    }

    public reset(): this {

        // null will always return current untilmax
        if (this._until !== null) {
            this._until = null
            this.eventTarget.dispatchEvent(new TimeframeStickToNowEvent(this.get()))
        }

        return this
    }

    public now(now: number): this {

        // NOTE: this will keep since locked in place if until locked to now
        if (!this._until) {
            this.timeframe = this.timeframe + (now - this.nowTS) / (1 - PADDING_RIGHT)
        }

        this.nowTS = now

        return this
    }

    public get(): { since: number, until: number } {
        return { since: this.since, until: this.until }
    }

    public destroy(): this {
        this.eventTarget.removeEventListener('zoom', this.zoomevent)
        this.eventTarget.removeEventListener('pointermove', this.pointermove)
        this.eventTarget.removeEventListener('timeframechanged', this.onUpdate)

        return this
    }

    // private shiftend(): void {
    //     this.shifting--
    // }

    // private shiftstart(): void {
    //     this.shifting++
    // }

    private shiftprogress(shift: number, screen: Rect, buttons: any): void {
        if ((buttons === 1) && shift) {
            this.shift(shift, screen)
        }
    }

    private shift(shift: number, screen: Rect): void {

        const speed = 8
        shift = shift / screen.width
        const timeshift = Math.floor(this.timeframe * shift * speed)
        const until = this.until - timeshift
        const since = until - this.timeframe

        if (
            since >= this.nowTS - MAX_FRAME_DURATION
        ) {
            const prevuntil = this.until

            this.until = until

            if (
                this.until !== prevuntil
            ) {
                this.eventTarget.dispatchEvent(new TimeframeChangedEvent(this.get()))
            }
        }
    }

    private zoom(zoom: number, shift: number, position: Point, screen: Rect): void {

        const timeframe = Math.round(this.timeframe * (1 + zoom))

        let until = this.until
        const percent = 1 - position.x / screen.width
        const diff = this.timeframe - timeframe
        until = this.until - Math.ceil(diff*percent)

        let since = until - timeframe
        if (since < this.nowTS - MAX_FRAME_DURATION) {
            until = this.since + timeframe
            since = until - timeframe
        }

        const speed = 8
        shift = shift / screen.width
        const timeshift = Math.floor(timeframe * shift * speed)
        until = until + timeshift
        until = Math.min(until, this.untilmax(timeframe))
        since = until - timeframe

        if (
            timeframe < MAX_FRAME_DURATION &&
            timeframe > MIN_FRAME_DURATION &&
            until <= this.untilmax(timeframe) &&
            since >= this.nowTS - MAX_FRAME_DURATION
        ) {
            const prevuntil = this.until

            this.timeframe = timeframe
            this.until = until

            if (
                this.timeframe !== prevuntil ||
                this.until !== prevuntil
            ) {
                this.eventTarget.dispatchEvent(new TimeframeChangedEvent(this.get()))
            }
        }
    }

}
