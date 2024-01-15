"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolOpen = void 0;
const _rendering_1 = require("../../index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const utils_1 = require("../../../lib/utils");
const _enums_1 = require("../../../enums/index.js");
const GroupElement_1 = require("../../elements/GroupElement");
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
    }
    get rendererId() {
        return PoolOpen.POOL_OPEN_ID;
    }
    updatePool(pool, context, container) {
        var _a;
        const paris = (_a = context.paris) === null || _a === void 0 ? void 0 : _a[pool.poolid];
        if (!this.isActualPool(pool) && (0, utils_1.isEmpty)(paris))
            return this.clear();
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
        const [groupElement] = this.get('groupElement', () => new GroupElement_1.GroupElement(), []);
        const state = { win: hasWinPari, isHistorical, nocontest, emptypool, claimable: hashClaimablePari };
        const [group, groupstate] = groupElement.render(context, pool.poolid, state);
        if (group && groupstate.new)
            container.addChild(group);
        this.updateOpenLine(pool, context, group);
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