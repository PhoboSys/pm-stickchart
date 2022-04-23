"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderingCompositor = void 0;
class RenderingCompositor {
    constructor(renderers) {
        this.renderers = renderers;
    }
    use(renderer) {
        this.renderers.push(renderer);
    }
    compose(context, next = () => { }) {
        let prevnext = next;
        for (const renderer of this.renderers.reverse()) {
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