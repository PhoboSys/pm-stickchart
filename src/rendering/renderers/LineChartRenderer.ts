import { IGraphicStorage, IRenderer } from '@rendering'
import { DoneFunction, RenderingContext } from '@rendering'
import { RenderingCompositor, PriceLineRenderer } from '@rendering'
import { GridRenderer, LatestPriceRenderer } from '@rendering'
import { Pool, Pari, CrosshairRenderer } from '@rendering'
import { PricefeedInfoRenderer } from '@rendering'

export class LineChartRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage,
    ) {
        this.compositor = new RenderingCompositor([
            new GridRenderer(renderer),
            new PricefeedInfoRenderer(renderer),
            new PriceLineRenderer(renderer),
            new Pool(renderer),
            new LatestPriceRenderer(renderer),
            new CrosshairRenderer(renderer),
            new Pari(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

