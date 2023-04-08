import throttle from 'lodash.throttle'

import { ZoomEvent, PointerdownEvent, PointermoveEvent, PointerupEvent } from '@events'
import { TimeframeChangedEvent, TimeframeStickToNowEvent, TimeframeUnstickToNowEvent } from '@events'

import config from '@config'
import { isEmpty } from '@lib/utils'

export const UNIX_MINUTE = 60
export const UNIX_HOUR = 60 * UNIX_MINUTE
export const UNIX_DAY = 24 * UNIX_HOUR

export const MAX_FRAME_DURATION = UNIX_DAY
export const MIN_FRAME_DURATION = 5 * UNIX_MINUTE

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
            // null will always return current untilmax
            if (this._until !== null) this.eventTarget.dispatchEvent(new TimeframeStickToNowEvent(this.get()))
            this._until = null
        }
    }

    private untilmax(timeframe: number): number {
        return this.nowTS + timeframe * 0.382
    }

    private get since(): number {
        return this.until - this.timeframe
    }

    private readonly zoomevent: any
    private readonly pointerdown: any
    private readonly pointermove: any
    private readonly pointerup: any

    private shifting: boolean = false

    constructor(
        private readonly eventTarget: EventTarget,
        private readonly onUpdate: () => any,
    ) {
        this.zoomevent = throttle((e: ZoomEvent) => this.zoom(e.zoom, e.shift, e.position, e.screen), config.zoom.throttle, { trailing: false })
        this.pointerdown = (e: PointerdownEvent) => this.shiftstart()
        this.pointermove = throttle((e: PointermoveEvent) => this.shiftprogress(e.movementX, e.screen), config.zoom.throttle, { trailing: false })
        this.pointerup = (e: PointerupEvent) => this.shiftend()

        this.eventTarget.addEventListener('zoom', this.zoomevent)
        this.eventTarget.addEventListener('pointerdown', this.pointerdown)
        this.eventTarget.addEventListener('pointermove', this.pointermove)
        this.eventTarget.addEventListener('pointerup', this.pointerup)
        this.eventTarget.addEventListener('timeframechanged', this.onUpdate)

        this.eventTarget.addEventListener('timeframeTonow', () => console.log('timeframeTonow'))
        this.eventTarget.addEventListener('timeframeUnnow', () => console.log('timeframeUnnow'))
    }

    public save(timeframe): this {
        this.timeframe = timeframe

        return this
    }

    public now(now: number): this {
        this.nowTS = now

        return this
    }

    public get(): { since: number, until: number } {
        return { since: this.since, until: this.until }
    }

    public destroy(): this {
        this.eventTarget.removeEventListener('zoom', this.zoomevent)
        this.eventTarget.removeEventListener('pointerdown', this.pointerdown)
        this.eventTarget.removeEventListener('pointermove', this.pointermove)
        this.eventTarget.removeEventListener('pointerup', this.pointerup)
        this.eventTarget.removeEventListener('timeframechanged', this.onUpdate)

        return this
    }

    private shiftend(): void {
        if (this.shifting) this.shifting = false
    }

    private shiftstart(): void {
        if (!this.shifting) this.shifting = true
    }

    private shiftprogress(shift: number, screen: Rect): void {
        if (this.shifting && shift) this.shift(shift, screen)
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
            const prevtimeframe = this.timeframe

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
