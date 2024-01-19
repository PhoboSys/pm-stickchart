"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolOpen = void 0;
const _rendering_1 = require("../../index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const utils_1 = require("../../../lib/utils");
const _enums_1 = require("../../../enums/index.js");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolOpen extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.dashLineStyle = {
            width: 1,
            join: 'round',
            cap: 'round',
            gap: 8,
            dash: 6,
            color: 0xFFFFFF,
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
        };
    }
    get rendererId() {
        return PoolOpen.POOL_OPEN_ID;
    }
    get animations() {
        return this.configAnimations;
    }
    updatePool(pool, context, container) {
        var _a;
        const paris = (_a = context.paris) === null || _a === void 0 ? void 0 : _a[pool.poolid];
        if (!this.isActualPool(pool) && (0, utils_1.isEmpty)(paris))
            return this.clear();
        this.updateGroup(pool, paris, context, container);
        const [group] = this.read('group');
        this.updateOpenLine(pool, context, group);
    }
    updateGroup(pool, paris, context, container) {
        const poolid = pool.poolid;
        const resolution = this.getPoolResolution(pool, context);
        const hasWinPari = paris && paris.some(pari => pari.position === resolution);
        const isHistorical = this.isHistoricalPool(pool, context);
        const nocontest = resolution === _enums_1.EPosition.NoContest;
        const emptypool = this.isNoContestEmptyPool(pool);
        const hashClaimablePari = paris && paris.some(pari => {
            const phantom = pari.phantom;
            const win = pari.position === resolution;
            const won = win && isHistorical && !nocontest && !phantom;
            const reverted = _rendering_1.EntityUtils.isEnityReverted(context, pari.pariid);
            const orphan = phantom && reverted;
            const claimable = !pari.claimed && (won || nocontest) && !orphan;
            return claimable;
        });
        if (!hasWinPari && !nocontest && isHistorical) {
            this.animate('group', 'hide_group', {
                onComplete: () => {
                    this.rebind(poolid);
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
            if (hashClaimablePari) {
                if (groupstate.animation !== 'pin_group_claimable')
                    this.animate('group', 'hide_group_claimable');
            }
            else {
                if (groupstate.animation !== 'pin_group_unclaimable')
                    this.animate('group', 'unpin_group_unclaimable');
            }
            if (!groupstate.subscribed) {
                groupstate.subscribed = true;
                this.get('hashClaimablePari', () => hashClaimablePari, [hashClaimablePari]);
                context.eventTarget.addEventListener('poolpin', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid);
                    const [hashClaimablePari] = this.read('hashClaimablePari');
                    if (hashClaimablePari)
                        this.animate('group', 'pin_group_claimable');
                    else
                        this.animate('group', 'pin_group_unclaimable');
                });
                context.eventTarget.addEventListener('poolunpin', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid);
                    const [hashClaimablePari] = this.read('hashClaimablePari');
                    if (hashClaimablePari)
                        this.animate('group', 'unpin_group_claimable');
                    else
                        this.animate('group', 'unpin_group_unclaimable');
                });
            }
        }
        else {
            if (hasWinPari && !emptypool) {
                this.animate('group', 'winning_group');
            }
            else {
                this.animate('group', 'loseing_group');
            }
        }
    }
    updateOpenLine(pool, context, container) {
        if (!container)
            return this.clear('line');
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([pool.openPriceTimestamp], timerange, width);
        const [line, linestate] = this.get('line', () => _rendering_1.GraphicUtils.createVerticalDashLine(0, [0, context.screen.height], this.dashLineStyle));
        if (linestate.new)
            container.addChild(line);
        line.position.x = x;
        line.height = height;
    }
}
exports.PoolOpen = PoolOpen;
PoolOpen.POOL_OPEN_ID = Symbol('POOL_OPEN_ID');
//# sourceMappingURL=PoolOpen.js.map