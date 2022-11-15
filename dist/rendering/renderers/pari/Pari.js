"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pari = void 0;
const _rendering_1 = require("../../index.js");
const PariTile_1 = require("./PariTile");
const PariClaimBackground_1 = require("./PariClaimBackground");
class Pari {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new _rendering_1.RenderingCompositor([
            new PariClaimBackground_1.PariClaimBackground(renderer),
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