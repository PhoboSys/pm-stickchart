import { IGraphicStorage, IRenderer } from '..'

export class NotSupportedChartTypeRenderer implements IRenderer {

    constructor(
        private readonly renderer: IGraphicStorage,
    ) {

    }

    render(data: any): void {

    }

}

