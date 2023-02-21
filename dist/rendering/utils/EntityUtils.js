"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityUtils = void 0;
const _enums_1 = require("../../enums/index.js");
class EntityUtils {
    static getTransactionsByEntityId(context, entityid) {
        var _a;
        const tnxs = (_a = context.transactions) === null || _a === void 0 ? void 0 : _a[entityid];
        return tnxs ? Object.values(tnxs) : [];
    }
    static getComittedTransactions(context, entityid) {
        const txns = this.getTransactionsByEntityId(context, entityid);
        const commited = txns.filter((txn) => txn.status === _enums_1.ETransactionStatus.Commited);
        return commited;
    }
    static getRevertedTransactions(context, entityid) {
        const txns = this.getTransactionsByEntityId(context, entityid);
        const reverted = txns.filter((txn) => txn.status === _enums_1.ETransactionStatus.Reverted);
        return reverted;
    }
    static getPendingTransactions(context, entityid) {
        const txns = this.getTransactionsByEntityId(context, entityid);
        const pending = txns.filter((txn) => txn.blockNumber === null && txn.blockHash === null);
        return pending;
    }
    static getUnpropagatedTransactions(context, entityid, entityBlock) {
        const txns = this.getComittedTransactions(context, entityid);
        const unpropagated = txns.filter((txn) => txn.blockNumber > (entityBlock === null || entityBlock === void 0 ? void 0 : entityBlock.number));
        return unpropagated;
    }
    static isEntityPropagating(context, entityid, entityBlock) {
        const pending = this.getPendingTransactions(context, entityid);
        const unpropagated = this.getUnpropagatedTransactions(context, entityid, entityBlock);
        return pending.length !== 0 || unpropagated.length !== 0 || !(entityBlock === null || entityBlock === void 0 ? void 0 : entityBlock.number);
    }
    static isEnityVerified(context, entityid) {
        const commited = this.getComittedTransactions(context, entityid);
        const pending = this.getPendingTransactions(context, entityid);
        return commited.length !== 0 && pending.length === 0;
    }
    static isEnityReverted(context, entityid) {
        const commited = this.getComittedTransactions(context, entityid);
        const pending = this.getPendingTransactions(context, entityid);
        const reverted = this.getRevertedTransactions(context, entityid);
        return commited.length === 0 && pending.length === 0 && reverted.length !== 0;
    }
}
exports.EntityUtils = EntityUtils;
//# sourceMappingURL=EntityUtils.js.map