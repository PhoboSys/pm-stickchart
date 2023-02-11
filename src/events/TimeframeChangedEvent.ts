import config from '@config'

export class TimeframeChangedEvent extends Event {
    public static readonly NAME: string = 'timeframechanged'

    public readonly timeframe: { since: number, until: number }

    constructor(timeframe: { since: number, until: number }) {
        super(TimeframeChangedEvent.NAME)

        this.timeframe = timeframe
    }
}

