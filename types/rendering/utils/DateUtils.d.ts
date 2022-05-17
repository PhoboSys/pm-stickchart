export declare class DateUtils {
    static unixTStoDate(timestamp: number): Date;
    static nowUnixTS(): number;
    static toUnixTS(timestamp: number): number;
    static formatUnixTSToHHmm(timestamp: number): string;
    static formatSecondsToMMSS(seconds: number): string;
}
