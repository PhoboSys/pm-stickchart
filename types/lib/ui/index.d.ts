export declare const UNIX_MINUTE = 60;
export declare const UNIX_HOUR: number;
export declare const UNIX_DAY: number;
export declare const UNIX_WEEK: number;
export default class ui {
    static percent(amount: any): string;
    static erc20(amount: any): string;
    static currency(price: any, currently?: string): string;
    static currencyScaled(price: any, currently: any, scale: number): string;
    static time24(timestamp: number): string;
    static duration24(duration: number): string;
}
