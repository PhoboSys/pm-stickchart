import { IGraphicStorage, IRenderer } from '@rendering'

export class NotSupportedChartTypeRenderer implements IRenderer {

    constructor(
        private readonly renderer: IGraphicStorage,
    ) {

    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render(data: any): void {

    }

}

