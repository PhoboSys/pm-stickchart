import { Rectangle } from '../../lib/pixi'

export type ChartData = {
    [key: number]: number
}

export type DoneFunction = () => void

export type RenderingContext = {
    pool: any,
    chartdata: ChartData,
    screen: Rectangle
}
