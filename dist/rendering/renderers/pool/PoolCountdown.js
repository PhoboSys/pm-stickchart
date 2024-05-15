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
            alpha: 1,
            offset: [0, _config_1.default.style.lockCountdown.paddingTop],
            radiuses: [24, 24, 0, 0]
        };
        this.shadowGradientStyle = {
            blur: 5,
            offset: [0, _config_1.default.style.shadowCountdown.paddingTop + 27],
        };
        this.resolutionGradientStyle = {
            alpha: 1,
            offset: [0, _config_1.default.style.resolutionCountdown.padding],
            radiuses: [16, 16, 0, 0]
        };
        this.winningGradientContainerStyle = {
            alpha: 0,
            offset: [0, _config_1.default.style.winningCountdown.padding],
        };
        this.phaseStyle = {
            anchor: [0, 1],
            offset: [0, 14],
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 24,
                dropShadow: true,
                dropShadowAlpha: 0.1,
                dropShadowBlur: 2,
                dropShadowDistance: 2,
            }
        };
        this.countdownStyle = {
            anchor: [0, 1],
            offset: [10, 12],
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 72,
                dropShadow: true,
                dropShadowAlpha: 0.1,
                dropShadowBlur: 2,
                dropShadowDistance: 2,
            }
        };
        this.configAnimations = {
            positioning: {
                pixi: {
                    tint: 0xFFEBC7,
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
            },
            to_primary_gradient: {
                pixi: {
                    y: 0,
                },
                new: 'set',
                duration: 1,
                ease: 'power2.out',
            },
            to_secondary_gradient: {
                pixi: {
                    y: 27,
                },
                new: 'set',
                duration: 1,
                ease: 'power2.out',
            },
            flickering: {
                pixi: { alpha: 0.5 },
                duration: 0.5,
                ease: 'power2.out',
                repeat: -1,
                yoyo: true,
                yoyoEase: 'power2.out',
            },
            hushed: {
                pixi: { alpha: 0.5 },
                clear: true,
                new: 'set',
                duration: 1,
                ease: 'power2.out',
            },
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
        const now = (0, utils_1.nowTS)();
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
        const now = (0, utils_1.nowUnixTS)();
        const locked = now >= lockDate;
        const [openx, lockx, rx, nowx] = datamath_1.default.scale([startDate, lockDate, endDate, now], timerange, width);
        const lockheight = height - this.lockGradientStyle.offset[1];
        const tolockx = Math.max(nowx, openx);
        const lockwidth = lockx - tolockx;
        if (lockx >= nowx) {
            const [gradientlock, gradientlockState] = this.get('gradientlock', () => new pixi_1.Container);
            if (gradientlockState.new)
                container.addChild(gradientlock);
            const [gradientlockMask, gradientlockMaskState] = this.get('gradientlockMask', () => new pixi_1.Graphics);
            if (gradientlockMaskState.new) {
                gradientlock.mask = gradientlockMask;
                gradientlock.addChild(gradientlockMask);
            }
            this.updateGradientMask(gradientlockMask, [lockx, 0], [lockwidth, lockheight], this.lockGradientStyle);
            const gradientheight = 2 * lockheight;
            const [gradientlockBackground, gradientlockBackgroundState] = this.get('gradientlockBackground', () => this.createGradientBackground(this.lockGradientStyle, [width, gradientheight], context.textures.get(textures_1.LOCK_COUNTDOWN_TEXTURE, { width, height: gradientheight })), [gradientheight, width]);
            if (gradientlockBackgroundState.new)
                gradientlock.addChild(gradientlockBackground);
            gradientlockBackground.position.x = lockx;
            const fullLockwidth = lockx - openx;
            gradientlockBackground.position.y = -((gradientheight - lockheight) - lockwidth * (gradientheight - lockheight) / fullLockwidth);
            const secondsToLock = lockDate - now;
            if (secondsToLock <= context.options.positioningHushedAt)
                this.animate('gradientlock', 'hushed');
            else if (secondsToLock <= context.options.positioningFlickeringAt)
                this.animate('gradientlock', 'flickering');
        }
        else {
            this.clear('gradientlock');
        }
        if (rx >= latestX) {
            const rheight = height - this.resolutionGradientStyle.offset[1];
            const torx = Math.max(latestX, lockx);
            const rwidth = rx - torx;
            const [gradientres, gradientresState] = this.get('gradientres', () => new pixi_1.Container);
            if (gradientresState.new)
                container.addChild(gradientres);
            if (locked)
                this.animate('gradientres', 'to_primary_gradient');
            else
                this.animate('gradientres', 'to_secondary_gradient');
            const [gradientresMask, gradientresMaskState] = this.get('gradientresMask', () => new pixi_1.Graphics);
            if (gradientresMaskState.new || gradientresState.new) {
                gradientres.mask = gradientresMask;
                gradientres.addChild(gradientresMask);
            }
            this.updateGradientMask(gradientresMask, [rx, 0], [rwidth, rheight], this.resolutionGradientStyle);
            const [gradientresBackground, gradientresBackgroundState] = this.get('gradientresBackground', () => this.createGradientBackground(this.resolutionGradientStyle, [width, rheight], context.textures.get(textures_1.RESOLUTION_COUNTDOWN_TEXTURE, { width })), [rheight, width]);
            if (gradientresBackgroundState.new)
                gradientres.addChild(gradientresBackground);
            gradientresBackground.position.x = rx;
            const resolution = this.getPoolResolution(pool, context);
            if (pool.openPriceValue && pool.openPriceTimestamp && (resolution in this.validPariPositions) && locked) {
                const [winningcontainer, winningcontainerState] = this.get('winningcontainer', () => this.createWinningContainer());
                if (winningcontainerState.new || gradientresBackgroundState.new)
                    gradientresBackground.addChild(winningcontainer);
                const [winninggradient, winninggradientState] = this.get('winninggradient', () => this.createWinningGradient(context, [width, 2 * rheight]), [rheight, width]);
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
        }
        else {
            this.clear('winningcontainer');
            this.clear('winninggradient');
            this.clear('gradientres');
        }
        if (lockx >= nowx) {
            const [gradientlockShadow, gradientlockShadowState] = this.get('gradientlockShadow', () => this.createGradientShadow(context, [width, lockheight]), [lockheight, width]);
            if (gradientlockShadowState.new)
                container.addChild(gradientlockShadow);
            gradientlockShadow.position.x = lockx;
            const gradientlockShadowBG = gradientlockShadow.getChildAt(0);
            gradientlockShadowBG.width = lockwidth;
            gradientlockShadow.mask.width = lockwidth - 1;
        }
        else {
            this.clear('gradientlockShadow');
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
    createGradientBackground(style, [width, height], texture) {
        const { offset: [ofx, ofy] } = style;
        const background = (new pixi_1.Graphics())
            .beginTextureFill({ texture, alpha: style.alpha })
            .drawRect(ofx, ofy, width, height)
            .endFill();
        background.pivot.x = width;
        return background;
    }
    createGradientShadow(context, [width, height]) {
        const container = new pixi_1.Container();
        const { offset: [ofx, ofy] } = this.shadowGradientStyle;
        const texture = context.textures.get(textures_2.SHADOW_COUNTDOWN_TEXTURE, { width, height });
        const shadow = (new pixi_1.Graphics())
            .beginTextureFill({ texture })
            .drawRect(ofx, ofy, width, height)
            .endFill();
        const mask = shadow.clone();
        container.mask = mask;
        container.addChild(shadow, mask);
        return container;
    }
    updateGradientMask(rect, offset, [width, height], style) {
        const radiuses = style.radiuses.map((radius) => Math.min(width / 2, radius));
        rect.clear();
        const mask = _rendering_1.GraphicUtils.createRoundedRect(style.offset, [width, height], radiuses, { color: 0xFFFFFF }, rect);
        mask.position.set(...offset);
        mask.pivot.x = width;
        return mask;
    }
    updateText(pool, context, container) {
        const { poolid, lockDate, endDate } = pool;
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
            textgroup.zIndex = 3;
            container.addChild(textgroup);
        }
        const secondsToLock = lockDate - now;
        if (!locked && secondsToLock <= context.options.positioningHushedAt)
            this.animate('textgroup', 'hushed');
        else if (!locked && secondsToLock <= context.options.positioningFlickeringAt)
            this.animate('textgroup', 'flickering');
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
        if (locked) {
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
}
exports.PoolCountdown = PoolCountdown;
PoolCountdown.POOL_LOCK_COUNTDOWN_ID = Symbol('POOL_LOCK_COUNTDOWN_ID');
//# sourceMappingURL=PoolCountdown.js.map