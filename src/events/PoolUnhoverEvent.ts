export class PoolUnhoverEvent extends Event {
    public static readonly NAME: string = 'poolunhover'

    public readonly inner: Event
    public readonly poolid: string

    constructor(poolid: string, inner: Event) {
        super(PoolUnhoverEvent.NAME)

        this.inner = inner
        this.poolid = poolid
    }
}


