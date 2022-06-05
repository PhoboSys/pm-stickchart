"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationController = void 0;
class AnimationController {
    constructor(duration, ease) {
        this.duration = duration;
        this.ease = ease;
        this.value = { value: 0 };
        this.listeners = [];
        this._instance = this.create();
    }
    create() {
        return gsap.to(this.value, {
            duration: this.duration,
            ease: this.ease,
            value: 1,
            paused: true,
            onUpdate: () => {
            },
            onInterrupt: () => {
            },
            onComplete: () => {
            }
        });
    }
    kill() {
        var _a;
        this.value = { value: 0 };
        (_a = this._instance) === null || _a === void 0 ? void 0 : _a.kill();
        this._instance = null;
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
//# sourceMappingURL=index.js.map