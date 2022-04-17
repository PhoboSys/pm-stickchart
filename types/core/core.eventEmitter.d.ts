declare type EventHandler = (...args: any[]) => void;
export declare class EventEmitter<T> {
    protected event: Map<T, Set<EventHandler>>;
    on(name: T, handler: EventHandler): void;
    remove(name: T, handler: EventHandler): void;
    emit(name: T, ...args: any): void;
}
export {};
