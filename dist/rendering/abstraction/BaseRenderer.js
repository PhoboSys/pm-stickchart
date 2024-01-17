"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRenderer = void 0;
const _config_1 = __importDefault(require("../../config.js"));
const _infra_1 = require("../../infra/index.js");
const BaseElement_1 = require("./BaseElement");
class BaseRenderer extends BaseElement_1.BaseElement {
    constructor(storage) {
        super();
        this.storage = storage;
    }
    render(context, done) {
        const start = Date.now();
        const container = this.storage.get(this.rendererId);
        const newcontainer = this.update(context, container);
        if (newcontainer !== container) {
            this.storage.set(this.rendererId, newcontainer);
            this.rebind();
            this.clear();
        }
        const took = Date.now() - start;
        if (took > _config_1.default.performance.renderMs)
            _infra_1.Logger.warn('[Violation] Render took ' + took + 'ms', this.rendererId);
        done();
    }
}
exports.BaseRenderer = BaseRenderer;
//# sourceMappingURL=BaseRenderer.js.map