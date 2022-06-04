import { gsap } from '../pixi'

export default class MorphController<TargetType extends object> {
    private anim: gsap.core.Tween | null

    private _lastTarget: TargetType | null

    constructor(
        private _isEqual: (v1: TargetType, v2: TargetType) => boolean,
        private _onUpdate: (v: TargetType) => void,

        private config?,
    ) {}

    public get isActive(): boolean {
        return !!this.anim
    }

    public performNew(from: TargetType, to: TargetType): this {
        if (!this.config) return this._clear()

        this
            ._kill()
            ._create({ from, to })

        this._lastTarget = to

        return this
    }

    public perform(from?: TargetType, to?: TargetType): this {
        if (!(from && to && this.config)) return this._clear()

        if (!this._lastTarget)
            return this.performNew(from, to)

        return this._perform(to)
    }

    private _perform(target: TargetType): this {
        const lastTarget = this._lastTarget!

        if (this._isEqual(lastTarget, target)) return this

        this
            ._kill()
            ._create({ from: lastTarget, to: target })

        this._lastTarget = target

        return this
    }

    private _create({ from, to }): this {
        this.anim = gsap.to(
            from,
            {
                ...to,
                ...this.config,
                onUpdate: () => {
                    if (!this._isEqual(from, to)) {
                        this._onUpdate(from)
                    }
                },
                onInterrupt: () => {
                    if (!this._lastTarget) return

                    // completes last animation on kill
                    // to avoid animation glitching
                    this._onUpdate(to)
                },
                onComplete: () => {
                    // gsap has limited precision
                    // in order to render exactly 'target'
                    // we have to apply it in the end
                    this._onUpdate(to)

                    // to free memory and to allow StickChart.render
                    this._kill()
                }
            }
        )

        return this
    }

    private _clear(): this {
        this._lastTarget = null
        this._kill()

        return this
    }

    private _kill(): this {
        this.anim?.kill()
        this.anim = null

        return this
    }

}
