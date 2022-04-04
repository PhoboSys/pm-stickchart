"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Viewport = void 0;
class Viewport {
    constructor(container) {
        this.container = container;
        this.renderIndexMap = {};
    }
    render(graphics) {
        this.container.addChild(graphics);
    }
    renderWithKey(graphics, renderKey) {
        this.renderIndexMap[renderKey] = this.container.children.length;
        this.render(graphics);
    }
    removeByKey(renderKey) {
        this.container.removeChildAt(this.renderIndexMap[renderKey]);
    }
}
exports.Viewport = Viewport;
//# sourceMappingURL=core.viewport.js.map