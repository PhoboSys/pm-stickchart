import { EmittedEvent } from './alias.emittedEvent';
export declare type EventHandler = (type: keyof HTMLElementEventMap) => (event: EmittedEvent) => void;
