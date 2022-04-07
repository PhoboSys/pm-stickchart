import { HandledEvent } from '../utils/utils.handledEvent'
import { ScrollEvent } from '../utils/utils.scrollEvent'

export type EmittedEvent = Event | ScrollEvent | HandledEvent | null
