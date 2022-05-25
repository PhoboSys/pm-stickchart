declare type Handler<T> = () => T;
declare type HandlersMap<T> = {
    NORMAL: Handler<T>;
    MOBILE: Handler<T>;
};
export declare abstract class ERenderMode {
    private _value;
    constructor(_value: string);
    static NORMAL: () => ERenderMode;
    static MOBILE: () => ERenderMode;
    isEqual(other: ERenderMode): boolean;
    abstract when<T>(map: HandlersMap<T>): T;
}
export {};
