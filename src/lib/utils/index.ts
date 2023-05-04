export function isEmpty(
    value: any
): boolean {

    return value === undefined ||
         value === null ||
         (typeof value === 'object' && Object.keys(value).length === 0) ||
         (typeof value === 'string' && value.trim().length === 0)

}

export function isFunction(
    value: any
): boolean {

    return typeof value === 'function'

}

export function mapValues(
    collection: any,
    visitor: (value?: any, key?: any, idx?: number) => void
): object {
    const result = {}

    if (isEmpty(collection)) return result

    let idx = 0
    for (const key in collection) {
        const item = collection[key]
        result[key] = visitor(item, key, idx++)
    }

    return result
}

export function forEach(
    collection: any,
    visitor: (value?: any, key?: any, idx?: number) => void
): void {

    if (isEmpty(collection)) return

    let idx = 0
    for (const key in collection) {
        const item = collection[key]
        visitor(item, key, idx++)
    }

}

export function pick(
    collection: any,
    keys: any[]
): object {
    const result = {}

    if (isEmpty(collection)) return result

    for (const idx in keys) {
        const key = keys[idx]
        const item = collection[key]
        if (!isEmpty(item)) {
            result[key] = item
        }
    }

    return result

}

export function unixTStoDate(timestamp: number): Date {
    return new Date(timestamp * 1000)
}

export function nowUnixTS(): number {
    return Math.floor(Date.now() / 1000)
}

export function toUnixTS(timestamp: number): number {
    return Math.floor(timestamp / 1000)
}

export function orderBy(
    collection: any,
    visitor: (value?: any, key?: any, idx?: number) => any,
    order: 'asc' | 'desc' = 'asc'
): any {

    if (isEmpty(collection)) return

    const ordered: any[] = []
    let idx = 0
    for (const key in collection) {
        const item = collection[key]
        ordered.push([visitor(item, key, idx++), item])
    }

    let apriority = 1
    let bpriority = -1
    if (order === 'desc') {
        apriority = -1
        bpriority = 1
    }

    ordered.sort((a, b) => {
        if (a[0] > b[0]) return apriority
        if (a[0] < b[0]) return bpriority

        return 0
    })

    const result: any[] = []
    for (const key in ordered) {
        result.push(ordered[key][1])
    }

    return result
}

export class GetSet {
    constructor(private getter, private setter) {}

    public get(): any {

        return this.getter()
    }

    public set(): this {
        this.setter(this.getter())

        return this
    }
}
