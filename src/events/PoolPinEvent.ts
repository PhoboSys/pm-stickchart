export class PoolPinEvent extends Event {
    public static readonly NAME: string = 'poolpin'

    public readonly inner: Event | undefined

    public readonly poolid: string

    constructor(poolid: string, inner?: Event) {
        super(PoolPinEvent.NAME)

        this.inner = inner
        this.poolid = poolid
    }
}

