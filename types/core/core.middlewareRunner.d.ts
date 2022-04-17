import { OutputEventTypes } from '../data/enums/enum.outputEventTypes';
import { IMiddleware, IState } from '../data/interfaces';
import { MiddlewareHandler } from './core.middlewareHandler';
import { Viewport, EventEmitter } from '.';
export declare class MiddlewareRunner {
    middlewares: IMiddleware[];
    constructor(middlewares?: IMiddleware[]);
    add(middleware: IMiddleware): void;
    run(viewport: Viewport, eventEmitter: EventEmitter<OutputEventTypes>, state: IState): MiddlewareHandler;
}
