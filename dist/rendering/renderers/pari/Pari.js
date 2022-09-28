"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pari = void 0;
const __1 = require("../..");
const PariTile_1 = require("./PariTile");
class Pari {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new __1.RenderingCompositor([
            new PariTile_1.PariTile(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.Pari = Pari;
//# sourceMappingURL=Pari.js.map