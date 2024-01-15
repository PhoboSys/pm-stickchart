export declare abstract class BaseElement {
    private local;
    private stateprefix;
    protected get animations(): any;
    protected rebind(...path: any[]): void;
    protected clear(name?: string): void;
    protected read(name: string): [any, any, any[]];
    protected get<T>(name: string, create: () => T, dependencies?: any[]): [T, any, any[]];
    private isEqual;
    protected animate(name: string, animation: string, vars?: object): void;
}
