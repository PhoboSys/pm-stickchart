import { PlotData } from '../../chartdata'
import { Rectangle } from '../../lib/pixi'
import { ITextureStorage } from './interfaces'

import { EChartType } from '../../enums'
import { DisplayQueryConfig } from '../../lib/dispayquery/index'

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

    displayQuery: DisplayQueryConfig,
    eventTarget: EventTarget,
    rerender?: boolean
}
