import { EmittedEvent } from '../data/aliases'
import { InputEventTypes } from '../data/enums'

export class ChartInputEvent {
    constructor(
        public event: EmittedEvent,
        public type: InputEventTypes,
    ) { }

    public markAsHandled(): void {
        this.type = InputEventTypes.none
    }

    public preventDefault(): void {
        const { event } = this

        if (!(event instanceof Event)) return

        event.preventDefault()
    }
}
