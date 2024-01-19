"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pari = void 0;
const _rendering_1 = require("../../index.js");
const PariTileOutdated_1 = require("./PariTileOutdated");
const PariTile_1 = require("./PariTile");
const PariLine_1 = require("./PariLine");
const PariClaimBackground_1 = require("./PariClaimBackground");
class Pari {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new _rendering_1.RenderingCompositor([
            new PariClaimBackground_1.PariClaimBackground(renderer),
            new PariLine_1.PariLine(renderer),
            new PariTile_1.PariTile(renderer),
            new PariTileOutdated_1.PariTileOutdated(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.Pari = Pari;
//# sourceMappingURL=Pari.js.map