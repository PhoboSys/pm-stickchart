export declare class DateUtils {
    static unixTStoDate(timestamp: number): Date;
    static unixTSNow(): number;
    static formatUnixTSToHHmm(timestamp: number): string;
    static formatSecondsToMMSS(seconds: number): string;
}
