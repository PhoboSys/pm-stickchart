"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueTween = exports.Tween = exports.AnimationController = void 0;
const gsap_1 = require("gsap");
class AnimationController {
    constructor(duration, ease) {
        this.duration = duration;
        this.ease = ease;
        this.listeners = [];
        this._instance = this.create();
    }
    create() {
        this.progress = { value: 0 };
        return gsap_1.gsap.to(this.progress, {
            duration: this.duration,
            ease: this.ease,
            value: 1,
            paused: true,
            repeat: 0,
            onUpdate: () => {
                this.listeners
                    .forEach(l => l.update(this.value));
            },
            onComplete: () => {
                this.listeners
                    .forEach(l => l.update(1));
            }
        });
    }
    get value() {
        return this.progress.value;
    }
    get isActive() {
        var _a, _b;
        return (_b = (_a = this._instance) === null || _a === void 0 ? void 0 : _a.isActive()) !== null && _b !== void 0 ? _b : false;
    }
    addListener(listener) {
        this.listeners.push(listener);
        return this;
    }
    removeListener(listener) {
        var _a;
        const index = this.listeners.indexOf(listener);
        (_a = this.listeners.splice(index, 1).pop()) === null || _a === void 0 ? void 0 : _a.kill();
        return this;
    }
    removeListenerAll() {
        this.listeners.forEach((l) => l.kill());
        this.listeners = [];
        return this;
    }
    kill() {
        var _a;
        (_a = this._instance) === null || _a === void 0 ? void 0 : _a.kill();
        this._instance = null;
        return this;
    }
    forceEnd() {
        var _a;
        (_a = this._instance) === null || _a === void 0 ? void 0 : _a.progress(1);
        return this;
    }
    reset() {
        this._instance = this
            .kill()
            .create();
        return this;
    }
    start() {
        var _a;
        (_a = this._instance) === null || _a === void 0 ? void 0 : _a.play();
        return this;
    }
    pause() {
        var _a;
        (_a = this._instance) === null || _a === void 0 ? void 0 : _a.pause();
        return this;
    }
}
exports.AnimationController = AnimationController;
class AnimationControllerListener {
}
class Tween {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.listeners = [];
        this._instance = gsap_1.gsap.to(from, Object.assign(Object.assign({}, to), { paused: true }));
    }
    animateWith(controller) {
        controller.addListener(this);
        return this;
    }
    addListener(listener) {
        this.listeners.push(listener);
        return this;
    }
    update(value) {
        var _a;
        (_a = this._instance) === null || _a === void 0 ? void 0 : _a.progress(value);
        this.listeners.forEach(l => l(this.from));
        return this;
    }
    kill() {
        var _a;
        (_a = this._instance) === null || _a === void 0 ? void 0 : _a.kill();
        this._instance = null;
    }
}
exports.Tween = Tween;
class ValueTween {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.listeners = [];
        this._current = { value: from };
        this._instance = gsap_1.gsap.to(this._current, {
            value: to,
            paused: true
        });
    }
    animateWith(controller) {
        controller.addListener(this);
        return this;
    }
    addListener(listener) {
        this.listeners.push(listener);
        return this;
    }
    update(value) {
        var _a;
        (_a = this._instance) === null || _a === void 0 ? void 0 : _a.progress(value);
        this.listeners.forEach(l => l(this._current.value));
        return this;
    }
    kill() {
        var _a;
        (_a = this._instance) === null || _a === void 0 ? void 0 : _a.kill();
        this._instance = null;
    }
}
exports.ValueTween = ValueTween;
//# sourceMappingURL=index.js.map