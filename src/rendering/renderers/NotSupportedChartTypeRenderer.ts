import { IGraphicRenderer, IRenderer } from '..'

export class NotSupportedChartTypeRenderer implements IRenderer {

    constructor (
       private readonly renderer: IGraphicRenderer
    ) {

    }

    render(data: any): void {


    }

}

