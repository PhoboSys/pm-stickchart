import { InputEvents } from '../enums/';
import { HandledEvent, ScrollEvent } from '../utils';
export interface IInputEvent {
    event: Event | HandledEvent | ScrollEvent | null;
    type: InputEvents;
}
