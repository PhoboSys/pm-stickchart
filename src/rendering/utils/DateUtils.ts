export class DateUtils {
    static unixTStoDate(timestamp: number): Date {
        return new Date(timestamp * 1000)
    }

    static formatUnixTSToHHmm(timestamp: number): string {
        const date = DateUtils.unixTStoDate(timestamp)

        const hh = date.getHours()
        const mm = date.getMinutes().toString().padStart(2, '0')

        return `${hh}:${mm}`
    }

}
