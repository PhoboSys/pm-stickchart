/*

  In order to draw texts with custom font families use FontsReady.load to
  make sure that fonts are loaded before drawing pixi texts

  FONTS - custom fonts used in project. Add font here if it's used.

  NOTE: (also make sure the font is added to css as custom font).

*/

const FONTS = [
    { family: 'Roboto', weight: 500 },
    { family: 'Roboto', weight: 400 },

    { family: 'Proxima Nova', weight: 500 },
    { family: 'Proxima Nova', weight: 600 },
    { family: 'Proxima Nova', weight: 700 },

    { family: 'Gilroy', weight: 400 },
    { family: 'Gilroy', weight: 700 },
]

export class FontsReady {

    public inprogress = false

    public succeed = false

    public failed = false

    public load(): Promise<any> {

        const unloadedFonts = [...document.fonts]
            .filter(font => font.status === 'unloaded' && this.isFontUsed(font))
            .map(font => font.load())

        return Promise.all(unloadedFonts).then(() => {
            this.inprogress = false
            this.succeed = true
        })
    }

    private isFontUsed(font): boolean {
        return FONTS.some((FONT) => {
            return (FONT.family === font.family) && (FONT.weight === Number(font.weight))
        }

        )
    }
}
