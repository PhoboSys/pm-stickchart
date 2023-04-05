"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityUtils = void 0;
const _enums_1 = require("../../enums/index.js");
const utils_1 = require("../../lib/utils");
class EntityUtils {
    static getTransactionsByEntityId(context, entityid) {
        var _a;
        let result = [];
        const txnids = (_a = context.transactionsEntities) === null || _a === void 0 ? void 0 : _a[entityid];
        if ((0, utils_1.isEmpty)(txnids))
            return result;
        const txns = (0, utils_1.pick)(context.transactions, Object.keys(txnids));
        if ((0, utils_1.isEmpty)(txns))
            return result;
        result = Object.values(txns);
        return result;
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
    static getUnpropagatedTransactions(context, entityid) {
        var _a;
        const txns = this.getComittedTransactions(context, entityid);
        const entityBlock = ((_a = context.blocksEntities) === null || _a === void 0 ? void 0 : _a[entityid]) || context.blocksLatest;
        const unpropagated = txns.filter((txn) => txn.blockNumber > (entityBlock === null || entityBlock === void 0 ? void 0 : entityBlock.number));
        return unpropagated;
    }
    static isEntityPropagating(context, entityid) {
        const pending = this.getPendingTransactions(context, entityid);
        const unpropagated = this.getUnpropagatedTransactions(context, entityid);
        return pending.length !== 0 || unpropagated.length !== 0;
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