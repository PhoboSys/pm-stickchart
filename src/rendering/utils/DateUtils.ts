export class DateUtils {
    static unixTStoDate(timestamp: number): Date {
        return new Date(timestamp * 1000)
    }

    static formatUnixTSToHHmm(timestamp: number): string {
        const date = DateUtils.unixTStoDate(timestamp)

        const hh = date.getUTCHours()
        const mm = date.getUTCMinutes().toString().padStart(2, '0')

        return `${hh}:${mm}`
    }


}