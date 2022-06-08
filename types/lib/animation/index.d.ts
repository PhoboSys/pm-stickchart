export declare class AnimationController {
    private readonly duration;
    private readonly ease;
    private _instance;
    private progress;
    private listeners;
    constructor(duration: number, ease: string);
    private create;
    get value(): number;
    get isActive(): boolean;
    addListener(listener: AnimationControllerListener): this;
    removeListener(listener: AnimationControllerListener): this;
    removeListenerAll(): this;
    private kill;
    forceEnd(): this;
    reset(): this;
    start(): this;
    pause(): this;
}
declare abstract class AnimationControllerListener {
    abstract update(value: number): this;
    abstract kill(): void;
}
export declare class Tween implements AnimationControllerListener {
    from: any;
    to: any;
    private _instance;
    private listeners;
    constructor(from: any, to: any);
    animateWith(controller: AnimationController): this;
    addListener(listener: (value: any) => any): this;
    update(value: number): this;
    kill(): void;
}
export declare class ValueTween implements AnimationControllerListener {
    from: number;
    to: number;
    private _instance;
    private listeners;
    private _current;
    constructor(from: number, to: number);
    animateWith(controller: AnimationController): this;
    addListener(listener: (value: any) => any): this;
    update(value: number): this;
    kill(): void;
}
export {};
