import config from '../../config'

import { gsap } from '../pixi'
import { DataPoint, PlotData } from '../../chartdata/types'
import { DataBuilder } from '../../chartdata'

export default class MorphController {
    private anim: gsap.core.Tween | null

    private _lastTarget: DataPoint | null

    constructor(
        private _onUpdate: (point: DataPoint) => void
    ) {

    }

    public get isActive(): boolean {
        return !!this.anim
    }

    public perform(lastplot?: PlotData, currentplot?: PlotData): this {
        if (!(lastplot && currentplot && config.morph)) return this._clear()

        if (!this._lastTarget)
            return this._performNew(lastplot, currentplot)

        return this._perform(currentplot)
    }

    private _performNew(lastplot: PlotData, currentplot: PlotData): this {
        const target = DataBuilder.getLatest(currentplot)
        const animated = DataBuilder.getLatest(lastplot)

        this
            ._kill()
            ._create({ animated, target }, config.morph)

        this._lastTarget = target

        return this
    }

    private _perform(currentplot: PlotData): this {
        const target = DataBuilder.getLatest(currentplot)
        const lastTarget = this._lastTarget!

        if (DataBuilder.isEqual(lastTarget, target)) return this

        this
            ._kill()
            ._create({ animated: { ...lastTarget }, target }, config.morph)

        this._lastTarget = target

        return this
    }

    private _create({ animated, target }, animConfig): this {
        this.anim = gsap.to(
            animated,
            {
                ...target,
                ...animConfig,
                onUpdate: () => {
                    if (!DataBuilder.isEqual(animated, target)) {
                        this._onUpdate(animated)
                    }
                },
                onInterrupt: () => {
                    if (!this._lastTarget) return

                    // completes last animation on kill
                    // to avoid animation glitching
                    this._onUpdate(target)
                },
                onComplete: () => {
                    // gsap has limited precision
                    // in order to render exactly 'target'
                    // we have to apply it in the end
                    this._onUpdate(target)

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
