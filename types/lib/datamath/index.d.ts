export default class datamath {
    static min(data: number[]): number;
    static max(data: number[]): number;
    static minmax(data: number[]): [number, number];
    static scale(data: number[], [min, max]: [number, number], factor?: number): number[];
    static range(data: number[], minpadd?: number, maxpadd?: number): [number, number];
    static datastep([minv, maxv]: [number, number]): number;
    static roundpow2(value: number): number;
    static precision(value: number, significant: number): any;
    static toFixedPrecisionisionisionisionisionision(value: number, significant: number): any;
    static toFixedScaled(value: number, stepsize: number): any;
    static toFixed(value: number, dp: number): any;
    static steps([minv, maxv]: [number, number], stepsize: number, maxsteps?: number): number[];
}
