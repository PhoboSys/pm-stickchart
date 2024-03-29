"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolCountdown = void 0;
const _rendering_1 = require("../../index.js");
const textures_1 = require("../../textures");
const textures_2 = require("../../textures");
const _config_1 = __importDefault(require("../../../config.js"));
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const utils_1 = require("../../../lib/utils");
const ui_1 = __importDefault(require("../../../lib/ui"));
const _enums_1 = require("../../../enums/index.js");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolCountdown extends BasePoolsRenderer_1.BasePoolsRenderer {
    get animations() {
        return this.configAnimations;
    }
    constructor(renderer) {
        super(renderer);
        this.lockGradientStyle = {
            alpha: 0.33,
            offset: [0, _config_1.default.style.lockCountdown.padding],
            radiuses: [24, 0, 0, 24]
        };
        this.resolutionGradientStyle = {
            alpha: 1,
            offset: [0, _config_1.default.style.resolutionCountdown.padding],
            radiuses: [24, 0, 0, 24]
        };
        this.winningGradientContainerStyle = {
            alpha: 0,
            offset: [0, _config_1.default.style.winningCountdown.padding],
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
                    tint: 0xA7E0FF,
                },
                duration: 0.5,
                ease: 'power2.out',
                new: 'set',
            },
            locked: {
                pixi: {
                    tint: 0xA7E0FF,
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
            winning_gradient_show: {
                pixi: {
                    alpha: 1,
                },
                duration: 0.5,
                ease: 'power2.out',
                new: 'set',
                clear: true,
            },
            winning_gradient_hide: {
                pixi: {
                    alpha: 0,
                },
                duration: 0.5,
                ease: 'power2.out',
            }
        };
        this.validPariPositions = {
            [_enums_1.EPosition.Up]: _enums_1.EPosition.Up,
            [_enums_1.EPosition.Down]: _enums_1.EPosition.Down,
            [_enums_1.EPosition.Zero]: _enums_1.EPosition.Zero,
        };
        this.countdown();
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
        if (!this.isActualPool(pool, context))
            return this.clear();
        container.sortableChildren = true;
        this.updateBackground(pool, context, container);
        this.updateText(pool, context, container);
    }
    updateBackground(pool, context, container) {
        var _a;
        const { width, height, } = context.screen;
        const { lockDate, startDate, endDate } = pool;
        const { timerange, latestX } = context.plotdata;
        const [openx, lockx, rx, nowx] = datamath_1.default.scale([startDate, lockDate, endDate, (0, utils_1.nowUnixTS)()], timerange, width);
        const tolockx = Math.max(nowx, openx);
        if (lockx >= nowx) {
            const lockheight = height - 2 * this.lockGradientStyle.offset[1];
            const lockwidth = lockx - tolockx;
            const [gradientlock, gradientlockState] = this.get('gradientlock', () => this.createGradient(this.lockGradientStyle, [width, lockheight], context.textures.get(textures_1.LOCK_COUNTDOWN_TEXTURE, { width })), [lockheight, width]);
            if (gradientlockState.new)
                container.addChild(gradientlock);
            gradientlock.position.x = lockx;
            gradientlock.mask.pivot.x = lockwidth;
        }
        else {
            this.clear('gradientlock');
        }
        if (rx >= latestX) {
            const rheight = height - 2 * this.resolutionGradientStyle.offset[1];
            const torx = Math.max(latestX, lockx);
            const rwidth = rx - torx;
            const [gradientres, gradientresState] = this.get('gradientres', () => this.createGradient(this.resolutionGradientStyle, [width, rheight], context.textures.get(textures_1.RESOLUTION_COUNTDOWN_TEXTURE, { width })), [rheight, width]);
            if (gradientresState.new)
                container.addChild(gradientres);
            const resolution = this.getPoolResolution(pool, context);
            if (pool.openPriceValue && pool.openPriceTimestamp && (resolution in this.validPariPositions)) {
                const [winningcontainer, winningcontainerState] = this.get('winningcontainer', () => this.createWinningContainer());
                if (winningcontainerState.new || gradientresState.new)
                    gradientres.addChild(winningcontainer);
                const [winninggradient, winninggradientState] = this.get('winninggradient', () => this.createWinningGradient(context, [gradientres.width, 2 * rheight]), [rheight, gradientres.width]);
                if (winninggradientState.new) {
                    winningcontainer.addChild(winninggradient);
                    winninggradientState.timeline = this.createWinningGradientTimeline(winninggradient, rheight);
                }
                const paris = (_a = context.paris) === null || _a === void 0 ? void 0 : _a[pool.poolid];
                const hasWinPari = paris && paris.some(pari => pari.position === resolution);
                const ofy = this.winningGradientContainerStyle.offset[1];
                if (hasWinPari) {
                    if (resolution === _enums_1.EPosition.Up)
                        winningcontainer.position.y = ofy - rheight;
                    if (resolution === _enums_1.EPosition.Zero)
                        winningcontainer.position.y = ofy - rheight / 2;
                    if (resolution === _enums_1.EPosition.Down)
                        winningcontainer.position.y = ofy;
                    this.animate('winningcontainer', 'winning_gradient_show');
                }
                else {
                    this.animate('winningcontainer', 'winning_gradient_hide');
                }
            }
            else {
                this.clear('winningcontainer');
                this.clear('winninggradient');
            }
            gradientres.position.x = rx;
            gradientres.mask.pivot.x = rwidth;
        }
        else {
            this.clear('winningcontainer');
            this.clear('winninggradient');
            this.clear('gradientres');
        }
    }
    createWinningContainer() {
        const { alpha, offset } = this.winningGradientContainerStyle;
        const container = new pixi_1.Container();
        container.alpha = alpha;
        container.position.set(...offset);
        return container;
    }
    createWinningGradient(context, [width, height]) {
        const gradient = new pixi_1.Graphics();
        gradient
            .beginTextureFill({ texture: context.textures.get(textures_2.WINNING_COUNTDOWN_TEXTURE, { width, height }) })
            .drawRect(0, 0, width, height)
            .endFill();
        return gradient;
    }
    createWinningGradientTimeline(gradient, height) {
        return pixi_1.gsap.timeline({ repeat: -1, yoyo: true, yoyoEase: 'power1.inOut' })
            .to(gradient, {
            pixi: { y: -height * 0.1 },
            duration: 2,
            ease: 'power1.inOut',
        })
            .to(gradient, {
            pixi: { y: height * 0.1 },
            duration: 2,
            ease: 'power1.inOut',
        });
    }
    createGradient(style, [width, height], texture) {
        const group = new pixi_1.Container();
        const gradient = _rendering_1.GraphicUtils.createRoundedRect(style.offset, [width, height], style.radiuses, { texture });
        group.addChild(gradient);
        const mask = gradient.clone();
        group.addChild(mask);
        group.pivot.x = width;
        mask.position.x = width;
        gradient.alpha = style.alpha;
        group.mask = mask;
        return group;
    }
    updateText(pool, context, container) {
        const { lockDate, endDate, poolid } = pool;
        const { latestX, latestY, } = context.plotdata;
        const x = latestX;
        const y = latestY;
        const now = (0, utils_1.nowUnixTS)();
        const locked = now >= lockDate;
        const countdownValue = locked
            ? ui_1.default.duration24(endDate - now)
            : ui_1.default.duration24(lockDate - now);
        if (now >= endDate) {
            this.clear('textgroup');
            this.clear('countdowntext');
            this.clear('phasetext');
            return;
        }
        const [textgroup, textgroupstate] = this.get('textgroup', () => new pixi_1.Container());
        if (textgroupstate.new) {
            textgroup.alpha = 0;
            textgroup.zIndex = 3;
            container.addChild(textgroup);
        }
        const [countdowntext, countdownstate] = this.get('countdowntext', () => _rendering_1.GraphicUtils.createText(countdownValue, [0, 0], this.countdownStyle.textstyle, this.countdownStyle.anchor));
        if (countdownstate.new)
            textgroup.addChild(countdowntext);
        const [xof, yof] = this.countdownStyle.offset;
        countdowntext.text = countdownValue;
        countdowntext.position.set(x + xof, y + yof);
        const phaseName = locked
            ? 'Round'
            : 'Entry';
        const [phasetext, phasetextstate] = this.get('phasetext', () => _rendering_1.GraphicUtils.createText(phaseName, [0, 0], this.phaseStyle.textstyle, this.phaseStyle.anchor));
        if (phasetextstate.new)
            textgroup.addChild(phasetext);
        const [phxof, phyof] = this.phaseStyle.offset;
        phasetext.text = phaseName;
        phasetext.position.set(countdowntext.x + phxof, countdowntext.y - countdowntext.height + phyof);
        if (locked) {
            this.animate('phasetext', 'locked');
            this.animate('countdowntext', 'locked');
        }
        else {
            this.animate('phasetext', 'positioning');
            this.animate('countdowntext', 'positioning');
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