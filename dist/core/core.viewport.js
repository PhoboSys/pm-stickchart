"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Viewport = void 0;
class Viewport {
    constructor(container) {
        this.container = container;
        this.renderedKeys = [];
    }
    keyRender(graphics, renderKey) {
        const index = this.findGraphicIndex(renderKey);
        if (index === -1) {
            return this.renderInexisted(graphics, renderKey);
        }
        this.rerenderExisted(graphics, index);
    }
    renderInexisted(graphics, renderKey) {
        this.container.addChild(graphics);
        this.renderedKeys.push(renderKey);
    }
    rerenderExisted(graphics, renderIndex) {
        const key = this.renderedKeys[renderIndex];
        this.removeByIndex(renderIndex);
        this.renderInexisted(graphics, key);
    }
    findGraphicIndex(renderKey) {
        return this.renderedKeys.indexOf(renderKey);
    }
    removeByIndex(renderIndex) {
        this.container.removeChildAt(renderIndex);
        this.renderedKeys.splice(renderIndex, 1);
    }
    removeByKey(renderKey) {
        this.removeByIndex(this.findGraphicIndex(renderKey));
    }
}
exports.Viewport = Viewport;
//# sourceMappingURL=core.viewport.js.map