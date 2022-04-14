import { EmittedEvent } from '../data/aliases'
import { InputEventTypes } from '../data/enums'

import { HandledEvent } from '.'

export class ChartInputEvent {
    constructor(
        public event: EmittedEvent,
        public type: InputEventTypes,
    ) { }

    public markAsHandled(): void {
        this.event = new HandledEvent()
        this.type = InputEventTypes.none
    }

    public preventDefault(): void {
        const { event } = this

        if (!(event instanceof Event)) return

        event.preventDefault()
    }

    public clone(): ChartInputEvent {
        return new ChartInputEvent({ ...this.event }, this.type)
    }
}
