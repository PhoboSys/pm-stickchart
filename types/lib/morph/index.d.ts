export default class MorphController<TargetType extends object> {
    private _isEqual;
    private _onUpdate;
    private config?;
    private anim;
    private _lastTarget;
    constructor(_isEqual: (v1: TargetType, v2: TargetType) => boolean, _onUpdate: (v: TargetType) => void, config?: any);
    get isActive(): boolean;
    performNew(from: TargetType, to: TargetType): this;
    perform(from?: TargetType, to?: TargetType): this;
    private _perform;
    private _create;
    private _clear;
    private _kill;
}
