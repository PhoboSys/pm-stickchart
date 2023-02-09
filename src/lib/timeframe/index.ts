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
    private _timerfamePreffered: number = UNIX_DAY

    private _since: number | null = null
    private _until: number | null = null

    private set since(since: number) {

        let timeframe = this.until - since
        timeframe = Math.min(timeframe, MAX_FRAME_DURATION)
        timeframe = Math.max(timeframe, MIN_FRAME_DURATION)
        since = this.until - timeframe

        if (since > this.sincemin()) {
            this._since = since
        } else {
            // null will always return current sincemin
            this._since = null
        }
    }

    private set until(until: number) {

        let timeframe = until - this.since
        timeframe = Math.min(timeframe, MAX_FRAME_DURATION)
        timeframe = Math.max(timeframe, MIN_FRAME_DURATION)
        until = this.since + timeframe

        if (until < this.untilmax()) {
            this._until = until
        } else {
            // null will always return current untilmax
            this._until = null
        }
    }

    private untilmax(): number {
        const now = nowUnixTS()
        const timeframe = now - this.since
        return Math.floor(now + timeframe * 0.36)
    }

    private sincemin(): number {
        return nowUnixTS() - UNIX_DAY
    }

    private get since(): number {
        if (this._since) return this._since

        return this.sincemin()
    }

    private get until(): number {
        if (this._until) return this._until

        return this.untilmax()
    }

    private readonly zoomevent: any
    private readonly pointerdown: any
    private readonly pointermove: any
    private readonly pointerup: any

    private shiftStartingPoint: Point | null = null

    constructor(
        private readonly eventTarget: EventTarget,
        private readonly onUpdate: () => any,
    ) {
        this.zoomevent = throttle((e: ZoomEvent) => this.zoom(e.zoom), config.zoom.throttle, { trailing: false })
        this.pointerdown = (e: PointerdownEvent) => this.shiftstart(e.position)
        this.pointermove = throttle((e: PointermoveEvent) => this.shiftprogress(e.position, e), config.zoom.throttle, { trailing: false })
        this.pointerup = (e: PointerupEvent) => this.shiftend(e.position)

        this.eventTarget.addEventListener('zoom', this.zoomevent)
        this.eventTarget.addEventListener('pointerdown', this.pointerdown)
        this.eventTarget.addEventListener('pointermove', this.pointermove)
        this.eventTarget.addEventListener('pointerup', this.pointerup)
    }

    private shiftstart(position: Point): void {
        if (isEmpty(this.shiftStartingPoint) && !isEmpty(position)) {
            this.shiftStartingPoint = position
        }
    }

    private shiftprogress(position: Point, e: PointermoveEvent): void {
        if (!isEmpty(this.shiftStartingPoint) && !isEmpty(position)) {
            this.shift(Math.floor(position.x - this.shiftStartingPoint!.x), e)
            this.shiftStartingPoint = position
        }
    }

    private shiftend(position: Point): void {
        if (!isEmpty(this.shiftStartingPoint) && !isEmpty(position)) {
            this.shiftStartingPoint = null
        }
    }

    public save(timeframe): this {

        this.since = this.until - timeframe
        this._timerfamePreffered = this.until - this.since

        return this
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

    public actualize(): this {
        // debugger
        // const timeframeNow = this.until - this.since
        // const timeframeMax = this._timerfamePreffered * MAX_EXPAND_RATION

        // if (timeframeNow > timeframeMax) {
        //     this.since = this.until - this._timerfamePreffered
        // }

        return this
    }

    private shift(shift: number, e: PointermoveEvent): void {

        const timeframe = this.since - this.until
        shift = Math.floor(timeframe * shift / 300)

        const since = this.since + shift
        const until = this.until + shift

        if (
            since >= this.sincemin() &&
            until <= this.untilmax()
        ) {
            this.since = since
            this.until = until

            this.onUpdate()
        }
    }

    private zoom(zoom: number): void {

        let timeframe = this.until - this.since
        timeframe = Math.round(timeframe * (1 + zoom))

        const since = this.until - timeframe

        if (
            since >= this.sincemin()
        ) {
            this.since = since

            this._timerfamePreffered = timeframe

            this.onUpdate()
        }
    }

}
