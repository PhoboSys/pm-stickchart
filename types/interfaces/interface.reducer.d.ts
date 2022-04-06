export interface IReducer<T> {
    readonly state: T;
    reduceState(): T;
}
