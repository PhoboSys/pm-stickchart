export declare class Logger {
    private ns;
    private debuginfo;
    private debugwarn;
    private debugerror;
    constructor(namespace: string);
    info(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
}
