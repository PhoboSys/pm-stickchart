import { Rectangle } from '../../lib/pixi'

export type ChartData = {
    [key: number]: number
}

export type DoneFunction = () => void

export type RenderingContext = {
    chartdata: ChartData,
    screen: Rectangle
}

