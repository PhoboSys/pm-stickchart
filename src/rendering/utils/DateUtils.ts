export class DateUtils {
    static unixTStoDate(timestamp: number): Date {
        return new Date(timestamp * 1000)
    }

    static nowUnixTS(): number {
        return Math.floor(Date.now() / 1000)
    }

    static toUnixTS(timestamp: number): number {
        return Math.floor(timestamp / 1000)
    }

    static formatUnixTSToHHmm(timestamp: number): string {
        const date = DateUtils.unixTStoDate(timestamp)

        const hh = date.getHours()
        const mm = date.getMinutes().toString().padStart(2, '0')

        return `${hh}:${mm}`
    }

    static formatSecondsToMMSS(seconds: number): string {
        const mm = Math.floor(seconds / 60)
        if (mm === 0) return seconds.toFixed(0)

        const ss = (seconds % 60).toFixed(0).padStart(2, '0')

        return `${mm}:${ss}`
    }
}
