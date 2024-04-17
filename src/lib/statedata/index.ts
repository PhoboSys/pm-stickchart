export class StateData {
    public pinnedPoolid: string | null = null

    constructor(private onStateChange: () => any) {}

    public setPinnedPoolid(poolid): void {
        this.update('pinnedPoolid', poolid)
    }

    private update(path, data): void {
        this[path] = data
        this.onStateChange()
    }
}
