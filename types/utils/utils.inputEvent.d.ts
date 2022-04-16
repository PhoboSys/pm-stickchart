import { EmittedEvent } from '../data/aliases';
import { InputEventTypes } from '../data/enums';
export declare class ChartInputEvent {
    event: EmittedEvent;
    type: InputEventTypes;
    constructor(event: EmittedEvent, type: InputEventTypes);
    markAsHandled(): void;
    preventDefault(): void;
}
