"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = void 0;
const Grid_1 = require("../middlewares/Grid");
const Handler_1 = require("../middlewares/Handler");
// export class StickChart {
//     protected width: number
//     protected height: number
//     protected dateRange: DateRange
//     protected renderDateRange: DateRange
//     protected columnIntervalSize: Duration
//     protected stickIntervalWidth: Duration
//     protected valueRange: ValueRange
//     protected rowIntervalSize: number
//     protected buildedSticks: Graphics
//     protected buildedGrid: Graphics
//     protected readonly buildedChart: Graphics = new Graphics()
//     protected readonly candleSticks: Array<ICandleStick> = []
//     constructor(init: IStickChart) {
//         Object.assign(this, init)
//     }
//     public viewport(container: Container): void {
//         container.addChild(this.buildedChart)
//     }
//     public zoomEventHandler(event: WheelEvent): void {
//         event.preventDefault()
//         const { /*offsetX,*/ deltaY } = event
//         const { renderDateRange } = this
//         const zoomValue = deltaY * (renderDateRange.duration * 0.001)
//         renderDateRange.moveRangeInMilliseconds(-zoomValue, zoomValue)
//         const { columnIntervalSize } = this
//         const intervalCount = renderDateRange.getIntervalsCount(columnIntervalSize)
//         if (intervalCount > 15) {
//             columnIntervalSize.add(columnIntervalSize.asMilliseconds(), 'milliseconds')
//         }
//         if (intervalCount < 7) {
//             columnIntervalSize.subtract(columnIntervalSize.asMilliseconds() / 2, 'milliseconds')
//         }
//         // eslint-disable-next-line no-console
//         console.log(intervalCount, columnIntervalSize.asMilliseconds())
//         this.cacheBuild()
//     }
//     public cacheBuild(): Graphics {
//         const grid = this.buildGrid()
//         const sticks = this.buildSticks()
//         this.buildedGrid = grid
//         this.buildedSticks = sticks
//         this.buildedChart.removeChildren()
//         this.buildedChart
//             .addChild(grid)
//             .addChild(sticks)
//         return this.buildedChart
//     }
//     private buildGrid(): Graphics {
//         const {
//             width,
//             height,
//             dateRange,
//             renderDateRange,
//             columnIntervalSize,
//             valueRange,
//             rowIntervalSize,
//         } = this
//         const grid = new Grid({
//             width,
//             height,
//             dateRange,
//             renderDateRange,
//             columnIntervalSize,
//             valueRange,
//             rowIntervalSize,
//         })
//         return grid.build()
//     }
//     private buildSticks(): Graphics {
//         const builded = new Graphics()
//         for (const iStick of this.candleSticks) {
//             const {
//                 width,
//                 height,
//                 renderDateRange,
//                 stickIntervalWidth,
//                 valueRange,
//             } = this
//             const stick = new CandleStick({
//                 ...iStick,
//                 width,
//                 height,
//                 renderDateRange,
//                 stickIntervalWidth,
//                 valueRange,
//             })
//             builded.addChild(stick.build())
//         }
//         return builded
//     }
//     public clear(): void {
//         this.buildedChart.removeChildren()
//     }
//     public rebuild(): Graphics {
//         if (this.buildedGrid === undefined || this.buildedSticks === undefined) {
//             throw Error('Expected to call this.cacheBuild() before')
//         }
//         this.buildedChart.removeChildren()
//         this.buildedChart
//             .addChild(this.buildedSticks)
//             .addChild(this.buildedGrid)
//         return this.buildedChart
//     }
//     public addCandleStick(candleStick: ICandleStick): void {
//         this.candleSticks.push(candleStick)
//     }
// }
class StickChart {
    constructor(init) {
        this.middlewareHandler = new Handler_1.MiddlewareHandler();
        Object.assign(this, init);
        this.middlewareHandler.add(new Grid_1.GridBuilderMiddleware());
    }
    build(viewport) {
        this.middlewareHandler.next(Object.assign(Object.assign({}, this), { viewport }));
    }
}
exports.StickChart = StickChart;
//# sourceMappingURL=StickChart.js.map