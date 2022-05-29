import { Application, Rectangle } from '../pixi'
/*

    style = {
        default: {
            value: 1,
        },

        '(width < 200) && (height > 200)': { width: 100 },
        '(width > 200) || (height < 200)': { display: false },
        '(width > 500)': { value: 2 },
    }

    const style = DisplayQuery.apply(style, config)

*/

export interface DisplayQueryConfig {
    screen: Rectangle,
}

export class DisplayQuery {

    static build(app: Application): DisplayQueryConfig {
        const screen = app.renderer.screen

        return { screen }
    }

    static apply(query, config: DisplayQueryConfig): any {
        const { width, height } = config.screen

        let result = { display: true }
        for (const prop in query) {
            if (prop !== 'default' && !eval(prop)) continue

            result = { ...result, ...query[prop] }
        }

        return result
    }

}
