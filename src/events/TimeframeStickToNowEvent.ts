import config from '@config'

export class TimeframeStickToNowEvent extends Event {
    public static readonly NAME: string = 'timeframe2now'

    public readonly timeframe: { since: number, until: number }

    constructor(timeframe: { since: number, until: number }) {
        super(TimeframeStickToNowEvent.NAME)

        this.timeframe = timeframe
    }
}

