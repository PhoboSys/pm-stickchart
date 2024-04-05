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

export function binarySearchNearest<T = number | string>(
    data: Array<T>,
    value: T,
    larger?: boolean,
): number {

    if (data.length === 1) {
        if (data[0] === value) return 0
        else if (larger && data[0] > value) return 0
        else if (!larger && data[0] < value) return 0
        else return -1
    }

    let midIndex = Math.floor(data.length / 2)
    let start = 0
    let end = data.length - 1
    let index = -1

    while (true) {
        if (data[midIndex] === value) {
            index = midIndex
            break
        } else if (end - start === 1) {
            if (larger) {
                if (data[start] >= value) {
                    index = start
                } else if (data[end] >= value) {
                    index = end
                }
            } else {
                if (data[end] <= value) {
                    index = end
                } else if (data[start] <= value) {
                    index = start
                }
            }
            break
        } else if (data[midIndex] < value) {
            start = midIndex
            midIndex = Math.floor((end + start) / 2)
        } else if (data[midIndex] > value) {
            end = midIndex
            midIndex = Math.floor((end + start) / 2)
        }
    }

    return index
}

function hexToRgb(hex): { r: number, g: number, b: number } {
    const bigint = parseInt(hex.slice(1), 16)

    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    }
}

function rgbToHex(r: number, g: number, b: number): string {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export function interpolateColorHex(
    [startColor, endColor]: [string, string],
    offset: number
): string {

    if (offset <= 0) return startColor
    if (offset >= 1) return endColor

    const startRGB = hexToRgb(startColor)
    const endRGB = hexToRgb(endColor)

    const interpolatedColor = {
        r: Math.round(startRGB.r + (endRGB.r - startRGB.r) * offset),
        g: Math.round(startRGB.g + (endRGB.g - startRGB.g) * offset),
        b: Math.round(startRGB.b + (endRGB.b - startRGB.b) * offset)
    }

    const interpolatedHex = rgbToHex(
        interpolatedColor.r,
        interpolatedColor.g,
        interpolatedColor.b,
    )

    return interpolatedHex
}
