import { OutputEventTypes } from '../data/enums/enum.outputEventTypes';
import { IMiddleware, IState } from '../data/interfaces';
import { EventEmitter } from './core.eventEmitter';
import { Viewport } from '.';
export declare class MiddlewareHandler {
    middlewares: IMiddleware[];
    state: IState | undefined;
    constructor(middlewares?: IMiddleware[], state?: IState | undefined);
    next(viewport: Viewport, eventEmitter: EventEmitter<OutputEventTypes>, state: IState): MiddlewareHandler;
}
