export class StateData {
    public pinnedRoundid: string | null = null

    constructor(private onStateChange: () => any) {}

    public setPinnedRoundid(roundid): void {
        this.update('pinnedRoundid', roundid)
    }

    private update(path, data): void {
        this[path] = data
        this.onStateChange()
    }
}
