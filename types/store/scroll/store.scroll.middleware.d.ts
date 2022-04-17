import { Viewport, MiddlewareHandler } from '../../core';
import { EventEmitter } from '../../core/core.eventEmitter';
import { OutputEventTypes } from '../../data/enums/enum.outputEventTypes';
import { IMiddleware, IState } from '../../data/interfaces';
export declare class ScrollHandleMiddleware implements IMiddleware {
    private lastEvent?;
    handle(viewport: Viewport, eventEmitter: EventEmitter<OutputEventTypes>, state: IState, handler: MiddlewareHandler): MiddlewareHandler;
    shouldSkip(state: IState): boolean;
    save(state: IState): void;
}
