"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntityRenderer = void 0;
const lodash_1 = require("lodash");
const _enums_1 = require("../../enums/index.js");
const BaseRenderer_1 = require("./BaseRenderer");
class BaseEntityRenderer extends BaseRenderer_1.BaseRenderer {
    getTransactionsByEntityId(context, entityid) {
        var _a, _b, _c;
        const ids = (_b = (_a = context.transactions) === null || _a === void 0 ? void 0 : _a.entity) === null || _b === void 0 ? void 0 : _b[entityid];
        const txns = (0, lodash_1.pick)((_c = context.transactions) === null || _c === void 0 ? void 0 : _c.collection, (0, lodash_1.keys)(ids));
        return txns;
    }
    getComittedTransactions(context, entityid) {
        const txns = this.getTransactionsByEntityId(context, entityid);
        const commited = (0, lodash_1.filter)(txns, { status: _enums_1.ETransactionStatus.Commited });
        return commited;
    }
    getRevertedTransactions(context, entityid) {
        const txns = this.getTransactionsByEntityId(context, entityid);
        const reverted = (0, lodash_1.filter)(txns, { status: _enums_1.ETransactionStatus.Reverted });
        return reverted;
    }
    getPendingTransactions(context, entityid) {
        const txns = this.getTransactionsByEntityId(context, entityid);
        const pending = (0, lodash_1.filter)(txns, { blockNumber: null, blockHash: null });
        return pending;
    }
    getUnpropagatedTransactions(context, entityid) {
        const txns = this.getComittedTransactions(context, entityid);
        const unpropagated = (0, lodash_1.filter)(txns, ({ blockNumber }) => blockNumber > (context === null || context === void 0 ? void 0 : context.latestBlockNumber));
        return unpropagated;
    }
    isEntityPropagating(context, entityid) {
        const pending = this.getPendingTransactions(context, entityid);
        const unpropagated = this.getUnpropagatedTransactions(context, entityid);
        return (!(0, lodash_1.isEmpty)(pending) ||
            !(0, lodash_1.isEmpty)(unpropagated));
    }
    isEnityVerified(context, entityid) {
        const commited = this.getComittedTransactions(context, entityid);
        const pending = this.getPendingTransactions(context, entityid);
        return (!(0, lodash_1.isEmpty)(commited) &&
            (0, lodash_1.isEmpty)(pending));
    }
    isEnityReverted(context, entityid) {
        const commited = this.getComittedTransactions(context, entityid);
        const pending = this.getPendingTransactions(context, entityid);
        const reverted = this.getRevertedTransactions(context, entityid);
        return ((0, lodash_1.isEmpty)(commited) &&
            (0, lodash_1.isEmpty)(pending) &&
            !(0, lodash_1.isEmpty)(reverted));
    }
}
exports.BaseEntityRenderer = BaseEntityRenderer;
//# sourceMappingURL=BaseEntityRenderer.js.map