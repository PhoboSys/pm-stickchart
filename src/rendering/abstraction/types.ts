import { Bettor, PlotData } from '@chartdata'
import { Features } from '@features'
import { Options } from '@options'
import { Rectangle } from '@lib/pixi'
import { Timeframe } from '@lib/timeframe'

import { ITextureStorage } from './interfaces'

import { EChartType } from '@enums'

export type DoneFunction = () => void

export type RenderingContext = {
    options: Options,

    game: any
    rounds: any[]
    predictions: any[]
    focusroundid: any
    resolved: any[]
    settlments: any
    blocksLatest: any
    transactions: any
    blocksEntities: any
    transactionsEntities: any
    bettor: Bettor

    screen: Rectangle
    textures: ITextureStorage
    timeframe: Timeframe
    charttype: EChartType
    features: Features
    plotdata: PlotData
    chartdata: { prices: string[], timestamps: number[] }

    eventTarget: EventTarget
    rerender?: boolean
}
