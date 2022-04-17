type EventHandler = (...args: any[]) => void

export class EventEmitter<T> {
    protected event: Map<T, Set<EventHandler>> = new Map()

    public on(name: T, handler: EventHandler): void {
        if (this.event.has(name)) {
            this.event.get(name)?.add(handler)

            return
        }

        this.event.set(name, new Set([handler]))
    }

    public remove(name: T, handler: EventHandler): void {
        this.event.get(name)?.delete(handler)
    }

    public emit(name: T, ...args: any): void {
        const handlers = this.event.get(name)

        if (!handlers?.size) return

        for (const handler of handlers) {
            handler(...args)
        }
    }
}
