import { Rectangle } from '../../lib/pixi'
import { ChartData, PlotData } from '../../chartdata'
import { ITextureStorage } from './interfaces'

export type DoneFunction = () => void

export type RenderingContext = {
    pool: any,
    paris: any[],
    chartdata: ChartData,
    plotdata: PlotData,
    screen: Rectangle,
    textures: ITextureStorage,

    mousepos?: { x: number, y: number, }
}
