import { add, mul, sub } from "@src/lib/calc-utils"

export class TouchZoomEvent extends Event {
    public static readonly NAME: string = 'touchzoom'

    
    public readonly inner: TouchEvent

    public readonly distance: number

    public readonly screen: { height: number, width: number }

    constructor(inner: TouchEvent) {
        super(TouchZoomEvent.NAME)
        
        if (inner.touches.length === 2) {
          this.inner = inner
          const dx = sub(inner.touches[0].clientX, inner.touches[1].clientX) 
          const dy = sub(inner.touches[0].clientY, inner.touches[1].clientY)
          const currentDistance = Math.sqrt(Number(add(mul(dx, dx), mul(dy, dy))))

          this.distance = currentDistance

          this.screen = (<Element>inner.target).getBoundingClientRect()
        }
    }
}
