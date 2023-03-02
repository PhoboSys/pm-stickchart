"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntityRenderer = void 0;
const _enums_1 = require("../../enums/index.js");
const BaseRenderer_1 = require("./BaseRenderer");
class BaseEntityRenderer extends BaseRenderer_1.BaseRenderer {
    getTransactionsByEntityId(context, entityid) {
        var _a, _b, _c;
        const result = [];
        const ids = (_b = (_a = context.transactions) === null || _a === void 0 ? void 0 : _a.entity) === null || _b === void 0 ? void 0 : _b[entityid];
        for (const id in ids) {
            const tnx = (_c = context.transactions) === null || _c === void 0 ? void 0 : _c.collection[id];
            result.push(tnx);
        }
        return result;
    }
    getComittedTransactions(context, entityid) {
        const txns = this.getTransactionsByEntityId(context, entityid);
        const commited = txns.filter((txn) => txn.status === _enums_1.ETransactionStatus.Commited);
        return commited;
    }
    getRevertedTransactions(context, entityid) {
        const txns = this.getTransactionsByEntityId(context, entityid);
        const reverted = txns.filter((txn) => txn.status === _enums_1.ETransactionStatus.Reverted);
        return reverted;
    }
    getPendingTransactions(context, entityid) {
        const txns = this.getTransactionsByEntityId(context, entityid);
        const pending = txns.filter((txn) => txn.blockNumber === null && txn.blockHash === null);
        return pending;
    }
    getUnpropagatedTransactions(context, entityid) {
        const txns = this.getComittedTransactions(context, entityid);
        const unpropagated = txns.filter((txn) => txn.blockNumber > (context === null || context === void 0 ? void 0 : context.latestBlockNumber));
        return unpropagated;
    }
    isEntityPropagating(context, entityid) {
        const pending = this.getPendingTransactions(context, entityid);
        const unpropagated = this.getUnpropagatedTransactions(context, entityid);
        return pending.length || unpropagated.length;
    }
    isEnityVerified(context, entityid) {
        const commited = this.getComittedTransactions(context, entityid);
        const pending = this.getPendingTransactions(context, entityid);
        return commited.length && !pending.length;
    }
    isEnityReverted(context, entityid) {
        const commited = this.getComittedTransactions(context, entityid);
        const pending = this.getPendingTransactions(context, entityid);
        const reverted = this.getRevertedTransactions(context, entityid);
        return !commited.length && !pending.length && reverted.length;
    }
}
exports.BaseEntityRenderer = BaseEntityRenderer;
//# sourceMappingURL=BaseEntityRenderer.js.map