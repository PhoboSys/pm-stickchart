/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/naming-convention */
type Handler<T> = () => T

type HandlersMap<T> = {
    NORMAL: Handler<T>,
    MOBILE: Handler<T>,
}

export abstract class ERenderMode {
    constructor(private _value: string) {}

    static NORMAL = (): ERenderMode => new _NormalRenderMode('NORMAL')

    static MOBILE = (): ERenderMode => new _MobileRenderMode('MOBILE')

    isEqual(other: ERenderMode): boolean {
        return other._value === this._value
    }

    abstract when<T>(map: HandlersMap<T>): T
}

class _NormalRenderMode extends ERenderMode {
    when<T>({ NORMAL }: HandlersMap<T>): T {
        return NORMAL()
    }
}

class _MobileRenderMode extends ERenderMode {
    when<T>({ MOBILE }: HandlersMap<T>): T {
        return MOBILE()
    }
}
