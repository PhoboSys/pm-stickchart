"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolLockCountdownRenderer = void 0;
const config_1 = __importDefault(require("../../../config"));
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const symbols_1 = require("../../textures/symbols");
const DateUtils_1 = require("../../utils/DateUtils");
class PoolLockCountdownRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.style = {
            alpha: .3,
        };
        this.postextStyle = {
            fill: 0xFFA000,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 16,
            paddingBottom: 5,
        };
        this.countdowntextStyle = {
            fill: 0xFFA000,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 32,
            paddingBottom: 10,
        };
        this.countdown();
    }
    get rendererId() {
        return PoolLockCountdownRenderer.POOL_LOCK_COUNTDOWN_ID;
    }
    countdown() {
        if (this._countdownTick)
            this._countdownTick();
        const period = 1000;
        const now = Date.now();
        const firein = Math.floor((now + period) / 1000) * 1000 - now;
        setTimeout(() => this.countdown(), firein);
    }
    hideContainerAndDestroyVisitor(container) {
        container.alpha = 0;
        this._countdownTick = null;
        return container;
    }
    update(context, container) {
        var _a;
        const hasExpired = ((_a = context.pool) === null || _a === void 0 ? void 0 : _a.lockDate) < DateUtils_1.DateUtils.nowUnixTS();
        if (!context.pool || hasExpired)
            return this.hideContainerAndDestroyVisitor(container);
        this.updateBackground(context, container);
        this.updateText(context, container);
        this._countdownTick = () => this.updateText(context, container);
        container.alpha = 1;
        return container;
    }
    updateBackground(context, container) {
        const { width, height, } = context.screen;
        const { lockDate, openDate } = context.pool;
        const { timerange, xs } = context.plotdata;
        const [ox, rightx] = datamath_1.default.scale([openDate, lockDate], timerange, width);
        const leftx = Math.max(Number(xs.at(-1)), ox);
        const shape = [
            0, 0,
            rightx - leftx, 0,
            rightx - leftx, height,
            0, height,
        ];
        const [gradient, gradientState] = this.get('gradient', () => new pixi_1.Graphics()
            .beginTextureFill({
            texture: context.textures.get(symbols_1.LOCK_COUNTDOWN_TEXTURE),
        })
            .drawPolygon(shape)
            .closePath()
            .endFill());
        gradient.position.x = leftx;
        gradient.width = rightx - leftx;
        gradient.height = height;
        gradient.alpha = this.style.alpha;
        if (gradientState.new)
            container.addChild(gradient);
        return container;
    }
    updateText(context, container) {
        var _a;
        const hasExpired = ((_a = context.pool) === null || _a === void 0 ? void 0 : _a.lockDate) < DateUtils_1.DateUtils.nowUnixTS();
        if (hasExpired)
            return this.hideContainerAndDestroyVisitor(container);
        const { height, width } = context.screen;
        const { lockDate, openDate } = context.pool;
        const { timerange } = context.plotdata;
        const [leftx, rightx] = datamath_1.default.scale([openDate, lockDate], timerange, width);
        const x = leftx + (rightx - leftx) / 2;
        const { top, bottom } = config_1.default.padding;
        const y = height / (1 + top + bottom) * top;
        const countdownValue = DateUtils_1.DateUtils.formatSecondsToMMSS(lockDate - DateUtils_1.DateUtils.nowUnixTS() + 1);
        const [countdowntext, countdownstate] = this.get('countdownText', () => new pixi_1.Text(countdownValue, this.countdowntextStyle));
        if (countdownstate.new)
            countdownstate.height = countdowntext.height;
        countdowntext.text = countdownValue;
        countdowntext.anchor.set(.5, 1);
        countdowntext.position.set(x, y - this.countdowntextStyle.paddingBottom);
        const [postext, posstate] = this.get('positioningText', () => new pixi_1.Text('Positioning', this.postextStyle));
        postext.anchor.set(.5, 1);
        postext.position.set(x, countdowntext.y - countdownstate.height);
        const [boundary, boundarystate] = this.get('boundary', () => new pixi_1.Graphics());
        boundary
            .clear()
            .drawRect(leftx, 0, rightx - leftx, height);
        if (posstate.new)
            container.addChild(postext);
        if (countdownstate.new)
            container.addChild(countdowntext);
        if (boundarystate.new) {
            postext.mask = boundary;
            countdowntext.mask = boundary;
        }
        return container;
    }
}
exports.PoolLockCountdownRenderer = PoolLockCountdownRenderer;
PoolLockCountdownRenderer.POOL_LOCK_COUNTDOWN_ID = Symbol('POOL_LOCK_COUNTDOWN_ID');
//# sourceMappingURL=PoolLockCountdownRenderer.js.map