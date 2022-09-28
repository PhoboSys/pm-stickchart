"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolLockCountdown = void 0;
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const utils_1 = require("../../../lib/utils");
const ui_1 = __importDefault(require("../../../lib/ui"));
const symbols_1 = require("../../textures/symbols");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolLockCountdown extends BasePoolsRenderer_1.BasePoolsRenderer {
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
        this.updateBackground(pool, context, container);
        this.updateText(pool, context, container);
    }
    updateBackground(pool, context, container) {
        if (pool.lockDate < (0, utils_1.nowUnixTS)())
            return this.clear();
        const { width, height, } = context.screen;
        const { lockDate, openDate } = pool;
        const { timerange } = context.plotdata;
        const [openx, rightx, nowx] = datamath_1.default.scale([openDate, lockDate, (0, utils_1.nowUnixTS)()], timerange, width);
        const leftx = Math.max(nowx, openx);
        const [gradient, gradientState] = this.get('gradient', () => new pixi_1.Graphics()
            .beginTextureFill({
            texture: context.textures.get(symbols_1.LOCK_COUNTDOWN_TEXTURE),
        })
            .drawPolygon([
            0, 0,
            rightx - leftx, 0,
            rightx - leftx, height,
            0, height,
        ])
            .closePath()
            .endFill());
        gradient.position.x = leftx;
        gradient.width = rightx - leftx;
        gradient.height = height;
        gradient.alpha = this.style.alpha;
        if (gradientState.new)
            container.addChild(gradient);
    }
    updateText(pool, context, container) {
        if (pool.lockDate < (0, utils_1.nowUnixTS)())
            return this.clear();
        const { height, width } = context.screen;
        const { lockDate, openDate } = pool;
        const { timerange, paddingY: [top] } = context.plotdata;
        const [leftx, rightx] = datamath_1.default.scale([openDate, lockDate], timerange, width);
        const x = leftx + (rightx - leftx) / 2;
        const y = top;
        const countdownValue = ui_1.default.duration24(lockDate - (0, utils_1.nowUnixTS)() + 1);
        const [countdowntext, countdownstate] = this.get('countdownText', () => new pixi_1.Text(countdownValue, this.countdowntextStyle));
        if (countdownstate.new)
            container.addChild(countdowntext);
        countdowntext.text = countdownValue;
        countdowntext.anchor.set(.5, 1);
        countdowntext.position.set(x, y - this.countdowntextStyle.paddingBottom);
        const [postext, posstate] = this.get('positioningText', () => new pixi_1.Text('Positioning', this.postextStyle));
        if (posstate.new)
            container.addChild(postext);
        postext.anchor.set(.5, 1);
        postext.position.set(x, countdowntext.y - countdowntext.height);
        const [boundary, boundarystate] = this.get('boundary', () => new pixi_1.Graphics());
        boundary
            .clear()
            .beginFill()
            .drawRect(leftx, 0, rightx - leftx, height)
            .endFill();
        if (boundarystate.new) {
            postext.mask = boundary;
            countdowntext.mask = boundary;
        }
    }
}
exports.PoolLockCountdown = PoolLockCountdown;
PoolLockCountdown.POOL_LOCK_COUNTDOWN_ID = Symbol('POOL_LOCK_COUNTDOWN_ID');
//# sourceMappingURL=PoolLockCountdown.js.map