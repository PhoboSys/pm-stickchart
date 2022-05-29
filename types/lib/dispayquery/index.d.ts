import { Application, Rectangle } from '../pixi';
export interface DisplayQueryConfig {
    screen: Rectangle;
}
export declare class DisplayQuery {
    static build(app: Application): DisplayQueryConfig;
    static apply(query: any, config: DisplayQueryConfig): any;
}
