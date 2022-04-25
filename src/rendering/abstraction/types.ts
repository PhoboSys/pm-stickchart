import { Rectangle, RenderTexture } from '../../lib/pixi'
import { ChartData, PlotData } from '../../chartdata'

export type DoneFunction = () => void

export type RenderingContext = {
    pool: any,
    chartdata: ChartData,
    plotdata: PlotData,
    screen: Rectangle,
    gradient: RenderTexture,

    mousepos?: { x: number, y: number, }
}
