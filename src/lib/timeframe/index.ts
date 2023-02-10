import throttle from 'lodash.throttle'

import { ZoomEvent, PointerdownEvent, PointermoveEvent, PointerupEvent } from '@events'
import config from '@config'
import { isEmpty } from '@lib/utils'

export const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000
export const INVALID_DATE = new Date(NaN)

export const UNIX_MINUTE = 60
export const UNIX_HOUR = 60 * UNIX_MINUTE
export const UNIX_DAY = 24 * UNIX_HOUR
export const UNIX_WEEK = 7 * UNIX_DAY

export const MAX_FRAME_DURATION = UNIX_DAY
export const MIN_FRAME_DURATION = 5 * UNIX_MINUTE

export const MAX_EXPAND_RATION = 3

export function nowUnixTS() {
    return Math.floor(Date.now() / 1000)
}

type Point = { x: number, y: number }

export class Timeframe {

    private _until: number | null = null
    private _timeframe: number = MAX_FRAME_DURATION

    private get timeframe(): number {
        return this._timeframe
    }

    private set timeframe(timeframe: number) {
        timeframe = timeframe || MAX_FRAME_DURATION
        timeframe = Math.min(timeframe, MAX_FRAME_DURATION)
        timeframe = Math.max(timeframe, MIN_FRAME_DURATION)

        this._timeframe = timeframe
    }

    private get until(): number {
        if (this._until) return this._until

        return this.untilmax(this.timeframe)
    }

    private set until(until: number) {
        if (until < this.untilmax(this.timeframe)) {
            this._until = until
        } else {
            // null will always return current untilmax
            this._until = null
        }
    }

    private untilmax(timeframe: number): number {
        return Math.floor(nowUnixTS() + timeframe * 0.382)
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
        this.zoomevent = throttle((e: ZoomEvent) => this.zoom(e.zoom), config.zoom.throttle, { trailing: false })
        this.pointerdown = (e: PointerdownEvent) => this.shiftstart()
        this.pointermove = throttle((e: PointermoveEvent) => this.shiftprogress(e.movementX), config.zoom.throttle, { trailing: false })
        this.pointerup = (e: PointerupEvent) => this.shiftend()

        this.eventTarget.addEventListener('zoom', this.zoomevent)
        this.eventTarget.addEventListener('pointerdown', this.pointerdown)
        this.eventTarget.addEventListener('pointermove', this.pointermove)
        this.eventTarget.addEventListener('pointerup', this.pointerup)
    }

    private shiftstart(): void {
        if (!this.shifting) this.shifting = true
    }

    private shiftprogress(shift: number): void {
        if (this.shifting && shift) this.shift(shift)
    }

    private shiftend(): void {
        if (this.shifting) this.shifting = false
    }

    public save(timeframe): void {
        this.timeframe = timeframe
    }

    public get() {
        return { since: this.since, until: this.until }
    }

    public destroy(): void {
        this.eventTarget.removeEventListener('zoom', this.zoomevent)
        this.eventTarget.removeEventListener('pointerdown', this.pointerdown)
        this.eventTarget.removeEventListener('pointermove', this.pointermove)
        this.eventTarget.removeEventListener('pointerup', this.pointerup)
    }

    private shift(shift: number): void {

        const timeshift = Math.floor(this.timeframe * shift / 100)
        const until = this.until - timeshift
        const since = until - this.timeframe

        if (
            until <= this.untilmax(this.timeframe) &&
            since > nowUnixTS() - MAX_FRAME_DURATION
        ) {
            this.until = until
            this.onUpdate()
        }
    }

    private zoom(zoom: number): void {

        const timeframe = Math.round(this.timeframe * (1 + zoom))

        let until = this.until
        const now2until = this.until - nowUnixTS()
        if (now2until > 0) {
            const percent = now2until / this.timeframe
            const diff = this.timeframe - timeframe
            until = this.until - Math.ceil(diff*percent)
        }
        const since = until - timeframe

        if (
            timeframe < MAX_FRAME_DURATION &&
            timeframe > MIN_FRAME_DURATION &&
            until <= this.untilmax(timeframe) &&
            since > nowUnixTS() - MAX_FRAME_DURATION
        ) {
            this.timeframe = timeframe
            this.until = until
            this.onUpdate()
        }
    }

}
