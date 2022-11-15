import { IGraphicStorage, IRenderer } from '@rendering'

export class NotSupportedChartTypeRenderer implements IRenderer {

    constructor(
        private readonly renderer: IGraphicStorage,
    ) {

    }

    render(data: any): void {

    }

}

