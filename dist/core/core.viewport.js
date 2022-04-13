"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Viewport = void 0;
class Viewport {
    constructor(container) {
        this.container = container;
        this.renderedKeys = [];
    }
    render(graphics, renderKey) {
        // console.log('rendered graphics count: ', this.container.children.length)
        const index = this.findGraphicIndex(renderKey);
        if (index === -1) {
            return this.renderNew(graphics, renderKey);
        }
        this.rerenderExisted(graphics, index);
    }
    renderNew(graphics, renderKey) {
        this.container.addChild(graphics);
        this.renderedKeys.push(renderKey);
    }
    rerenderExisted(graphics, renderIndex) {
        const key = this.renderedKeys[renderIndex];
        this.destroy(renderIndex);
        this.renderNew(graphics, key);
    }
    findGraphicIndex(renderKey) {
        return this.renderedKeys.indexOf(renderKey);
    }
    destroy(renderIndex) {
        this.container.removeChildAt(renderIndex).destroy();
        this.renderedKeys.splice(renderIndex, 1);
    }
    destroyByKey(renderKey) {
        this.destroy(this.findGraphicIndex(renderKey));
    }
}
exports.Viewport = Viewport;
//# sourceMappingURL=core.viewport.js.map