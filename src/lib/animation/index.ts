import { gsap } from 'gsap'

type ControllerValue = { value: number }

export class AnimationController {
    private _instance: gsap.core.Tween | null

    private progress: ControllerValue

    private listeners: AnimationControllerListener[] = []

    constructor(
        private readonly duration: number,
        private readonly ease: string,
    ) {
        this._instance = this.create()
    }

    private create(): gsap.core.Tween {
        this.progress = { value: 0 }

        return gsap.to(
            this.progress,
            {
                duration: this.duration,
                ease: this.ease,

                value: 1,
                paused: true,
                repeat: 0,

                onUpdate: () => {
                    this.listeners
                        .forEach(l => l.update(this.value))
                },

                onComplete: () => {
                    this.listeners
                        .forEach(l => l.update(1))
                }
            }
        )
    }

    public get value(): number {
        return this.progress.value
    }

    public get isActive(): boolean {
        return this._instance?.isActive() ?? false
    }

    public addListener(listener: AnimationControllerListener): this {
        this.listeners.push(listener)

        return this
    }

    public removeListener(listener: AnimationControllerListener): this {
        const index = this.listeners.indexOf(listener)
        this.listeners.splice(index, 1).pop()?.kill()

        return this
    }

    public removeListenerAll(): this {
        this.listeners.forEach((l) => l.kill())
        this.listeners = []

        return this
    }

    private kill(): this {
        this._instance?.kill()
        this._instance = null

        return this
    }

    public forceEnd(): this {
        this._instance?.progress(1)

        return this
    }

    public reset(): this {
        this._instance = this
            .kill()
            .create()

        return this
    }

    public start(): this {
        this._instance?.play()

        return this
    }

    public pause(): this {
        this._instance?.pause()

        return this
    }
}

abstract class AnimationControllerListener {
    public abstract update(value: number): this

    public abstract kill(): void
}

export class Tween implements AnimationControllerListener {
    private _instance: gsap.core.Tween | null

    private listeners: Array<(value) => any> = []

    constructor(
        public from: any,

        public to: any
    ) {
        this._instance = gsap.to(
            from,
            {
                ...to,

                paused: true
            }
        )
    }

    public animateWith(controller: AnimationController): this {
        controller.addListener(this)

        return this
    }

    public addListener(listener: (value) => any): this {
        this.listeners.push(listener)

        return this
    }

    public update(value: number): this {
        this._instance?.progress(value)
        this.listeners.forEach(l => l(this.from))

        return this
    }

    public kill(): void {
        this._instance?.kill()
        this._instance = null
    }
}

export class ValueTween implements AnimationControllerListener {
    private _instance: gsap.core.Tween | null

    private listeners: Array<(value) => any> = []

    private _current: { value: number }

    constructor(
        public from: number,

        public to: number
    ) {
        this._current = { value: from }

        this._instance = gsap.to(
            this._current,
            {
                value: to,

                paused: true
            }
        )
    }

    public animateWith(controller: AnimationController): this {
        controller.addListener(this)

        return this
    }

    public addListener(listener: (value) => any): this {
        this.listeners.push(listener)

        return this
    }

    public update(value: number): this {
        this._instance?.progress(value)
        this.listeners.forEach(l => l(this._current.value))

        return this
    }

    public kill(): void {
        this._instance?.kill()
        this._instance = null
    }
}

