"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolCountdown = void 0;
const _rendering_1 = require("../../index.js");
const textures_1 = require("../../textures");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const utils_1 = require("../../../lib/utils");
const ui_1 = __importDefault(require("../../../lib/ui"));
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolCountdown extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor(renderer) {
        super(renderer);
        this.gradientStyle = {
            alpha: .3,
        };
        this.phaseStyle = {
            anchor: [0, 1],
            offset: [0, 12],
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 24,
            }
        };
        this.countdownStyle = {
            anchor: [0, 1],
            offset: [10, 10],
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 72,
            }
        };
        this.configAnimations = {
            positioning: {
                pixi: {
                    tint: 0xFFA000,
                },
                duration: 0.5,
                ease: 'power2.out',
                new: 'set',
            },
            resolution: {
                pixi: {
                    tint: 0x009797,
                },
                duration: 0.5,
                ease: 'power2.out',
                new: 'set',
            },
            hover_text: {
                pixi: {
                    alpha: 1,
                },
                duration: 0.5,
                ease: 'power2.out',
                clear: true,
            },
            unhover_text: {
                pixi: {
                    alpha: 0.3,
                },
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.1,
            },
        };
        this.countdown();
    }
    get animations() {
        return this.configAnimations;
    }
    get rendererId() {
        return PoolCountdown.POOL_LOCK_COUNTDOWN_ID;
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
        const { lockDate, startDate, endDate } = pool;
        const { timerange } = context.plotdata;
        const [openx, lockx, rx, nowx] = datamath_1.default.scale([startDate, lockDate, endDate, (0, utils_1.nowUnixTS)()], timerange, width);
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
            if (gradientlockState.new) {
                gradientlock.alpha = this.gradientStyle.alpha;
                container.addChild(gradientlock);
            }
            gradientlock.position.x = tolockx;
            gradientlock.height = height;
            gradientlock.width = lockx - tolockx;
        }
        else {
            this.clear('gradientlock');
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
            if (gradientresState.new) {
                gradientres.alpha = this.gradientStyle.alpha;
                container.addChild(gradientres);
            }
            gradientres.position.x = torx;
            gradientres.height = height;
            gradientres.width = rx - torx;
        }
        else {
            this.clear('gradientres');
        }
    }
    updateText(pool, context, container) {
        const { height, width } = context.screen;
        const { lockDate, endDate, poolid } = pool;
        const { latestX, latestY, } = context.plotdata;
        const x = latestX;
        const y = latestY;
        const now = (0, utils_1.nowUnixTS)();
        const positioning = lockDate >= now;
        const countdownValue = positioning
            ? ui_1.default.duration24(lockDate - now + 1)
            : ui_1.default.duration24(endDate - now + 1);
        const [textgroup, textgroupstate] = this.get('textgroup', () => new pixi_1.Container());
        if (textgroupstate.new) {
            textgroup.alpha = 0;
            container.addChild(textgroup);
        }
        const [countdowntext, countdownstate] = this.get('countdowntext', () => _rendering_1.GraphicUtils.createText(countdownValue, [0, 0], this.countdownStyle.textstyle, this.countdownStyle.anchor));
        if (countdownstate.new)
            textgroup.addChild(countdowntext);
        const [xof, yof] = this.countdownStyle.offset;
        countdowntext.text = countdownValue;
        countdowntext.position.set(x + xof, y + yof);
        const phaseName = positioning
            ? 'Positioning'
            : 'Resolution';
        const [phasetext, phasetextstate] = this.get('phasetext', () => _rendering_1.GraphicUtils.createText(phaseName, [0, 0], this.phaseStyle.textstyle, this.phaseStyle.anchor));
        if (phasetextstate.new)
            textgroup.addChild(phasetext);
        const [phxof, phyof] = this.phaseStyle.offset;
        phasetext.text = phaseName;
        phasetext.position.set(countdowntext.x + phxof, countdowntext.y - countdowntext.height + phyof);
        if (positioning) {
            this.animate('phasetext', 'positioning');
            this.animate('countdowntext', 'positioning');
        }
        else {
            this.animate('phasetext', 'resolution');
            this.animate('countdowntext', 'resolution');
        }
        if (textgroupstate.animation !== 'hover_text')
            this.animate('textgroup', 'unhover_text');
        if (!textgroupstate.subscribed) {
            textgroupstate.subscribed = true;
            context.eventTarget.addEventListener('poolhover', (e) => {
                if (e.poolid !== poolid)
                    return;
                this.rebind(poolid);
                this.animate('textgroup', 'hover_text');
            });
            context.eventTarget.addEventListener('poolunhover', (e) => {
                if (e.poolid !== poolid)
                    return;
                this.rebind(poolid);
                this.animate('textgroup', 'unhover_text');
            });
        }
    }
}
exports.PoolCountdown = PoolCountdown;
PoolCountdown.POOL_LOCK_COUNTDOWN_ID = Symbol('POOL_LOCK_COUNTDOWN_ID');
//# sourceMappingURL=PoolCountdown.js.map