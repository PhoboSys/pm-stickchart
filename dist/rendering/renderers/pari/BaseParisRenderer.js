"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseParisRenderer = void 0;
const BasePoolsRenderer_1 = require("../../renderers/pool/BasePoolsRenderer");
const utils_1 = require("../../../lib/utils");
class BaseParisRenderer extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.prevparis = {};
        this.newparis = {};
    }
    updatePool(pool, context, layer) {
        var _a;
        const paris = (_a = context.paris) === null || _a === void 0 ? void 0 : _a[pool.poolid];
        if ((0, utils_1.isEmpty)(paris)) {
            this.cleanupPari(pool, context);
            return layer;
        }
        this.updateEachPari(pool, paris, context, layer);
        this.cleanupPari(pool, context);
        return layer;
    }
    updateEachPari(pool, paris, context, layer) {
        (0, utils_1.forEach)(paris, (pari, idx) => {
            this.rebind(pool.poolid, pari.pariid);
            this.updatePari(pool, pari, context, layer, idx);
            this.newparis[pari.pariid] = pari.pariid;
        });
    }
    cleanupPari(pool, context) {
        (0, utils_1.forEach)(this.prevparis, pariid => {
            if (pariid in this.newparis)
                return;
            this.rebind(pool.poolid, pariid);
            this.clear();
        });
        this.prevparis = this.newparis;
        this.newparis = {};
    }
}
exports.BaseParisRenderer = BaseParisRenderer;
//# sourceMappingURL=BaseParisRenderer.js.map