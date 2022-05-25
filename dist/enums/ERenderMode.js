"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERenderMode = void 0;
class ERenderMode {
    constructor(_value) {
        this._value = _value;
    }
    isEqual(other) {
        return other._value === this._value;
    }
}
exports.ERenderMode = ERenderMode;
ERenderMode.NORMAL = () => new _NormalRenderMode('NORMAL');
ERenderMode.MOBILE = () => new _MobileRenderMode('MOBILE');
class _NormalRenderMode extends ERenderMode {
    when({ NORMAL }) {
        return NORMAL();
    }
}
class _MobileRenderMode extends ERenderMode {
    when({ MOBILE }) {
        return MOBILE();
    }
}
//# sourceMappingURL=ERenderMode.js.map