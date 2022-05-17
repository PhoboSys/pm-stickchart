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
        this._countdownTicker = new pixi_1.Ticker();
        this.style = {
            alpha: .2,
        };
        this.postextStyle = {
            fill: 0xFFA000,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 15,
            paddingBottom: 5,
        };
        this.countdowntextStyle = {
            fill: 0xFFA000,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 20,
            paddingBottom: 10,
        };
        this.setupCountdownTicker();
    }
    get rendererId() {
        return PoolLockCountdownRenderer.POOL_LOCK_COUNTDOWN_ID;
    }
    setupCountdownTicker() {
        this._countdownTicker.minFPS = 1;
        this._countdownTicker.maxFPS = 1;
        this._countdownTicker.add(() => {
            const { lockDate } = this._context.pool;
            if (DateUtils_1.DateUtils.unixTSNow() > lockDate)
                return this._countdownTicker.stop();
            this.updateCountdown();
        });
    }
    startCountdownTicker() {
        if (this._countdownTicker.started)
            return;
        this._countdownTicker.start();
    }
    hideContainer(container) {
        container.alpha = 0;
        return container;
    }
    update(context, container) {
        if (!context.pool)
            return this.hideContainer(container);
        const { lockDate } = context.pool;
        if (DateUtils_1.DateUtils.unixTSNow() > lockDate)
            return this.hideContainer(container);
        this._context = context;
        container.alpha = 1;
        this.startCountdownTicker();
        this.updateBackground(context, container);
        this.updateText(context, container);
        return container;
    }
    updateBackground(context, container) {
        const { width, height, } = context.screen;
        const { lockDate, openDate } = context.pool;
        const { timerange, xs } = context.plotdata;
        const [ox, rightx] = datamath_1.default.scale([openDate, lockDate], timerange, width);
        const leftx = Math.max(Number(xs.at(-1)), ox);
        if (leftx > rightx)
            return this.hideContainer(container);
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
        if (gradientState.new)
            container.addChild(gradient);
        container.alpha = this.style.alpha;
        return container;
    }
    updateText(context, container) {
        const { height, width } = context.screen;
        const { lockDate, openDate } = context.pool;
        const { timerange } = context.plotdata;
        const [leftx, rightx] = datamath_1.default.scale([openDate, lockDate], timerange, width);
        const x = leftx + (rightx - leftx) / 2;
        const { top, bottom } = config_1.default.padding;
        const y = height / (1 + top + bottom) * top;
        const countdownValue = DateUtils_1.DateUtils.formatSecondsToMMSS(lockDate - DateUtils_1.DateUtils.unixTSNow());
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
    updateCountdown() {
        const [countdowntext] = this.get('countdownText', () => new pixi_1.Text(''));
        const { lockDate } = this._context.pool;
        const countdownSeconds = lockDate - DateUtils_1.DateUtils.unixTSNow();
        countdowntext.text = DateUtils_1.DateUtils.formatSecondsToMMSS(countdownSeconds);
    }
}
exports.PoolLockCountdownRenderer = PoolLockCountdownRenderer;
PoolLockCountdownRenderer.POOL_LOCK_COUNTDOWN_ID = Symbol('POOL_LOCK_COUNTDOWN_ID');
//# sourceMappingURL=PoolLockCountdownRenderer.js.map