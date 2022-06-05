export declare class AnimationController {
    private readonly duration;
    private readonly ease;
    private _instance;
    private value;
    private readonly listeners;
    constructor(duration: number, ease: string);
    private create;
    private kill;
    reset(): this;
    start(): this;
    pause(): this;
}
