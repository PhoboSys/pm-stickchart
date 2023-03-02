export class PoolUnpinEvent extends Event {
    public static readonly NAME: string = 'poolunpin'

    public readonly inner: Event | undefined

    public readonly poolid: string

    constructor(poolid: string, inner?: Event) {
        super(PoolUnpinEvent.NAME)

        this.inner = inner
        this.poolid = poolid
    }
}

