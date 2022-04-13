// import { Duration, Moment } from 'moment'
// import { IStickChartOptions, IStick } from '../interfaces'
// import { DateRange } from '../utils'
// export function generateSticks(
//     { stickIntervalWidth, valueRange }: IStickChartOptions, whitespace: Duration, stickDateFrom: Moment, stickDateTo: Moment): IStick[] {
//     const sticks: IStick[] = []
//     const stickDateRange = new DateRange(stickDateFrom, stickDateTo)
//     for (let i = 0; i < stickDateRange.duration; i += stickIntervalWidth.asMilliseconds() + whitespace.asMilliseconds()) {
//         const date = stickDateFrom.clone().add(i, 'milliseconds')
//         const open = Math.random() * valueRange.to
//         const close = Math.random() * valueRange.to
//         sticks.push({ date: date.toDate(), open, close, high: Math.max(open, close), low: Math.min(open, close) })
//     }
//     return sticks
// }
//# sourceMappingURL=test.sticksMok.js.map