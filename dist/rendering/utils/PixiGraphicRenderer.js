"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixiGraphicRenderer = void 0;
class PixiGraphicRenderer {
    constructor(container) {
        this.container = container;
        this.rendered = [];
    }
    render(graphics, renderKey) {
        if (this.exists(renderKey)) {
            this.update(renderKey, graphics);
        }
        else {
            this.add(renderKey, graphics);
        }
    }
    add(renderKey, graphics) {
        this.container.addChild(graphics);
        this.rendered.push(renderKey);
    }
    update(renderKey, graphics) {
        this.destroy(renderKey);
        this.add(renderKey, graphics);
    }
    destroy(renderKey) {
        const index = this.indexOf(renderKey);
        this.container.removeChildAt(index).destroy();
        this.rendered.splice(index, 1);
    }
    exists(renderKey) {
        return this.indexOf(renderKey) !== -1;
    }
    indexOf(renderKey) {
        return this.rendered.indexOf(renderKey);
    }
}
exports.PixiGraphicRenderer = PixiGraphicRenderer;
//# sourceMappingURL=PixiGraphicRenderer.js.map