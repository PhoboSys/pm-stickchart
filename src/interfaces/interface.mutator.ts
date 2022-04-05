export interface IMutator<T> {
    readonly state: T

    mutateState(): T
}
