export declare function isEmpty(value: any): boolean;
export declare function isFunction(value: any): boolean;
export declare function mapValues(collection: any, visitor: (value?: any, key?: any, idx?: number) => void): object;
export declare function forEach(collection: any, visitor: (value?: any, key?: any, idx?: number) => void): void;
export declare function unixTStoDate(timestamp: number): Date;
export declare function nowUnixTS(): number;
export declare function toUnixTS(timestamp: number): number;
export declare function orderBy(collection: any, visitor: (value?: any, key?: any, idx?: number) => any, order?: 'asc' | 'desc'): any;