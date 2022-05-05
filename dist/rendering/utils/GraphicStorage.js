"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphicStorage = void 0;
const pixi_1 = require("../../lib/pixi");
class GraphicStorage {
    constructor(root) {
        this.root = root;
        this.containers = [];
    }
    add(renderKey, container) {
        this.root.addChild(container);
        this.containers.push(renderKey);
    }
    update(renderKey, container) {
        const index = this.indexOf(renderKey);
        const old = this.root.getChildAt(index);
        old.destroy();
        this.root.addChildAt(container, index);
    }
    init(renderKey) {
        const container = new pixi_1.Container();
        this.add(renderKey, container);
        return container;
    }
    set(renderKey, container) {
        const old = this.get(renderKey);
        if (old !== container) {
            this.update(renderKey, container);
        }
    }
    get(renderKey) {
        return this.root.getChildAt(this.indexOf(renderKey));
    }
    exists(renderKey) {
        return this.indexOf(renderKey) !== -1;
    }
    indexOf(renderKey) {
        return this.containers.indexOf(renderKey);
    }
}
exports.GraphicStorage = GraphicStorage;
//# sourceMappingURL=GraphicStorage.js.map