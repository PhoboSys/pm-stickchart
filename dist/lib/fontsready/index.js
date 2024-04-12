"use strict";
/*

  In order to draw texts with custom font families use FontsReady.load to
  make sure that fonts are loaded before drawing pixi texts

  FONTS - custom fonts used in project. Add font here if it's used.

  NOTE: (also make sure the font is added to css as custom font).

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.FontsReady = void 0;
const FONTS = [
    { family: 'Roboto', weight: 500 },
    { family: 'Roboto', weight: 400 },
    { family: 'Proxima Nova', weight: 500 },
    { family: 'Proxima Nova', weight: 600 },
    { family: 'Proxima Nova', weight: 700 },
    { family: 'Gilroy', weight: 400 },
    { family: 'Gilroy', weight: 700 },
];
class FontsReady {
    constructor() {
        this.inprogress = false;
        this.succeed = false;
        this.failed = false;
    }
    load() {
        const unloadedFonts = [...document.fonts]
            .filter(font => font.status === 'unloaded' && this.isFontUsed(font))
            .map(font => font.load());
        return Promise.all(unloadedFonts).then(() => {
            this.inprogress = false;
            this.succeed = true;
        });
    }
    isFontUsed(font) {
        return FONTS.some((FONT) => {
            return (FONT.family === font.family) && (FONT.weight === Number(font.weight));
        });
    }
}
exports.FontsReady = FontsReady;
//# sourceMappingURL=index.js.map