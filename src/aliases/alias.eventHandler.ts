import { EmittedEvent } from './alias.emittedEvent'

export type EventHandler = (type: keyof HTMLElementEventMap) => (event: EmittedEvent) => void
