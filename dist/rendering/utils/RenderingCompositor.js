"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderingCompositor = void 0;
class RenderingCompositor {
    constructor(renderers) {
        this.renderers = renderers;
    }
    compose(context, next = () => { }) {
        let prevnext = next;
        let idx = this.renderers.length;
        while (--idx >= 0) {
            const renderer = this.renderers[idx];
            prevnext = this.create(context, renderer, prevnext);
        }
        return prevnext;
    }
    create(context, renderer, next) {
        return () => renderer.render(context, next);
    }
}
exports.RenderingCompositor = RenderingCompositor;
//# sourceMappingURL=RenderingCompositor.js.map