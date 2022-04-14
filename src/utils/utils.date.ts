export const unixTimestampToMilliseconds = (timestamp: number): number => {
    return timestamp * 1000
}

export const unixTimestampToDate = (timestamp: number): Date => {
    return new Date(unixTimestampToMilliseconds(timestamp))
}

