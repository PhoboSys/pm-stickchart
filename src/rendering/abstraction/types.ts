import { ChartData, PlotData } from '../../chartdata'
import { Application, Rectangle } from '../../lib/pixi'
import { ITextureStorage } from './interfaces'

import { EChartType } from '../../enums'

export type DoneFunction = () => void

export type RenderingContext = {
    pool: any
    paris: any[]
    resolved: any[]
    screen: Rectangle
    textures: ITextureStorage
    charttype: EChartType
    plotdata: PlotData
    chartdata: { prices: number[], timestamps: number[] },

    eventTarget: EventTarget,
    rerender?: boolean
    mousepos?: { x: number, y: number, }
}
