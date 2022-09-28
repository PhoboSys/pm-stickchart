export class PoolHoverEvent extends Event {
    public static readonly NAME: string = 'poolhover'

    public readonly inner: Event
    public readonly poolid: string

    constructor(poolid: string, inner: Event) {
        super(PoolHoverEvent.NAME)

        this.inner = inner
        this.poolid = poolid
    }
}

