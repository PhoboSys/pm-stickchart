export class TimeframeUnstickToNowEvent extends Event {
    public static readonly NAME: string = 'timeframeUnnow'

    public readonly timeframe: { since: number, until: number }

    constructor(timeframe: { since: number, until: number }) {
        super(TimeframeUnstickToNowEvent.NAME)

        this.timeframe = timeframe
    }
}

