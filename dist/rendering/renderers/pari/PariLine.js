"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariLine = void 0;
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const _enums_1 = require("../../../enums/index.js");
const BaseParisRenderer_1 = require("./BaseParisRenderer");
class PariLine extends BaseParisRenderer_1.BaseParisRenderer {
    constructor() {
        super(...arguments);
        this.nocontestLineStyle = {
            [_enums_1.EPosition.Up]: {
                startOffset: [0, -8],
                endOffset: [0, 40 + (56 - 32) / 2 + 32],
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 2,
                }
            },
            [_enums_1.EPosition.Down]: {
                startOffset: [0, 8],
                endOffset: [0, -134 - 62 + (56 - 32) / 2],
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 2,
                }
            },
            [_enums_1.EPosition.Zero]: {
                startOffset: [0, 8],
                endOffset: [0, 14 + (56 - 32) / 2],
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 2,
                }
            }
        };
        this.winlineStyle = {
            [_enums_1.EPosition.Up]: {
                startOffset: [0, -8],
                endOffset: [0, 40 + (56 - 32) / 2 + 32],
                lineStyle: {
                    color: 0xD66F35,
                    width: 2,
                }
            },
            [_enums_1.EPosition.Down]: {
                startOffset: [0, 8],
                endOffset: [0, -134 - 62 + (56 - 32) / 2],
                lineStyle: {
                    color: 0xD66F35,
                    width: 2,
                }
            },
            [_enums_1.EPosition.Zero]: {
                startOffset: [0, 8],
                endOffset: [0, 14 + (56 - 32) / 2],
                lineStyle: {
                    color: 0xD66F35,
                    width: 2,
                }
            }
        };
        this.validPariPositions = {
            [_enums_1.EPosition.Up]: _enums_1.EPosition.Up,
            [_enums_1.EPosition.Down]: _enums_1.EPosition.Down,
            [_enums_1.EPosition.Zero]: _enums_1.EPosition.Zero,
        };
        this.configAnimations = {
            winning_group: {
                pixi: {
                    alpha: 1,
                    zIndex: 3,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
                new: 'set'
            },
            loseing_group: {
                pixi: {
                    alpha: 1,
                    zIndex: 3,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
                new: 'set'
            },
            pin_group_claimable: {
                pixi: {
                    alpha: 1,
                    zIndex: 4,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
            },
            unpin_group_claimable: {
                pixi: {
                    alpha: 0,
                    zIndex: 1,
                },
                duration: 0.3,
                ease: 'power2.out',
            },
            hide_group_claimable: {
                pixi: {
                    alpha: 0,
                    zIndex: 1,
                },
                duration: 0.6,
                ease: 'power2.out',
                delay: 5,
                new: 'set'
            },
            pin_group_unclaimable: {
                pixi: {
                    alpha: 0.9,
                    zIndex: 3,
                },
                duration: 0.3,
                ease: 'power2.out',
                clear: true,
            },
            unpin_group_unclaimable: {
                pixi: {
                    alpha: 0,
                    zIndex: 0,
                },
                duration: 0.3,
                ease: 'power2.out',
                new: 'set'
            },
            hide_group: {
                pixi: {
                    alpha: 0,
                    zIndex: 0,
                },
                duration: 0.5,
                ease: 'power2.out',
            },
            hover_claim: {
                pixi: {
                    alpha: 1.2,
                    scale: 1.1,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
            },
            unhover_claim: {
                pixi: {
                    alpha: 1,
                    scale: 1,
                },
                duration: 0.5,
                ease: 'power2.out',
            },
            tab_claim: {
                pixi: {
                    scale: 1.2,
                },
                duration: 0.2,
                ease: 'back.out(2)',
                repeat: 1,
                yoyo: true,
                yoyoEase: 'power2.out',
            },
        };
    }
    get rendererId() {
        return PariLine.PARI_LINE_ID;
    }
    get animations() {
        return this.configAnimations;
    }
    updatePari(pool, pari, context, container) {
        if (!context.features.pariTileNewDesign)
            return this.clear();
        if (!(pari.position in this.validPariPositions))
            return this.clear();
        const state = this.getPariState(pool, pari, context);
        this.updateGroup(pool, pari, context, container, state);
        if (!state.win && !state.nocontest && state.isHistorical)
            return;
        const [group] = this.read('group');
        this.updateLine(pool, pari, context, group, state);
    }
    updateGroup(pool, pari, context, container, state) {
        const poolid = pool.poolid;
        const pariid = pari.pariid;
        const { isHistorical, win, claimable, emptypool, nocontest } = state;
        if (!win && !nocontest && isHistorical) {
            this.animate('group', 'hide_group', {
                onComplete: () => {
                    this.rebind(poolid, pariid);
                    this.clear();
                }
            });
            return;
        }
        const [group, groupstate] = this.get('group', () => new pixi_1.Container(), []);
        if (groupstate.new) {
            container.addChild(group);
            group.alpha = 0;
        }
        if (isHistorical) {
            if (claimable) {
                if (groupstate.animation !== 'pin_group_claimable')
                    this.animate('group', 'hide_group_claimable');
            }
            else {
                if (groupstate.animation !== 'pin_group_unclaimable')
                    this.animate('group', 'unpin_group_unclaimable');
            }
            if (!groupstate.subscribed) {
                groupstate.subscribed = true;
                this.get('claimable', () => state.claimable, [state.claimable]);
                context.eventTarget.addEventListener('poolpin', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid, pariid);
                    const [claimable] = this.read('claimable');
                    if (claimable)
                        this.animate('group', 'pin_group_claimable');
                    else
                        this.animate('group', 'pin_group_unclaimable');
                });
                context.eventTarget.addEventListener('poolunpin', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid, pariid);
                    const [claimable] = this.read('claimable');
                    if (claimable)
                        this.animate('group', 'unpin_group_claimable');
                    else
                        this.animate('group', 'unpin_group_unclaimable');
                });
            }
        }
        else {
            if (win && !emptypool) {
                this.animate('group', 'winning_group');
            }
            else {
                this.animate('group', 'loseing_group');
            }
        }
    }
    updateLine(pool, pari, context, container, state) {
        const position = pari.position;
        const { win } = state;
        if (!container)
            return this.clear('line');
        const { height } = context.screen;
        const { pricerange } = context.plotdata;
        const { openPriceValue, openPriceTimestamp } = pool;
        const [ox] = datamath_1.default.scale([openPriceTimestamp], context.plotdata.timerange, context.screen.width);
        const [oy] = datamath_1.default.scaleReverse([openPriceValue], pricerange, height);
        const [line, linestate] = this.get('line', () => new pixi_1.Graphics());
        if (linestate.new)
            container.addChild(line);
        const style = win ? this.winlineStyle : this.nocontestLineStyle;
        const [startx, starty] = style[pari.position].startOffset;
        const [endx, endy] = style[pari.position].endOffset;
        let vertical = null;
        if (position === _enums_1.EPosition.Up)
            vertical = 0;
        if (position === _enums_1.EPosition.Zero)
            vertical = oy;
        if (position === _enums_1.EPosition.Down)
            vertical = context.screen.height;
        line
            .clear()
            .lineStyle(style[pari.position].lineStyle)
            .moveTo(ox + startx, oy + starty)
            .lineTo(ox + endx, vertical + endy);
        line.position.y = -container.position.y;
    }
}
exports.PariLine = PariLine;
PariLine.PARI_LINE_ID = Symbol('PARI_LINE_ID');
//# sourceMappingURL=PariLine.js.map