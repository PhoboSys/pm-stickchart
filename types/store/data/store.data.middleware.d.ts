import { MiddlewareHandler } from '../../core/core.middlewareHandler';
import { Viewport } from '../../core/core.viewport';
import { OutputEventTypes } from '../../data/enums/enum.outputEventTypes';
import { IMiddleware, IState } from '../../data/interfaces';
import { EventEmitter } from '@src/core';
export declare class DataMiddleware implements IMiddleware {
    handle(viewport: Viewport, eventEmitter: EventEmitter<OutputEventTypes>, state: IState, handler: MiddlewareHandler): MiddlewareHandler;
    shouldSkip(state: IState): boolean;
    save(state: IState): void;
}
