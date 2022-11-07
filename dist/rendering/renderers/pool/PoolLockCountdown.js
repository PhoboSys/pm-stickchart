"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolLockCountdown = void 0;
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const utils_1 = require("../../../lib/utils");
const ui_1 = __importDefault(require("../../../lib/ui"));
const textures_1 = require("../../textures");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolLockCountdown extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor(renderer) {
        super(renderer);
        this.style = {
            alpha: .3,
        };
        this.phaseStyle = {
            anchor: [1, 1],
            textstyle: {
                fill: 0xFFA000,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 24,
            }
        };
        this.countdownStyle = {
            anchor: [1, 1],
            offset: [-10, 10],
            textstyle: {
                fill: 0xFFA000,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 80,
            }
        };
        this.countdown();
    }
    get rendererId() {
        return PoolLockCountdown.POOL_LOCK_COUNTDOWN_ID;
    }
    countdown() {
        if (this._countdownTick)
            this._countdownTick();
        const period = 1000;
        const now = Date.now();
        const firein = Math.floor((now + period) / 1000) * 1000 - now;
        setTimeout(() => this.countdown(), firein);
    }
    update(context, layer) {
        this._countdownTick = () => super.update(context, layer);
        return this._countdownTick();
    }
    updatePool(pool, context, container) {
        if (!this.isActualPool(pool))
            return this.clear();
        this.updateBackground(pool, context, container);
        this.updateText(pool, context, container);
    }
    updateBackground(pool, context, container) {
        const { width, height, } = context.screen;
        const { lockDate, openDate, resolutionDate } = pool;
        const { timerange } = context.plotdata;
        const [openx, lockx, rx, nowx] = datamath_1.default.scale([openDate, lockDate, resolutionDate, (0, utils_1.nowUnixTS)()], timerange, width);
        const tolockx = Math.max(nowx, openx);
        if (lockx >= nowx) {
            const [gradientlock, gradientlockState] = this.get('gradientlock', () => new pixi_1.Graphics()
                .beginTextureFill({
                texture: context.textures.get(textures_1.LOCK_COUNTDOWN_TEXTURE),
            })
                .drawPolygon([
                0, 0,
                lockx - tolockx, 0,
                lockx - tolockx, height,
                0, height,
            ])
                .closePath()
                .endFill());
            if (gradientlockState.new)
                container.addChild(gradientlock);
            gradientlock.position.x = tolockx;
            gradientlock.height = height;
            gradientlock.width = lockx - tolockx;
            gradientlock.alpha = this.style.alpha;
        }
        if (rx >= nowx) {
            const torx = Math.max(nowx, lockx);
            const [gradientres, gradientresState] = this.get('gradientres', () => new pixi_1.Graphics()
                .beginTextureFill({
                texture: context.textures.get(textures_1.RESOLUTION_COUNTDOWN_TEXTURE),
            })
                .drawPolygon([
                0, 0,
                rx - torx, 0,
                rx - torx, height,
                0, height,
            ])
                .closePath()
                .endFill());
            if (gradientresState.new)
                container.addChild(gradientres);
            gradientres.position.x = torx;
            gradientres.height = height;
            gradientres.width = rx - torx;
            gradientres.alpha = this.style.alpha;
        }
    }
    updateText(pool, context, container) {
        const { height, width } = context.screen;
        const { lockDate, resolutionDate } = pool;
        const { xs, ys, } = context.plotdata;
        const x = Number(xs.at(-1));
        const y = Number(ys.at(-1));
        const now = (0, utils_1.nowUnixTS)();
        const countdownValue = lockDate >= now
            ? ui_1.default.duration24(lockDate - now + 1)
            : ui_1.default.duration24(resolutionDate - now + 1);
        const [countdowntext, countdownstate] = this.get('countdownText', () => __1.GraphicUtils.createText(countdownValue, [0, 0], this.countdownStyle.textstyle, this.countdownStyle.anchor));
        if (countdownstate.new)
            container.addChild(countdowntext);
        const [xof, yof] = this.countdownStyle.offset;
        countdowntext.text = countdownValue;
        countdowntext.position.set(x + xof, y + yof);
        const countdownPhase = lockDate >= now
            ? 'Positioning'
            : 'Resolution';
        const [postext, posstate] = this.get('positioningText', () => __1.GraphicUtils.createText(countdownPhase, [0, 0], this.phaseStyle.textstyle, this.phaseStyle.anchor));
        if (posstate.new)
            container.addChild(postext);
        postext.text = countdownPhase;
        postext.position.set(countdowntext.x, countdowntext.y - countdowntext.height);
    }
}
exports.PoolLockCountdown = PoolLockCountdown;
PoolLockCountdown.POOL_LOCK_COUNTDOWN_ID = Symbol('POOL_LOCK_COUNTDOWN_ID');
//# sourceMappingURL=PoolLockCountdown.js.map